import { useState, useRef } from "react";
import { Feature } from "@/hooks/useFeatures";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format, startOfMonth, endOfMonth, eachMonthOfInterval, differenceInDays, addMonths, startOfQuarter, eachQuarterOfInterval } from "date-fns";
import { ChevronRight } from "lucide-react";
import { ZoomLevel } from "@/components/TimelineZoomControl";
import { VisualRoadmapCard } from "@/components/VisualRoadmapCard";
import { AvatarStack } from "@/components/AvatarStack";
import { dateToPosition, calculateDuration, calculateTodayPosition, calculateClippedBarPosition, isDateInRange, isTodayInYear, isHappeningNow, isCurrentMonth, isCurrentQuarter } from "@/lib/timeline-utils";
import { cn } from "@/lib/utils";

interface EnhancedHorizontalTimelineProps {
  features: Feature[];
  onFeatureClick?: (feature: Feature) => void;
  zoom?: ZoomLevel;
  isCompact?: boolean;
}

export function EnhancedHorizontalTimeline({ features, onFeatureClick, zoom = "months", isCompact = false }: EnhancedHorizontalTimelineProps) {
  const [hoveredLane, setHoveredLane] = useState<string | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

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
  const cardWidth = isCompact ? 240 : 280; // Fixed card width
  const cardGap = 16; // Gap between cards

  const totalDays = differenceInDays(maxDate, minDate);
  const timelineWidth = Math.max(totalDays * dayWidth, 1200);

  // Calculate time periods based on zoom
  const periods = zoom === "quarters"
    ? eachQuarterOfInterval({ start: minDate, end: maxDate })
    : eachMonthOfInterval({ start: minDate, end: maxDate });

  // Group features by swimlane/category
  const swimlanes = features.reduce((acc, feature) => {
    const lane = feature.swimlane || "General";
    if (!acc[lane]) {
      acc[lane] = [];
    }
    acc[lane].push(feature);
    return acc;
  }, {} as Record<string, Feature[]>);

  // Sort features within each swimlane by start date
  Object.keys(swimlanes).forEach(lane => {
    swimlanes[lane].sort((a, b) => 
      new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
    );
  });

  const calculateCardPosition = (startDate: Date) => {
    return dateToPosition(startDate, minDate, dayWidth);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-card">
        {/* Period header */}
        <div className="flex mb-6 border-b border-border pb-4">
          <div className="w-48 shrink-0" /> {/* Space for lane labels */}
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
                    <div className="px-3 py-2">
                      <div className={cn(
                        "text-sm font-semibold",
                        isCurrent ? "text-primary" : "text-foreground"
                      )}>
                        {zoom === "quarters" 
                          ? `Q${Math.floor(period.getMonth() / 3) + 1} ${format(period, "yyyy")}`
                          : format(period, "MMM")}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {format(period, "yyyy")}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scrollable timeline with swimlanes */}
        <ScrollArea className="w-full">
          <div className="relative" ref={timelineRef}>
            {/* Today marker - only show if today is in selected year */}
            {isTodayInYear(today, selectedYear) && (
              <div
                className="absolute top-0 w-0.5 bg-primary z-30 pointer-events-none shadow-lg"
                style={{ 
                  left: calculateTodayPosition(today, minDate, dayWidth, 192),
                  height: '100%',
                  minHeight: '100vh'
                }}
              >
                <div className="absolute -top-8 -left-8 px-3 py-1 bg-primary text-text-on-primary text-xs font-semibold rounded-full whitespace-nowrap shadow-md">
                  Today
                </div>
              </div>
            )}

            {/* Swimlanes */}
            <div className={cn(isCompact ? "space-y-4" : "space-y-8")}>
              {Object.entries(swimlanes).map(([laneName, laneFeatures]) => (
                <div 
                  key={laneName} 
                  className={cn("group/lane relative", isCompact ? "space-y-2" : "space-y-4")}
                  onMouseEnter={() => setHoveredLane(laneName)}
                  onMouseLeave={() => setHoveredLane(null)}
                >
                  {/* Lane header */}
                  <div className="flex items-center gap-3">
                    <div className="w-48 shrink-0">
                      <div className="flex items-center gap-2">
                        <div className="h-1 w-6 bg-primary rounded-full" />
                        <h3 className="font-semibold text-foreground">{laneName}</h3>
                      </div>
                    </div>
                    <div className="h-px flex-1 bg-border" />
                    <div className="flex items-center gap-2">
                      {/* Show aggregated owners for the lane */}
                      {laneFeatures.some(f => f.team || f.experiment_owner) && (
                        <AvatarStack 
                          owners={Array.from(new Set(
                            laneFeatures
                              .map(f => f.experiment_owner || (f.team ? f.team.split(',').map(t => t.trim()) : []))
                              .flat()
                              .filter(Boolean)
                          ))}
                          size="sm"
                          maxDisplay={5}
                        />
                      )}
                      <Badge variant="outline" className="text-xs">
                        {laneFeatures.length} {laneFeatures.length === 1 ? "item" : "items"}
                      </Badge>
                    </div>
                  </div>

                  {/* Cards row */}
                  <div className="flex items-start">
                    <div className="w-48 shrink-0" /> {/* Space for alignment */}
                    <div 
                      className="relative" 
                      style={{ 
                        width: timelineWidth,
                        minHeight: isCompact ? "180px" : "240px"
                      }}
                    >
                      {/* Grid lines for reference */}
                      <div className="absolute inset-0 pointer-events-none">
                        {periods.map((period, idx) => {
                          const periodStart = zoom === "quarters" ? startOfQuarter(period) : startOfMonth(period);
                          const periodEnd = zoom === "quarters" ? endOfMonth(addMonths(period, 2)) : endOfMonth(period);
                          const periodDays = differenceInDays(periodEnd, periodStart) + 1;
                          const periodWidth = periodDays * dayWidth;
                          const periodLeft = differenceInDays(periodStart, minDate) * dayWidth;

                          return (
                            <div
                              key={idx}
                              className="absolute top-0 bottom-0 border-r border-border/30"
                              style={{ left: periodLeft, width: periodWidth }}
                            />
                          );
                        })}
                      </div>

                      {/* Feature cards positioned by date */}
                      {laneFeatures.map((feature) => {
                        const startDate = new Date(feature.start_date);
                        const endDate = new Date(feature.end_date);
                        
                        // Use clipped positions for items crossing year boundaries
                        const clippedPosition = calculateClippedBarPosition(startDate, endDate, minDate, maxDate, dayWidth);
                        const left = clippedPosition.left;
                        const width = clippedPosition.width;
                        
                        return (
                          <div
                            key={feature.id}
                            className="absolute top-0 transition-all duration-300"
                            style={{ left: `${left}px` }}
                          >
                            {/* Duration bar background */}
                            <div 
                              className="absolute top-0 h-full bg-primary/10 rounded-lg border-l-4 border-primary/30"
                              style={{ 
                                width: `${width}px`,
                                minWidth: cardWidth,
                                zIndex: 0
                              }}
                            />
                            
                            {/* Feature card on top of duration bar */}
                            <div className="relative" style={{ zIndex: 1 }}>
                              <VisualRoadmapCard
                                feature={feature}
                                onClick={() => onFeatureClick?.(feature)}
                                isCompact={isCompact}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty state if no swimlanes */}
            {Object.keys(swimlanes).length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <p>No features to display</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
}
