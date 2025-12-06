import { Feature } from "@/types/roadmap";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { TrendingUp, Users, Target, ChevronDown, ChevronRight } from "lucide-react";
import { format, differenceInDays, eachMonthOfInterval } from "date-fns";
import { useState } from "react";

interface GrowthTimelineViewProps {
  experiments: Feature[];
}

export const GrowthTimelineView = ({ experiments }: GrowthTimelineViewProps) => {
  const [expandedExperiments, setExpandedExperiments] = useState<Set<string>>(new Set());

  // Sort experiments by start date
  const sortedExperiments = [...experiments].sort(
    (a, b) => a.startDate.getTime() - b.startDate.getTime()
  );

  if (sortedExperiments.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <p>No experiments to display</p>
      </div>
    );
  }

  // Get date range for timeline
  const minDate = sortedExperiments[0].startDate;
  const maxDate = sortedExperiments[sortedExperiments.length - 1].endDate;

  // Calculate timeline dimensions
  const totalDays = differenceInDays(maxDate, minDate);
  const months = eachMonthOfInterval({ start: minDate, end: maxDate });
  
  const getPositionAndWidth = (start: Date, end: Date) => {
    const startOffset = differenceInDays(start, minDate);
    const duration = differenceInDays(end, start);
    const left = (startOffset / totalDays) * 100;
    const width = (duration / totalDays) * 100;
    return { left: `${left}%`, width: `${Math.max(width, 2)}%` };
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "running":
        return "bg-success-soft border-success text-foreground";
      case "completed":
        return "bg-primary-soft border-primary";
      case "paused":
        return "bg-warning/10 border-warning";
      default:
        return "bg-primary-soft border-primary";
    }
  };

  const getWinningVariant = (feature: Feature) => {
    if (!feature.winningVariant || !feature.variants) return null;
    return feature.variants.find((v) => v.id === feature.winningVariant);
  };

  const toggleExpanded = (id: string) => {
    setExpandedExperiments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Group experiments by team for connections
  const experimentsByTeam = sortedExperiments.reduce((acc, exp) => {
    if (!acc[exp.team]) acc[exp.team] = [];
    acc[exp.team].push(exp);
    return acc;
  }, {} as Record<string, Feature[]>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Growth Experiments Gantt
          </h2>
          <p className="text-muted-foreground mt-2">
            {sortedExperiments.length} experiments from {format(minDate, "MMM yyyy")} to {format(maxDate, "MMM yyyy")}
          </p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-success-soft border-2 border-success" />
            <span className="text-sm text-muted-foreground">Running</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-primary-soft border-2 border-primary" />
            <span className="text-sm text-muted-foreground">Completed</span>
          </div>
        </div>
      </div>

      {/* Gantt Chart */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
        <div className="space-y-6">
          {/* Timeline Header with Months */}
          <div className="flex border-b border-border pb-4">
            <div className="w-64 shrink-0 font-semibold text-sm text-muted-foreground">
              Experiment
            </div>
            <div className="flex-1 relative">
              <div className="flex">
                {months.map((month, idx) => {
                  const monthStart = month;
                  const monthEnd = new Date(month.getFullYear(), month.getMonth() + 1, 0);
                  const monthDays = differenceInDays(monthEnd, monthStart) + 1;
                  const width = (monthDays / totalDays) * 100;
                  
                  return (
                    <div
                      key={idx}
                      className="text-xs font-semibold text-muted-foreground border-l border-border/50 px-2"
                      style={{ width: `${width}%` }}
                    >
                      {format(month, "MMM yyyy")}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Experiment Rows */}
          <div className="space-y-1">
            {Object.entries(experimentsByTeam).map(([team, teamExperiments]) => (
              <div key={team} className="space-y-1">
                {/* Team bracket visualization */}
                {teamExperiments.length > 1 && (
                  <div className="relative">
                    <div className="absolute left-60 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/50 to-accent/50 rounded-full" />
                  </div>
                )}
                
                {teamExperiments.map((experiment, idx) => {
                  const { left, width } = getPositionAndWidth(experiment.startDate, experiment.endDate);
                  const isExpanded = expandedExperiments.has(experiment.id);
                  const winningVariant = getWinningVariant(experiment);
                  
                  return (
                    <div key={experiment.id} className="group">
                      {/* Main experiment row */}
                      <div className="flex items-center hover:bg-muted/30 rounded-lg transition-colors py-2">
                        <div className="w-64 shrink-0 flex items-center gap-2 px-2">
                          <button
                            onClick={() => toggleExpanded(experiment.id)}
                            className="p-1 hover:bg-muted rounded transition-colors"
                          >
                            {isExpanded ? (
                              <ChevronDown className="w-4 h-4 text-muted-foreground" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-muted-foreground" />
                            )}
                          </button>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm truncate">{experiment.title}</div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <Badge variant="outline" className="text-xs py-0">
                                {experiment.team}
                              </Badge>
                              {winningVariant && (
                                <span className="text-xs text-accent">★ {winningVariant.name}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex-1 relative h-12 px-4">
                          {/* Timeline grid */}
                          {months.map((month, idx) => {
                            const monthStart = month;
                            const monthEnd = new Date(month.getFullYear(), month.getMonth() + 1, 0);
                            const monthDays = differenceInDays(monthEnd, monthStart) + 1;
                            const monthWidth = (monthDays / totalDays) * 100;
                            
                            return (
                              <div
                                key={idx}
                                className="absolute top-0 bottom-0 border-l border-border/20"
                                style={{ left: `${(differenceInDays(month, minDate) / totalDays) * 100}%` }}
                              />
                            );
                          })}
                          
                          {/* Experiment bar */}
                          <div
                            className={cn(
                              "absolute top-1/2 -translate-y-1/2 h-8 rounded border-2 transition-all cursor-pointer",
                              "hover:shadow-lg group-hover:scale-105",
                              getStatusColor(experiment.experimentStatus)
                            )}
                            style={{ left, width }}
                          >
                            <div className="px-2 h-full flex items-center justify-between text-xs font-medium text-foreground">
                              <span className="truncate">
                                {experiment.variants?.length || 0} variants
                              </span>
                              <Badge
                                className="text-xs py-0 px-1 ml-1 bg-background/50"
                              >
                                {experiment.experimentStatus}
                              </Badge>
                            </div>
                          </div>

                          {/* Connection bracket to next experiment in team */}
                          {teamExperiments.length > 1 && idx < teamExperiments.length - 1 && (
                            <svg
                              className="absolute pointer-events-none"
                              style={{
                                left: 0,
                                top: "50%",
                                width: "100%",
                                height: "60px",
                              }}
                            >
                              <path
                                d={`M ${parseFloat(left) + parseFloat(width)}% 0 
                                   L ${parseFloat(left) + parseFloat(width) + 2}% 0
                                   L ${parseFloat(left) + parseFloat(width) + 2}% 30
                                   L ${parseFloat(getPositionAndWidth(teamExperiments[idx + 1].startDate, teamExperiments[idx + 1].endDate).left) - 2}% 30
                                   L ${parseFloat(getPositionAndWidth(teamExperiments[idx + 1].startDate, teamExperiments[idx + 1].endDate).left) - 2}% 60
                                   L ${getPositionAndWidth(teamExperiments[idx + 1].startDate, teamExperiments[idx + 1].endDate).left} 60`}
                                stroke="hsl(var(--primary))"
                                strokeWidth="2"
                                fill="none"
                                strokeDasharray="5,5"
                                opacity="0.4"
                                className="animate-pulse"
                              />
                            </svg>
                          )}
                        </div>
                      </div>

                      {/* Expanded variant details */}
                      {isExpanded && experiment.variants && (
                        <div className="ml-64 mr-4 mb-2 p-4 bg-muted/20 rounded-lg border border-border/50">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {experiment.variants.map((variant) => {
                              const isWinner = variant.id === experiment.winningVariant;
                              return (
                                <div
                                  key={variant.id}
                                  className={cn(
                                    "p-3 rounded-lg border",
                                    isWinner
                                      ? "bg-accent/10 border-accent shadow-sm"
                                      : "bg-background/50 border-border"
                                  )}
                                >
                                  <div className="flex items-center gap-2 mb-2">
                                    <h4 className="font-semibold text-sm">{variant.name}</h4>
                                    {isWinner && (
                                      <Badge variant="outline" className="text-xs bg-accent/20 text-accent border-accent">
                                        Winner
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-xs text-muted-foreground mb-3">{variant.description}</p>
                                  {variant.metrics && (
                                    <div className="space-y-1.5">
                                      {variant.metrics.conversion !== undefined && (
                                        <div className="flex items-center justify-between text-xs">
                                          <span className="text-muted-foreground flex items-center gap-1">
                                            <Target className="w-3 h-3" />
                                            Conversion
                                          </span>
                                          <span className="font-mono font-semibold">{variant.metrics.conversion}%</span>
                                        </div>
                                      )}
                                      {variant.metrics.engagement !== undefined && (
                                        <div className="flex items-center justify-between text-xs">
                                          <span className="text-muted-foreground flex items-center gap-1">
                                            <TrendingUp className="w-3 h-3" />
                                            Engagement
                                          </span>
                                          <span className="font-mono font-semibold">{variant.metrics.engagement}%</span>
                                        </div>
                                      )}
                                      {variant.metrics.users !== undefined && (
                                        <div className="flex items-center justify-between text-xs">
                                          <span className="text-muted-foreground flex items-center gap-1">
                                            <Users className="w-3 h-3" />
                                            Users
                                          </span>
                                          <span className="font-mono font-semibold">
                                            {variant.metrics.users.toLocaleString()}
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};
