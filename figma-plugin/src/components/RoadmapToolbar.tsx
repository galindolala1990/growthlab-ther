import { Button } from "@/components/ui/button";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { TimelineZoomControl, ZoomLevel } from "@/components/TimelineZoomControl";
import { YearPicker } from "@/components/YearPicker";
import { Chip } from "@/components/ui/chip";
import { Plus, LayoutGrid, Layers, Rows3 } from "lucide-react";
import { getPriorityConfig } from "@/config/badge-config";

const ALL_PRIORITIES = ["low", "medium", "high", "critical"];

interface RoadmapToolbarProps {
  // Year control
  selectedYear: number;
  onYearChange: (year: number) => void;
  
  // View style (cards vs timeline)
  viewStyle: "timeline" | "cards";
  onViewStyleChange: (style: "timeline" | "cards") => void;
  
  // Time scale
  timeScale: ZoomLevel;
  onTimeScaleChange: (scale: ZoomLevel) => void;
  
  // Density
  density: "normal" | "compact";
  onDensityChange: (density: "normal" | "compact") => void;
  
  // Priority filter
  selectedPriorities: string[];
  availablePriorities: string[];
  onTogglePriority: (priority: string) => void;
  
  // Actions
  onAddFeature: () => void;
  onAddTestData?: () => void;
  showDevTools?: boolean;
}

export function RoadmapToolbar({
  selectedYear,
  onYearChange,
  viewStyle,
  onViewStyleChange,
  timeScale,
  onTimeScaleChange,
  density,
  onDensityChange,
  selectedPriorities,
  availablePriorities,
  onTogglePriority,
  onAddFeature,
  onAddTestData,
  showDevTools = false,
}: RoadmapToolbarProps) {
  const allPrioritiesSelected = selectedPriorities.length === 0;
  return (
    <div className="flex items-center justify-between gap-4 p-3 bg-bg-surface rounded-lg border border-neutral-200">
      {/* Left: View Controls */}
      <div className="flex items-center gap-6">
        {/* Year Picker */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-text-muted">Year</span>
          <YearPicker
            selectedYear={selectedYear}
            onYearChange={onYearChange}
            minYear={2020}
            maxYear={2030}
          />
        </div>

        <div className="w-px h-6 bg-neutral-200" />

        {/* View Style Toggle */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-text-muted">View</span>
          <SegmentedControl
            options={[
              { id: "cards", label: "Cards", icon: LayoutGrid },
              { id: "timeline", label: "Timeline", icon: Layers }
            ]}
            value={viewStyle}
            onChange={(value) => onViewStyleChange(value as "timeline" | "cards")}
            size="sm"
            ariaLabel="Timeline display style"
          />
        </div>

        <div className="w-px h-6 bg-neutral-200" />

        {/* Time Scale */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-text-muted">Scale</span>
          <TimelineZoomControl 
            zoom={timeScale} 
            onZoomChange={onTimeScaleChange} 
          />
        </div>

        <div className="w-px h-6 bg-neutral-200" />

        {/* Priority Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-text-muted">Priority</span>
          <div className="flex gap-1.5">
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

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {showDevTools && onAddTestData && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onAddTestData}
            className="gap-2"
          >
            Add Test Data
          </Button>
        )}

        <Button 
          size="sm" 
          onClick={onAddFeature}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Feature
        </Button>
      </div>
    </div>
  );
}
