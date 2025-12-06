import { useState, useRef, useEffect } from "react";
import { Feature } from "@/hooks/useFeatures";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { format, startOfMonth, endOfMonth, eachMonthOfInterval, eachWeekOfInterval, differenceInDays, addMonths, startOfQuarter, eachQuarterOfInterval } from "date-fns";
import { Rocket, Sparkles, ChevronRight } from "lucide-react";
import { FlowNode } from "@/components/FlowNode";
import { FlowConnector } from "@/components/FlowConnector";
import { ZoomLevel } from "@/components/TimelineZoomControl";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { getFeatureStageConfig, getPriorityConfig } from "@/config/badge-config";
import { calculateBarPosition as calcBarPos, calculateClippedBarPosition, calculateTodayPosition, isDateInRange, isTodayInYear, isHappeningNow, isCurrentMonth, isCurrentQuarter } from "@/lib/timeline-utils";
import { cn } from "@/lib/utils";
import { TimelineLegend } from "@/components/TimelineLegend";
import { AvatarStack } from "@/components/AvatarStack";

interface TimelineNode {
  id: string;
  featureId: string;
  title: string;
  startDate: Date;
  endDate: Date;
  status: string;
  priority: string;
  isVariant?: boolean;
  variantName?: string;
  isControl?: boolean;
  trafficSplit?: string;
  isWinner?: boolean;
  metric?: string;
  primaryMetric?: string;
  delta?: number;
  comparisonLabel?: string;
  dependencies?: string[];
}

interface NodeTimelineProps {
  features: Feature[];
  onFeatureClick?: (feature: Feature) => void;
  zoom?: ZoomLevel;
  isCompact?: boolean;
}

const statusColors = {
  planning: "bg-stage-planning",
  design: "bg-stage-design", 
  development: "bg-stage-development",
  testing: "bg-stage-testing",
  launch: "bg-stage-launch",
};

const priorityColors = {
  low: "border-muted",
  medium: "border-accent",
  high: "border-destructive",
  critical: "border-destructive",
};

export function NodeTimeline({ features, onFeatureClick, zoom = "months", isCompact = false }: NodeTimelineProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [refreshConnectors, setRefreshConnectors] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  const toggleRowExpansion = (featureId: string) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(featureId)) {
        newSet.delete(featureId);
      } else {
        newSet.add(featureId);
      }
      return newSet;
    });
  };

  // Recompute connector positions on window resize
  useEffect(() => {
    const handleResize = () => {
      setRefreshConnectors(prev => prev + 1);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate date range based on features or selected year
  const today = new Date();
  const currentYear = today.getFullYear();
  
  const selectedYear = features.length > 0 
    ? new Date(features[0].start_date).getFullYear()
    : currentYear;
  
  const minDate = new Date(selectedYear, 0, 1);
  const maxDate = new Date(selectedYear, 11, 31);

  // Calculate periods based on zoom
  const periods = zoom === "quarters"
    ? eachQuarterOfInterval({ start: minDate, end: maxDate })
    : eachMonthOfInterval({ start: minDate, end: maxDate });

  // Calculate timeline width
  const totalDays = differenceInDays(maxDate, minDate) + 1;
  const dayWidth = zoom === "quarters" ? 2 : 4;
  const timelineWidth = totalDays * dayWidth;

  // Generate timeline nodes from features
  const timelineNodes: TimelineNode[] = features.flatMap(feature => {
    const nodes: TimelineNode[] = [];
    
    if (feature.is_experiment) {
      const totalDuration = differenceInDays(new Date(feature.end_date), new Date(feature.start_date));
      const baselinePhase = Math.floor(totalDuration * 0.25); // 25% baseline
      const variantPhase = Math.floor(totalDuration * 0.4); // 40% testing variants
      const winnerPhase = Math.floor(totalDuration * 0.2); // 20% winner validation
      // Remaining 15% is launch
      
      const isThreeVariant = feature.title.toLowerCase().includes("pricing");
      
      const selectedMetric = {
        primaryMetric: "CTR",
        delta: 0.31,
        comparisonLabel: "Control"
      };

      const startTime = new Date(feature.start_date).getTime();
      const baselineEnd = new Date(startTime + baselinePhase * 24 * 60 * 60 * 1000);
      const variantStart = baselineEnd;
      const variantEnd = new Date(startTime + (baselinePhase + variantPhase) * 24 * 60 * 60 * 1000);
      const winnerStart = variantEnd;
      const winnerEnd = new Date(startTime + (baselinePhase + variantPhase + winnerPhase) * 24 * 60 * 60 * 1000);
      const launchStart = winnerEnd;

      // Control variant (baseline phase)
      nodes.push({
        id: `${feature.id}-variant-a`,
        featureId: feature.id,
        title: "Control",
        startDate: new Date(feature.start_date),
        endDate: baselineEnd,
        status: feature.stage,
        priority: feature.priority || "medium",
        isVariant: true,
        variantName: "A",
        isControl: true,
      });

      // Variant B (testing phase)
      nodes.push({
        id: `${feature.id}-variant-b`,
        featureId: feature.id,
        title: "Variant B",
        startDate: variantStart,
        endDate: variantEnd,
        status: feature.stage,
        priority: feature.priority || "medium",
        isVariant: true,
        variantName: "B",
        isWinner: !isThreeVariant,
        dependencies: [`${feature.id}-variant-a`],
      });

      // Optional Variant C (testing phase)
      if (isThreeVariant) {
        nodes.push({
          id: `${feature.id}-variant-c`,
          featureId: feature.id,
          title: "Variant C",
          startDate: variantStart,
          endDate: variantEnd,
          status: feature.stage,
          priority: feature.priority || "medium",
          isVariant: true,
          variantName: "C",
          isWinner: true,
          dependencies: [`${feature.id}-variant-a`],
        });
      }

      // Launch node (after winner validation)
      nodes.push({
        id: `${feature.id}-launch`,
        featureId: feature.id,
        title: `${feature.title} - Launched`,
        startDate: launchStart,
        endDate: new Date(feature.end_date),
        status: "launch",
        priority: feature.priority || "medium",
        isWinner: true,
        dependencies: isThreeVariant ? [`${feature.id}-variant-c`] : [`${feature.id}-variant-b`],
      });
    } else {
      nodes.push({
        id: feature.id,
        featureId: feature.id,
        title: feature.title,
        startDate: new Date(feature.start_date),
        endDate: new Date(feature.end_date),
        status: feature.stage,
        priority: feature.priority || "medium",
      });
    }

    return nodes;
  });

  const calculateNodePosition = (startDate: Date) => {
    const position = calculateClippedBarPosition(startDate, startDate, minDate, maxDate, dayWidth);
    return position.left;
  };

  // Group nodes by feature for swimlanes
  const swimlanes = features.map(feature => ({
    feature,
    nodes: timelineNodes.filter(node => node.featureId === feature.id),
    entryNodeRef: undefined as undefined | HTMLDivElement
  }));

  return (
    <div className="space-y-4">
      <Card className="p-6 relative">
        <TimelineLegend className="absolute top-4 right-4 z-20 w-64" />
        
        {/* Period header */}
        <div className="flex mb-6 border-b border-border pb-4">
          <div className="w-64 shrink-0" />
          <div className="relative" style={{ width: timelineWidth }}>
            <div className="flex">
              {periods.map((period, idx) => {
                const periodStart = zoom === "quarters" ? startOfQuarter(period) : startOfMonth(period);
                const periodEnd = zoom === "quarters" ? endOfMonth(addMonths(period, 2)) : endOfMonth(period);
                const periodDays = differenceInDays(periodEnd, periodStart) + 1;
                const periodWidth = periodDays * dayWidth;
                const isCurrent = zoom === "quarters" ? isCurrentQuarter(period) : isCurrentMonth(period);

                return (
                  <div
                    key={idx}
                    className={cn(
                      "border-r border-border last:border-r-0",
                      isCurrent && "bg-primary/5"
                    )}
                    style={{ width: periodWidth }}
                  >
                    <div className={cn(
                      "px-2 py-1 text-sm font-semibold",
                      isCurrent ? "text-primary" : "text-foreground"
                    )}>
                      {zoom === "quarters" 
                        ? `Q${Math.floor(period.getMonth() / 3) + 1} ${format(period, "yyyy")}`
                        : format(period, "MMM yyyy")}
                    </div>
                    {zoom !== "quarters" && (
                      <div className="flex h-2">
                        {eachWeekOfInterval({ start: periodStart, end: periodEnd }).map((week, widx) => (
                          <div
                            key={widx}
                            className="border-r border-border/50"
                            style={{ width: 7 * dayWidth }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scrollable timeline */}
        <ScrollArea className="w-full">
          <div 
            className="relative" 
            ref={timelineRef}
            style={{
              backgroundImage: 'radial-gradient(circle, hsl(var(--muted-foreground) / 0.04) 1px, transparent 1px)',
              backgroundSize: '16px 16px',
              backgroundPosition: '0 0'
            }}
          >
            {/* Today marker */}
            {isTodayInYear(today, selectedYear) && (
              <div
                className="absolute top-0 w-0.5 bg-primary z-30 pointer-events-none shadow-lg"
                style={{ 
                  left: calculateTodayPosition(today, minDate, dayWidth, 256),
                  height: '100%',
                  minHeight: '100vh'
                }}
              >
                <div className="absolute -top-8 -left-10 px-3 py-1 bg-primary text-text-on-primary text-xs font-semibold rounded-full whitespace-nowrap shadow-md">
                  Today
                </div>
              </div>
            )}

            {/* Swimlanes with nodes */}
            {swimlanes.map((swimlane) => {
              const hasExperiment = swimlane.feature.is_experiment;
              const variantNodes = swimlane.nodes.filter(n => n.isVariant);
              const launchNode = swimlane.nodes.find(n => n.status === "launch");
              const variantCount = variantNodes.length;

              const calcMinHeight = () => {
                if (!hasExperiment) return isCompact ? "80px" : "100px";
                if (variantCount <= 2) return isCompact ? "120px" : "160px";
                return isCompact ? "160px" : "200px";
              };

              return (
                <div
                  key={swimlane.feature.id}
                  className={cn(
                    "group/row relative flex items-start border-b border-border transition-colors",
                    "bg-gradient-to-b from-transparent via-muted/5 to-transparent",
                    "hover:bg-muted/20",
                    isCompact ? "py-4" : "py-6"
                  )}
                  style={{ 
                    minHeight: calcMinHeight(),
                  }}
                  onMouseEnter={() => setHoveredRow(swimlane.feature.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  {/* Left label */}
                  <div className="w-64 shrink-0 pr-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-semibold text-sm text-foreground line-clamp-2 flex-1">
                          {swimlane.feature.title}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Removed Feature Stage badge for simplification */}
                        {/* Priority badge hidden for simplification */}
                        {!isCompact && swimlane.feature.is_experiment && (
                          <Badge variant="outline" className="text-2xs gap-1 px-2 py-0.5">
                            <Sparkles className="w-3 h-3" />
                            A/B Test
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Open details button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "absolute right-4 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover/row:opacity-100 transition-opacity",
                      "bg-background shadow-md border border-border hover:bg-muted"
                    )}
                    onClick={() => onFeatureClick?.(swimlane.feature)}
                  >
                    <span className="text-xs font-medium mr-1">Open details</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>

                  {/* Flow nodes */}
                  <div className="relative flex-1" style={{ minHeight: "60px" }}>
                    {hasExperiment ? (
                      <>
                        {/* Entry node - single traffic entry point */}
                        {/* Entry node with ref for dynamic connector alignment */}
                        <div
                          className="absolute z-10"
                          ref={el => {
                            if (el) {
                              swimlane.entryNodeRef = el;
                            }
                          }}
                          style={{
                            left: calculateNodePosition(variantNodes[0].startDate) - 140,
                            top: (variantNodes.length - 1) * (isCompact ? 40 : 48) / 2,
                          }}
                        >
                          <FlowNode
                            id={`${swimlane.feature.id}-entry`}
                            label="Experiment Entry"
                            size="sm"
                            onClick={() => onFeatureClick?.(swimlane.feature)}
                          />
                        </div>

                        {/* Variant nodes stacked with clear hierarchy */}
                        {variantNodes.map((node, idx) => {
                          const isWinnerNode = node.isWinner;
                            
                            return (
                              <div
                                key={node.id}
                                className={cn(
                                  "absolute transition-all",
                                  isWinnerNode && "z-10" // Winner sits above other variants
                                )}
                                style={{
                                  left: calculateNodePosition(node.startDate),
                                  top: idx * (isCompact ? 40 : 48),
                                }}
                              >
                                <div className={cn(
                                  "rounded-full",
                                  isWinnerNode && "shadow-md" // Emphasize winner
                                )}>
                                  <FlowNode
                                    id={node.id}
                                    label={node.title}
                                    variantLetter={node.variantName}
                                    isControl={node.isControl}
                                    isVariant={node.isVariant}
                                    isWinner={node.isWinner}
                                    trafficSplit={node.trafficSplit}
                                    metric={node.metric}
                                    size="sm"
                                    onClick={() => onFeatureClick?.(swimlane.feature)}
                                    onHover={setHoveredNode}
                                    isHovered={hoveredNode === node.id}
                                  />
                                </div>
                              </div>
                            );
                          })}

                        {/* Flow connectors - following /design-system/patterns/flow-connectors best practices */}
                        {variantNodes.length > 0 && (
                          <svg 
                            className="absolute inset-0 pointer-events-none overflow-visible" 
                            style={{ zIndex: 1 }}
                          >
                            {(() => {
                              const nodeHeight = isCompact ? 40 : 48;
                              const winnerNode = variantNodes.find(n => n.isWinner);
                              const launch = launchNode;
                              // Dynamically measure entry node position and size
                              let entryX = 0;
                              let entryY = 0;
                              if (swimlane.entryNodeRef) {
                                const rect = swimlane.entryNodeRef.getBoundingClientRect();
                                const parentRect = timelineRef.current?.getBoundingClientRect();
                                if (parentRect) {
                                  entryX = rect.right - parentRect.left;
                                  entryY = rect.top - parentRect.top + rect.height / 2;
                                }
                              } else {
                                // Fallback to previous logic if ref not available
                                entryX = calculateNodePosition(variantNodes[0].startDate) - 140 + 120;
                                entryY = (variantNodes.length - 1) * nodeHeight / 2 + nodeHeight / 2;
                              }
                              const connectors = [];
                              // Entry → All Variants (fan-out)
                              variantNodes.forEach((node, idx) => {
                                const nodeX = calculateNodePosition(node.startDate) - 8;
                                const nodeY = idx * nodeHeight + nodeHeight / 2;
                                const colorToken = node.isControl
                                  ? "control"
                                  : idx === 1
                                    ? "variantA"
                                    : idx === 2
                                      ? "variant"
                                      : "winner";
                                connectors.push(
                                  <FlowConnector
                                    key={`entry-to-${node.id}`}
                                    from={{ x: entryX, y: entryY }}
                                    to={{ x: nodeX, y: nodeY }}
                                    colorToken={colorToken}
                                    offsetIndex={idx}
                                    showStartDot={false}
                                    showEndDot={false}
                                  />
                                );
                              });
                              // Winner → Launch connector
                              if (winnerNode && launch) {
                                const winnerIdx = variantNodes.findIndex(n => n.id === winnerNode.id);
                                const winnerNodePos = calculateNodePosition(winnerNode.startDate);
                                const winnerNodeWidth = 162;
                                const winnerX = winnerNodePos + winnerNodeWidth;
                                const winnerY = winnerIdx * nodeHeight + 16;
                                const launchNodePos = winnerNodePos + winnerNodeWidth + 8;
                                const launchX = launchNodePos;
                                const launchY = winnerY;
                                const dx = launchX - winnerX;
                                const controlOffset = dx * 0.5;
                                connectors.push(
                                  <path
                                    key="winner-to-launch"
                                    d={`M ${winnerX},${winnerY} C ${winnerX + controlOffset},${winnerY} ${launchX - controlOffset},${launchY} ${launchX},${launchY}`}
                                    stroke="hsl(142 76% 45%)"
                                    strokeWidth="3"
                                    fill="none"
                                    opacity="0.85"
                                  />
                                );
                              }
                              return connectors;
                            })()}
                          </svg>
                        )}

                        {/* Launch node - aligned with winner node */}
                        {launchNode && (() => {
                          const winnerIdx = variantNodes.findIndex(n => n.isWinner);
                          if (winnerIdx < 0) return null; // No winner found
                          
                          const nodeHeight = isCompact ? 40 : 48;
                          const winnerNodePos = calculateNodePosition(variantNodes[winnerIdx].startDate);
                          const winnerNodeWidth = 162; // Match connector calculation
                          
                          const topValue = winnerIdx * nodeHeight;
                          const leftValue = winnerNodePos + winnerNodeWidth + 8;
                          
                          return (
                          <div 
                            className="absolute z-10"
                            style={{ 
                              top: topValue,
                              left: leftValue
                            }}
                          >
                            <div className="rounded-full shadow-lg">
                              <FlowNode
                                id={launchNode.id}
                                label="Launched"
                                isLaunch={true}
                                size="sm"
                                onClick={() => onFeatureClick?.(swimlane.feature)}
                                onHover={setHoveredNode}
                                isHovered={hoveredNode === launchNode.id}
                              />
                            </div>
                          </div>
                          );
                        })()}


                      </>
                    ) : (
                      // Single node for non-experiment features
                      swimlane.nodes.map(node => (
                        <div
                          key={node.id}
                          className="absolute"
                          style={{
                            left: calculateNodePosition(node.startDate),
                            top: 8,
                          }}
                        >
                          <FlowNode
                            id={node.id}
                            label={node.title}
                            size="sm"
                            onClick={() => onFeatureClick?.(swimlane.feature)}
                            onHover={setHoveredNode}
                            isHovered={hoveredNode === node.id}
                          />
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
}
