import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { VisualTreatmentCard } from "@/components/VisualTreatmentCard";
import { FlowConnector } from "@/components/FlowConnector";
import { Rocket } from "lucide-react";

export interface VisualVariant {
  id: string;
  name: string;
  variantLabel: string;
  isControl?: boolean;
  isWinner?: boolean;
  thumbnailUrl?: string;
  thumbnailContent?: React.ReactNode;
  showThumbnail?: boolean; // Toggle thumbnail display for non-visual experiments
  trafficSplit?: number;
  primaryMetric?: {
    label: string;
    value: number;
    delta?: number;
  };
  secondaryMetrics?: Array<{
    label: string;
    value: number;
    delta?: number;
  }>;
  annotations?: string[];
  statusChip?: string;
}

export interface VisualExperimentData {
  id: string;
  name: string;
  description?: string;
  variants: VisualVariant[];
  winnerId?: string;
  launchedVariantId?: string;
}

export interface ExperimentFlowMapProps {
  experiment: VisualExperimentData;
  onVariantClick?: (variant: VisualVariant) => void;
  className?: string;
}


export function ExperimentFlowMap({
  experiment,
  onVariantClick,
  className,
}: ExperimentFlowMapProps) {
  const [variantPositions, setVariantPositions] = useState<Map<string, DOMRect>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Update positions when cards are rendered or when scrolling
  useEffect(() => {
    const updatePositions = () => {
      const positions = new Map<string, DOMRect>();
      cardRefs.current.forEach((element, id) => {
        if (element) {
          positions.set(id, element.getBoundingClientRect());
        }
      });
      setVariantPositions(positions);
    };

    updatePositions();
    
    // Listen to scroll events on the scroll container
    const scrollContainer = containerRef.current?.closest('.overflow-auto, .overflow-scroll, [data-radix-scroll-area-viewport]');
    
    window.addEventListener("resize", updatePositions);
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", updatePositions);
    }
    
    const timer = setTimeout(updatePositions, 100);

    return () => {
      window.removeEventListener("resize", updatePositions);
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", updatePositions);
      }
      clearTimeout(timer);
    };
  }, [experiment.variants]);

  // Find control, winner, and launched variants
  const control = experiment.variants.find(v => v.isControl);
  const winner = experiment.variants.find(v => v.id === experiment.winnerId || v.isWinner);
  const launched = experiment.variants.find(v => v.id === experiment.launchedVariantId);
  
  // Variants column: exclude control only - winner shows here with Winner badge
  // Sort alphabetically by variant label for consistent display order
  const variants = experiment.variants
    .filter(v => !v.isControl)
    .sort((a, b) => a.variantLabel.localeCompare(b.variantLabel));

  // Helper to get winner's vertical position
  const getWinnerTopPosition = () => {
    if (!winner) return 0;
    const winnerIndex = variants.findIndex(v => v.id === winner.id);
    return winnerIndex >= 0 ? winnerIndex * 240 : 0;
  };

  // Calculate positions for flow connectors
  const getConnectorPoints = (fromId: string, toId: string) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    const fromRect = variantPositions.get(fromId);
    const toRect = variantPositions.get(toId);

    if (!containerRect || !fromRect || !toRect) return null;

    return {
      from: {
        x: fromRect.right - containerRect.left,
        y: fromRect.top + fromRect.height / 2 - containerRect.top,
      },
      to: {
        x: toRect.left - containerRect.left,
        y: toRect.top + toRect.height / 2 - containerRect.top,
      },
    };
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-text">{experiment.name}</h2>
        {experiment.description && (
          <p className="text-text-muted">{experiment.description}</p>
        )}
      </div>

      {/* Flow Layout: Entry → Variants → Launch */}
      <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 overflow-visible">
        <ScrollArea className="w-full h-[800px] overflow-visible">
          <div className="min-w-[800px] pr-80 overflow-visible">
            <div 
              ref={containerRef} 
              className="relative grid grid-cols-[240px_1fr_240px] gap-16 overflow-visible"
              style={{ 
                minHeight: `${Math.max(variants.length * 280, 700)}px`,
                paddingTop: '100px',
                paddingBottom: '100px'
              }}
            >
              {/* Column 1: Entry (Control) */}
              <div className="relative flex items-start">
                {control && (
                  <div
                    ref={(el) => {
                      if (el) cardRefs.current.set(control.id, el);
                    }}
                  >
                    <VisualTreatmentCard
                      id={control.id}
                      name={control.name}
                      variantLabel={control.variantLabel}
                      thumbnailUrl={control.thumbnailUrl}
                      thumbnailContent={control.thumbnailContent}
                      showThumbnail={control.showThumbnail}
                      isControl={control.isControl}
                      trafficSplit={control.trafficSplit}
                      primaryMetric={control.primaryMetric}
                      secondaryMetrics={control.secondaryMetrics}
                      annotations={control.annotations}
                      statusChip={control.statusChip}
                      onClick={() => onVariantClick?.(control)}
                      size="compact"
                    />
                  </div>
                )}
              </div>

              {/* Column 2: Variants (fan-out pattern with even vertical distribution) */}
              <div className="relative">
                {variants.map((variant, index) => {
                  // Calculate vertical spacing for fan-out pattern
                  // Start from top with container padding handling vertical centering
                  const totalVariants = variants.length;
                  const spacing = 240; // Vertical spacing between variants
                  const topOffset = index * spacing; // Simple 0, 240, 480 for 3 variants
                  
                  return (
                    <div
                      key={variant.id}
                      ref={(el) => {
                        if (el) cardRefs.current.set(variant.id, el);
                      }}
                      className="absolute left-0"
                      style={{
                        top: `${topOffset}px`,
                      }}
                    >
                      <VisualTreatmentCard
                        id={variant.id}
                        name={variant.name}
                        variantLabel={variant.variantLabel}
                        thumbnailUrl={variant.thumbnailUrl}
                        thumbnailContent={variant.thumbnailContent}
                        showThumbnail={variant.showThumbnail}
                        isWinner={variant.id === winner?.id}
                        trafficSplit={variant.trafficSplit}
                        primaryMetric={variant.primaryMetric}
                        secondaryMetrics={variant.secondaryMetrics}
                        annotations={variant.annotations}
                        statusChip={variant.statusChip}
                        onClick={() => onVariantClick?.(variant)}
                        size="compact"
                      />
                    </div>
                  );
                })}
              </div>

              {/* Column 3: Launch - Simple Launched Badge positioned to align with winner */}
              <div className="relative h-full flex items-start">
                {(launched || winner) && (
                  <div
                    ref={(el) => {
                      if (el) cardRefs.current.set(`launch-card`, el);
                    }}
                    className="flex items-center justify-center"
                    style={{
                      position: 'absolute',
                      top: `${getWinnerTopPosition()}px`,
                    }}
                  >
                    <Badge 
                      variant="success"
                      className="text-sm px-4 py-2 h-auto shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => onVariantClick?.((launched || winner)!)}
                    >
                      <Rocket className="h-4 w-4 mr-2" />
                      Launched
                    </Badge>
                  </div>
                )}
              </div>

              {/* SVG Overlay for Flow Connectors */}
              <svg
                className="absolute inset-0 pointer-events-none overflow-visible"
                style={{
                  width: "100%",
                  height: "100%",
                  zIndex: 10,
                }}
              >
                {/* Entry → Variants connectors */}
                {control && variants.map((variant, idx) => {
                  const points = getConnectorPoints(control.id, variant.id);
                  if (!points) return null;

                  // All variant connectors use blue tint
                  const colorToken = "variant";

                  return (
                    <FlowConnector
                      key={`${control.id}-${variant.id}`}
                      from={points.from}
                      to={points.to}
                      colorToken={colorToken}
                      offsetIndex={0}
                      showStartDot={true}
                      showEndDot={true}
                    />
                  );
                })}

                {/* Winner → Launch connector */}
                {winner && (launched || winner) && (
                  (() => {
                    const points = getConnectorPoints(winner.id, `launch-card`);
                    if (!points) return null;

                    return (
                      <FlowConnector
                        key="winner-to-launch"
                        from={points.from}
                        to={points.to}
                        colorToken="winner"
                        offsetIndex={0}
                        showStartDot={true}
                        showEndDot={true}
                      />
                    );
                  })()
                )}
              </svg>
            </div>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Card>
    </div>
  );
}
