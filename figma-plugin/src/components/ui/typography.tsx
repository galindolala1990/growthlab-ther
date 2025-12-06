import * as React from "react";
import { cn } from "@/lib/utils";
import { typography, tokens } from "@/theme/tokens";

/**
 * Typography components
 * Clean, consistent, token-driven text components
 */

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
}

function createTypographyComponent(
  defaultTag: keyof JSX.IntrinsicElements,
  style: {
    fontSize: string;
    fontWeight: number;
    lineHeight: number | string;
  },
) {
  return React.forwardRef<HTMLElement, TypographyProps>(({ as: Component = defaultTag, className, ...props }, ref) => (
    <Component
      ref={ref}
      className={cn("text-[color:var(--color-text)]", className)}
      style={{
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        lineHeight: style.lineHeight,
      }}
      {...props}
    />
  ));
}

/* ------------------ Headings ------------------ */

export const HeadingXL = createTypographyComponent("h1", {
  fontSize: typography.heading.xl.fontSize,
  fontWeight: typography.heading.xl.fontWeight,
  lineHeight: typography.heading.xl.lineHeight,
});
HeadingXL.displayName = "HeadingXL";

export const HeadingLG = createTypographyComponent("h2", {
  fontSize: typography.heading.lg.fontSize,
  fontWeight: typography.heading.lg.fontWeight,
  lineHeight: typography.heading.lg.lineHeight,
});
HeadingLG.displayName = "HeadingLG";

export const HeadingMD = createTypographyComponent("h3", {
  fontSize: typography.heading.md.fontSize,
  fontWeight: typography.heading.md.fontWeight,
  lineHeight: typography.heading.md.lineHeight,
});
HeadingMD.displayName = "HeadingMD";

export const HeadingSM = createTypographyComponent("h4", {
  fontSize: typography.heading.sm.fontSize,
  fontWeight: typography.heading.sm.fontWeight,
  lineHeight: typography.heading.sm.lineHeight,
});
HeadingSM.displayName = "HeadingSM";

/* ------------------ Body ------------------ */

export const BodyLG = createTypographyComponent("p", {
  fontSize: typography.body.lg.fontSize,
  fontWeight: typography.body.lg.fontWeight,
  lineHeight: typography.body.lg.lineHeight,
});
BodyLG.displayName = "BodyLG";

export const BodyMD = createTypographyComponent("p", {
  fontSize: typography.body.md.fontSize,
  fontWeight: typography.body.md.fontWeight,
  lineHeight: typography.body.md.lineHeight,
});
BodyMD.displayName = "BodyMD";

export const BodySM = createTypographyComponent("p", {
  fontSize: typography.body.sm.fontSize,
  fontWeight: typography.body.sm.fontWeight,
  lineHeight: typography.body.sm.lineHeight,
});
BodySM.displayName = "BodySM";

/* ------------------ Caption ------------------ */

export const Caption = React.forwardRef<HTMLSpanElement, TypographyProps>(
  ({ as: Component = "span", className, ...props }, ref) => (
    <Component
      ref={ref}
      className={cn("text-[color:var(--color-text-muted)]", className)}
      style={{
        fontSize: typography.caption.fontSize,
        fontWeight: typography.caption.fontWeight,
        lineHeight: typography.caption.lineHeight,
      }}
      {...props}
    />
  ),
);
Caption.displayName = "Caption";


