import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { X } from "lucide-react";
import { getFeatureStageConfig, getPriorityConfig } from "@/config/badge-config";
import { ALL_STAGES, ALL_PRIORITIES } from "@/lib/roadmap-constants";

interface AdvancedFiltersPanelProps {
  isOpen: boolean;
  onClose: () => void;
  selectedStages: string[];
  selectedPriorities: string[];
  onToggleStage: (stage: string) => void;
  onTogglePriority: (priority: string) => void;
  onClearAll: () => void;
}

export function AdvancedFiltersPanel({
  isOpen,
  onClose,
  selectedStages,
  selectedPriorities,
  onToggleStage,
  onTogglePriority,
  onClearAll,
}: AdvancedFiltersPanelProps) {
  // Count active filters
  const allStagesSelected = selectedStages.length === 0 || selectedStages.length === ALL_STAGES.length;
  const allPrioritiesSelected = selectedPriorities.length === 0 || selectedPriorities.length === ALL_PRIORITIES.length;
  const hasActiveFilters = !allStagesSelected || !allPrioritiesSelected;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-neutral-900/50 z-40"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="fixed right-0 top-0 bottom-0 w-[400px] bg-bg-surface shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-200">
          <h2 className="text-lg font-semibold text-text">Filters</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Stage */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-text-muted uppercase tracking-wide">
              Stage
            </label>
            <div className="flex flex-wrap gap-2">
              {ALL_STAGES.map(stage => (
                <Chip
                  key={stage}
                  variant={selectedStages.includes(stage) ? "primary-soft" : "outline"}
                  selected={selectedStages.includes(stage)}
                  label={getFeatureStageConfig(stage as any).label}
                  onClick={() => onToggleStage(stage)}
                />
              ))}
            </div>
          </div>

          {/* Priority */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-text-muted uppercase tracking-wide">
              Priority
            </label>
            <div className="flex flex-wrap gap-2">
              {ALL_PRIORITIES.map(priority => (
                <Chip
                  key={priority}
                  variant={selectedPriorities.includes(priority) ? "primary-soft" : "outline"}
                  selected={selectedPriorities.includes(priority)}
                  label={getPriorityConfig(priority as any).label}
                  onClick={() => onTogglePriority(priority)}
                />
              ))}
            </div>
          </div>

          {/* Future filters (not yet implemented) */}
          <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
            <p className="text-xs text-text-muted text-center">
              Additional filters (Owner, Category, Area, Tag, Status) coming soon
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 p-4 border-t border-neutral-200">
          <Button
            variant="outline"
            onClick={onClearAll}
            disabled={!hasActiveFilters}
          >
            Clear all
          </Button>
          <Button
            variant="primary"
            onClick={onClose}
          >
            Done
          </Button>
        </div>
      </div>
    </>
  );
}
