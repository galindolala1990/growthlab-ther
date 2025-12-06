import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Rocket, TrendingUp } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

const nodeVariants = cva(
  "inline-flex items-center gap-2 px-4 py-2 rounded-full transition-all cursor-pointer border-2 shadow-sm hover:shadow-md",
  {
    variants: {
      variant: {
        control: "bg-neutral-50 border-neutral-300 hover:border-neutral-400 text-neutral-700",
        treatment: "bg-primary/10 border-primary/40 hover:border-primary/60 text-primary",
        winner: "bg-success/10 border-success/40 hover:border-success/60 text-success",
        launch: "bg-success border-success hover:border-success/80 text-success-foreground shadow-md",
        default: "bg-bg-surface border-border hover:border-border-strong text-text",
      },
      size: {
        sm: "text-xs px-3 py-1.5",
        md: "text-sm px-4 py-2",
        lg: "text-base px-5 py-2.5",
      },
      status: {
        idle: "opacity-100",
        active: "ring-2 ring-primary/30 ring-offset-2",
        disabled: "opacity-50 cursor-not-allowed",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      status: "idle",
    },
  }
);

export interface FlowNodeProps extends VariantProps<typeof nodeVariants> {
  id: string;
  label: string;
  className?: string;
  onClick?: () => void;
  onHover?: (id: string | null) => void;
  isHovered?: boolean;
  
  // Node type indicators
  isControl?: boolean;
  isVariant?: boolean;
  isWinner?: boolean;
  isLaunch?: boolean;
  
  // Variant-specific data
  variantLetter?: string;
  trafficSplit?: string;
  
  // Metrics for winner/launch nodes
  metric?: string;
  primaryMetric?: string;
  delta?: number;
  comparisonLabel?: string;
  
  // Visual enhancements
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  subtitle?: string;
}

export function FlowNode({
  id,
  label,
  className,
  variant,
  size,
  status,
  onClick,
  onHover,
  isHovered,
  isControl,
  isVariant,
  isWinner,
  isLaunch,
  variantLetter,
  trafficSplit,
  metric,
  primaryMetric,
  delta,
  comparisonLabel,
  icon,
  badge,
  subtitle,
}: FlowNodeProps) {
  
  // Auto-determine variant based on node type
  const computedVariant = variant || 
    (isLaunch ? "launch" : 
     isWinner ? "winner" : 
     isControl ? "control" : 
     isVariant ? "treatment" : 
     "default");

  return (
    <div
      className={cn(
        "relative inline-flex flex-col items-start gap-1",
        className
      )}
      onClick={onClick}
      onMouseEnter={() => onHover?.(id)}
      onMouseLeave={() => onHover?.(null)}
    >
      <div
        className={cn(
          nodeVariants({ variant: computedVariant, size, status }),
          isHovered && "scale-105",
          "select-none"
        )}
      >
        {/* Left icon or variant letter */}
        {icon ? (
          <div className="shrink-0">{icon}</div>
        ) : variantLetter ? (
          <div className={cn(
            "shrink-0 flex items-center justify-center rounded-full h-5 w-5 text-xs font-bold",
            isControl && "bg-neutral-200 text-neutral-700",
            isVariant && !isWinner && "bg-primary/20 text-primary",
            isWinner && "bg-success/20 text-success"
          )}>
            {variantLetter}
          </div>
        ) : null}

        {/* Main label */}
        <span className="font-medium truncate max-w-[200px]">
          {label}
        </span>

        {/* Winner indicator badge (only on non-launch nodes) */}
        {isWinner && !isLaunch && (
          <Badge 
            className={cn(
              "bg-success/20 text-success border-success/30 text-2xs px-1.5 py-0",
              size === "sm" && "text-3xs px-1"
            )}
          >
            Winner
          </Badge>
        )}

        {/* Launch nodes are standalone solid green pills - no extra badge needed */}

        {/* Badge (custom) */}
        {badge && <div className="shrink-0">{badge}</div>}
      </div>

      {/* Subtitle (metrics, comparison) */}
      {(metric || subtitle) && (
        <div className="text-xs text-text-muted ml-6 flex items-center gap-1.5">
          {metric && (
            <span className="font-semibold text-success">{metric}</span>
          )}
          {comparisonLabel && (
            <span className="text-text-subtle">vs {comparisonLabel}</span>
          )}
          {subtitle && <span>{subtitle}</span>}
        </div>
      )}
    </div>
  );
}
