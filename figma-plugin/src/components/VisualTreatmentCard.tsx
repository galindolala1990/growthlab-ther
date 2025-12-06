import React from "react";
import ReactDOM from "react-dom";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Trophy, TrendingUp, TrendingDown } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

const cardVariants = cva(
  "relative overflow-hidden transition-all duration-200 hover:shadow-lg group",
  {
    variants: {
      variant: {
        control: "border border-neutral-300 bg-neutral-50",
        treatment: "border border-info/60 bg-info/5",
        winner: "border-2 border-success bg-success/5 ring-2 ring-success/20",
        launched: "border-2 border-success bg-gradient-to-br from-success/10 to-success/5",
      },
      size: {
        compact: "w-48",  // Growth Labs mini: 192px (125-200px range)
        sm: "w-56",
        md: "w-64",
        lg: "w-80",
      }
    },
    defaultVariants: {
      variant: "control",
      size: "compact",  // Default to compact for mini cards
    },
  }
);

export interface VisualTreatmentCardProps extends VariantProps<typeof cardVariants> {
  id: string;
  name: string;
  variantLabel?: string;
  
  // Visual content
  thumbnailUrl?: string;
  thumbnailContent?: React.ReactNode;
  showThumbnail?: boolean; // Toggle thumbnail display for non-visual experiments
  
  // Status & metadata
  isControl?: boolean;
  isWinner?: boolean;
  isLaunched?: boolean;
  trafficSplit?: number;
  
  // Metrics
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
  
  // Annotations
  annotations?: string[];
  statusChip?: string;
  
  // Interaction
  onClick?: () => void;
  onHover?: (id: string | null) => void;
  isHovered?: boolean;
  
  className?: string;
}

export function VisualTreatmentCard({
  id,
  name,
  variantLabel,
  thumbnailUrl,
  thumbnailContent,
  showThumbnail = true, // Default to showing thumbnail for backward compatibility
  isControl,
  isWinner,
  isLaunched,
  trafficSplit,
  primaryMetric,
  secondaryMetrics,
  annotations,
  statusChip,
  onClick,
  onHover,
  isHovered: externalIsHovered,
  variant,
  size,
  className,
}: VisualTreatmentCardProps) {
  const [showAllMetrics, setShowAllMetrics] = React.useState(false);
  const [internalIsHovered, setInternalIsHovered] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [popoverPosition, setPopoverPosition] = React.useState({ top: 0, left: 0 });
  
  // Use external hover if provided, otherwise use internal
  const isHovered = externalIsHovered !== undefined ? externalIsHovered : internalIsHovered;
  
  // Update popover position when hovered
  React.useEffect(() => {
    if (isHovered && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setPopoverPosition({
        top: rect.top,
        left: rect.right + 16, // 16px margin
      });
    }
  }, [isHovered]);
  
  // Auto-determine variant based on state
  // Winner/launched cards use treatment variant (not green)
  const computedVariant = variant || 
    (isControl ? "control" : "treatment");

  return (
    <>
    <Card
      ref={cardRef}
      className={cn(
        cardVariants({ variant: computedVariant, size }),
        isHovered && "scale-[1.02] shadow-xl",
        onClick && "cursor-pointer",
        "relative",
        className
      )}
      onClick={onClick}
      onMouseEnter={() => {
        setInternalIsHovered(true);
        onHover?.(id);
      }}
      onMouseLeave={() => {
        setInternalIsHovered(false);
        onHover?.(null);
      }}
    >
      {/* 1. Small UI Thumbnail First (112px / 7rem) - Visual Priority */}
      {showThumbnail && (
        <>
          <div className="relative w-full h-28 bg-neutral-50 overflow-hidden">
            {thumbnailUrl ? (
              <img 
                src={thumbnailUrl} 
                alt={name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />
            ) : thumbnailContent ? (
              <div className="w-full h-full flex items-center justify-center scale-75">
                {thumbnailContent}
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-text-muted text-2xs italic">
                UI Preview
              </div>
            )}
          </div>

          {/* Divider line */}
          <div className="border-t border-border" />
        </>
      )}

      {/* 2. Header: Variant Name (following Card guidelines: compact spacing) */}
      <div className="px-3 pt-3">
        <div className="flex items-center gap-1.5">
          <h3 className="text-xs font-semibold text-card-foreground leading-tight tracking-tight">
            {variantLabel || name}
          </h3>
          {isWinner && (
            <Badge className="bg-success/20 text-success border-success/30 text-2xs px-1.5 py-0">
              Winner
            </Badge>
          )}
        </div>
      </div>

      {/* 3. Content: Annotation + Badges (following Card guidelines: p-3 pt-0 pattern) */}
      <div className="px-3 pb-3 pt-1.5 space-y-2">
        {/* Annotation (description pattern) */}
        {annotations && annotations.length > 0 && (
          <p className="text-xs text-muted-foreground italic leading-tight line-clamp-1">
            &ldquo;{annotations[0]}&rdquo;
          </p>
        )}
        
        {/* Footer: Status Badges */}
        {isLaunched && (
          <div className="flex items-center gap-1.5 pt-0.5">
            <Badge variant="success" className="text-2xs px-2 py-0.5 h-5 shadow-sm">
              Launched
            </Badge>
          </div>
        )}
      </div>

      {/* Hover Popover: All Metrics & Description */}
      {/* Removed from here - now rendered via Portal below */}
    </Card>
    
    {/* Portal Popover - renders at document.body to escape ScrollArea overflow clipping */}
    {isHovered && ReactDOM.createPortal(
      <div 
        className="w-72 bg-bg-surface border border-border rounded-lg p-4 z-50 shadow-2xl"
        style={{
          position: 'fixed',
          top: `${popoverPosition.top}px`,
          left: `${popoverPosition.left}px`,
        }}
      >
        <div className="space-y-3">
          {/* Variant Description */}
          {annotations && annotations.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-text mb-1.5">Description</div>
              <p className="text-2xs text-text-muted leading-relaxed">
                {annotations.join(' ')}
              </p>
            </div>
          )}

          {/* All Metrics */}
          {(primaryMetric || (secondaryMetrics && secondaryMetrics.length > 0)) && (
            <div>
              <div className="text-xs font-semibold text-text mb-1.5">Metrics</div>
              <div className="space-y-1.5">
                {primaryMetric && (
                  <div className="flex justify-between items-center">
                    <span className="text-2xs text-text-muted">{primaryMetric.label}</span>
                    <span className={cn(
                      "text-xs font-semibold",
                      primaryMetric.delta !== undefined && primaryMetric.delta !== 0
                        ? primaryMetric.delta > 0 ? "text-success" : "text-error"
                        : "text-text"
                    )}>
                      {primaryMetric.delta !== undefined && primaryMetric.delta !== 0 ? (
                        `${primaryMetric.delta > 0 ? '+' : ''}${primaryMetric.delta.toFixed(0)}%`
                      ) : (
                        `${primaryMetric.value.toFixed(1)}%`
                      )}
                    </span>
                  </div>
                )}
                {secondaryMetrics && secondaryMetrics.map((metric, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="text-2xs text-text-muted">{metric.label}</span>
                    <span className={cn(
                      "text-xs font-semibold",
                      metric.delta !== undefined && metric.delta !== 0
                        ? metric.delta > 0 ? "text-success" : "text-error"
                        : "text-text"
                    )}>
                      {metric.delta !== undefined && metric.delta !== 0 ? (
                        `${metric.delta > 0 ? '+' : ''}${metric.delta.toFixed(0)}%`
                      ) : (
                        `${metric.value.toFixed(1)}%`
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>,
      document.body
    )}
    </>
  );
}
