import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { AdvancedFiltersPanel } from "@/components/AdvancedFiltersPanel";

interface ContentFiltersProps {
  // Stage filter
  selectedStages: string[];
  availableStages: string[];
  onToggleStage: (stage: string) => void;
  
  // Priority filter
  selectedPriorities: string[];
  availablePriorities: string[];
  onTogglePriority: (priority: string) => void;
  
  // Actions
  onClearAllFilters: () => void;
  hasActiveFilters: boolean;
  
  // Advanced filters
  advancedFilterCount?: number;
  
  // View settings (for summary)
  year: number;
  timeScale: string;
}

const ALL_STAGES = ["planning", "design", "development", "testing", "launch"];
const ALL_PRIORITIES = ["low", "medium", "high", "critical"];

// Priority labels mapping
const PRIORITY_LABELS: Record<string, string> = {
  low: "P3",
  medium: "P2", 
  high: "P1",
  critical: "P0"
};

export function ContentFilters({
  selectedStages,
  availableStages,
  onToggleStage,
  selectedPriorities,
  availablePriorities,
  onTogglePriority,
  onClearAllFilters,
  hasActiveFilters,
  advancedFilterCount = 0,
  year,
  timeScale,
}: ContentFiltersProps) {
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);
  
  // Default behavior: empty array OR all selected = "no filter" (all shown)
  const allStagesSelected = selectedStages.length === 0 || selectedStages.length === ALL_STAGES.length;
  const allPrioritiesSelected = selectedPriorities.length === 0 || selectedPriorities.length === ALL_PRIORITIES.length;
  
  // Build filter summary text
  const getSummaryText = () => {
    const parts: string[] = [];
    
    // Stage summary
    if (!allStagesSelected && selectedStages.length > 0) {
      const stageLabels = selectedStages.map(s => {
        const config = {
          planning: { label: "Planning" },
          design: { label: "Design" },
          development: { label: "Development" },
          testing: { label: "Testing" },
          launch: { label: "Launch" },
        }[s];
        return config?.label || s;
      });
      parts.push(stageLabels.join(", "));
    }
    
    // Priority summary
    if (!allPrioritiesSelected && selectedPriorities.length > 0) {
      const priorityLabels = selectedPriorities
        .map(p => PRIORITY_LABELS[p])
        .sort() // P0, P1, P2, P3
        .reverse(); // Reverse to get P0 first
      
      if (priorityLabels.length > 1) {
        parts.push(`${priorityLabels[priorityLabels.length - 1]}–${priorityLabels[0]}`);
      } else {
        parts.push(priorityLabels[0]);
      }
    }
    
    // Year and time scale (always shown)
    const timeScaleLabel = timeScale === "weeks" ? "Weeks" : 
                          timeScale === "months" ? "Months" : 
                          timeScale === "quarters" ? "Quarters" : "Yearly";
    parts.push(`Year ${year} (${timeScaleLabel})`);
    
    return parts.join(" • ");
  };

  return (
    <div className="space-y-3">
      {/* Filters Button */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="md"
          onClick={() => setShowFiltersPanel(true)}
          className="gap-2"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {(hasActiveFilters || advancedFilterCount > 0) && (
            <span className="ml-1 px-1.5 py-0.5 text-xs font-semibold bg-primary text-primary-foreground rounded">
              {advancedFilterCount || "•"}
            </span>
          )}
        </Button>
      </div>

      {/* Filter Summary */}
      <div className="flex items-center justify-between px-4">
        <p className="text-sm text-text">
          <span className="font-semibold">Showing:</span> {getSummaryText()}
        </p>
        
        {hasActiveFilters && (
          <button
            onClick={onClearAllFilters}
            className="text-sm text-primary hover:text-primary-hover font-medium transition-colors"
          >
            Clear all filters
          </button>
        )}
      </div>
      
      {/* Filters Panel */}
      <AdvancedFiltersPanel
        isOpen={showFiltersPanel}
        onClose={() => setShowFiltersPanel(false)}
        selectedStages={selectedStages}
        selectedPriorities={selectedPriorities}
        onToggleStage={onToggleStage}
        onTogglePriority={onTogglePriority}
        onClearAll={onClearAllFilters}
      />
    </div>
  );
}
