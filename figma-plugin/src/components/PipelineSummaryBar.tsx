import { Feature } from "@/hooks/useFeatures";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Sparkles } from "lucide-react";

interface PipelineSummaryBarProps {
  visibleItems: Feature[];
  totalInRange: number;
}

export function PipelineSummaryBar({ visibleItems, totalInRange }: PipelineSummaryBarProps) {
  // Count by stage
  const stageBreakdown = {
    planning: visibleItems.filter(f => f.stage === "planning").length,
    design: visibleItems.filter(f => f.stage === "design").length,
    development: visibleItems.filter(f => f.stage === "development").length,
    testing: visibleItems.filter(f => f.stage === "testing").length,
    launch: visibleItems.filter(f => f.stage === "launch").length,
  };

  // Calculate experiment ratio
  const experimentCount = visibleItems.filter(f => f.is_experiment).length;
  const experimentPercentage = visibleItems.length > 0 
    ? Math.round((experimentCount / visibleItems.length) * 100)
    : 0;

  const stages = [
    { key: "planning", label: "Planning" },
    { key: "design", label: "Design" },
    { key: "development", label: "Dev" },
    { key: "testing", label: "Testing" },
    { key: "launch", label: "Launch" },
  ] as const;

  return (
    <div className="flex items-center justify-between gap-6">
      {/* Pipeline Strip */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wide">
            Pipeline
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          {stages.map(({ key, label }) => {
            const count = stageBreakdown[key];
            return (
              <div key={key} className="flex items-center gap-1.5">
                <span className="text-xs text-text-muted">{label}</span>
                <Badge 
                  variant="outline" 
                  className="text-xs px-2 py-0.5 font-semibold min-w-[2rem] justify-center"
                >
                  {count}
                </Badge>
              </div>
            );
          })}
        </div>
      </div>

      {/* Experiment Indicator */}
      <div className="flex items-center gap-4 pl-4 border-l border-neutral-200">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-text-muted">Experiments</span>
            <Badge 
              variant="default" 
              className="text-xs px-2 py-0.5 font-semibold bg-primary text-primary-foreground"
            >
              {experimentPercentage}%
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
