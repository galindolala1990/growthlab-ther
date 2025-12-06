/**
 * Growth Labs Design Tokens
 * Central source of truth for design system values
 * Maps to CSS variables in index.css and Tailwind utilities in tailwind.config.ts
 */

export const tokens = {
  // Color Palette (base scales)
  palette: {
    primary: {
      50: "#F0EBFF",
      100: "#DDD4FF",
      300: "#A48BFF",
      500: "#6F4CFF",
      600: "#5F3DE6",
      700: "#4C2FCC",
      900: "#2B1A73",
    },
    accentTeal: {
      50: "#E6F7F5",
      100: "#CCEFE9",
      300: "#4FB9AF",
      500: "#0F766E",
      600: "#0B615B",
      700: "#064E47",
      900: "#032C28",
    },
    neutral: {
      0: "#FFFFFF",
      50: "#F9FAFB",
      100: "#F3F4F6",
      200: "#E5E7EB",
      300: "#D1D5DB",
      500: "#6B7280",
      700: "#374151",
      800: "#1F2933",
      900: "#0F172A",
    },
    success: {
      50: "#ECFDF3",
      100: "#D1FAE5",
      300: "#4ADE80",
      500: "#22C55E",
      600: "#15803D",
      700: "#16A34A",
      800: "#166534",
      900: "#14532D",
    },
    danger: {
      50: "#FEF2F2",
      100: "#FEE2E2",
      300: "#FCA5A5",
      500: "#DC2626",
      600: "#B91C1C",
      700: "#991B1B",
      800: "#7F1D1D",
      900: "#450A0A",
    },
    warning: {
      50: "#FFFBEB",
      100: "#FEF3C7",
      300: "#FACC15",
      500: "#D97706",
      600: "#B45309",
      700: "#92400E",
      800: "#78350F",
      900: "#451A03",
    },
    info: {
      50: "#EFF6FF",
      100: "#DBEAFE",
      300: "#60A5FA",
      500: "#2563EB",
      600: "#1D4ED8",
      700: "#1E40AF",
      800: "#1E3A8A",
      900: "#172554",
    },
  },

  color: {
    // Primary brand color (maps to purple scale)
    primary: {
      DEFAULT: "#6F4CFF",      // palette.primary.500
      light: "#A48BFF",        // palette.primary.300
      dark: "#4C2FCC",         // palette.primary.700
      hover: "#5F3DE6",        // palette.primary.600
      active: "#4C2FCC",       // palette.primary.700
      soft: "#F0EBFF",         // palette.primary.50 - backgrounds only
      softForeground: "#5F3DE6", // palette.primary.600 - WCAG AA on soft bg (5.34:1)
      foreground: "#FFFFFF",   // Text on primary backgrounds
    },

    // Accent color (maps to teal scale)
    accent: {
      DEFAULT: "#0F766E",      // palette.accentTeal.500
      light: "#4FB9AF",        // palette.accentTeal.300
      dark: "#064E47",         // palette.accentTeal.700
      hover: "#0B615B",        // palette.accentTeal.600
      soft: "#E6F7F5",         // palette.accentTeal.50
      foreground: "#FFFFFF",   // Text on accent backgrounds
    },

    // Backgrounds
    background: {
      DEFAULT: "#FFFFFF",      // palette.neutral.0
      subtle: "#F9FAFB",       // palette.neutral.50 - page background
      surface: "#FFFFFF",      // palette.neutral.0 - cards, panels
      muted: "#F3F4F6",        // palette.neutral.100 - disabled states
      mutedForeground: "#374151", // palette.neutral.700 - WCAG AA compliant on muted bg
    },

    // Backgrounds (dark theme)
    backgroundDark: {
      DEFAULT: "#0F172A",      // palette.neutral.900
      subtle: "#1F2933",       // palette.neutral.800
      surface: "#374151",      // palette.neutral.700
    },

    // Text colors (light theme)
    text: {
      DEFAULT: "#0F172A",      // palette.neutral.900 - primary text
      secondary: "#374151",    // palette.neutral.700 - secondary text
      muted: "#6B7280",        // palette.neutral.500 - muted text
      subtle: "#D1D5DB",       // palette.neutral.300 - disabled/placeholder
      onPrimary: "#FFFFFF",    // Text on primary backgrounds
      onAccent: "#FFFFFF",     // Text on accent backgrounds
    },

    // Text colors (dark theme)
    textDark: {
      DEFAULT: "#FFFFFF",      // palette.neutral.0
      secondary: "#E5E7EB",    // palette.neutral.200
      muted: "#D1D5DB",        // palette.neutral.300
      subtle: "#6B7280",       // palette.neutral.500
    },

    // Borders
    border: {
      DEFAULT: "#E5E7EB",      // palette.neutral.200
      subtle: "#F3F4F6",       // palette.neutral.100
      strong: "#D1D5DB",       // palette.neutral.300
      muted: "#6B7280",        // palette.neutral.500
    },

    // Borders (dark theme)
    borderDark: {
      DEFAULT: "#374151",      // palette.neutral.700
      subtle: "#1F2933",       // palette.neutral.800
      strong: "#6B7280",       // palette.neutral.500
    },

    // Semantic: Success
    success: {
      DEFAULT: "#15803D",      // palette.success.600 - WCAG AA compliant (4.54:1)
      light: "#4ADE80",        // palette.success.300
      dark: "#15803D",         // palette.success.600
      soft: "#ECFDF3",         // palette.success.50
      foreground: "#FFFFFF",   // Text on success backgrounds
    },

    // Semantic: Danger/Error
    danger: {
      DEFAULT: "#DC2626",      // palette.danger.500
      light: "#FCA5A5",        // palette.danger.300
      dark: "#B91C1C",         // palette.danger.600
      soft: "#FEF2F2",         // palette.danger.50
      foreground: "#FFFFFF",   // Text on danger backgrounds
    },

    // Semantic: Warning
    warning: {
      DEFAULT: "#B45309",      // palette.warning.600 - WCAG AA with white
      light: "#FACC15",        // palette.warning.300
      dark: "#92400E",         // palette.warning.700
      soft: "#FFFBEB",         // palette.warning.50
      foreground: "#FFFFFF",   // White text on warning
    },

    // Semantic: Info
    info: {
      DEFAULT: "#2563EB",      // palette.info.500
      light: "#60A5FA",        // palette.info.300
      dark: "#1D4ED8",         // palette.info.600
      soft: "#EFF6FF",         // palette.info.50
      foreground: "#FFFFFF",   // Text on info backgrounds
    },

    // Deprecated aliases for backward compatibility
    // These map to new tokens - use new names in new code
    error: {
      DEFAULT: "#DC2626",      // → danger.DEFAULT
      soft: "#FEF2F2",         // → danger.soft  
      text: "#FFFFFF",         // → danger.foreground
    },
    
    textOn: {
      primary: "#FFFFFF",      // → text.onPrimary
    },
    
    bg: {
      DEFAULT: "#FFFFFF",      // → background.DEFAULT
      subtle: "#F9FAFB",       // → background.subtle
      surface: "#FFFFFF",      // → background.surface
    },
    
    bgDark: {
      DEFAULT: "#0F172A",      // → backgroundDark.DEFAULT
      subtle: "#1F2933",       // → backgroundDark.subtle
      surface: "#374151",      // → backgroundDark.surface
    },
    
    // Neutral scale (accessible via palette.neutral or color.neutral)
    neutral: {
      0: "#FFFFFF",
      50: "#F9FAFB",
      100: "#F3F4F6",
      200: "#E5E7EB",
      300: "#D1D5DB",
      500: "#6B7280",
      700: "#374151",
      800: "#1F2933",
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
      xs: "0.75rem",      // 12px
      sm: "0.875rem",     // 14px
      base: "1rem",       // 16px
      lg: "1.125rem",     // 18px
      xl: "1.25rem",      // 20px
      "2xl": "1.5rem",    // 24px
      "3xl": "1.875rem",  // 30px
      "4xl": "2.25rem",   // 36px
      "5xl": "3rem",      // 48px
    },
    weight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      none: 1,
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },
  },

  // Spacing (8px base unit)
  spacing: {
    xs: "0.5rem",    // 8px
    sm: "0.75rem",   // 12px
    md: "1rem",      // 16px
    lg: "1.25rem",   // 20px
    xl: "1.5rem",    // 24px
    "2xl": "2rem",   // 32px
    "3xl": "3rem",   // 48px
    "4xl": "4rem",   // 64px
    "5xl": "6rem",   // 96px
  },

  // Border radius (aligned to spacing scale)
  radius: {
    none: "0",
    sm: "0.25rem",   // 4px - chips, small inputs
    md: "0.5rem",    // 8px - buttons, cards
    lg: "0.75rem",   // 12px - large cards
    xl: "1rem",      // 16px - modals
    full: "9999px",  // pill shaped
  },

  // Shadows
  shadow: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
  },

  // Z-index layers
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

  // Animation durations
  animation: {
    duration: {
      fast: "150ms",
      base: "200ms",
      slow: "300ms",
    },
    timing: {
      ease: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      easeOut: "cubic-bezier(0, 0, 0.2, 1)",
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
  },
};

// Type exports for TypeScript consumers
export type Tokens = typeof tokens;
export type ColorTokens = typeof tokens.color;
export type PaletteTokens = typeof tokens.palette;
export type FontTokens = typeof tokens.font;
export type SpacingTokens = typeof tokens.spacing;
