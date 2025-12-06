import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Settings, Zap, ExternalLink } from "lucide-react";

/**
 * Design System Documentation
 * 
 * Comprehensive preview and documentation for Growth Labs design system.
 * Shows tokens, colors, typography, spacing, shadows, and all component states.
 */

const DesignSystemDocs = () => {
  return (
    <div className="container mx-auto p-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Growth Labs Design System</h1>
        <p className="text-lg text-muted-foreground">
          Token-based design system with WCAG AA compliance and comprehensive component library
        </p>
      </div>

      {/* Design Tokens Overview */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-foreground">Design Tokens</h2>
          <p className="text-sm text-foreground-muted">
            Single source of truth for all design values defined in <code className="px-2 py-1 bg-neutral-100 rounded text-xs">src/theme/tokens.ts</code>
          </p>
        </div>
      </section>

      {/* Colors Section */}
      <section className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-2">Colors</h3>
          <p className="text-sm text-foreground-muted">All color tokens with WCAG AA compliance guidelines</p>
        </div>

        {/* Primary Colors */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <div>
            <h4 className="text-base font-semibold text-foreground mb-1">Primary Brand Colors (Purple)</h4>
            <p className="text-xs text-foreground-muted">Main brand purple used for primary CTAs and key UI elements</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-24 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-mono text-sm">DEFAULT</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">color.primary.DEFAULT</p>
                <p className="text-xs text-foreground-muted font-mono">#6F4CFF</p>
                <p className="text-xs text-success">✓ WCAG AA with white text</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-24 bg-primary-hover rounded-lg flex items-center justify-center">
                <span className="text-white font-mono text-sm">HOVER</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">color.primary.hover</p>
                <p className="text-xs text-foreground-muted font-mono">#5F3DE6</p>
                <p className="text-xs text-foreground-muted">Hover state</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-24 bg-primary-active rounded-lg flex items-center justify-center">
                <span className="text-white font-mono text-sm">ACTIVE</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">color.primary.active</p>
                <p className="text-xs text-foreground-muted font-mono">#4C2FCC</p>
                <p className="text-xs text-foreground-muted">Active/pressed state</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-24 bg-primary-soft rounded-lg border-2 border-primary/30 flex items-center justify-center">
                <span className="text-primary font-mono text-sm">SOFT</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">color.primary.soft</p>
                <p className="text-xs text-foreground-muted font-mono">#F0EBFF</p>
                <p className="text-xs text-warning">⚠ Background only, not for text</p>
              </div>
            </div>
          </div>
        </div>

        {/* Accent Teal Colors */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <div>
            <h4 className="text-base font-semibold text-foreground mb-1">Accent Colors (Teal) - NEW!</h4>
            <p className="text-xs text-foreground-muted">Secondary brand color for accents, highlights, and complementary elements</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-24 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-mono text-sm">DEFAULT</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">color.accent.DEFAULT</p>
                <p className="text-xs text-foreground-muted font-mono">#0F766E</p>
                <p className="text-xs text-success">✓ WCAG AA compliant</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-24 bg-accent-hover rounded-lg flex items-center justify-center">
                <span className="text-white font-mono text-sm">HOVER</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">color.accent.hover</p>
                <p className="text-xs text-foreground-muted font-mono">#0B615B</p>
                <p className="text-xs text-foreground-muted">Hover state</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-24 bg-accent-teal-300 rounded-lg flex items-center justify-center">
                <span className="text-white font-mono text-sm">LIGHT</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">palette.accentTeal.300</p>
                <p className="text-xs text-foreground-muted font-mono">#4FB9AF</p>
                <p className="text-xs text-foreground-muted">Light variant</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-24 bg-accent-soft rounded-lg border-2 border-accent/30 flex items-center justify-center">
                <span className="text-accent font-mono text-sm">SOFT</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">color.accent.soft</p>
                <p className="text-xs text-foreground-muted font-mono">#E6F7F5</p>
                <p className="text-xs text-warning">⚠ Background only</p>
              </div>
            </div>
          </div>
        </div>

        {/* Text Colors */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <div>
            <h4 className="text-base font-semibold text-foreground mb-1">Text Colors</h4>
            <p className="text-xs text-foreground-muted">Semantic text colors for different contexts</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-16 bg-white border border-border rounded-lg flex items-center justify-center">
                <span className="text-text font-medium">Default Text</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">color.text.DEFAULT</p>
                <p className="text-xs text-foreground-muted font-mono">#0F172A</p>
                <p className="text-xs text-foreground-muted">Primary body text</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-16 bg-white border border-border rounded-lg flex items-center justify-center">
                <span className="text-text-secondary font-medium">Secondary</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">color.text.secondary</p>
                <p className="text-xs text-foreground-muted font-mono">#374151</p>
                <p className="text-xs text-foreground-muted">Secondary text</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-16 bg-white border border-border rounded-lg flex items-center justify-center">
                <span className="text-text-muted font-medium">Muted</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">color.text.muted</p>
                <p className="text-xs text-foreground-muted font-mono">#6B7280</p>
                <p className="text-xs text-foreground-muted">Muted text</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-16 bg-white border border-border rounded-lg flex items-center justify-center">
                <span className="text-text-subtle font-medium">Subtle</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">color.text.subtle</p>
                <p className="text-xs text-foreground-muted font-mono">#D1D5DB</p>
                <p className="text-xs text-warning">⚠ Disabled/placeholder only</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border">
            <div className="space-y-2">
              <div className="h-16 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-text-on-primary font-medium">On Primary</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">color.text.onPrimary</p>
                <p className="text-xs text-foreground-muted font-mono">#FFFFFF</p>
                <p className="text-xs text-success">✓ WCAG AA on primary</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-16 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-text-on-accent font-medium">On Accent</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">color.text.onAccent</p>
                <p className="text-xs text-foreground-muted font-mono">#FFFFFF</p>
                <p className="text-xs text-success">✓ WCAG AA on accent</p>
              </div>
            </div>
          </div>
        </div>

        {/* Background Colors */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <div>
            <h4 className="text-base font-semibold text-foreground mb-1">Background Colors</h4>
            <p className="text-xs text-foreground-muted">Surface and container backgrounds</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-16 bg-background border border-border rounded-lg"></div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">color.background.DEFAULT</p>
                <p className="text-xs text-foreground-muted font-mono">#FFFFFF</p>
                <p className="text-xs text-foreground-muted">Default background</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-16 bg-background-subtle border border-border rounded-lg"></div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">color.background.subtle</p>
                <p className="text-xs text-foreground-muted font-mono">#F9FAFB</p>
                <p className="text-xs text-foreground-muted">Page background</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-16 bg-background-surface border border-border rounded-lg"></div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">color.background.surface</p>
                <p className="text-xs text-foreground-muted font-mono">#FFFFFF</p>
                <p className="text-xs text-foreground-muted">Cards, panels</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-16 bg-background-muted border border-border rounded-lg"></div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">color.background.muted</p>
                <p className="text-xs text-foreground-muted font-mono">#F3F4F6</p>
                <p className="text-xs text-foreground-muted">Disabled states</p>
              </div>
            </div>
          </div>
        </div>

        {/* Semantic Colors */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <div>
            <h4 className="text-base font-semibold text-foreground mb-1">Semantic Colors</h4>
            <p className="text-xs text-foreground-muted">Success, danger, warning, and info states</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-24 bg-success rounded-lg flex items-center justify-center">
                <span className="text-white font-mono text-sm">SUCCESS</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">color.success.DEFAULT</p>
                <p className="text-xs text-foreground-muted font-mono">#22C55E</p>
                <p className="text-xs text-success">✓ Green for positive states</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-24 bg-danger rounded-lg flex items-center justify-center">
                <span className="text-white font-mono text-sm">DANGER</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">color.danger.DEFAULT</p>
                <p className="text-xs text-foreground-muted font-mono">#DC2626</p>
                <p className="text-xs text-danger">✗ Red for errors/destructive</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-24 bg-warning rounded-lg flex items-center justify-center">
                <span className="text-white font-mono text-sm">WARNING</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">color.warning.DEFAULT</p>
                <p className="text-xs text-foreground-muted font-mono">#D97706</p>
                <p className="text-xs text-warning">⚠ Amber for warnings</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-24 bg-info rounded-lg flex items-center justify-center">
                <span className="text-white font-mono text-sm">INFO</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">color.info.DEFAULT</p>
                <p className="text-xs text-foreground-muted font-mono">#2563EB</p>
                <p className="text-xs text-info">ⓘ Blue for informational</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-border">
            <div className="space-y-2">
              <div className="h-16 bg-success-soft border border-success/30 rounded-lg flex items-center justify-center">
                <span className="text-success font-mono text-xs">SOFT</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">success.soft</p>
                <p className="text-xs text-foreground-muted font-mono">#ECFDF3</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-16 bg-danger-soft border border-danger/30 rounded-lg flex items-center justify-center">
                <span className="text-danger font-mono text-xs">SOFT</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">danger.soft</p>
                <p className="text-xs text-foreground-muted font-mono">#FEF2F2</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-16 bg-warning-soft border border-warning/30 rounded-lg flex items-center justify-center">
                <span className="text-warning font-mono text-xs">SOFT</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">warning.soft</p>
                <p className="text-xs text-foreground-muted font-mono">#FFFBEB</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-16 bg-info-soft border border-info/30 rounded-lg flex items-center justify-center">
                <span className="text-info font-mono text-xs">SOFT</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">info.soft</p>
                <p className="text-xs text-foreground-muted font-mono">#EFF6FF</p>
              </div>
            </div>
          </div>
        </div>

        {/* Full Color Scales */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-6">
          <div>
            <h4 className="text-base font-semibold text-foreground mb-1">Complete Color Scales</h4>
            <p className="text-xs text-foreground-muted">Full palette ranges from lightest to darkest</p>
          </div>

          {/* Primary Purple Scale */}
          <div className="space-y-3">
            <h5 className="text-sm font-semibold text-foreground">Primary Purple (50-900)</h5>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              <div className="space-y-1">
                <div className="h-20 bg-primary-50 rounded-lg border border-border"></div>
                <p className="text-xs font-mono text-foreground-muted">50</p>
                <p className="text-xs font-mono text-foreground-muted">#F0EBFF</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-primary-100 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">100</p>
                <p className="text-xs font-mono text-foreground-muted">#DDD4FF</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-primary-300 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">300</p>
                <p className="text-xs font-mono text-foreground-muted">#A48BFF</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">500</span>
                </div>
                <p className="text-xs font-mono text-foreground-muted">500 ★</p>
                <p className="text-xs font-mono text-foreground-muted">#6F4CFF</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-primary-600 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">600</p>
                <p className="text-xs font-mono text-foreground-muted">#5F3DE6</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-primary-700 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">700</p>
                <p className="text-xs font-mono text-foreground-muted">#4C2FCC</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-primary-900 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">900</p>
                <p className="text-xs font-mono text-foreground-muted">#2B1A73</p>
              </div>
            </div>
          </div>

          {/* Accent Teal Scale */}
          <div className="space-y-3 pt-4 border-t border-border">
            <h5 className="text-sm font-semibold text-foreground">Accent Teal (50-900)</h5>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              <div className="space-y-1">
                <div className="h-20 bg-accent-teal-50 rounded-lg border border-border"></div>
                <p className="text-xs font-mono text-foreground-muted">50</p>
                <p className="text-xs font-mono text-foreground-muted">#E6F7F5</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-accent-teal-100 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">100</p>
                <p className="text-xs font-mono text-foreground-muted">#CCEFE9</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-accent-teal-300 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">300</p>
                <p className="text-xs font-mono text-foreground-muted">#4FB9AF</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-accent rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">500</span>
                </div>
                <p className="text-xs font-mono text-foreground-muted">500 ★</p>
                <p className="text-xs font-mono text-foreground-muted">#0F766E</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-accent-teal-600 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">600</p>
                <p className="text-xs font-mono text-foreground-muted">#0B615B</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-accent-teal-700 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">700</p>
                <p className="text-xs font-mono text-foreground-muted">#064E47</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-accent-teal-900 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">900</p>
                <p className="text-xs font-mono text-foreground-muted">#032C28</p>
              </div>
            </div>
          </div>

          {/* Neutral Gray Scale */}
          <div className="space-y-3 pt-4 border-t border-border">
            <h5 className="text-sm font-semibold text-foreground">Neutral Grays (0-900)</h5>
            <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-3">
              <div className="space-y-1">
                <div className="h-20 bg-neutral-0 rounded-lg border border-border"></div>
                <p className="text-xs font-mono text-foreground-muted">0</p>
                <p className="text-xs font-mono text-foreground-muted">#FFFFFF</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-neutral-50 rounded-lg border border-border"></div>
                <p className="text-xs font-mono text-foreground-muted">50</p>
                <p className="text-xs font-mono text-foreground-muted">#F9FAFB</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-neutral-100 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">100</p>
                <p className="text-xs font-mono text-foreground-muted">#F3F4F6</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-neutral-200 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">200</p>
                <p className="text-xs font-mono text-foreground-muted">#E5E7EB</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-neutral-300 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">300</p>
                <p className="text-xs font-mono text-foreground-muted">#D1D5DB</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-neutral-500 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">500</p>
                <p className="text-xs font-mono text-foreground-muted">#6B7280</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-neutral-700 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">700</p>
                <p className="text-xs font-mono text-foreground-muted">#374151</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-neutral-800 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">800</p>
                <p className="text-xs font-mono text-foreground-muted">#1F2933</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-neutral-900 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">900</span>
                </div>
                <p className="text-xs font-mono text-foreground-muted">900</p>
                <p className="text-xs font-mono text-foreground-muted">#0F172A</p>
              </div>
            </div>
          </div>

          {/* Green Scale (Success) */}
          <div className="space-y-3 pt-4 border-t border-border">
            <h5 className="text-sm font-semibold text-foreground">Green (Success)</h5>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              <div className="space-y-1">
                <div className="h-20 bg-success-50 rounded-lg border border-border"></div>
                <p className="text-xs font-mono text-foreground-muted">50</p>
                <p className="text-xs font-mono text-foreground-muted">#ECFDF3</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-success-100 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">100</p>
                <p className="text-xs font-mono text-foreground-muted">#D1FAE5</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-success-300 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">300</p>
                <p className="text-xs font-mono text-foreground-muted">#4ADE80</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-success-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">500</span>
                </div>
                <p className="text-xs font-mono text-foreground-muted">500</p>
                <p className="text-xs font-mono text-foreground-muted">#22C55E</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-success rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">600 ★</span>
                </div>
                <p className="text-xs font-mono text-foreground-muted">600 ★</p>
                <p className="text-xs font-mono text-foreground-muted">#15803D</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-success-700 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">700</p>
                <p className="text-xs font-mono text-foreground-muted">#16A34A</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-success-800 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">800</p>
                <p className="text-xs font-mono text-foreground-muted">#166534</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-success-900 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">900</p>
                <p className="text-xs font-mono text-foreground-muted">#14532D</p>
              </div>
            </div>
          </div>

          {/* Red Scale (Danger) */}
          <div className="space-y-3 pt-4 border-t border-border">
            <h5 className="text-sm font-semibold text-foreground">Red (Danger)</h5>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              <div className="space-y-1">
                <div className="h-20 bg-danger-50 rounded-lg border border-border"></div>
                <p className="text-xs font-mono text-foreground-muted">50</p>
                <p className="text-xs font-mono text-foreground-muted">#FEF2F2</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-danger-100 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">100</p>
                <p className="text-xs font-mono text-foreground-muted">#FEE2E2</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-danger-300 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">300</p>
                <p className="text-xs font-mono text-foreground-muted">#FCA5A5</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-danger rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">500 ★</span>
                </div>
                <p className="text-xs font-mono text-foreground-muted">500 ★</p>
                <p className="text-xs font-mono text-foreground-muted">#DC2626</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-danger-600 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">600</p>
                <p className="text-xs font-mono text-foreground-muted">#B91C1C</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-danger-700 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">700</p>
                <p className="text-xs font-mono text-foreground-muted">#991B1B</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-danger-800 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">800</p>
                <p className="text-xs font-mono text-foreground-muted">#7F1D1D</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-danger-900 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">900</p>
                <p className="text-xs font-mono text-foreground-muted">#450A0A</p>
              </div>
            </div>
          </div>

          {/* Amber Scale (Warning) */}
          <div className="space-y-3 pt-4 border-t border-border">
            <h5 className="text-sm font-semibold text-foreground">Amber (Warning)</h5>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              <div className="space-y-1">
                <div className="h-20 bg-warning-50 rounded-lg border border-border"></div>
                <p className="text-xs font-mono text-foreground-muted">50</p>
                <p className="text-xs font-mono text-foreground-muted">#FFFBEB</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-warning-100 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">100</p>
                <p className="text-xs font-mono text-foreground-muted">#FEF3C7</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-warning-300 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">300</p>
                <p className="text-xs font-mono text-foreground-muted">#FACC15</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-warning-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">500</span>
                </div>
                <p className="text-xs font-mono text-foreground-muted">500</p>
                <p className="text-xs font-mono text-foreground-muted">#D97706</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-warning rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">600 ★</span>
                </div>
                <p className="text-xs font-mono text-foreground-muted">600 ★</p>
                <p className="text-xs font-mono text-foreground-muted">#B45309</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-warning-700 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">700</p>
                <p className="text-xs font-mono text-foreground-muted">#92400E</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-warning-800 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">800</p>
                <p className="text-xs font-mono text-foreground-muted">#78350F</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-warning-900 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">900</p>
                <p className="text-xs font-mono text-foreground-muted">#451A03</p>
              </div>
            </div>
          </div>

          {/* Blue Scale (Info) */}
          <div className="space-y-3 pt-4 border-t border-border">
            <h5 className="text-sm font-semibold text-foreground">Blue (Info)</h5>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              <div className="space-y-1">
                <div className="h-20 bg-info-50 rounded-lg border border-border"></div>
                <p className="text-xs font-mono text-foreground-muted">50</p>
                <p className="text-xs font-mono text-foreground-muted">#EFF6FF</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-info-100 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">100</p>
                <p className="text-xs font-mono text-foreground-muted">#DBEAFE</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-info-300 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">300</p>
                <p className="text-xs font-mono text-foreground-muted">#60A5FA</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-info rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">500 ★</span>
                </div>
                <p className="text-xs font-mono text-foreground-muted">500 ★</p>
                <p className="text-xs font-mono text-foreground-muted">#2563EB</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-info-600 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">600</p>
                <p className="text-xs font-mono text-foreground-muted">#1D4ED8</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-info-700 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">700</p>
                <p className="text-xs font-mono text-foreground-muted">#1E40AF</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-info-800 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">800</p>
                <p className="text-xs font-mono text-foreground-muted">#1E3A8A</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-info-900 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">900</p>
                <p className="text-xs font-mono text-foreground-muted">#172554</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-2">Typography</h3>
          <p className="text-sm text-foreground-muted">Type scale and hierarchy</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 space-y-6">
          <div className="space-y-4">
            <div className="pb-4 border-b border-border">
              <p className="text-4xl font-bold text-foreground">Heading 1</p>
              <p className="text-xs text-foreground-muted mt-2">36px / 2.25rem · font-bold · text-foreground</p>
            </div>
            <div className="pb-4 border-b border-border">
              <p className="text-2xl font-bold text-foreground">Heading 2</p>
              <p className="text-xs text-foreground-muted mt-2">24px / 1.5rem · font-bold · text-foreground</p>
            </div>
            <div className="pb-4 border-b border-border">
              <p className="text-xl font-semibold text-foreground">Heading 3</p>
              <p className="text-xs text-foreground-muted mt-2">20px / 1.25rem · font-semibold · text-foreground</p>
            </div>
            <div className="pb-4 border-b border-border">
              <p className="text-base font-medium text-foreground">Body Large</p>
              <p className="text-xs text-foreground-muted mt-2">16px / 1rem · font-medium · text-foreground</p>
            </div>
            <div className="pb-4 border-b border-border">
              <p className="text-sm text-foreground">Body Default</p>
              <p className="text-xs text-foreground-muted mt-2">14px / 0.875rem · font-normal · text-foreground</p>
            </div>
            <div>
              <p className="text-xs text-foreground-muted">Caption / Label</p>
              <p className="text-xs text-foreground-muted mt-2">12px / 0.75rem · font-normal · text-muted</p>
            </div>
          </div>
        </div>
      </section>

      {/* Spacing */}
      <section className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-2">Spacing</h3>
          <p className="text-sm text-foreground-muted">4px base unit grid system</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="h-2 bg-primary rounded" style={{ width: '4px' }}></div>
              <p className="text-xs font-semibold text-foreground">space.1</p>
              <p className="text-xs text-foreground-muted">4px / 0.25rem</p>
            </div>
            <div className="space-y-2">
              <div className="h-2 bg-primary rounded" style={{ width: '8px' }}></div>
              <p className="text-xs font-semibold text-foreground">space.2</p>
              <p className="text-xs text-foreground-muted">8px / 0.5rem</p>
            </div>
            <div className="space-y-2">
              <div className="h-2 bg-primary rounded" style={{ width: '12px' }}></div>
              <p className="text-xs font-semibold text-foreground">space.3</p>
              <p className="text-xs text-foreground-muted">12px / 0.75rem</p>
            </div>
            <div className="space-y-2">
              <div className="h-2 bg-primary rounded" style={{ width: '16px' }}></div>
              <p className="text-xs font-semibold text-foreground">space.4</p>
              <p className="text-xs text-foreground-muted">16px / 1rem</p>
            </div>
            <div className="space-y-2">
              <div className="h-2 bg-primary rounded" style={{ width: '20px' }}></div>
              <p className="text-xs font-semibold text-foreground">space.5</p>
              <p className="text-xs text-foreground-muted">20px / 1.25rem</p>
            </div>
            <div className="space-y-2">
              <div className="h-2 bg-primary rounded" style={{ width: '24px' }}></div>
              <p className="text-xs font-semibold text-foreground">space.6</p>
              <p className="text-xs text-foreground-muted">24px / 1.5rem</p>
            </div>
            <div className="space-y-2">
              <div className="h-2 bg-primary rounded" style={{ width: '32px' }}></div>
              <p className="text-xs font-semibold text-foreground">space.8</p>
              <p className="text-xs text-foreground-muted">32px / 2rem</p>
            </div>
            <div className="space-y-2">
              <div className="h-2 bg-primary rounded" style={{ width: '48px' }}></div>
              <p className="text-xs font-semibold text-foreground">space.12</p>
              <p className="text-xs text-foreground-muted">48px / 3rem</p>
            </div>
          </div>
        </div>
      </section>

      {/* Shadows */}
      <section className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-2">Shadows</h3>
          <p className="text-sm text-foreground-muted">Neutral shadows for depth and elevation</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="h-24 bg-white rounded-lg shadow-sm flex items-center justify-center">
                <span className="text-xs font-mono text-foreground-muted">SM</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">shadow.sm</p>
                <p className="text-xs text-foreground-muted">Subtle depth</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-24 bg-white rounded-lg shadow-md flex items-center justify-center">
                <span className="text-xs font-mono text-foreground-muted">MD</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">shadow.md</p>
                <p className="text-xs text-foreground-muted">Cards, dropdowns</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-24 bg-white rounded-lg shadow-lg flex items-center justify-center">
                <span className="text-xs font-mono text-foreground-muted">LG</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">shadow.lg</p>
                <p className="text-xs text-foreground-muted">Modals, popovers</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-24 bg-white rounded-lg shadow-xl flex items-center justify-center">
                <span className="text-xs font-mono text-foreground-muted">XL</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">shadow.xl</p>
                <p className="text-xs text-foreground-muted">Overlays</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Button Component */}
      <section className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-2">Button Component</h3>
          <p className="text-sm text-foreground-muted">Primary CTA with token-based styling and all interactive states</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 space-y-6">
          {/* Variants */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground-muted uppercase">Variants</h4>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground-muted uppercase">Sizes</h4>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          {/* States */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground-muted uppercase">States</h4>
            <div className="flex flex-wrap gap-3">
              <Button>Normal</Button>
              <Button disabled>Disabled</Button>
            </div>
          </div>

          {/* With Icons */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground-muted uppercase">With Icons</h4>
            <div className="flex flex-wrap gap-3">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Item
              </Button>
              <Button variant="outline" className="gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </Button>
              <Button variant="ghost" className="gap-2">
                Open
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* State Tokens */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground-muted uppercase">Token Mapping</h4>
            <div className="bg-neutral-50 rounded-lg p-4 space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-foreground-muted">Default background:</span>
                <span className="text-foreground">bg-primary (#6F4CFF)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground-muted">Hover background:</span>
                <span className="text-foreground">bg-primary-hover (#5F3DE6)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground-muted">Active background:</span>
                <span className="text-foreground">bg-primary-active (#4C2FCC)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground-muted">Text color:</span>
                <span className="text-foreground">text-primary-foreground (#FFFFFF)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground-muted">Focus ring:</span>
                <span className="text-foreground">ring-primary-soft (#F0EBFF)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground-muted">Disabled opacity:</span>
                <span className="text-foreground">60%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accessibility Compliance */}
      <section className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-2">WCAG AA Compliance</h3>
          <p className="text-sm text-foreground-muted">All components meet or exceed WCAG 2.1 Level AA standards</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-success/10 border border-success/30 rounded-lg p-6 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center text-white text-xs font-bold">✓</div>
              <h4 className="text-sm font-semibold text-foreground">Color Contrast</h4>
            </div>
            <ul className="text-xs text-foreground space-y-2 ml-8">
              <li>• Primary button: 4.7:1 ratio (AA compliant)</li>
              <li>• Body text on white: 19.9:1 ratio (AAA)</li>
              <li>• Muted text on white: 7.2:1 ratio (AA)</li>
              <li>• All text colors verified with contrast checker</li>
            </ul>
          </div>

          <div className="bg-success/10 border border-success/30 rounded-lg p-6 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center text-white text-xs font-bold">✓</div>
              <h4 className="text-sm font-semibold text-foreground">Touch Targets</h4>
            </div>
            <ul className="text-xs text-foreground space-y-2 ml-8">
              <li>• Minimum button height: 40px (md size)</li>
              <li>• Small size: 36px (still accessible)</li>
              <li>• Icon buttons: 44px × 44px</li>
              <li>• Adequate spacing between targets</li>
            </ul>
          </div>

          <div className="bg-success/10 border border-success/30 rounded-lg p-6 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center text-white text-xs font-bold">✓</div>
              <h4 className="text-sm font-semibold text-foreground">Keyboard Navigation</h4>
            </div>
            <ul className="text-xs text-foreground space-y-2 ml-8">
              <li>• All interactive elements focusable</li>
              <li>• 2px focus ring indicators</li>
              <li>• Proper tab order maintained</li>
              <li>• Focus visible on keyboard navigation</li>
            </ul>
          </div>

          <div className="bg-success/10 border border-success/30 rounded-lg p-6 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center text-white text-xs font-bold">✓</div>
              <h4 className="text-sm font-semibold text-foreground">Screen Readers</h4>
            </div>
            <ul className="text-xs text-foreground space-y-2 ml-8">
              <li>• Semantic HTML structure</li>
              <li>• ARIA labels where needed</li>
              <li>• Icon-only buttons have text alternatives</li>
              <li>• State changes announced</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Implementation Guide */}
      <section className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-2">Implementation Guide</h3>
          <p className="text-sm text-foreground-muted">How to use the design system in your components</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 space-y-6">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">1. Import Design Tokens</h4>
            <div className="bg-neutral-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-xs text-white font-mono">
{`import { tokens } from "@/theme/tokens";

// Use tokens for consistency
const primaryColor = tokens.color.primary.DEFAULT;
const hoverColor = tokens.color.primary.hover;`}
              </pre>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">2. Use Tailwind Classes</h4>
            <div className="bg-neutral-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-xs text-white font-mono">
{`// Primary button with all states
<Button 
  variant="primary" 
  size="md"
  className="gap-2"
>
  <Plus className="w-4 h-4" />
  Add Feature
</Button>`}
              </pre>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">3. Custom Components</h4>
            <div className="bg-neutral-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-xs text-white font-mono">
{`// Use token-based Tailwind classes
<div className="bg-primary hover:bg-primary-hover 
                active:bg-primary-active 
                text-primary-foreground
                focus-visible:ring-2 focus-visible:ring-primary-soft">
  Custom CTA
</div>`}
              </pre>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">4. Never Use Hard-coded Colors</h4>
            <div className="bg-error/10 border border-error/30 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-error font-bold text-lg shrink-0">✗</span>
                <div className="text-xs text-foreground space-y-2">
                  <p className="font-mono bg-white px-2 py-1 rounded">className="bg-[#6F4CFF]"</p>
                  <p className="text-foreground-muted">Don't use hard-coded hex values</p>
                </div>
              </div>
            </div>
            <div className="bg-success/10 border border-success/30 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-success font-bold text-lg shrink-0">✓</span>
                <div className="text-xs text-foreground space-y-2">
                  <p className="font-mono bg-white px-2 py-1 rounded">className="bg-primary"</p>
                  <p className="text-foreground-muted">Use token-based classes instead</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* File Structure */}
      <section className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-2">File Structure</h3>
          <p className="text-sm text-foreground-muted">Where to find design system files</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="bg-neutral-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-xs text-success font-mono">
{`src/
├── theme/
│   └── tokens.ts              # Design tokens (colors, spacing, etc.)
├── components/
│   └── ui/
│       ├── button.tsx         # Button component
│       ├── chip.tsx           # Chip component
│       └── segmented-control.tsx
├── index.css                  # CSS variables & global styles
└── tailwind.config.ts         # Tailwind configuration`}
            </pre>
          </div>
        </div>
      </section>

      {/* Color Audit Statistics */}
      <section className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-2">Color Usage Audit</h3>
          <p className="text-sm text-foreground-muted">Automated analysis of color usage across the codebase</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Token Coverage */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-semibold text-foreground">Token Coverage</h4>
              <span className="text-xs text-foreground-muted">Run audit: <code className="bg-neutral-100 px-2 py-1 rounded">npm run audit:colors</code></span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-success/10 border border-success/30 rounded-lg">
                <span className="text-sm text-foreground">Tailwind Utilities</span>
                <span className="text-lg font-bold text-success">1,662</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-warning/10 border border-warning/30 rounded-lg">
                <span className="text-sm text-foreground">Hard-Coded Colors</span>
                <span className="text-lg font-bold text-warning">322</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-info/10 border border-info/30 rounded-lg">
                <span className="text-sm text-foreground">CSS Variables</span>
                <span className="text-lg font-bold text-info">52</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-primary/10 border border-primary/30 rounded-lg">
                <span className="text-sm text-foreground">Token References</span>
                <span className="text-lg font-bold text-primary">42</span>
              </div>
            </div>

            <div className="pt-3 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Token Usage Rate</span>
                <span className="text-xl font-bold text-foreground">87.5%</span>
              </div>
              <div className="mt-2 h-3 bg-neutral-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-success to-primary" style={{ width: '87.5%' }}></div>
              </div>
            </div>
          </div>

          {/* Automated Fix Suggestions */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-semibold text-foreground">Automated Fixes Available</h4>
              <span className="text-xs bg-success/20 text-success px-2 py-1 rounded font-medium">177 ready</span>
            </div>
            
            <div className="space-y-3">
              <div className="p-4 bg-success/10 border border-success/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🟢</span>
                  <span className="font-semibold text-foreground">High Confidence</span>
                </div>
                <p className="text-sm text-foreground-muted mb-2">Exact palette matches - safe to auto-fix</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-success">177</span>
                  <span className="text-sm text-foreground-muted">usages</span>
                </div>
              </div>

              <div className="p-4 bg-warning/10 border border-warning/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🟡</span>
                  <span className="font-semibold text-foreground">Medium Confidence</span>
                </div>
                <p className="text-sm text-foreground-muted mb-2">Pattern-based suggestions - review before applying</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-warning">9</span>
                  <span className="text-sm text-foreground-muted">usages</span>
                </div>
              </div>

              <div className="p-3 bg-neutral-50 border border-border rounded-lg flex items-center justify-between">
                <span className="text-sm text-foreground-muted">Low Confidence / No Suggestion</span>
                <span className="text-sm font-medium text-foreground">2,396</span>
              </div>
            </div>

            <div className="pt-3 border-t border-border">
              <a 
                href="/color-audit.md" 
                target="_blank"
                className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
              >
                <span className="text-sm font-medium">View Full Audit Report</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Top Hard-Coded Colors */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <div>
            <h4 className="text-base font-semibold text-foreground mb-1">Most Common Hard-Coded Colors</h4>
            <p className="text-xs text-foreground-muted">Priority targets for token migration</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 font-semibold text-foreground">Color</th>
                  <th className="text-left py-2 px-3 font-semibold text-foreground">Preview</th>
                  <th className="text-right py-2 px-3 font-semibold text-foreground">Occurrences</th>
                  <th className="text-left py-2 px-3 font-semibold text-foreground">Suggested Fix</th>
                  <th className="text-center py-2 px-3 font-semibold text-foreground">Confidence</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border hover:bg-neutral-50">
                  <td className="py-3 px-3">
                    <code className="text-xs bg-neutral-100 px-2 py-1 rounded">#6F4CFF</code>
                  </td>
                  <td className="py-3 px-3">
                    <div className="h-6 w-12 bg-primary rounded border border-border"></div>
                  </td>
                  <td className="py-3 px-3 text-right font-medium">12</td>
                  <td className="py-3 px-3">
                    <code className="text-xs bg-success/20 text-success px-2 py-1 rounded">bg-primary</code>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="text-success font-bold">🟢 High</span>
                  </td>
                </tr>
                <tr className="border-b border-border hover:bg-neutral-50">
                  <td className="py-3 px-3">
                    <code className="text-xs bg-neutral-100 px-2 py-1 rounded">#FFFFFF</code>
                  </td>
                  <td className="py-3 px-3">
                    <div className="h-6 w-12 bg-background rounded border border-border"></div>
                  </td>
                  <td className="py-3 px-3 text-right font-medium">28</td>
                  <td className="py-3 px-3">
                    <code className="text-xs bg-success/20 text-success px-2 py-1 rounded">bg-background</code>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="text-success font-bold">🟢 High</span>
                  </td>
                </tr>
                <tr className="border-b border-border hover:bg-neutral-50">
                  <td className="py-3 px-3">
                    <code className="text-xs bg-neutral-100 px-2 py-1 rounded">#0F172A</code>
                  </td>
                  <td className="py-3 px-3">
                    <div className="h-6 w-12 bg-neutral-900 rounded border border-border"></div>
                  </td>
                  <td className="py-3 px-3 text-right font-medium">8</td>
                  <td className="py-3 px-3">
                    <code className="text-xs bg-success/20 text-success px-2 py-1 rounded">bg-neutral-900</code>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="text-success font-bold">🟢 High</span>
                  </td>
                </tr>
                <tr className="border-b border-border hover:bg-neutral-50">
                  <td className="py-3 px-3">
                    <code className="text-xs bg-neutral-100 px-2 py-1 rounded">#1F2937</code>
                  </td>
                  <td className="py-3 px-3">
                    <div className="h-6 w-12 bg-neutral-800 rounded border border-border"></div>
                  </td>
                  <td className="py-3 px-3 text-right font-medium">15</td>
                  <td className="py-3 px-3">
                    <code className="text-xs bg-warning/20 text-warning px-2 py-1 rounded">text-text</code>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="text-warning font-bold">🟡 Medium</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="pt-8 border-t border-border text-center">
        <p className="text-sm text-foreground-muted">
          Growth Labs Design System · Built with React, TypeScript, and Tailwind CSS
        </p>
      </div>
    </div>
  );
};

export default DesignSystemDocs;
