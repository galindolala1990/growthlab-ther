import { useState, useRef, useEffect } from "react";
import { Feature } from "@/hooks/useFeatures";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { format, startOfMonth, endOfMonth, eachMonthOfInterval, eachWeekOfInterval, differenceInDays, addMonths, startOfQuarter, eachQuarterOfInterval } from "date-fns";
import { Rocket, Sparkles, ChevronRight } from "lucide-react";
import { InteractiveTimelineBar } from "@/components/InteractiveTimelineBar";
import { FlowConnector } from "@/components/FlowConnector";
import { ZoomLevel } from "@/components/TimelineZoomControl";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { getFeatureStageConfig, getPriorityConfig } from "@/config/badge-config";
import { calculateBarPosition as calcBarPos, calculateClippedBarPosition, calculateTodayPosition, isDateInRange, isTodayInYear, isHappeningNow, isCurrentMonth, isCurrentQuarter } from "@/lib/timeline-utils";
import { cn } from "@/lib/utils";
import { TimelineLegend } from "@/components/TimelineLegend";
import { AvatarStack } from "@/components/AvatarStack";

interface TimelineBar {
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

interface HorizontalTimelineProps {
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

export function HorizontalTimeline({ features, onFeatureClick, zoom = "months", isCompact = false }: HorizontalTimelineProps) {
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);
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
  
  // Use strict year boundaries from the selected year
  // Features should already be filtered by useRoadmapFilters to show only items overlapping the selected year
  const selectedYear = features.length > 0 
    ? new Date(features[0].start_date).getFullYear()
    : currentYear;
  
  const minDate = new Date(selectedYear, 0, 1); // January 1st of selected year
  const maxDate = new Date(selectedYear, 11, 31, 23, 59, 59); // December 31st of selected year

  // Adjust day width based on zoom level
  const dayWidth = zoom === "weeks" ? 12 : zoom === "months" ? 8 : 4; // quarters = 4

  const totalDays = differenceInDays(maxDate, minDate);
  const timelineWidth = totalDays * dayWidth;

  // Calculate time periods based on zoom
  const periods = zoom === "quarters"
    ? eachQuarterOfInterval({ start: minDate, end: maxDate })
    : eachMonthOfInterval({ start: minDate, end: maxDate });

  // Generate mock timeline bars with A/B variants
  const timelineBars: TimelineBar[] = features.flatMap(feature => {
    const bars: TimelineBar[] = [];
    
    if (feature.is_experiment) {
      // Create variant bars
      const experimentDuration = differenceInDays(new Date(feature.end_date), new Date(feature.start_date));
      const variantDuration = Math.floor(experimentDuration * 0.6); // Variants run for 60% of total
      const launchDuration = experimentDuration - variantDuration;

      // Determine if this is a 3-variant test (for high priority experiments)
      const isThreeVariant = feature.priority === "high" || feature.priority === "critical";
      
      // Vary metrics by feature for realistic display
      const metricVariations = [
        { primaryMetric: "CTR", delta: 0.23, comparisonLabel: "vs Control" },
        { primaryMetric: "Activation", delta: 0.18, comparisonLabel: "vs Baseline" },
        { primaryMetric: "ARPU", delta: 0.12, comparisonLabel: "vs Control" },
        { primaryMetric: "Retention", delta: 0.08, comparisonLabel: "vs Old Flow" },
      ];
      
      // Use feature ID hash to consistently pick a metric variation
      const metricIndex = parseInt(feature.id.slice(-1), 16) % metricVariations.length;
      const selectedMetric = metricVariations[metricIndex];
      
      // Control variant (A)
      bars.push({
        id: `${feature.id}-variant-a`,
        featureId: feature.id,
        title: `${feature.title} - Control (A)`,
        startDate: new Date(feature.start_date),
        endDate: new Date(new Date(feature.start_date).getTime() + variantDuration * 24 * 60 * 60 * 1000),
        status: "testing",
        priority: feature.priority || "medium",
        isVariant: true,
        variantName: "Control (A)",
        isControl: true,
        trafficSplit: isThreeVariant ? "34%" : "50%",
        isWinner: false,
      });

      // Treatment variant (B)
      bars.push({
        id: `${feature.id}-variant-b`,
        featureId: feature.id,
        title: `${feature.title} - Variant B`,
        startDate: new Date(feature.start_date),
        endDate: new Date(new Date(feature.start_date).getTime() + variantDuration * 24 * 60 * 60 * 1000),
        status: "testing",
        priority: feature.priority || "medium",
        isVariant: true,
        variantName: "Variant B",
        isControl: false,
        trafficSplit: isThreeVariant ? "33%" : "50%",
        isWinner: !isThreeVariant, // Only winner in 2-variant tests
        metric: !isThreeVariant ? `+${Math.round(selectedMetric.delta * 100)}% ${selectedMetric.primaryMetric}` : undefined,
        primaryMetric: !isThreeVariant ? selectedMetric.primaryMetric : undefined,
        delta: !isThreeVariant ? selectedMetric.delta : undefined,
        comparisonLabel: !isThreeVariant ? selectedMetric.comparisonLabel : undefined,
      });

      // Treatment variant (C) - only for 3-variant tests
      if (isThreeVariant) {
        bars.push({
          id: `${feature.id}-variant-c`,
          featureId: feature.id,
          title: `${feature.title} - Variant C`,
          startDate: new Date(feature.start_date),
          endDate: new Date(new Date(feature.start_date).getTime() + variantDuration * 24 * 60 * 60 * 1000),
          status: "testing",
          priority: feature.priority || "medium",
          isVariant: true,
          variantName: "Variant C",
          isControl: false,
          trafficSplit: "33%",
          isWinner: true, // C wins in 3-variant tests
          metric: `+${Math.round((selectedMetric.delta + 0.08) * 100)}% ${selectedMetric.primaryMetric}`,
          primaryMetric: selectedMetric.primaryMetric,
          delta: selectedMetric.delta + 0.08,
          comparisonLabel: selectedMetric.comparisonLabel,
        });
      }

      // Add launch bar with structured metric data using the same metric selection
      const launchMetricData = isThreeVariant 
        ? { 
            primaryMetric: selectedMetric.primaryMetric, 
            delta: selectedMetric.delta + 0.08, // 3-variant test won by more
            comparisonLabel: selectedMetric.comparisonLabel, 
            metric: `+${Math.round((selectedMetric.delta + 0.08) * 100)}% ${selectedMetric.primaryMetric}` 
          }
        : { 
            primaryMetric: selectedMetric.primaryMetric, 
            delta: selectedMetric.delta, 
            comparisonLabel: selectedMetric.comparisonLabel, 
            metric: `+${Math.round(selectedMetric.delta * 100)}% ${selectedMetric.primaryMetric}` 
          };
      
      bars.push({
        id: `${feature.id}-launch`,
        featureId: feature.id,
        title: `${feature.title} - Launched`,
        startDate: new Date(new Date(feature.start_date).getTime() + variantDuration * 24 * 60 * 60 * 1000),
        endDate: new Date(feature.end_date),
        status: "launch",
        priority: feature.priority || "medium",
        isWinner: true,
        ...launchMetricData,
        dependencies: isThreeVariant ? [`${feature.id}-variant-c`] : [`${feature.id}-variant-b`],
      });
    } else {
      bars.push({
        id: feature.id,
        featureId: feature.id,
        title: feature.title,
        startDate: new Date(feature.start_date),
        endDate: new Date(feature.end_date),
        status: feature.stage,
        priority: feature.priority || "medium",
      });
    }

    return bars;
  });

  const calculateBarPosition = (startDate: Date, endDate: Date) => {
    // Use clipped positions to handle items crossing year boundaries
    return calculateClippedBarPosition(startDate, endDate, minDate, maxDate, dayWidth);
  };

  const getStatusColor = (status: string) => {
    return statusColors[status as keyof typeof statusColors] || statusColors.planning;
  };

  const getPriorityBorder = (priority: string) => {
    return priorityColors[priority as keyof typeof priorityColors] || priorityColors.medium;
  };

  // Group bars by feature for swimlanes
  const swimlanes = features.map(feature => ({
    feature,
    bars: timelineBars.filter(bar => bar.featureId === feature.id)
  }));

  // Handle date changes for bars
  const handleBarDateChange = async (featureId: string, barId: string, newStartDate: Date, newEndDate: Date) => {
    try {
      const { error } = await supabase
        .from("features")
        .update({
          start_date: newStartDate.toISOString().split('T')[0],
          end_date: newEndDate.toISOString().split('T')[0],
        })
        .eq("id", featureId);

      if (error) throw error;

      toast.success(`Updated dates: ${format(newStartDate, "MMM d")} → ${format(newEndDate, "MMM d")}`);
    } catch (error) {
      console.error("Error updating feature dates:", error);
      toast.error("Failed to update feature dates");
    }
  };

  return (
    <div className="space-y-4">
      <Card className="p-6 relative">
        {/* Legend in top-right corner */}
        <TimelineLegend className="absolute top-4 right-4 z-20 w-64" />
        
        {/* Period header */}
        <div className="flex mb-6 border-b border-border pb-4">
          <div className="w-64 shrink-0" /> {/* Space for labels */}
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
                    {/* Week ticks */}
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
            {/* Today marker - only show if today is in selected year */}
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

            {/* Swimlanes */}
            {swimlanes.map((swimlane, laneIdx) => {
              const hasExperiment = swimlane.feature.is_experiment;
              const variantBars = swimlane.bars.filter(b => b.isVariant);
              const launchBar = swimlane.bars.find(b => b.status === "launch");
              const variantCount = variantBars.length;

              // Calculate minimum height based on variant count
              const calcMinHeight = () => {
                if (!hasExperiment) return isCompact ? "60px" : "80px";
                if (variantCount <= 2) return isCompact ? "80px" : "120px";
                return isCompact ? "110px" : "160px"; // 3 variants
              };

              return (
                <div
                  key={swimlane.feature.id}
                  className={cn(
                    "group/row relative flex items-start border-b border-border transition-colors",
                    "bg-gradient-to-b from-transparent via-muted/5 to-transparent",
                    "hover:bg-muted/20",
                    isCompact ? "py-2" : "py-4"
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
                          {/* Left label: {Area} – {Change being tested} – {Primary metric} */}
                          {swimlane.feature.team ? `${swimlane.feature.team} – ` : ""}
                          {swimlane.feature.hypothesis ? `${swimlane.feature.hypothesis} – ` : ""}
                          {swimlane.feature.primary_metric ? `↑ ${swimlane.feature.primary_metric}` : swimlane.feature.title}
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

                  {/* Open details button - appears on row hover */}
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

                  {/* Timeline bars */}
                  <div className="relative flex-1" style={{ 
                    minHeight: hasExperiment && (!isCompact || expandedRows.has(swimlane.feature.id))
                      ? variantCount <= 2 
                        ? "80px" 
                        : "120px"  // 3 variants need more space
                      : "40px" 
                  }}>
                    {hasExperiment ? (
                      <>
                        {/* Compact collapsed mode - single summary bar */}
                        {isCompact && !expandedRows.has(swimlane.feature.id) ? (
                          <div 
                            className="absolute cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => toggleRowExpansion(swimlane.feature.id)}
                            style={{
                              left: calculateBarPosition(variantBars[0].startDate, launchBar?.endDate || variantBars[0].endDate).left,
                              width: calculateBarPosition(variantBars[0].startDate, launchBar?.endDate || variantBars[0].endDate).width,
                              top: 0
                            }}
                          >
                            <div className={cn(
                              "rounded-lg border-2 px-3 py-2 h-10 flex items-center justify-between",
                              "bg-gradient-to-r from-stage-testing to-stage-launch",
                              "border-primary/50 shadow-sm"
                            )}>
                              <div className="flex items-center gap-2 text-xs text-white font-medium truncate">
                                <span className="font-semibold truncate">{swimlane.feature.title}</span>
                                <span className="opacity-75">·</span>
                                <span className="shrink-0">A/B Test</span>
                                <span className="opacity-75">·</span>
                                <Badge className={cn("text-2xs", getFeatureStageConfig(swimlane.feature.stage).className)}>
                                  {getFeatureStageConfig(swimlane.feature.stage).label}
                                </Badge>
                                <span className="opacity-75">·</span>
                                <span className="shrink-0">ends {format(variantBars[0].endDate, "MMM d")}</span>
                                <span className="opacity-75">·</span>
                                <span className="shrink-0">{variantCount} variants</span>
                                {launchBar?.primaryMetric && (
                                  <>
                                    <span className="opacity-75">·</span>
                                    <span className="shrink-0 font-semibold">primary: {launchBar.primaryMetric}</span>
                                  </>
                                )}
                              </div>
                              <ChevronRight className="h-4 w-4 text-white shrink-0 ml-2" />
                            </div>
                          </div>
                        ) : (
                          <>
                            {/* Expanded mode - variant bars stacked */}
                            <div className="space-y-2">
                              {isCompact && expandedRows.has(swimlane.feature.id) && (
                                <button
                                  onClick={() => toggleRowExpansion(swimlane.feature.id)}
                                  className="absolute -top-6 right-0 text-xs text-muted-foreground hover:text-foreground z-30"
                                >
                                  Collapse
                                </button>
                              )}
                              {variantBars.map((bar, idx) => (
                                <InteractiveTimelineBar
                                  key={bar.id}
                                  id={bar.id}
                                  title={bar.title}
                                  startDate={bar.startDate}
                                  endDate={bar.endDate}
                                  status={bar.status}
                                  priority={bar.priority}
                                  isVariant={true}
                                  variantName={bar.variantName}
                                  isControl={bar.isControl}
                                  trafficSplit={bar.trafficSplit}
                                  isWinner={bar.isWinner}
                                  metric={bar.metric}
                                  primaryMetric={bar.primaryMetric}
                                  delta={bar.delta}
                                  comparisonLabel={bar.comparisonLabel}
                                  statusColor={getStatusColor(bar.status)}
                                  priorityBorder={getPriorityBorder(bar.priority)}
                                  position={{ left: calculateBarPosition(bar.startDate, bar.endDate).left, width: calculateBarPosition(bar.startDate, bar.endDate).width, top: idx * (isCompact ? 28 : 36) }}
                                  dayWidth={dayWidth}
                                  minDate={minDate}
                                  isHovered={false}
                                  onHover={() => {}}
                                  onClick={() => onFeatureClick?.(swimlane.feature)}
                                  height={isCompact ? 24 : 32}
                                  isCompact={isCompact}
                                />
                              ))}
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      // Single bar for non-experiment features
                      swimlane.bars.map(bar => (
                        <InteractiveTimelineBar
                          key={bar.id}
                          id={bar.id}
                          title={bar.title}
                          startDate={bar.startDate}
                          endDate={bar.endDate}
                          status={bar.status}
                          priority={bar.priority}
                          statusColor={getStatusColor(bar.status)}
                          priorityBorder={getPriorityBorder(bar.priority)}
                          position={{ left: calculateBarPosition(bar.startDate, bar.endDate).left, width: calculateBarPosition(bar.startDate, bar.endDate).width, top: 8 }}
                          dayWidth={dayWidth}
                          minDate={minDate}
                          isHovered={hoveredBar === bar.id}
                          onHover={setHoveredBar}
                          onClick={() => onFeatureClick?.(swimlane.feature)}
                          onDateChange={(newStart, newEnd) => handleBarDateChange(swimlane.feature.id, bar.id, newStart, newEnd)}
                          height={isCompact ? 24 : 32}
                          isCompact={isCompact}
                        />
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>

        {/* Legend */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex items-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-stage-planning" />
              <span>Planning</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-stage-design" />
              <span>Design</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-stage-development" />
              <span>Development</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-stage-testing" />
              <span>Testing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-stage-launch" />
              <span>Launch</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
