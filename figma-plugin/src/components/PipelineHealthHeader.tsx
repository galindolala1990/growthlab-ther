import { Feature } from "@/hooks/useFeatures";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, TrendingUp, Sparkles } from "lucide-react";
import { getFeatureStageConfig, getPriorityConfig } from "@/config/badge-config";

interface PipelineHealthHeaderProps {
  visibleItems: Feature[]; // Filtered features to display
  totalInRange: number;    // Total features in date range (before filters)
}

export function PipelineHealthHeader({ visibleItems, totalInRange }: PipelineHealthHeaderProps) {
  // Use visibleItems directly - already filtered by date range and user filters
  const roadmapFeatures = visibleItems;
  
  // Count by stage
  const stageBreakdown = {
    planning: roadmapFeatures.filter(f => f.stage === "planning").length,
    design: roadmapFeatures.filter(f => f.stage === "design").length,
    development: roadmapFeatures.filter(f => f.stage === "development").length,
    testing: roadmapFeatures.filter(f => f.stage === "testing").length,
    launch: roadmapFeatures.filter(f => f.stage === "launch").length,
  };

  // Calculate experiment vs feature ratio
  const experimentCount = roadmapFeatures.filter(f => f.is_experiment).length;
  const experimentPercentage = roadmapFeatures.length > 0 
    ? Math.round((experimentCount / roadmapFeatures.length) * 100)
    : 0;

  // Detect high-impact experiments stuck in planning
  const highImpactPlanning = roadmapFeatures.filter(
    f => f.is_experiment && 
         f.stage === "planning" && 
         (f.priority === "high" || f.priority === "critical")
  ).length;

  const stages = [
    { key: "planning", label: "Planning" },
    { key: "design", label: "Design" },
    { key: "development", label: "Dev" },
    { key: "testing", label: "Testing" },
    { key: "launch", label: "Launch" },
  ] as const;

  return (
    <Card className="p-4 bg-gradient-to-r from-bg-surface to-bg-subtle border-neutral-200">
      <div className="flex items-center justify-between gap-6">
        {/* Pipeline Breakdown */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wide">Pipeline</span>
          </div>
          
          <div className="flex items-center gap-3">
            {stages.map(({ key, label }) => {
              const count = stageBreakdown[key];
              return (
                <div key={key} className="flex items-center gap-1.5">
                  <span className="text-xs text-muted-foreground">{label}:</span>
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

        {/* Experiment Ratio */}
        <div className="flex items-center gap-4 pl-4 border-l border-neutral-200">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-muted-foreground">Experiments:</span>
              <Badge 
                variant="default" 
                className="text-xs px-2 py-0.5 font-semibold bg-primary-soft text-primary"
              >
                {experimentPercentage}%
              </Badge>
              <span className="text-xs text-muted-foreground">
                ({experimentCount}/{roadmapFeatures.length})
              </span>
            </div>
          </div>
        </div>

        {/* Alert if needed */}
        {highImpactPlanning > 0 && (
          <div className="flex items-center gap-2 pl-4 border-l border-neutral-200">
            <AlertCircle className="w-4 h-4 text-warning" />
            <p className="text-xs text-warning font-medium">
              {highImpactPlanning} high-impact experiment{highImpactPlanning > 1 ? 's' : ''} in Planning
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
