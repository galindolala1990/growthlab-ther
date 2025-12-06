import { Swimlane } from "@/types/roadmap";
import { VisualMilestoneCard } from "./VisualMilestoneCard";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useRef, useEffect, useState } from "react";

interface CanvasTimelineProps {
  swimlanes: Swimlane[];
  previewImages: Record<string, string>;
}

interface CardPosition {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  group?: string;
}

export const CanvasTimeline = ({ swimlanes, previewImages }: CanvasTimelineProps) => {
  const [cardPositions, setCardPositions] = useState<CardPosition[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Smart grouping - AI clusters experiments by product area
  const getSmartGroup = (feature: any, swimlaneName: string): string | undefined => {
    if (!feature.isExperiment) return undefined;
    
    // Group experiments by their product area
    const areaGroups: Record<string, string> = {
      "Mobile App Experience": "Mobile UX Experiments",
      "Web Platform": "Web Experience Tests",
      "API & Infrastructure": "Backend Experiments",
    };
    
    return areaGroups[swimlaneName];
  };

  // Track card positions for drawing connections
  useEffect(() => {
    if (!containerRef.current) return;

    const updatePositions = () => {
      const cards = containerRef.current?.querySelectorAll('[data-card-id]');
      if (!cards) return;

      const positions: CardPosition[] = [];
      cards.forEach((card) => {
        const id = card.getAttribute('data-card-id');
        const group = card.getAttribute('data-card-group');
        const rect = card.getBoundingClientRect();
        const containerRect = containerRef.current?.getBoundingClientRect();
        
        if (id && containerRect) {
          positions.push({
            id,
            x: rect.left - containerRect.left + rect.width / 2,
            y: rect.top - containerRect.top + rect.height / 2,
            width: rect.width,
            height: rect.height,
            group: group || undefined,
          });
        }
      });

      setCardPositions(positions);
    };

    updatePositions();
    window.addEventListener('resize', updatePositions);
    const timer = setTimeout(updatePositions, 100);

    return () => {
      window.removeEventListener('resize', updatePositions);
      clearTimeout(timer);
    };
  }, [swimlanes]);

  // Generate connection lines between grouped experiments
  const getConnectionLines = () => {
    const lines: Array<{ x1: number; y1: number; x2: number; y2: number; group: string }> = [];
    const groupedCards: Record<string, CardPosition[]> = {};

    // Group cards by their smart group
    cardPositions.forEach((pos) => {
      if (pos.group) {
        if (!groupedCards[pos.group]) {
          groupedCards[pos.group] = [];
        }
        groupedCards[pos.group].push(pos);
      }
    });

    // Create lines between cards in the same group
    Object.values(groupedCards).forEach((cards) => {
      if (cards.length > 1) {
        for (let i = 0; i < cards.length - 1; i++) {
          lines.push({
            x1: cards[i].x,
            y1: cards[i].y,
            x2: cards[i + 1].x,
            y2: cards[i + 1].y,
            group: cards[i].group!,
          });
        }
      }
    });

    return lines;
  };

  const connectionLines = getConnectionLines();

  return (
    <div className="space-y-8 relative" ref={containerRef}>
      {/* SVG overlay for connection lines */}
      <svg
        className="absolute inset-0 pointer-events-none z-0"
        style={{ width: '100%', height: '100%' }}
      >
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.5" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {connectionLines.map((line, index) => (
          <g key={index}>
            {/* Glow effect */}
            <line
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="url(#connectionGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              opacity="0.2"
              className="animate-pulse"
            />
            {/* Main line */}
            <line
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="url(#connectionGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="10 5"
              className="animate-[dash_20s_linear_infinite]"
            />
            {/* Connection nodes */}
            <circle
              cx={line.x1}
              cy={line.y1}
              r="6"
              fill="hsl(var(--primary))"
              opacity="0.8"
              className="animate-pulse"
            />
            <circle
              cx={line.x2}
              cy={line.y2}
              r="6"
              fill="hsl(var(--accent))"
              opacity="0.8"
              className="animate-pulse"
            />
          </g>
        ))}
      </svg>

      {swimlanes.map((swimlane) => (
        <div key={swimlane.id} className="space-y-4">
          {/* Swimlane header */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <h2 className="relative text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent px-6 py-2">
                {swimlane.name}
              </h2>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
            <div className="text-sm text-muted-foreground font-medium">
              {swimlane.features.length} features
            </div>
          </div>

          {/* Horizontal scrolling canvas */}
          <ScrollArea className="w-full whitespace-nowrap rounded-xl border border-border/50 bg-muted/20 p-6">
            <div className="flex gap-6 pb-4 relative z-10">
              {swimlane.features.map((feature) => {
                const smartGroup = getSmartGroup(feature, swimlane.name);
                return (
                  <div
                    key={feature.id}
                    data-card-id={feature.id}
                    data-card-group={smartGroup}
                    className={cn(
                      "inline-block transition-all duration-300",
                      feature.dependencies && feature.dependencies.length > 0
                        ? "relative"
                        : ""
                    )}
                  >
                    <VisualMilestoneCard
                      feature={feature}
                      previewImage={previewImages[feature.id]}
                      aiGenerated={!!previewImages[feature.id]}
                      smartGroup={smartGroup}
                    />
                    
                    {/* Dependency line indicator */}
                    {feature.dependencies && feature.dependencies.length > 0 && (
                      <div className="absolute -left-6 top-1/2 w-6 h-0.5 bg-gradient-to-r from-primary/50 to-primary animate-pulse" />
                    )}
                  </div>
                );
              })}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          {swimlane.features.length === 0 && (
            <div className="text-center py-16 text-muted-foreground border-2 border-dashed border-border rounded-xl bg-muted/10">
              <p className="text-sm">No features in this swimlane</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
