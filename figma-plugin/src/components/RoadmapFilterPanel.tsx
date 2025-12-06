import { Feature } from "@/hooks/useFeatures";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Chip } from "@/components/ui/chip";
import { Button } from "@/components/ui/button";
import { 
  AlertCircle, 
  TrendingUp, 
  Sparkles, 
  Filter,
  ChevronDown,
  ChevronUp,
  FilterX 
} from "lucide-react";
import { getFeatureStageConfig, getPriorityConfig } from "@/config/badge-config";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface RoadmapFilterPanelProps {
  // Filter state
  selectedStages: string[];
  selectedPriorities: string[];
  availableStages: string[];
  availablePriorities: string[];
  onToggleStage: (stage: string) => void;
  onTogglePriority: (priority: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  
  // Data for metrics
  visibleItems: Feature[];
  totalInRange: number;
  
  // Summary text
  filterSummary: string;
}

const ALL_STAGES = ["planning", "design", "development", "testing", "launch"];
const ALL_PRIORITIES = ["low", "medium", "high", "critical"];

export function RoadmapFilterPanel({
  selectedStages,
  selectedPriorities,
  availableStages,
  availablePriorities,
  onToggleStage,
  onTogglePriority,
  onClearFilters,
  hasActiveFilters,
  visibleItems,
  totalInRange,
  filterSummary,
}: RoadmapFilterPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  // Calculate metrics
  const stageBreakdown = {
    planning: visibleItems.filter(f => f.stage === "planning").length,
    design: visibleItems.filter(f => f.stage === "design").length,
    development: visibleItems.filter(f => f.stage === "development").length,
    testing: visibleItems.filter(f => f.stage === "testing").length,
    launch: visibleItems.filter(f => f.stage === "launch").length,
  };

  const experimentCount = visibleItems.filter(f => f.is_experiment).length;
  const experimentPercentage = visibleItems.length > 0 
    ? Math.round((experimentCount / visibleItems.length) * 100)
    : 0;
    // Calculate metrics (priority filter hidden)

  const allStagesSelected = selectedStages.length === 0 || selectedStages.length === ALL_STAGES.length;
  const allPrioritiesSelected = selectedPriorities.length === 0 || selectedPriorities.length === ALL_PRIORITIES.length;

  const stages = [
    { key: "planning", label: "Planning" },
    { key: "design", label: "Design" },
    { key: "development", label: "Dev" },
    { key: "testing", label: "Testing" },
    { key: "launch", label: "Launch" },
  ] as const;

  return (
    <Card className="border-neutral-200 overflow-hidden">
      {/* Header - Always Visible */}
      <div 
        className={cn(
          "flex items-center justify-between p-4 cursor-pointer transition-colors",
          "hover:bg-neutral-50"
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <Filter className="w-4 h-4 text-primary" />
          <div className="space-y-0.5">
            <h3 className="text-sm font-semibold text-text">Filters & Pipeline</h3>
            <p className="text-xs text-text-muted">{filterSummary}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onClearFilters();
              }}
              className="gap-2 text-xs"
            >
              <FilterX className="w-3 h-3" />
              Clear
            </Button>
          )}
          
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-text-muted" />
          ) : (
            <ChevronDown className="w-4 h-4 text-text-muted" />
          )}
        </div>
      </div>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="border-t border-neutral-200 space-y-4 p-4">
          {/* Pipeline Health Metrics */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-text-muted uppercase tracking-wide">
                Pipeline Breakdown
              </span>
            </div>
            
            <div className="grid grid-cols-5 gap-2">
              {stages.map(({ key, label }) => {
                const count = stageBreakdown[key];
                return (
                  <div 
                    key={key} 
                    className="flex flex-col items-center gap-1 p-2 rounded-md bg-neutral-50"
                  >
                    <span className="text-xs text-text-muted">{label}</span>
                    <Badge 
                      variant="outline" 
                      className="text-xs px-2 py-0.5 font-semibold"
                    >
                      {count}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Experiment Metrics */}
          <div className="space-y-2 p-3 bg-primary-soft rounded-lg">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-text-muted uppercase tracking-wide">
                Experiments
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge 
                variant="default" 
                className="text-sm px-2 py-1 font-semibold bg-primary text-primary-foreground"
              >
                {experimentPercentage}%
              </Badge>
              <span className="text-sm text-text">
                {experimentCount} of {visibleItems.length} items
              </span>
            </div>

            {highImpactPlanning > 0 && (
              <div className="flex items-center gap-2 mt-2 p-2 bg-warning/10 rounded-md">
                <AlertCircle className="w-4 h-4 text-warning flex-shrink-0" />
                <p className="text-xs text-warning font-medium">
                  {highImpactPlanning} high-impact experiment{highImpactPlanning > 1 ? 's' : ''} in Planning
                </p>
              </div>
            )}
          </div>

          <div className="h-px bg-neutral-200" />

          {/* Stage Filters */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wide">
              Stage
            </span>
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

        </div>
      )}
    </Card>
  );
}
