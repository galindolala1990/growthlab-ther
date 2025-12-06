import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

/**
 * Chip Component Variants
 * 
 * Interactive filter pills and tags with selection and removal support.
 * Token-based styling with hover/active states.
 * 
 * @see ChipDocs for usage guidelines and Chip vs Badge comparison
 */
const chipVariants = cva(
  "inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        neutral:
          "bg-background-surface text-foreground border border-border hover:bg-background-subtle active:bg-muted",
        primary:
          "bg-primary text-primary-foreground border border-primary hover:bg-primary-hover active:bg-primary-active",
        outline:
          "bg-transparent text-foreground border border-border hover:bg-background-subtle active:border-primary",
        "primary-soft":
          "bg-primary-soft text-primary-soft-foreground border border-primary-soft hover:bg-primary hover:text-primary-foreground",
      },
      selected: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "neutral",
        selected: true,
        className: "bg-primary-soft text-primary-soft-foreground border-primary",
      },
      {
        variant: "outline",
        selected: true,
        className: "border-primary bg-primary-soft text-primary-soft-foreground",
      },
    ],
    defaultVariants: {
      variant: "neutral",
      selected: false,
    },
  }
);

/**
 * Chip Props
 * 
 * @property selected - Whether chip is in selected state (for filters)
 * @property onRemove - Callback when remove button clicked (makes chip removable)
 * @property removable - Show remove X button
 * @property label - Text content of the chip
 */
export interface ChipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick">,
    VariantProps<typeof chipVariants> {
  selected?: boolean;
  onRemove?: () => void;
  removable?: boolean;
  label: string;
  onClick?: () => void;
}

/**
 * Chip Component
 * 
 * Interactive filter pill or tag with optional selection and removal.
 * Use for multi-select filters, removable tags, and dynamic collections.
 * 
 * @example
 * ```tsx
 * // Selectable filter chip
 * <Chip label="Planning" selected={isSelected} onClick={toggle} />
 * 
 * // Removable tag chip
 * <Chip label="React" removable onRemove={handleRemove} />
 * ```
 */
const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      className,
      variant,
      selected,
      onRemove,
      removable = false,
      label,
      onClick,
      ...props
    },
    ref
  ) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick?.();
      }
    };

    const handleClick = () => {
      onClick?.();
    };

    return (
      <div
        ref={ref}
        role="button"
        tabIndex={0}
        aria-pressed={selected ?? undefined}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
        className={cn(
          chipVariants({ variant, selected }),
          removable && "pr-1",
          className
        )}
        role={selected !== undefined ? "checkbox" : "button"}
        aria-checked={selected !== undefined ? selected : undefined}
        aria-label={selected !== undefined ? `Filter by ${label}` : label}
        {...props}
      >
        <span>{label}</span>
        {removable && onRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="ml-1 hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded-full"
            type="button"
            aria-label={`Remove ${label}`}
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>
    );
  }
);
Chip.displayName = "Chip";

export { Chip, chipVariants };
