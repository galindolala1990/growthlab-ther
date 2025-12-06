import React from "react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export interface SegmentedControlOption {
  id: string;
  label: string;
  icon?: LucideIcon | React.ComponentType<{ className?: string }> | React.ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps {
  options: SegmentedControlOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "neutral";
  fullWidth?: boolean;
  ariaLabel?: string;
}

const sizeClasses = {
  sm: "h-7 px-2 text-xs",
  md: "h-9 px-3 text-sm",
  lg: "h-11 px-4 text-base",
};

const variantClasses = {
  primary: {
    container: "bg-bg-surface border-neutral-200",
    selected: "bg-primary text-text-on-primary shadow-sm",
    unselected: "text-text-muted bg-transparent hover:bg-bg-subtle",
  },
  neutral: {
    container: "bg-neutral-100 border-neutral-300",
    selected: "bg-white text-text shadow-sm",
    unselected: "text-text-muted bg-transparent hover:bg-neutral-50",
  },
};

const SegmentedControl = React.forwardRef<HTMLDivElement, SegmentedControlProps>(
  ({ options, value, onChange, className, size = "md", variant = "primary", fullWidth = false, ariaLabel }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
      let newIndex = currentIndex;
      
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        newIndex = (currentIndex + 1) % options.length;
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        newIndex = (currentIndex - 1 + options.length) % options.length;
      } else if (e.key === "Home") {
        e.preventDefault();
        newIndex = 0;
      } else if (e.key === "End") {
        e.preventDefault();
        newIndex = options.length - 1;
      }
      
      // Find next non-disabled option
      while (newIndex !== currentIndex && options[newIndex]?.disabled) {
        if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "End") {
          newIndex = (newIndex + 1) % options.length;
        } else {
          newIndex = (newIndex - 1 + options.length) % options.length;
        }
      }
      
      if (newIndex !== currentIndex && !options[newIndex]?.disabled) {
        onChange(options[newIndex].id);
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1 rounded-lg p-1 shadow-sm border",
          variantClasses[variant].container,
          fullWidth && "flex w-full",
          className
        )}
        role="radiogroup"
        aria-label={ariaLabel || "Segmented control"}
      >
        {options.map((option, index) => {
          const isSelected = value === option.id;
          const IconComponent = option.icon;
          
          return (
            <button
              key={option.id}
              onClick={() => !option.disabled && onChange(option.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={cn(
                "flex items-center gap-2 rounded-md font-medium transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                sizeClasses[size],
                fullWidth && "flex-1 justify-center",
                isSelected 
                  ? variantClasses[variant].selected
                  : variantClasses[variant].unselected,
                option.disabled && "opacity-50 cursor-not-allowed"
              )}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-disabled={option.disabled}
              tabIndex={isSelected ? 0 : -1}
              disabled={option.disabled}
            >
              {IconComponent && (
                typeof IconComponent === 'function' || (IconComponent as any).$$typeof ? (
                  <IconComponent className="w-4 h-4" />
                ) : (
                  <span className="w-4 h-4">{IconComponent}</span>
                )
              )}
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
    );
  }
);
SegmentedControl.displayName = "SegmentedControl";

export { SegmentedControl };
