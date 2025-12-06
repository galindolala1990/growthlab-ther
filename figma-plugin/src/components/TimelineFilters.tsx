import { Chip } from "@/components/ui/chip";
import { X, FilterX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getFeatureStageConfig, getPriorityConfig } from "@/config/badge-config";

export interface TimelineFilterState {
  stages: string[];
  priorities: string[];
}

interface TimelineFiltersProps {
  selectedStages: string[];
  selectedPriorities: string[];
  availableStages: string[];
  availablePriorities: string[];
  onToggleStage: (stage: string) => void;
  onTogglePriority: (priority: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  filterSummary: string;
  year: number;
  timeScale: string;
}

const ALL_STAGES = ["planning", "design", "development", "testing", "launch"];
const ALL_PRIORITIES = ["low", "medium", "high", "critical"];

export function TimelineFilters({
  selectedStages,
  selectedPriorities,
  availableStages,
  availablePriorities,
  onToggleStage,
  onTogglePriority,
  onClearFilters,
  hasActiveFilters,
  filterSummary,
  year,
  timeScale,
}: TimelineFiltersProps) {
  
  // Check if all stages are selected
  const allStagesSelected = selectedStages.length === 0 || selectedStages.length === ALL_STAGES.length;
  const allPrioritiesSelected = selectedPriorities.length === 0 || selectedPriorities.length === ALL_PRIORITIES.length;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-start gap-6 p-4 bg-bg-surface rounded-lg border border-neutral-200">
        {/* Stage Filter Group */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wide">Stage</span>
          <div className="flex flex-wrap gap-2">
            {ALL_STAGES.map(stage => {
              const isAvailable = availableStages.includes(stage);
              const isSelected = selectedStages.includes(stage) || allStagesSelected;
              
              return (
                <Chip
                  key={stage}
                  variant={isSelected && isAvailable ? "primary-soft" : "outline"}
                  selected={isSelected && isAvailable}
                  label={getFeatureStageConfig(stage).label}
                  onClick={() => isAvailable && onToggleStage(stage)}
                  className={!isAvailable ? "opacity-40 cursor-not-allowed" : ""}
                />
              );
            })}
          </div>
        </div>

        <div className="w-px self-stretch bg-neutral-200" />

        {/* Priority Filter Group */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wide">Priority</span>
          <div className="flex flex-wrap gap-2">
            {ALL_PRIORITIES.map(priority => {
              const isAvailable = availablePriorities.includes(priority);
              const isSelected = selectedPriorities.includes(priority) || allPrioritiesSelected;
              
              return (
                <Chip
                  key={priority}
                  variant={isSelected && isAvailable ? "primary-soft" : "outline"}
                  selected={isSelected && isAvailable}
                  label={getPriorityConfig(priority).label}
                  onClick={() => isAvailable && onTogglePriority(priority)}
                  className={!isAvailable ? "opacity-40 cursor-not-allowed" : ""}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Filter summary - always show */}
      <div className="flex items-center justify-between px-4 py-2 bg-bg-surface rounded-lg border border-neutral-200">
        <p className="text-sm text-text">
          <span className="font-semibold">Showing:</span> {filterSummary}
        </p>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-primary hover:text-primary-hover font-medium transition-colors"
          >
            Clear all filters
          </button>
        )}
      </div>
    </div>
  );
}
