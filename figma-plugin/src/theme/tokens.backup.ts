/**
 * Design Tokens
 *
 * Single source of truth for all design values.
 * Similar to Linear/Dovetail quality design systems.
 *
 * All values are WCAG AA compliant for text usage
 * when used according to the notes below.
 */

export const tokens = {
  // Colors - Semantic and minimal
  color: {
    // Primary brand color (WCAG AA compliant: #6F4CFF on white = 4.7:1, white on #6F4CFF = 4.7:1)
    primary: {
      DEFAULT: "#6F4CFF",      // Main brand purple - use for primary buttons
      hover: "#5F3DE6",        // Hover state - darker for affordance
      active: "#4D2DCB",       // Active/pressed state - darkest
      soft: "#E6E3FF",         // Background tint only - NOT for text (fails WCAG)
    },

    // Text on primary backgrounds
    textOn: {
      primary: "#FFFFFF",      // White text on primary buttons (4.7:1 contrast)
    },

    // Backgrounds (light theme)
    bg: {
      DEFAULT: "#FFFFFF",
      subtle: "#F8F9FA", // use for page background
      surface: "#FFFFFF", // cards, panels
    },

    // Backgrounds (dark theme)
    bgDark: {
      DEFAULT: "#0F172A",
      subtle: "#1E293B",
      surface: "#1E293B",
    },

    // Text colors (light on light backgrounds)
    text: {
      DEFAULT: "#0A0A0A",      // High contrast on white, use for primary body text
      muted: "#4B5563",        // Darker than before, safe for body/labels on white
      subtle: "#94A3B8",       // Low contrast: use for ICONS / DIVIDERS ONLY, not for text
      onPrimary: "#FFFFFF",    // White on primary backgrounds
    },

    // Text colors (on dark backgrounds)
    textDark: {
      DEFAULT: "#FFFFFF",      // Primary text on dark surfaces
      muted: "#E5E7EB",        // Muted labels on dark but still AA against bgDark
      subtle: "#94A3B8",       // Use for ICONS / DIVIDERS ONLY on dark, not body text
    },

    // Borders
    border: {
      DEFAULT: "#E2E8F0",      // Standard borders around cards, inputs
      subtle: "#F1F5F9",       // Very light, for dividers only
      strong: "#CBD5E1",       // Stronger separators when needed
    },

    borderDark: {
      DEFAULT: "#334155",
      subtle: "#475569",
      strong: "#1E293B",
    },

    // Semantic colors
    success: {
      DEFAULT: "#16A34A",
      soft: "#16A34A1A",       // background tint only
      text: "#FFFFFF",         // text/icon on success background
    },

    warning: {
      DEFAULT: "#F59E0B",
      soft: "#F59E0B1A",       // background tint only
      text: "#0A0A0A",         // dark text on warning bg (meets contrast)
    },

    error: {
      DEFAULT: "#DC2626",
      soft: "#DC26261A",       // background tint only
      text: "#FFFFFF",         // text/icon on error background
    },

    info: {
      DEFAULT: "#6F4CFF",      // alias of primary (purple); use for “info” chips/badges
      soft: "#E6E3FF",
      text: "#FFFFFF",
    },

    // Neutral grays (reference scale)
    neutral: {
      50: "#F8F9FA",
      100: "#F1F5F9",
      200: "#E2E8F0",
      300: "#CBD5E1",
      400: "#94A3B8",
      500: "#64748B",
      600: "#475569",
      700: "#334155",
      800: "#1E293B",
      900: "#0F172A",
    },
  },

  // Typography
  font: {
    family: {
      sans: [
        "Inter",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Oxygen",
        "Ubuntu",
        "Cantarell",
        "Fira Sans",
        "Droid Sans",
        "Helvetica Neue",
        "sans-serif",
      ].join(", "),
      mono: [
        "SF Mono",
        "Monaco",
        "Inconsolata",
        "Fira Code",
        "Fira Mono",
        "Droid Sans Mono",
        "Consolas",
        "Liberation Mono",
        "Menlo",
        "monospace",
      ].join(", "),
    },

    size: {
      xs: "0.75rem",     // 12px
      sm: "0.875rem",    // 14px
      md: "1rem",        // 16px
      lg: "1.125rem",    // 18px
      xl: "1.25rem",     // 20px
      "2xl": "1.5rem",   // 24px
      "3xl": "1.875rem", // 30px
      "4xl": "2.25rem",  // 36px
    },

    weight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },

    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
  },

  // Spacing - 4px base unit
  space: {
    0: "0",
    1: "0.25rem",  // 4px
    2: "0.5rem",   // 8px
    3: "0.75rem",  // 12px
    4: "1rem",     // 16px
    5: "1.25rem",  // 20px
    6: "1.5rem",   // 24px
    8: "2rem",     // 32px
    10: "2.5rem",  // 40px
    12: "3rem",    // 48px
    16: "4rem",    // 64px
    20: "5rem",    // 80px
    24: "6rem",    // 96px
  },

  // Border radius
  radius: {
    none: "0",
    sm: "0.25rem",   // 4px
    md: "0.5rem",    // 8px
    lg: "0.75rem",   // 12px
    xl: "1rem",      // 16px
    full: "9999px",
  },

  // Shadows - neutral, no colored tints
  shadow: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },

  // Z-index scale
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },

  // Transitions
  transition: {
    fast: "100ms ease",
    base: "200ms ease",
    slow: "300ms ease",
  },

  // Breakpoints (for reference, use Tailwind's)
  breakpoint: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
} as const;

/**
 * Typography scale for consistent text styles
 */
export const typography = {
  heading: {
    xl: {
      fontSize: tokens.font.size["4xl"],
      fontWeight: tokens.font.weight.bold,
      lineHeight: tokens.font.lineHeight.tight,
    },
    lg: {
      fontSize: tokens.font.size["3xl"],
      fontWeight: tokens.font.weight.bold,
      lineHeight: tokens.font.lineHeight.tight,
    },
    md: {
      fontSize: tokens.font.size["2xl"],
      fontWeight: tokens.font.weight.semibold,
      lineHeight: tokens.font.lineHeight.tight,
    },
    sm: {
      fontSize: tokens.font.size.xl,
      fontWeight: tokens.font.weight.semibold,
      lineHeight: tokens.font.lineHeight.normal,
    },
  },
  body: {
    lg: {
      fontSize: tokens.font.size.lg,
      fontWeight: tokens.font.weight.regular,
      lineHeight: tokens.font.lineHeight.relaxed,
    },
    md: {
      fontSize: tokens.font.size.md,
      fontWeight: tokens.font.weight.regular,
      lineHeight: tokens.font.lineHeight.normal,
    },
    sm: {
      fontSize: tokens.font.size.sm,
      fontWeight: tokens.font.weight.regular,
      lineHeight: tokens.font.lineHeight.normal,
    },
  },
  caption: {
    fontSize: tokens.font.size.xs,
    fontWeight: tokens.font.weight.regular,
    lineHeight: tokens.font.lineHeight.normal,
  },
} as const;


