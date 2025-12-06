import { useMemo, useState, useEffect } from "react";
import { Feature } from "./useFeatures";
import { ZoomLevel } from "@/components/TimelineZoomControl";
import { ALL_STAGES, ALL_PRIORITIES } from "@/lib/roadmap-constants";

export type ViewMode = "cards" | "timeline";
export type DensityMode = "normal" | "compact";

export interface RoadmapFilterState {
  year: number;
  timeScale: ZoomLevel;
  view: ViewMode;
  density: DensityMode;
  stages: string[];
  priorities: string[];
}

interface UseRoadmapFiltersOptions {
  features: Feature[];
  initialYear?: number;
  initialTimeScale?: ZoomLevel;
  initialView?: ViewMode;
  initialDensity?: DensityMode;
}

export interface UseRoadmapFiltersReturn {
  // State
  filterState: RoadmapFilterState;
  
  // Setters
  setYear: (year: number) => void;
  setTimeScale: (timeScale: ZoomLevel) => void;
  setView: (view: ViewMode) => void;
  setDensity: (density: DensityMode) => void;
  setStages: (stages: string[]) => void;
  setPriorities: (priorities: string[]) => void;
  toggleStage: (stage: string) => void;
  togglePriority: (priority: string) => void;
  clearFilters: () => void;
  selectAllStages: () => void;
  selectAllPriorities: () => void;
  
  // Derived data
  itemsInRange: Feature[];  // All features in the selected year/time range
  visibleItems: Feature[];  // Features after applying stage/priority filters
  
  // Metadata
  hasActiveFilters: boolean;
  filterSummary: string;
  dateRange: { start: Date; end: Date };
  
  // Available filter options
  availableStages: string[];
  availablePriorities: string[];
}

// LocalStorage keys
const STORAGE_KEYS = {
  VIEW: "roadmap_view",
  TIME_SCALE: "roadmap_time_scale",
  DENSITY: "roadmap_density",
  YEAR: "roadmap_year",
};

/**
 * Centralized hook for managing roadmap filters and derived data.
 * Ensures single source of truth for filtered features across all components.
 */
export function useRoadmapFilters({
  features,
  initialYear = new Date().getFullYear(),
  initialTimeScale = "months",
  initialView = "cards",
  initialDensity = "normal",
}: UseRoadmapFiltersOptions): UseRoadmapFiltersReturn {
  
  // Initialize state from localStorage or defaults
  const [year, setYearState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.YEAR);
    return saved ? parseInt(saved) : initialYear;
  });
  
  const [timeScale, setTimeScaleState] = useState<ZoomLevel>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TIME_SCALE);
    return (saved as ZoomLevel) || initialTimeScale;
  });
  
  const [view, setViewState] = useState<ViewMode>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.VIEW);
    return (saved as ViewMode) || initialView;
  });
  
  const [density, setDensityState] = useState<DensityMode>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DENSITY);
    return (saved as DensityMode) || initialDensity;
  });
  
  const [stages, setStages] = useState<string[]>(ALL_STAGES); // Default: all selected
  const [priorities, setPriorities] = useState<string[]>(ALL_PRIORITIES); // Default: all selected

  // Persist to localStorage
  const setYear = (newYear: number) => {
    setYearState(newYear);
    localStorage.setItem(STORAGE_KEYS.YEAR, String(newYear));
  };

  const setTimeScale = (newTimeScale: ZoomLevel) => {
    setTimeScaleState(newTimeScale);
    localStorage.setItem(STORAGE_KEYS.TIME_SCALE, newTimeScale);
  };

  const setView = (newView: ViewMode) => {
    setViewState(newView);
    localStorage.setItem(STORAGE_KEYS.VIEW, newView);
  };

  const setDensity = (newDensity: DensityMode) => {
    setDensityState(newDensity);
    localStorage.setItem(STORAGE_KEYS.DENSITY, newDensity);
  };

  // Calculate date range based on year and time scale
  const dateRange = useMemo(() => {
    const start = new Date(year, 0, 1); // Jan 1
    const end = new Date(year, 11, 31, 23, 59, 59); // Dec 31
    return { start, end };
  }, [year, timeScale]);

  // Filter features by date range (year boundary)
  const itemsInRange = useMemo(() => {
    return features.filter(feature => {
      // Only show committed features with dates
      if (!feature.start_date || !feature.end_date) {
        return false;
      }

      const featureStart = new Date(feature.start_date);
      const featureEnd = new Date(feature.end_date);

      // Feature overlaps with selected year if:
      // - Starts in this year, OR
      // - Ends in this year, OR
      // - Spans across this year (starts before, ends after)
      const startsInYear = featureStart.getFullYear() === year;
      const endsInYear = featureEnd.getFullYear() === year;
      const spansYear = featureStart.getFullYear() < year && featureEnd.getFullYear() > year;

      return startsInYear || endsInYear || spansYear;
    });
  }, [features, year]);

  // Apply stage and priority filters to items in range
  const visibleItems = useMemo(() => {
    return itemsInRange.filter(feature => {
      // If all stages selected, include all; otherwise must match selected
      const allStagesSelected = stages.length === 0 || stages.length === ALL_STAGES.length;
      const stageMatch = allStagesSelected || stages.includes(feature.stage);
      
      // If all priorities selected, include all; otherwise must match selected
      // Features without priority are included only when all priorities selected
      const allPrioritiesSelected = priorities.length === 0 || priorities.length === ALL_PRIORITIES.length;
      const priorityMatch = allPrioritiesSelected || 
                           (feature.priority && priorities.includes(feature.priority));

      return stageMatch && priorityMatch;
    });
  }, [itemsInRange, stages, priorities]);

  // Determine available filter options from items in range
  const availableStages = useMemo(() => {
    const stagesInRange = new Set(itemsInRange.map(f => f.stage));
    return ALL_STAGES.filter(s => stagesInRange.has(s as any));
  }, [itemsInRange]);

  const availablePriorities = useMemo(() => {
    const prioritiesInRange = new Set(
      itemsInRange.map(f => f.priority).filter(Boolean) as string[]
    );
    return ALL_PRIORITIES.filter(p => prioritiesInRange.has(p as any));
  }, [itemsInRange]);

  // Check if filters are actively excluding items
  const hasActiveFilters = useMemo(() => {
    const allStagesSelected = stages.length === 0 || stages.length === ALL_STAGES.length;
    const allPrioritiesSelected = priorities.length === 0 || priorities.length === ALL_PRIORITIES.length;
    return !allStagesSelected || !allPrioritiesSelected;
  }, [stages, priorities]);

  // Generate filter summary text with improved format
  const filterSummary = useMemo(() => {
    const allStagesSelected = stages.length === 0 || stages.length === ALL_STAGES.length;
    const allPrioritiesSelected = priorities.length === 0 || priorities.length === ALL_PRIORITIES.length;
    
    // Show actual selected items when filtered, or "All" when everything selected
    const stagePart = allStagesSelected 
      ? "All stages" 
      : stages.map(s => {
          const config = ALL_STAGES.find(stage => stage === s);
          return s.charAt(0).toUpperCase() + s.slice(1);
        }).join(", ");
    
    const priorityPart = allPrioritiesSelected 
      ? "All priorities" 
      : priorities.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(", ");
    
    const timeScaleLabel = timeScale === "weeks" ? "Weeks" 
      : timeScale === "months" ? "Months"
      : "Quarters";
    
    return `${stagePart} • ${priorityPart} • Year ${year} (${timeScaleLabel})`;
  }, [stages, priorities, year, timeScale]);

  // Filter manipulation helpers
  const toggleStage = (stage: string) => {
    setStages(prev => 
      prev.includes(stage)
        ? prev.filter(s => s !== stage)
        : [...prev, stage]
    );
  };

  const togglePriority = (priority: string) => {
    setPriorities(prev =>
      prev.includes(priority)
        ? prev.filter(p => p !== priority)
        : [...prev, priority]
    );
  };

  const clearFilters = () => {
    setStages(ALL_STAGES);
    setPriorities(ALL_PRIORITIES);
  };

  const selectAllStages = () => {
    setStages(ALL_STAGES);
  };

  const selectAllPriorities = () => {
    setPriorities(ALL_PRIORITIES);
  };

  return {
    filterState: {
      year,
      timeScale,
      view,
      density,
      stages,
      priorities,
    },
    setYear,
    setTimeScale,
    setView,
    setDensity,
    setStages,
    setPriorities,
    toggleStage,
    togglePriority,
    clearFilters,
    selectAllStages,
    selectAllPriorities,
    itemsInRange,
    visibleItems,
    hasActiveFilters,
    filterSummary,
    dateRange,
    availableStages,
    availablePriorities,
  };
}
