import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Badge Component Variants
 * 
 * Read-only status indicators with semantic color tokens.
 * All variants meet WCAG AA contrast requirements.
 * 
 * @see BadgeDocs for usage guidelines and Badge vs Chip comparison
 */
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        neutral: "border-transparent bg-muted text-muted-foreground",
        success: "border-transparent bg-success text-success-foreground",
        warning: "border-transparent bg-warning text-warning-foreground",
        error: "border-transparent bg-destructive text-destructive-foreground",
        info: "border-transparent bg-info text-info-foreground",
        outline: "text-foreground border-border",
        "primary-soft": "border-transparent bg-primary-soft text-primary-soft-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

/**
 * Badge Props
 * 
 * @property variant - Semantic variant (success, warning, error, info) or visual style (default, neutral, outline)
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

/**
 * Badge Component
 * 
 * Read-only label for status, type, priority, and metadata.
 * Not interactive - use Chip component for selectable/removable tags.
 * 
 * @example
 * ```tsx
 * <Badge variant="success">Live</Badge>
 * <Badge variant="warning">At Risk</Badge>
 * <Badge variant="error">Failed</Badge>
 * <Badge variant="neutral">Paused</Badge>
 * ```
 */
function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} role="status" {...props} />;
}

export { Badge, badgeVariants };
