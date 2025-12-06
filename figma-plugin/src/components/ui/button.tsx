import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Button Component Variants
 * 
 * Token-based button styling with WCAG AA compliant focus states.
 * All variants tested for 4.5:1 contrast ratio on backgrounds.
 * 
 * @see ButtonDocs for usage guidelines and examples
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active shadow-sm focus-visible:ring-primary",

        secondary:
          "bg-secondary text-secondary-foreground border border-border hover:bg-muted active:bg-muted",

        outline:
          "border border-border text-foreground bg-transparent hover:bg-background-subtle active:bg-muted",

        ghost:
          "text-foreground hover:bg-background-subtle active:bg-muted",

        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80 shadow-sm focus-visible:ring-destructive",
      },
      size: {
        sm: "h-9 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-11 px-5 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

/**
 * Button Props
 * 
 * @property asChild - Use Radix Slot for polymorphic rendering (e.g., as Link)
 * @property variant - Visual style variant (primary, secondary, outline, ghost, destructive)
 * @property size - Size variant (sm, md, lg, icon)
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

/**
 * Button Component
 * 
 * Primary CTA component with consistent token-based styling.
 * Includes WCAG AA compliant focus rings and keyboard navigation.
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="md">Submit</Button>
 * <Button variant="destructive" onClick={handleDelete}>Delete</Button>
 * <Button variant="outline" asChild><Link to="/settings">Settings</Link></Button>
 * ```
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, type = "button", ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        type={type}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
