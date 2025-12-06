import { Feature } from "@/hooks/useFeatures";
import { Button } from "@/components/ui/button";
import { Calendar, FilterX, Map, Plus } from "lucide-react";

interface RoadmapEmptyStateProps {
  itemsInRange: Feature[];
  visibleItems: Feature[];
  selectedYear: number;
  hasActiveFilters: boolean;
  allFeatures: Feature[]; // All features in the dataset
  onClearFilters: () => void;
  onChangeYear: (year: number) => void;
  onAddFeature?: () => void; // Optional handler for adding new features
}

export function RoadmapEmptyState({
  itemsInRange,
  visibleItems,
  selectedYear,
  hasActiveFilters,
  allFeatures,
  onClearFilters,
  onChangeYear,
  onAddFeature,
}: RoadmapEmptyStateProps) {
  const currentYear = new Date().getFullYear();
  
  // Helper to find years with items
  const getYearsWithItems = () => {
    const years = new Set<number>();
    allFeatures.forEach(feature => {
      if (feature.start_date) {
        const startYear = new Date(feature.start_date).getFullYear();
        years.add(startYear);
      }
      if (feature.end_date) {
        const endYear = new Date(feature.end_date).getFullYear();
        years.add(endYear);
      }
    });
    return Array.from(years).sort((a, b) => a - b);
  };
  
  // Find nearest previous and future years with items
  const findAdjacentYears = () => {
    const yearsWithItems = getYearsWithItems();
    if (yearsWithItems.length === 0) return { previous: null, next: null };
    
    // Find nearest previous year (year < selectedYear)
    const previousYears = yearsWithItems.filter(year => year < selectedYear);
    const previousYear = previousYears.length > 0 
      ? previousYears[previousYears.length - 1] // Get the most recent previous year
      : null;
    
    // Find nearest future year (year > selectedYear)
    const futureYears = yearsWithItems.filter(year => year > selectedYear);
    const nextYear = futureYears.length > 0
      ? futureYears[0] // Get the earliest future year
      : null;
    
    return { previous: previousYear, next: nextYear };
  };
  
  // Case 1: No features at all in the entire dataset
  if (allFeatures.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 bg-bg-surface rounded-lg border border-neutral-200">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary-soft/20 mb-6">
          <Map className="w-10 h-10 text-primary" />
        </div>
        
        <h3 className="text-2xl font-semibold text-text mb-3">
          Start Your Roadmap
        </h3>
        
        <p className="text-sm text-text-muted text-center max-w-md mb-8">
          You haven't added any features or experiments yet. Start building your visual roadmap to track progress and plan future work.
        </p>
        
        <Button
          variant="primary"
          size="lg"
          onClick={onAddFeature}
          className="gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Your First Feature
        </Button>
      </div>
    );
  }
  
  // Case 2: No items in the selected year, but items exist in other years
  if (itemsInRange.length === 0) {
    const { previous, next } = findAdjacentYears();
    const yearsWithItems = getYearsWithItems();
    
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6 bg-bg-surface rounded-lg border border-neutral-200">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary-soft/30 mb-4">
          <Calendar className="w-8 h-8 text-primary" />
        </div>
        
        <h3 className="text-xl font-semibold text-text mb-2">
          No roadmap items in {selectedYear}
        </h3>
        
        <p className="text-sm text-text-muted text-center max-w-md mb-6">
          Try a different year or add items for {selectedYear}.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-3">
          {previous && (
            <Button
              variant="primary"
              onClick={() => onChangeYear(previous)}
              className="gap-2"
            >
              <Calendar className="w-4 h-4" />
              View {previous}
            </Button>
          )}
          
          {next && (
            <Button
              variant="primary"
              onClick={() => onChangeYear(next)}
              className="gap-2"
            >
              <Calendar className="w-4 h-4" />
              View {next}
            </Button>
          )}
          
          {onAddFeature && (
            <Button
              variant="outline"
              onClick={onAddFeature}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Feature
            </Button>
          )}
        </div>
        
        {yearsWithItems.length > 0 && (
          <div className="mt-6 pt-6 border-t border-neutral-200 w-full max-w-md">
            <p className="text-xs text-text-muted text-center mb-3">
              Available years: {yearsWithItems.join(", ")}
            </p>
          </div>
        )}
      </div>
    );
  }
  
  // Case 3: Items exist in range, but filters are excluding everything
  if (visibleItems.length === 0 && hasActiveFilters) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6 bg-bg-surface rounded-lg border border-neutral-200">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-warning/10 mb-4">
          <FilterX className="w-8 h-8 text-warning" />
        </div>
        
        <h3 className="text-xl font-semibold text-text mb-2">
          No roadmap items match your filters for {selectedYear}
        </h3>
        
        <p className="text-sm text-text-muted text-center max-w-md mb-6">
          {itemsInRange.length} item{itemsInRange.length !== 1 ? 's' : ''} exist{itemsInRange.length === 1 ? 's' : ''} in {selectedYear}, but your current filters are excluding all of them.
        </p>
        
        <Button
          variant="primary"
          onClick={onClearFilters}
          className="gap-2"
        >
          <FilterX className="w-4 h-4" />
          Clear all filters
        </Button>
      </div>
    );
  }
  
  // Fallback case - should not happen if logic is correct
  return null;
}
