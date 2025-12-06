import { SegmentedControl } from "@/components/ui/segmented-control";
import { TimelineZoomControl, ZoomLevel } from "@/components/TimelineZoomControl";
import { YearPicker } from "@/components/YearPicker";
import { Chip } from "@/components/ui/chip";
import { getPriorityConfig } from "@/config/badge-config";

const ALL_PRIORITIES = ["low", "medium", "high", "critical"];

interface GlobalViewControlsProps {
  // Date range
  selectedYear: number;
  onYearChange: (year: number) => void;
  
  // Time scale
  timeScale: ZoomLevel;
  onTimeScaleChange: (scale: ZoomLevel) => void;
  
  // View style
  viewStyle: "timeline" | "cards";
  onViewStyleChange: (style: "timeline" | "cards") => void;
  
  // Density
  density: "normal" | "compact";
  onDensityChange: (density: "normal" | "compact") => void;
  
  // Filters
  selectedStages: string[];
  selectedPriorities: string[];
  onToggleStage: (stage: string) => void;
  onTogglePriority: (priority: string) => void;
  onClearAllFilters: () => void;
  hasActiveFilters: boolean;
}

export function GlobalViewControls({
  selectedYear,
  onYearChange,
  timeScale,
  onTimeScaleChange,
  viewStyle,
  onViewStyleChange,
  density,
  onDensityChange,
  selectedStages,
  selectedPriorities,
  onToggleStage,
  onTogglePriority,
  onClearAllFilters,
  hasActiveFilters,
}: GlobalViewControlsProps) {
  const allPrioritiesSelected = selectedPriorities.length === 0;

  return (
    <>
      <div className="flex items-center justify-between gap-8 p-4 bg-bg-surface rounded-lg border border-neutral-200">
        {/* Left: View configuration controls */}
        <div className="flex items-center gap-8">
          {/* Date Range */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-text-muted uppercase tracking-wide">
              Date
            </label>
            <YearPicker
              selectedYear={selectedYear}
              onYearChange={onYearChange}
              minYear={2020}
              maxYear={2030}
            />
          </div>

          {/* Time Scale */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-text-muted uppercase tracking-wide">
              Time scale
            </label>
            <TimelineZoomControl 
              zoom={timeScale} 
              onZoomChange={onTimeScaleChange} 
            />
          </div>

          {/* View Style */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-text-muted uppercase tracking-wide">
              View
            </label>
            <SegmentedControl
              options={[
                { id: "cards", label: "Cards" },
                { id: "timeline", label: "Timeline" }
              ]}
              value={viewStyle}
              onChange={(value) => onViewStyleChange(value as "timeline" | "cards")}
              size="sm"
              ariaLabel="Timeline display style"
            />
          </div>

          {/* Priority Filter */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-text-muted uppercase tracking-wide">
              Priority
            </label>
            <div className="flex gap-1.5">
              {ALL_PRIORITIES.map(priority => {
                const isSelected = selectedPriorities.includes(priority) || allPrioritiesSelected;
                
                return (
                  <Chip
                    key={priority}
                    variant={isSelected ? "neutral" : "outline"}
                    selected={isSelected}
                    label={getPriorityConfig(priority).label}
                    onClick={() => onTogglePriority(priority)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
