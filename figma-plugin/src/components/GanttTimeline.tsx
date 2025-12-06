import { useState, useRef, useEffect } from "react";
import { Feature, Swimlane, ExperimentVariant } from "@/types/roadmap";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { format, differenceInDays, startOfMonth, addMonths } from "date-fns";
import { ChevronRight, ChevronDown, Beaker, TrendingUp } from "lucide-react";

interface FeaturePosition {
  featureId: string;
  swimlaneId: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface GanttTimelineProps {
  swimlanes: Swimlane[];
  onFeatureClick?: (feature: Feature) => void;
}

export const GanttTimeline = ({ swimlanes, onFeatureClick }: GanttTimelineProps) => {
  const [collapsedLanes, setCollapsedLanes] = useState<Set<string>>(new Set());
  const [featurePositions, setFeaturePositions] = useState<FeaturePosition[]>([]);
  const [expandedExperiments, setExpandedExperiments] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  const allFeatures = swimlanes.flatMap(lane => lane.features);
  
  // Calculate date range
  const minDate = new Date(Math.min(...allFeatures.map(f => f.startDate.getTime())));
  const maxDate = new Date(Math.max(...allFeatures.map(f => f.endDate.getTime())));
  const startDate = startOfMonth(minDate);
  const endDate = addMonths(startOfMonth(maxDate), 1);
  
  // Generate months for timeline
  const months: Date[] = [];
  let currentMonth = startDate;
  while (currentMonth <= endDate) {
    months.push(currentMonth);
    currentMonth = addMonths(currentMonth, 1);
  }

  const totalDays = differenceInDays(endDate, startDate);
  const pixelsPerDay = 40; // Width per day
  const timelineWidth = totalDays * pixelsPerDay;
  const swimlaneHeight = 60;
  const headerHeight = 80;

  const getStageColor = (stage: string) => {
    const colors = {
      planning: "bg-stage-planning",
      design: "bg-stage-design",
      development: "bg-stage-development",
      testing: "bg-stage-testing",
      launch: "bg-stage-launch"
    };
    return colors[stage as keyof typeof colors] || "bg-muted";
  };

  const getPriorityBorder = (priority: string) => {
    const borders = {
      critical: "border-l-4 border-l-destructive",
      high: "border-l-4 border-l-warning",
      medium: "border-l-4 border-l-primary",
      low: "border-l-4 border-l-neutral-200"
    };
    return borders[priority as keyof typeof borders] || "";
  };

  const calculateBarPosition = (startDate: Date, endDate: Date) => {
    const daysFromStart = differenceInDays(startDate, startDate);
    const duration = differenceInDays(endDate, startDate);
    const left = daysFromStart * pixelsPerDay;
    const width = duration * pixelsPerDay;
    return { left, width: Math.max(width, 100) }; // Minimum width
  };

  const toggleLane = (laneId: string) => {
    setCollapsedLanes(prev => {
      const next = new Set(prev);
      if (next.has(laneId)) {
        next.delete(laneId);
      } else {
        next.add(laneId);
      }
      return next;
    });
  };

  const toggleExperiment = (featureId: string) => {
    setExpandedExperiments(prev => {
      const next = new Set(prev);
      if (next.has(featureId)) {
        next.delete(featureId);
      } else {
        next.add(featureId);
      }
      return next;
    });
  };

  // Update feature positions for dependency lines
  useEffect(() => {
    const positions: FeaturePosition[] = [];
    let cumulativeY = headerHeight;

    swimlanes.forEach((lane) => {
      const isCollapsed = collapsedLanes.has(lane.id);
      
      if (!isCollapsed) {
        lane.features.forEach((feature, idx) => {
          const { left, width } = calculateBarPosition(feature.startDate, feature.endDate);
          positions.push({
            featureId: feature.id,
            swimlaneId: lane.id,
            x: left + width / 2, // Center of the bar
            y: cumulativeY + idx * swimlaneHeight + swimlaneHeight / 2,
            width,
            height: swimlaneHeight - 24
          });
        });
        cumulativeY += lane.features.length * swimlaneHeight;
      }
    });

    setFeaturePositions(positions);
  }, [swimlanes, collapsedLanes, headerHeight, swimlaneHeight]);

  // Generate dependency lines
  const dependencyLines = (() => {
    const lines: Array<{ from: FeaturePosition; to: FeaturePosition; feature: Feature }> = [];
    
    swimlanes.forEach(lane => {
      lane.features.forEach(feature => {
        if (feature.dependencies) {
          feature.dependencies.forEach(depId => {
            const fromPos = featurePositions.find(p => p.featureId === depId);
            const toPos = featurePositions.find(p => p.featureId === feature.id);
            
            if (fromPos && toPos) {
              lines.push({ from: fromPos, to: toPos, feature });
            }
          });
        }
      });
    });
    
    return lines;
  })();

  // Calculate today marker position
  const today = new Date();
  const todayPosition = differenceInDays(today, startDate) * pixelsPerDay;
  const showTodayMarker = today >= startDate && today <= endDate;

  return (
    <Card className="overflow-hidden relative">
      <div className="flex flex-col">
        {/* SVG overlay for dependency lines */}
        <svg 
          className="absolute inset-0 pointer-events-none z-10"
          style={{ width: '100%', height: '100%' }}
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon 
                points="0 0, 10 3, 0 6" 
                fill="hsl(var(--primary))"
                opacity="0.6"
              />
            </marker>
          </defs>
          
          {dependencyLines.map(({ from, to, feature }, idx) => {
            const startX = from.x + from.width / 2 + 264; // Offset for sidebar
            const startY = from.y;
            const endX = to.x - to.width / 2 + 264;
            const endY = to.y;
            
            // Create curved path
            const midX = (startX + endX) / 2;
            const path = `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`;
            
            return (
              <g key={`dep-${idx}`} className="animate-fade-in">
                <path
                  d={path}
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="5,5"
                  opacity="0.5"
                  markerEnd="url(#arrowhead)"
                  className="transition-all duration-300 hover:opacity-100 hover:stroke-[3]"
                />
              </g>
            );
          })}
        </svg>
        {/* Header with months */}
        <div className="flex border-b border-border bg-muted/30 sticky top-0 z-20">
          <div className="w-64 flex-shrink-0 border-r border-border px-4 py-3">
            <h3 className="font-semibold text-foreground">Team / Feature</h3>
          </div>
          <div className="flex-1 overflow-x-auto">
            <div 
              className="flex border-l border-border" 
              style={{ width: `${timelineWidth}px`, height: `${headerHeight}px` }}
            >
              {months.map((month, idx) => {
                const monthDays = differenceInDays(
                  idx < months.length - 1 ? months[idx + 1] : endDate,
                  month
                );
                const monthWidth = monthDays * pixelsPerDay;
                
                return (
                  <div
                    key={month.toISOString()}
                    className="border-r border-border px-3 py-2 flex flex-col"
                    style={{ width: `${monthWidth}px` }}
                  >
                    <div className="font-semibold text-sm text-foreground">
                      {format(month, "MMM yyyy")}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {monthDays} days
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Swimlanes */}
        <div className="relative" ref={containerRef}>
          {swimlanes.map((lane, laneIndex) => {
            const isCollapsed = collapsedLanes.has(lane.id);
            const features = lane.features;

            return (
              <div key={lane.id} className="border-b border-border">
                {/* Lane Header */}
                <div className="flex bg-muted/10">
                  <button
                    onClick={() => toggleLane(lane.id)}
                    className="w-64 flex-shrink-0 border-r border-border px-4 py-3 flex items-center gap-2 hover:bg-muted/20 transition-colors text-left group"
                  >
                    {isCollapsed ? (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    )}
                    <div className="flex-1">
                      <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {lane.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {features.length} feature{features.length !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </button>
                  <div 
                    className="flex-1 relative overflow-x-auto" 
                    style={{ height: isCollapsed ? '0px' : `${features.length * swimlaneHeight}px` }}
                  >
                    <div style={{ width: `${timelineWidth}px`, height: '100%' }}>
                      {/* Grid lines */}
                      {months.map((month) => {
                        const position = differenceInDays(month, startDate) * pixelsPerDay;
                        return (
                          <div
                            key={month.toISOString()}
                            className="absolute top-0 bottom-0 border-l border-border/40"
                            style={{ left: `${position}px` }}
                          />
                        );
                      })}
                      
                      {/* Today marker */}
                      {showTodayMarker && (
                        <div
                          className="absolute top-0 bottom-0 w-0.5 bg-primary z-10"
                          style={{ left: `${todayPosition}px` }}
                        >
                          <div className="absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold text-primary">
                            Today
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Features */}
                {!isCollapsed && (
                  <div className="flex">
                    <div className="w-64 flex-shrink-0 border-r border-border" />
                    <div 
                      className="flex-1 relative overflow-x-auto" 
                      style={{ height: `${features.length * swimlaneHeight}px` }}
                    >
                      <div style={{ width: `${timelineWidth}px`, height: '100%' }}>
                        {features.map((feature, idx) => {
                          const { left, width } = calculateBarPosition(feature.startDate, feature.endDate);
                          const isExpanded = expandedExperiments.has(feature.id);
                          const hasVariants = feature.isExperiment && feature.variants && feature.variants.length > 0;
                          
                          return (
                            <div key={feature.id}>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div
                                      className="absolute cursor-pointer group"
                                      style={{
                                        left: `${left}px`,
                                        top: `${idx * swimlaneHeight + 12}px`,
                                        width: `${width}px`,
                                        height: `${swimlaneHeight - 24}px`
                                      }}
                                      onClick={() => onFeatureClick?.(feature)}
                                    >
                                      <div
                                        className={`h-full rounded-md ${getStageColor(feature.stage)} ${getPriorityBorder(feature.priority)} shadow-sm hover:shadow-md transition-all overflow-hidden group-hover:scale-[1.02] relative`}
                                      >
                                        <div className="h-full flex items-center gap-2 px-3 relative">
                                          <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                              <span className="text-sm font-semibold text-white truncate">
                                                {feature.title}
                                              </span>
                                              {feature.isExperiment && (
                                                <Beaker className="h-3 w-3 text-white flex-shrink-0" />
                                              )}
                                            </div>
                                            <div className="text-xs text-white/80 truncate">
                                              {feature.team}
                                            </div>
                                          </div>
                                          <Badge 
                                            className="text-xs bg-white/90 text-foreground flex-shrink-0"
                                          >
                                            {feature.progress}%
                                          </Badge>
                                        </div>
                                        <Progress 
                                          value={feature.progress} 
                                          className="h-1 absolute bottom-0 left-0 right-0 rounded-none bg-black/20"
                                        />
                                        
                                        {/* Experiment bracket indicator */}
                                        {hasVariants && (
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              toggleExperiment(feature.id);
                                            }}
                                            className="absolute -right-8 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1 shadow-md transition-all hover:scale-110 z-20"
                                          >
                                            {isExpanded ? (
                                              <ChevronDown className="h-3 w-3 text-foreground" />
                                            ) : (
                                              <ChevronRight className="h-3 w-3 text-foreground" />
                                            )}
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent side="top" className="max-w-xs">
                                    <div className="space-y-2">
                                      <div className="font-semibold">{feature.title}</div>
                                      <div className="text-sm text-muted-foreground">
                                        {feature.description}
                                      </div>
                                      <div className="flex items-center gap-4 text-xs">
                                        <span>
                                          {format(feature.startDate, "MMM d")} - {format(feature.endDate, "MMM d, yyyy")}
                                        </span>
                                        <Badge variant="outline" className="capitalize">
                                          {feature.stage}
                                        </Badge>
                                      </div>
                                      {feature.dependencies && feature.dependencies.length > 0 && (
                                        <div className="text-xs text-muted-foreground pt-1 border-t border-border">
                                          <span className="font-semibold">Depends on:</span> {feature.dependencies.length} feature(s)
                                        </div>
                                      )}
                                    </div>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              
                              {/* Variant brackets - rendered below main bar */}
                              {hasVariants && isExpanded && (
                                <div
                                  className="absolute animate-scale-in"
                                  style={{
                                    left: `${left + width + 10}px`,
                                    top: `${idx * swimlaneHeight + 12}px`,
                                    width: '280px',
                                  }}
                                >
                                  <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg shadow-lg p-3 space-y-2">
                                    <div className="flex items-center gap-2 mb-2">
                                      <TrendingUp className="h-3 w-3 text-primary" />
                                      <span className="text-xs font-semibold text-foreground">
                                        Experiment Variants
                                      </span>
                                    </div>
                                    
                                    {feature.variants?.map((variant, vIdx) => {
                                      const isWinner = feature.winningVariant === variant.id;
                                      
                                      return (
                                        <div
                                          key={variant.id}
                                          className={`relative pl-3 py-2 rounded border-l-2 transition-all ${
                                            isWinner 
                                              ? 'border-l-success bg-success/5' 
                                              : 'border-l-muted bg-muted/30'
                                          }`}
                                        >
                                          <div className="flex items-center justify-between gap-2 mb-1">
                                            <span className="text-xs font-medium text-foreground">
                                              {variant.name}
                                            </span>
                                            {isWinner && (
                                              <Badge variant="success" className="text-2xs h-4">
                                                Winner
                                              </Badge>
                                            )}
                                          </div>
                                          <p className="text-2xs text-muted-foreground mb-2">
                                            {variant.description}
                                          </p>
                                          
                                          {variant.metrics && (
                                            <div className="flex gap-3 text-2xs">
                                              {variant.metrics.conversion !== undefined && (
                                                <div>
                                                  <span className="text-muted-foreground">Conv:</span>
                                                  <span className="font-semibold text-foreground ml-1">
                                                    {variant.metrics.conversion}%
                                                  </span>
                                                </div>
                                              )}
                                              {variant.metrics.engagement !== undefined && (
                                                <div>
                                                  <span className="text-muted-foreground">Eng:</span>
                                                  <span className="font-semibold text-foreground ml-1">
                                                    {variant.metrics.engagement}%
                                                  </span>
                                                </div>
                                              )}
                                              {variant.metrics.users !== undefined && (
                                                <div>
                                                  <span className="text-muted-foreground">Users:</span>
                                                  <span className="font-semibold text-foreground ml-1">
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
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 px-4 py-3 bg-muted/20 border-t border-border text-xs">
          <span className="font-semibold text-foreground">Stages:</span>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-muted" />
            <span className="text-muted-foreground">Planning</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-stage-design" />
            <span className="text-muted-foreground">Design</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-stage-development" />
            <span className="text-muted-foreground">Development</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-stage-testing" />
            <span className="text-muted-foreground">Testing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-stage-launch" />
            <span className="text-muted-foreground">Launch</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
