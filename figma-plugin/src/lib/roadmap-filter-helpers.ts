import { Feature } from "@/hooks/useFeatures";

/**
 * Validation helpers for roadmap filtering logic.
 * These functions ensure data consistency across components.
 */

export interface FilterValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validates that pipeline counts match visible items.
 * Ensures PipelineHealthHeader and timeline are showing the same data.
 */
export function validatePipelineCounts(
  visibleItems: Feature[],
  pipelineCounts: Record<string, number>
): FilterValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Count items by stage from visibleItems
  const actualCounts = visibleItems.reduce((acc, item) => {
    acc[item.stage] = (acc[item.stage] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Check each stage count
  const stages = ["planning", "design", "development", "testing", "launch"];
  for (const stage of stages) {
    const actual = actualCounts[stage] || 0;
    const reported = pipelineCounts[stage] || 0;
    
    if (actual !== reported) {
      errors.push(
        `Stage "${stage}" count mismatch: visible=${actual}, pipeline=${reported}`
      );
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validates that experiment percentages are calculated from the same filtered set.
 */
export function validateExperimentPercentage(
  visibleItems: Feature[],
  reportedPercentage: number,
  reportedExperimentCount: number,
  reportedTotalCount: number
): FilterValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const actualTotal = visibleItems.length;
  const actualExperiments = visibleItems.filter(f => f.is_experiment).length;
  const actualPercentage = actualTotal > 0 
    ? Math.round((actualExperiments / actualTotal) * 100)
    : 0;

  if (actualTotal !== reportedTotalCount) {
    errors.push(
      `Total count mismatch: visible=${actualTotal}, reported=${reportedTotalCount}`
    );
  }

  if (actualExperiments !== reportedExperimentCount) {
    errors.push(
      `Experiment count mismatch: visible=${actualExperiments}, reported=${reportedExperimentCount}`
    );
  }

  if (actualPercentage !== reportedPercentage) {
    errors.push(
      `Experiment percentage mismatch: calculated=${actualPercentage}%, reported=${reportedPercentage}%`
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validates that items in range are correctly filtered by date.
 */
export function validateDateRangeFilter(
  allFeatures: Feature[],
  itemsInRange: Feature[],
  year: number
): FilterValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check that all items in range are actually within the year
  for (const item of itemsInRange) {
    if (!item.start_date || !item.end_date) {
      errors.push(`Item "${item.title}" in range but missing dates`);
      continue;
    }

    const startYear = new Date(item.start_date).getFullYear();
    const endYear = new Date(item.end_date).getFullYear();

    const overlapsYear = 
      startYear === year ||
      endYear === year ||
      (startYear < year && endYear > year);

    if (!overlapsYear) {
      errors.push(
        `Item "${item.title}" in range but doesn't overlap year ${year} (start: ${startYear}, end: ${endYear})`
      );
    }
  }

  // Check that we didn't miss any items that should be in range
  const expectedInRange = allFeatures.filter(f => {
    if (!f.start_date || !f.end_date) return false;
    const startYear = new Date(f.start_date).getFullYear();
    const endYear = new Date(f.end_date).getFullYear();
    return startYear === year || endYear === year || (startYear < year && endYear > year);
  });

  if (expectedInRange.length !== itemsInRange.length) {
    errors.push(
      `Date range filter incorrect: expected ${expectedInRange.length} items, got ${itemsInRange.length}`
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validates that stage/priority filters are applied correctly.
 */
export function validateStageAndPriorityFilters(
  itemsInRange: Feature[],
  visibleItems: Feature[],
  selectedStages: string[],
  selectedPriorities: string[]
): FilterValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const allStagesSelected = selectedStages.length === 0 || selectedStages.length === 5;
  const allPrioritiesSelected = selectedPriorities.length === 0 || selectedPriorities.length === 4;

  // Check each visible item
  for (const item of visibleItems) {
    // Validate stage filter
    if (!allStagesSelected && !selectedStages.includes(item.stage)) {
      errors.push(
        `Item "${item.title}" visible but stage "${item.stage}" not in selected stages`
      );
    }

    // Validate priority filter
    if (!allPrioritiesSelected && item.priority && !selectedPriorities.includes(item.priority)) {
      errors.push(
        `Item "${item.title}" visible but priority "${item.priority}" not in selected priorities`
      );
    }
  }

  // Check that no items were incorrectly excluded
  for (const item of itemsInRange) {
    const stageMatch = allStagesSelected || selectedStages.includes(item.stage);
    const priorityMatch = allPrioritiesSelected || !item.priority || selectedPriorities.includes(item.priority);
    const shouldBeVisible = stageMatch && priorityMatch;
    const isVisible = visibleItems.includes(item);

    if (shouldBeVisible && !isVisible) {
      errors.push(
        `Item "${item.title}" should be visible but was excluded (stage: ${item.stage}, priority: ${item.priority})`
      );
    }

    if (!shouldBeVisible && isVisible) {
      errors.push(
        `Item "${item.title}" should be excluded but is visible (stage: ${item.stage}, priority: ${item.priority})`
      );
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Runs all validation checks and returns a comprehensive report.
 */
export function validateRoadmapFilters(
  allFeatures: Feature[],
  itemsInRange: Feature[],
  visibleItems: Feature[],
  year: number,
  selectedStages: string[],
  selectedPriorities: string[],
  pipelineCounts?: Record<string, number>,
  experimentData?: {
    percentage: number;
    experimentCount: number;
    totalCount: number;
  }
): FilterValidationResult {
  const allResults: FilterValidationResult[] = [];

  // Validate date range filtering
  allResults.push(validateDateRangeFilter(allFeatures, itemsInRange, year));

  // Validate stage/priority filtering
  allResults.push(validateStageAndPriorityFilters(
    itemsInRange,
    visibleItems,
    selectedStages,
    selectedPriorities
  ));

  // Validate pipeline counts if provided
  if (pipelineCounts) {
    allResults.push(validatePipelineCounts(visibleItems, pipelineCounts));
  }

  // Validate experiment percentage if provided
  if (experimentData) {
    allResults.push(validateExperimentPercentage(
      visibleItems,
      experimentData.percentage,
      experimentData.experimentCount,
      experimentData.totalCount
    ));
  }

  // Combine all results
  const errors = allResults.flatMap(r => r.errors);
  const warnings = allResults.flatMap(r => r.warnings);

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Development helper: Log validation results to console.
 * Only runs in development mode.
 */
export function logValidationResults(result: FilterValidationResult): void {
  if (process.env.NODE_ENV !== 'development') return;

  if (result.isValid) {
    console.log('✅ Roadmap filter validation passed');
  } else {
    console.group('❌ Roadmap filter validation failed');
    result.errors.forEach(error => console.error('Error:', error));
    result.warnings.forEach(warning => console.warn('Warning:', warning));
    console.groupEnd();
  }
}
