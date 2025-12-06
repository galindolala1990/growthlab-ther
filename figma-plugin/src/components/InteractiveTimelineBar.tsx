import { useState, useRef, useEffect } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Rocket } from "lucide-react";
import { format } from "date-fns";
import { positionToDate, isHappeningNow } from "@/lib/timeline-utils";
import { cn } from "@/lib/utils";

interface InteractiveTimelineBarProps {
  id: string;
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
  statusColor: string;
  priorityBorder: string;
  position: { left: number; width: number; top?: number };
  dayWidth: number;
  minDate: Date;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onClick: () => void;
  onDateChange?: (startDate: Date, endDate: Date) => void;
  height?: number;
  isCompact?: boolean;
}

export function InteractiveTimelineBar({
  id,
  title,
  startDate,
  endDate,
  status,
  priority,
  isVariant,
  variantName,
  isControl,
  trafficSplit,
  isWinner,
  metric,
  primaryMetric,
  delta,
  comparisonLabel,
  statusColor,
  priorityBorder,
  position,
  dayWidth,
  minDate,
  isHovered,
  onHover,
  onClick,
  onDateChange,
  height = 32,
  isCompact = false,
}: InteractiveTimelineBarProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState<'start' | 'end' | null>(null);
  const [dragStart, setDragStart] = useState({ x: 0, left: 0, width: 0 });
  const barRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent, action: 'drag' | 'resize-start' | 'resize-end') => {
    e.stopPropagation();
    if (!onDateChange) return;

    const startX = e.clientX;
    setDragStart({ x: startX, left: position.left, width: position.width });

    if (action === 'drag') {
      setIsDragging(true);
    } else if (action === 'resize-start') {
      setIsResizing('start');
    } else {
      setIsResizing('end');
    }
  };

  useEffect(() => {
    if (!isDragging && !isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - dragStart.x;

      if (isDragging) {
        const newLeft = dragStart.left + deltaX;
        const newStartDate = positionToDate(newLeft, minDate, dayWidth);
        
        const duration = Math.round(dragStart.width / dayWidth);
        const newEndDate = new Date(newStartDate);
        newEndDate.setDate(newStartDate.getDate() + duration);

        if (barRef.current) {
          barRef.current.style.left = `${newLeft}px`;
        }
      } else if (isResizing === 'start') {
        const newLeft = dragStart.left + deltaX;
        const newWidth = dragStart.width - deltaX;
        
        if (newWidth > 40) {
          if (barRef.current) {
            barRef.current.style.left = `${newLeft}px`;
            barRef.current.style.width = `${newWidth}px`;
          }
        }
      } else if (isResizing === 'end') {
        const newWidth = dragStart.width + deltaX;
        
        if (newWidth > 40) {
          if (barRef.current) {
            barRef.current.style.width = `${newWidth}px`;
          }
        }
      }
    };

    const handleMouseUp = () => {
      if (isDragging || isResizing) {
        const currentLeft = parseFloat(barRef.current?.style.left || `${position.left}`);
        const currentWidth = parseFloat(barRef.current?.style.width || `${position.width}`);
        
        const newStartDate = positionToDate(currentLeft, minDate, dayWidth);
        const duration = Math.round(currentWidth / dayWidth);
        
        const newEndDate = new Date(newStartDate);
        newEndDate.setDate(newStartDate.getDate() + duration);

        onDateChange?.(newStartDate, newEndDate);
      }
      
      setIsDragging(false);
      setIsResizing(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragStart, dayWidth, minDate, onDateChange, position]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            ref={barRef}
            className={cn(
              "absolute rounded-2xl border cursor-move transition-all duration-200",
              "hover:shadow-lg",
              statusColor,
              // Postman-style flat nodes with subtle borders
              isVariant 
                ? isWinner
                  ? "border-success/60 shadow-md bg-opacity-90" // Winner: success accent
                  : "border-white/40 bg-opacity-80" // Variants: subtle border
                : priorityBorder,
              isHovered ? "ring-2 ring-primary/50 ring-offset-1" : "",
              isDragging || isResizing ? "cursor-grabbing z-30" : "",
              "overflow-hidden" // For accent strip
            )}
            style={{
              left: position.left,
              width: Math.max(position.width, 40),
              top: position.top,
              height: `${height}px`,
            }}
            onMouseEnter={() => onHover(id)}
            onMouseLeave={() => onHover(null)}
            onMouseDown={(e) => handleMouseDown(e, 'drag')}
            onClick={onClick}
          >
            {/* Postman-style accent strip for variants */}
            {isVariant && (
              <div 
                className={cn(
                  "absolute left-0 top-0 bottom-0 w-1",
                  isWinner
                    ? "bg-success"
                    : isControl
                      ? "bg-muted-foreground/50"
                      : "bg-primary"
                )}
              />
            )}
            
            {/* Resize handles */}
            {onDateChange && (
              <>
                <div
                  className="absolute left-0 top-0 bottom-0 w-2 cursor-ew-resize hover:bg-primary/20 rounded-l-2xl z-10"
                  onMouseDown={(e) => handleMouseDown(e, 'resize-start')}
                  onClick={(e) => e.stopPropagation()}
                />
                <div
                  className="absolute right-0 top-0 bottom-0 w-2 cursor-ew-resize hover:bg-primary/20 rounded-r-2xl z-10"
                  onMouseDown={(e) => handleMouseDown(e, 'resize-end')}
                  onClick={(e) => e.stopPropagation()}
                />
              </>
            )}

            <div className={cn(
              "px-3 py-1.5 flex flex-col justify-center h-full text-white text-xs font-medium pointer-events-none gap-0.5",
              isVariant && "pl-4" // Extra padding for accent strip
            )}>
              {/* Variant bars: Two-line layout */}
              {isVariant && variantName ? (
                <>
                  {/* Line 1: Label (Control/Variant B/Variant C) + Traffic split */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {/* Label text: Control, Variant B, Variant C */}
                      <span className="text-xs font-medium truncate">
                        {isControl ? "Control" : variantName === "Variant B" ? "Variant B" : variantName === "Variant C" ? "Variant C" : "Variant"}
                      </span>
                      {/* Winner icon */}
                      {isWinner && <Rocket className="w-3 h-3" />}
                    </div>
                    {/* Traffic split (plain text, right-aligned) */}
                    {trafficSplit && (
                      <span className="text-xs font-semibold opacity-90 shrink-0">
                        {trafficSplit}
                      </span>
                    )}
                  </div>
                  {/* Line 2: Impact metrics (only for winner) */}
                  {isWinner && primaryMetric && delta !== undefined && (
                    <div className="text-2xs opacity-90 truncate">
                      {primaryMetric} {" "}
                      <span className={cn(
                        "font-bold",
                        delta > 0 ? "text-success-foreground" : delta < 0 ? "text-error-foreground" : ""
                      )}>
                        {delta > 0 ? "+" : ""}{Math.round(delta * 100)}%
                      </span>
                      {comparisonLabel && (
                        <span className="opacity-75"> vs {comparisonLabel}</span>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <>
                  {/* Non-variant bars (launch/feature) */}
                  <div className="flex items-center justify-between gap-2">
                    {status === "launch" && primaryMetric && delta !== undefined ? (
                      <>
                        {/* Split label for launched experiments: Launched + Impact */}
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-semibold px-2 py-0.5 bg-white/20 rounded border border-white/40">
                            Launched
                          </span>
                          <span className={cn(
                            "text-xs font-bold px-2 py-0.5 rounded shadow-sm",
                            delta > 0 ? "bg-success text-success-foreground" : delta < 0 ? "bg-error text-error-foreground" : "bg-white/30"
                          )}>
                            {delta > 0 ? "+" : ""}{Math.round(delta * 100)}% {primaryMetric}
                          </span>
                        </div>
                        {comparisonLabel && (
                          <span className="text-2xs opacity-75 shrink-0">
                            vs {comparisonLabel}
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="truncate font-semibold">{status === "launch" ? "Launched" : "Feature"}</span>
                    )}
                  </div>
                  {/* Now badge for active bars */}
                  {isHappeningNow(startDate, endDate) && (
                    <span className="text-2xs bg-white text-primary px-1.5 py-0.5 rounded font-bold animate-pulse shadow-sm self-start">
                      Now
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-1">
            <div className="font-semibold">{title}</div>
            <div className="text-xs text-muted-foreground">
              {format(startDate, "MMM d")} - {format(endDate, "MMM d")}
            </div>
            
            {/* Variant info */}
            {isVariant && (
              <div className="mt-2 pt-2 border-t border-border space-y-1">
                <div className="text-xs">
                  <span className="font-semibold">
                    {isWinner ? "Winner" : isControl ? "Control" : "Variant"}
                  </span>
                  {trafficSplit && (
                    <>
                      {" · "}
                      <span className="text-muted-foreground">{trafficSplit} traffic</span>
                    </>
                  )}
                </div>
                
                {/* Winner impact metrics */}
                {isWinner && primaryMetric && delta !== undefined && (
                  <div className="text-xs">
                    <span className="font-semibold text-foreground">{primaryMetric}:</span>
                    {" "}
                    <span className={cn(
                      "font-bold",
                      delta > 0 ? "text-success" : delta < 0 ? "text-error" : "text-muted-foreground"
                    )}>
                      {delta > 0 ? "+" : ""}{Math.round(delta * 100)}%
                    </span>
                    {comparisonLabel && (
                      <>
                        {" "}
                        <span className="text-muted-foreground">vs {comparisonLabel}</span>
                      </>
                    )}
                  </div>
                )}
                
                {/* Non-winner status */}
                {!isWinner && (
                  <div className="text-xs text-muted-foreground">
                    Not shipped
                  </div>
                )}
              </div>
            )}
            
            {/* Launch bar impact display */}
            {!isVariant && primaryMetric && delta !== undefined && (
              <div className="mt-2 pt-2 border-t border-border">
                <div className="text-xs">
                  <span className="font-semibold text-foreground">{primaryMetric}:</span>
                  {" "}
                  <span className={cn(
                    "font-bold",
                    delta > 0 ? "text-success" : delta < 0 ? "text-error" : "text-muted-foreground"
                  )}>
                    {delta > 0 ? "+" : ""}{Math.round(delta * 100)}%
                  </span>
                  {comparisonLabel && (
                    <>
                      {" "}
                      <span className="text-muted-foreground">vs {comparisonLabel}</span>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
