import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Card Component
 * 
 * Flexible container for grouping related content with consistent styling.
 * Foundation for dashboard panels, data displays, and content sections.
 * 
 * @see CardDocs for spacing guidelines, visual hierarchy, and patterns
 * 
 * @example
 * ```tsx
 * // Simple card with custom padding
 * <Card className="p-6">
 *   <p>Content here</p>
 * </Card>
 * 
 * // Structured card with header/content/footer
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Title</CardTitle>
 *     <CardDescription>Description</CardDescription>
 *   </CardHeader>
 *   <CardContent>Main content</CardContent>
 *   <CardFooter>Actions or metadata</CardFooter>
 * </Card>
 * ```
 */
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-lg border border-border bg-card text-card-foreground shadow-sm", className)} {...props} />
));
Card.displayName = "Card";

/**
 * CardHeader Component
 * 
 * Container for card title and description with default spacing (p-6, space-y-1.5).
 * First section of structured cards.
 */
const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  ),
);
CardHeader.displayName = "CardHeader";

/**
 * CardTitle Component
 * 
 * Semantic h3 heading for card titles. Use within CardHeader.
 * Default styling: text-lg font-semibold leading-tight.
 */
const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-lg font-semibold leading-tight tracking-tight", className)} {...props} />
  ),
);
CardTitle.displayName = "CardTitle";

/**
 * CardDescription Component
 * 
 * Supporting description text for cards. Use within CardHeader below CardTitle.
 * Default styling: text-sm text-muted-foreground.
 */
const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
);
CardDescription.displayName = "CardDescription";

/**
 * CardContent Component
 * 
 * Main content area of structured cards.
 * Default spacing: p-6 pt-0 (flows from CardHeader with no top padding).
 */
const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />,
);
CardContent.displayName = "CardContent";

/**
 * CardFooter Component
 * 
 * Footer section for actions, metadata, or navigation.
 * Default styling: p-6 pt-0 flex items-center (horizontal flexbox layout).
 * Often includes buttons or supplementary information.
 */
const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  ),
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
