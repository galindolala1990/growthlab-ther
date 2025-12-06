import React from "react";
import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

/**
 * Color System Foundation
 * 
 * Complete overview of the Growth Labs color palette including brand colors,
 * neutral scales, and semantic status colors with WCAG AA compliance.
 */

const ColorSystem = () => {
  return (
    <div className="container mx-auto p-8 max-w-7xl space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Color System
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Our color system is built on design tokens ensuring consistency and WCAG AA 
          accessibility across all interfaces. All colors are defined in <code className="px-2 py-1 bg-muted rounded text-sm">src/theme/tokens.ts</code>.
        </p>
      </div>

      {/* Quick Reference */}
      <Card className="p-6 bg-info/10 border-info/30">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-info rounded-lg">
            <ExternalLink className="h-5 w-5 text-white" />
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Quick Reference</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Brand colors for primary CTAs and key UI elements</li>
              <li>• Neutral grays for text, backgrounds, and borders</li>
              <li>• Semantic colors for status and feedback</li>
              <li>• All colors meet WCAG AA contrast standards</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Primary Brand Colors */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Primary Brand Colors (Purple)</h2>
          <p className="text-sm text-muted-foreground">Main brand purple used for primary CTAs and key UI elements</p>
        </div>

        <Card className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-24 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-mono text-sm">DEFAULT</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">bg-primary</p>
                <p className="text-xs text-muted-foreground font-mono">#6F4CFF</p>
                <p className="text-xs text-success">✓ WCAG AA with white text</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-24 bg-primary-hover rounded-lg flex items-center justify-center">
                <span className="text-white font-mono text-sm">HOVER</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">bg-primary-hover</p>
                <p className="text-xs text-muted-foreground font-mono">#5F3DE6</p>
                <p className="text-xs text-muted-foreground">Hover state</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-24 bg-primary-active rounded-lg flex items-center justify-center">
                <span className="text-white font-mono text-sm">ACTIVE</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">bg-primary-active</p>
                <p className="text-xs text-muted-foreground font-mono">#4C2FCC</p>
                <p className="text-xs text-muted-foreground">Active/pressed state</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-24 bg-primary-soft rounded-lg border-2 border-primary/30 flex items-center justify-center">
                <span className="text-primary font-mono text-sm">SOFT</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">bg-primary-soft</p>
                <p className="text-xs text-muted-foreground font-mono">#F0EBFF</p>
                <p className="text-xs text-warning">⚠ Background only, not for text</p>
              </div>
            </div>
          </div>

          {/* Primary Purple Scale */}
          <div className="pt-4 border-t border-border">
            <h4 className="text-sm font-semibold text-foreground mb-3">Full Primary Purple Scale (50-900)</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              <div className="space-y-1">
                <div className="h-20 bg-primary-50 rounded-lg border border-border"></div>
                <p className="text-xs font-mono text-muted-foreground">primary-50</p>
                <p className="text-xs font-mono text-muted-foreground">#F0EBFF</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-primary-100 rounded-lg"></div>
                <p className="text-xs font-mono text-muted-foreground">primary-100</p>
                <p className="text-xs font-mono text-muted-foreground">#DDD4FF</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-primary-300 rounded-lg"></div>
                <p className="text-xs font-mono text-muted-foreground">primary-300</p>
                <p className="text-xs font-mono text-muted-foreground">#A48BFF</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">500 ★</span>
                </div>
                <p className="text-xs font-mono text-muted-foreground">primary (500)</p>
                <p className="text-xs font-mono text-muted-foreground">#6F4CFF</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-primary-600 rounded-lg"></div>
                <p className="text-xs font-mono text-muted-foreground">primary-600</p>
                <p className="text-xs font-mono text-muted-foreground">#5F3DE6</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-primary-700 rounded-lg"></div>
                <p className="text-xs font-mono text-muted-foreground">primary-700</p>
                <p className="text-xs font-mono text-muted-foreground">#4C2FCC</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-primary-900 rounded-lg"></div>
                <p className="text-xs font-mono text-muted-foreground">primary-900</p>
                <p className="text-xs font-mono text-muted-foreground">#2B1A73</p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Accent Teal Colors */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Accent Colors (Teal)</h2>
          <p className="text-sm text-muted-foreground">Secondary brand color for accents, highlights, and complementary elements</p>
        </div>

        <Card className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-24 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-mono text-sm">DEFAULT</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">bg-accent</p>
                <p className="text-xs text-muted-foreground font-mono">#0F766E</p>
                <p className="text-xs text-success">✓ WCAG AA compliant</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-24 bg-accent-hover rounded-lg flex items-center justify-center">
                <span className="text-white font-mono text-sm">HOVER</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">bg-accent-hover</p>
                <p className="text-xs text-muted-foreground font-mono">#0B615B</p>
                <p className="text-xs text-muted-foreground">Hover state</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-24 bg-accent-teal-300 rounded-lg flex items-center justify-center">
                <span className="text-white font-mono text-sm">LIGHT</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">bg-accent-teal-300</p>
                <p className="text-xs text-muted-foreground font-mono">#4FB9AF</p>
                <p className="text-xs text-muted-foreground">Light variant</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-24 bg-accent-soft rounded-lg border-2 border-accent/30 flex items-center justify-center">
                <span className="text-accent font-mono text-sm">SOFT</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">bg-accent-soft</p>
                <p className="text-xs text-muted-foreground font-mono">#E6F7F5</p>
                <p className="text-xs text-warning">⚠ Background only</p>
              </div>
            </div>
          </div>

          {/* Accent Teal Scale */}
          <div className="pt-4 border-t border-border">
            <h4 className="text-sm font-semibold text-foreground mb-3">Full Accent Teal Scale (50-900)</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              <div className="space-y-1">
                <div className="h-20 bg-accent-teal-50 rounded-lg border border-border"></div>
                <p className="text-xs font-mono text-muted-foreground">teal-50</p>
                <p className="text-xs font-mono text-muted-foreground">#E6F7F5</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-accent-teal-100 rounded-lg"></div>
                <p className="text-xs font-mono text-muted-foreground">teal-100</p>
                <p className="text-xs font-mono text-muted-foreground">#CCEFE9</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-accent-teal-300 rounded-lg"></div>
                <p className="text-xs font-mono text-muted-foreground">teal-300</p>
                <p className="text-xs font-mono text-muted-foreground">#4FB9AF</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-accent rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">500 ★</span>
                </div>
                <p className="text-xs font-mono text-muted-foreground">accent (500)</p>
                <p className="text-xs font-mono text-muted-foreground">#0F766E</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-accent-teal-600 rounded-lg"></div>
                <p className="text-xs font-mono text-muted-foreground">teal-600</p>
                <p className="text-xs font-mono text-muted-foreground">#0B615B</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-accent-teal-700 rounded-lg"></div>
                <p className="text-xs font-mono text-muted-foreground">teal-700</p>
                <p className="text-xs font-mono text-muted-foreground">#064E47</p>
              </div>
              <div className="space-y-1">
                <div className="h-20 bg-accent-teal-900 rounded-lg"></div>
                <p className="text-xs font-mono text-muted-foreground">teal-900</p>
                <p className="text-xs font-mono text-muted-foreground">#032C28</p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Neutral Grays */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Neutral Grays</h2>
          <p className="text-sm text-muted-foreground">Consistent gray scale for text, backgrounds, and borders</p>
        </div>

        <Card className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-9 gap-3">
            <div className="space-y-1">
              <div className="h-20 bg-neutral-0 rounded-lg border border-border"></div>
              <p className="text-xs font-mono text-muted-foreground">neutral-0</p>
              <p className="text-xs font-mono text-muted-foreground">#FFFFFF</p>
            </div>
            <div className="space-y-1">
              <div className="h-20 bg-neutral-50 rounded-lg border border-border"></div>
              <p className="text-xs font-mono text-muted-foreground">neutral-50</p>
              <p className="text-xs font-mono text-muted-foreground">#F9FAFB</p>
            </div>
            <div className="space-y-1">
              <div className="h-20 bg-neutral-100 rounded-lg"></div>
              <p className="text-xs font-mono text-muted-foreground">neutral-100</p>
              <p className="text-xs font-mono text-muted-foreground">#F3F4F6</p>
            </div>
            <div className="space-y-1">
              <div className="h-20 bg-neutral-200 rounded-lg"></div>
              <p className="text-xs font-mono text-muted-foreground">neutral-200</p>
              <p className="text-xs font-mono text-muted-foreground">#E5E7EB</p>
            </div>
            <div className="space-y-1">
              <div className="h-20 bg-neutral-300 rounded-lg"></div>
              <p className="text-xs font-mono text-muted-foreground">neutral-300</p>
              <p className="text-xs font-mono text-muted-foreground">#D1D5DB</p>
            </div>
            <div className="space-y-1">
              <div className="h-20 bg-neutral-500 rounded-lg"></div>
              <p className="text-xs font-mono text-muted-foreground">neutral-500</p>
              <p className="text-xs font-mono text-muted-foreground">#6B7280</p>
            </div>
            <div className="space-y-1">
              <div className="h-20 bg-neutral-700 rounded-lg"></div>
              <p className="text-xs font-mono text-muted-foreground">neutral-700</p>
              <p className="text-xs font-mono text-muted-foreground">#374151</p>
            </div>
            <div className="space-y-1">
              <div className="h-20 bg-neutral-800 rounded-lg"></div>
              <p className="text-xs font-mono text-muted-foreground">neutral-800</p>
              <p className="text-xs font-mono text-muted-foreground">#1F2933</p>
            </div>
            <div className="space-y-1">
              <div className="h-20 bg-neutral-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">900</span>
              </div>
              <p className="text-xs font-mono text-muted-foreground">neutral-900</p>
              <p className="text-xs font-mono text-muted-foreground">#0F172A</p>
            </div>
          </div>
        </Card>
      </section>

      {/* Success (Green) */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Success Colors (Green)</h2>
          <p className="text-sm text-muted-foreground">Semantic green for success states, positive feedback, and completion indicators</p>
        </div>

        <Card className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-9 gap-3">
            <div className="space-y-1">
              <div className="h-20 bg-success-50 rounded-lg border border-border"></div>
              <p className="text-xs font-mono text-muted-foreground">success-50</p>
              <p className="text-xs font-mono text-muted-foreground">#ECFDF3</p>
            </div>
            <div className="space-y-1">
              <div className="h-20 bg-success-100 rounded-lg"></div>
              <p className="text-xs font-mono text-muted-foreground">success-100</p>
              <p className="text-xs font-mono text-muted-foreground">#D1FAE5</p>
            </div>
            <div className="space-y-1">
              <div className="h-20 bg-success-300 rounded-lg"></div>
              <p className="text-xs font-mono text-muted-foreground">success-300</p>
              <p className="text-xs font-mono text-muted-foreground">#4ADE80</p>
            </div>
            <div className="space-y-1">
              <div className="h-20 bg-success-500 rounded-lg"></div>
              <p className="text-xs font-mono text-muted-foreground">success-500</p>
              <p className="text-xs font-mono text-muted-foreground">#22C55E</p>
            </div>
            <div className="space-y-1">
              <div className="h-20 bg-success rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">600 ★</span>
              </div>
              <p className="text-xs font-mono text-muted-foreground">success (600)</p>
              <p className="text-xs font-mono text-muted-foreground">#15803D</p>
            </div>
            <div className="space-y-1">
              <div className="h-20 bg-success-700 rounded-lg"></div>
              <p className="text-xs font-mono text-muted-foreground">success-700</p>
              <p className="text-xs font-mono text-muted-foreground">#16A34A</p>
            </div>
            <div className="space-y-1">
              <div className="h-20 bg-success-800 rounded-lg"></div>
              <p className="text-xs font-mono text-muted-foreground">success-800</p>
              <p className="text-xs font-mono text-muted-foreground">#166534</p>
            </div>
            <div className="space-y-1">
              <div className="h-20 bg-success-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">900</span>
              </div>
              <p className="text-xs font-mono text-muted-foreground">success-900</p>
              <p className="text-xs font-mono text-muted-foreground">#14532D</p>
            </div>
            <div className="space-y-1">
              <div className="h-20 bg-success-soft rounded-lg border-2 border-success/30 flex items-center justify-center">
                <span className="text-success font-mono text-xs">SOFT</span>
              </div>
              <p className="text-xs font-mono text-muted-foreground">success-soft</p>
              <p className="text-xs font-mono text-muted-foreground">#ECFDF3</p>
            </div>
          </div>
        </Card>
      </section>

      {/* Danger/Error (Red) */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Danger/Error Colors (Red)</h2>
          <p className="text-sm text-muted-foreground">Semantic red for error states, destructive actions, and critical alerts</p>
        </div>

        <Card className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-9 gap-3">
            <div className="space-y-1">
              <div className="h-20 bg-danger-50 rounded-lg border border-border"></div>
              <p className="text-xs font-mono text-muted-foreground">danger-50</p>
              <p className="text-xs font-mono text-muted-foreground">#FEF2F2</p>
            </div>
            <div className="space-y-1">
              <div className="h-20 bg-danger-100 rounded-lg"></div>
              <p className="text-xs font-mono text-muted-foreground">danger-100</p>
              <p className="text-xs font-mono text-muted-foreground">#FEE2E2</p>
            </div>
            <div className="space-y-1">
              <div className="h-20 bg-danger-300 rounded-lg"></div>
              <p className="text-xs font-mono text-muted-foreground">danger-300</p>
              <p className="text-xs font-mono text-muted-foreground">#FCA5A5</p>
            </div>
            <div className="space-y-1">
              <div className="h-20 bg-danger rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">500 ★</span>
              </div>
              <p className="text-xs font-mono text-muted-foreground">danger (500)</p>
              <p className="text-xs font-mono text-muted-foreground">#DC2626</p>
            </div>
            <div className="space-y-1">
              <div className="h-20 bg-danger-600 rounded-lg"></div>
              <p className="text-xs font-mono text-muted-foreground">danger-600</p>
              <p className="text-xs font-mono text-muted-foreground">#B91C1C</p>
            </div>
            <div className="space-y-1">
              <div className="h-20 bg-danger-700 rounded-lg"></div>
              <p className="text-xs font-mono text-muted-foreground">danger-700</p>
              <p className="text-xs font-mono text-muted-foreground">#991B1B</p>
            </div>
            <div className="space-y-1">
              <div className="h-20 bg-danger-800 rounded-lg"></div>
              <p className="text-xs font-mono text-muted-foreground">danger-800</p>
              <p className="text-xs font-mono text-muted-foreground">#7F1D1D</p>
            </div>
            <div className="space-y-1">
              <div className="h-20 bg-danger-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">900</span>
              </div>
              <p className="text-xs font-mono text-muted-foreground">danger-900</p>
              <p className="text-xs font-mono text-muted-foreground">#450A0A</p>
            </div>
            <div className="space-y-1">
              <div className="h-20 bg-danger-soft rounded-lg border-2 border-danger/30 flex items-center justify-center">
                <span className="text-danger font-mono text-xs">SOFT</span>
              </div>
              <p className="text-xs font-mono text-muted-foreground">danger-soft</p>
              <p className="text-xs font-mono text-muted-foreground">#FEF2F2</p>
            </div>
          </div>
        </Card>
      </section>

      {/* Warning (Amber) */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Warning Colors (Amber)</h2>
          <p className="text-sm text-muted-foreground">Semantic amber/orange for warnings, caution states, and attention indicators</p>
        </div>

        <Card className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-9 gap-3">
            <div className="space-y-1">
              <div className="h-20 bg-warning-50 rounded-lg border border-border"></div>
              <p className="text-xs font-mono text-muted-foreground">warning-50</p>
              <p className="text-xs font-mono text-muted-foreground">#FFFBEB</p>
            </div>
            <div className="space-y-1">
              <div className="h-20 bg-warning-100 rounded-lg"></div>
              <p className="text-xs font-mono text-muted-foreground">warning-100</p>
              <p className="text-xs font-mono text-muted-foreground">#FEF3C7</p>
            </div>
            <div className="space-y-1">
              <div className="h-20 bg-warning-300 rounded-lg"></div>
              <p className="text-xs font-mono text-muted-foreground">warning-300</p>
              <p className="text-xs font-mono text-muted-foreground">#FACC15</p>
            </div>
            <div className="space-y-1">
              <div className="h-20 bg-warning-500 rounded-lg"></div>
              <p className="text-xs font-mono text-muted-foreground">warning-500</p>
              <p className="text-xs font-mono text-muted-foreground">#D97706</p>
            </div>
            <div className="space-y-1">
              <div className="h-20 bg-warning rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">600 ★</span>
              </div>
              <p className="text-xs font-mono text-muted-foreground">warning (600)</p>
              <p className="text-xs font-mono text-muted-foreground">#B45309</p>
            </div>
            <div className="space-y-1">
              <div className="h-20 bg-warning-700 rounded-lg"></div>
              <p className="text-xs font-mono text-muted-foreground">warning-700</p>
              <p className="text-xs font-mono text-muted-foreground">#92400E</p>
            </div>
            <div className="space-y-1">
              <div className="h-20 bg-warning-800 rounded-lg"></div>
              <p className="text-xs font-mono text-muted-foreground">warning-800</p>
              <p className="text-xs font-mono text-muted-foreground">#78350F</p>
            </div>
            <div className="space-y-1">
              <div className="h-20 bg-warning-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">900</span>
              </div>
              <p className="text-xs font-mono text-muted-foreground">warning-900</p>
              <p className="text-xs font-mono text-muted-foreground">#451A03</p>
            </div>
            <div className="space-y-1">
              <div className="h-20 bg-warning-soft rounded-lg border-2 border-warning/30 flex items-center justify-center">
                <span className="text-warning font-mono text-xs">SOFT</span>
              </div>
              <p className="text-xs font-mono text-muted-foreground">warning-soft</p>
              <p className="text-xs font-mono text-muted-foreground">#FFFBEB</p>
            </div>
          </div>
        </Card>
      </section>

      {/* Info (Blue) */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Info Colors (Blue)</h2>
          <p className="text-sm text-muted-foreground">Semantic blue for informational messages, tips, and neutral notifications</p>
        </div>

        <Card className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-9 gap-3">
            <div className="space-y-1">
              <div className="h-20 bg-info-50 rounded-lg border border-border"></div>
              <p className="text-xs font-mono text-muted-foreground">info-50</p>
              <p className="text-xs font-mono text-muted-foreground">#EFF6FF</p>
            </div>
            <div className="space-y-1">
              <div className="h-20 bg-info-100 rounded-lg"></div>
              <p className="text-xs font-mono text-muted-foreground">info-100</p>
              <p className="text-xs font-mono text-muted-foreground">#DBEAFE</p>
            </div>
            <div className="space-y-1">
              <div className="h-20 bg-info-300 rounded-lg"></div>
              <p className="text-xs font-mono text-muted-foreground">info-300</p>
              <p className="text-xs font-mono text-muted-foreground">#60A5FA</p>
            </div>
            <div className="space-y-1">
              <div className="h-20 bg-info rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">500 ★</span>
              </div>
              <p className="text-xs font-mono text-muted-foreground">info (500)</p>
              <p className="text-xs font-mono text-muted-foreground">#2563EB</p>
            </div>
            <div className="space-y-1">
              <div className="h-20 bg-info-600 rounded-lg"></div>
              <p className="text-xs font-mono text-muted-foreground">info-600</p>
              <p className="text-xs font-mono text-muted-foreground">#1D4ED8</p>
            </div>
            <div className="space-y-1">
              <div className="h-20 bg-info-700 rounded-lg"></div>
              <p className="text-xs font-mono text-muted-foreground">info-700</p>
              <p className="text-xs font-mono text-muted-foreground">#1E40AF</p>
            </div>
            <div className="space-y-1">
              <div className="h-20 bg-info-800 rounded-lg"></div>
              <p className="text-xs font-mono text-muted-foreground">info-800</p>
              <p className="text-xs font-mono text-muted-foreground">#1E3A8A</p>
            </div>
            <div className="space-y-1">
              <div className="h-20 bg-info-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">900</span>
              </div>
              <p className="text-xs font-mono text-muted-foreground">info-900</p>
              <p className="text-xs font-mono text-muted-foreground">#172554</p>
            </div>
            <div className="space-y-1">
              <div className="h-20 bg-info-soft rounded-lg border-2 border-info/30 flex items-center justify-center">
                <span className="text-info font-mono text-xs">SOFT</span>
              </div>
              <p className="text-xs font-mono text-muted-foreground">info-soft</p>
              <p className="text-xs font-mono text-muted-foreground">#EFF6FF</p>
            </div>
          </div>
        </Card>
      </section>

      {/* Usage Guidelines */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Usage Guidelines</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-6 space-y-3">
            <h3 className="text-lg font-semibold text-foreground">✓ Do</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Use primary purple for primary CTAs and key actions</li>
              <li>• Use accent teal sparingly for highlights and secondary accents</li>
              <li>• Use semantic colors (green, red, amber, blue) for status/feedback</li>
              <li>• Maintain WCAG AA contrast ratios (4.5:1 for text, 3:1 for UI)</li>
              <li>• Use design tokens instead of hard-coded hex values</li>
              <li>• Pair -soft backgrounds with darker text for readability</li>
            </ul>
          </Card>

          <Card className="p-6 space-y-3">
            <h3 className="text-lg font-semibold text-foreground">✗ Don't</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Don't use soft backgrounds for text (insufficient contrast)</li>
              <li>• Don't mix primary and accent in the same element</li>
              <li>• Don't create new color variants without adding to tokens</li>
              <li>• Don't skip accessibility testing for custom colors</li>
              <li>• Don't use semantic colors for branding (green ≠ brand)</li>
              <li>• Don't use hard-coded values like green-500, red-600</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Related Links */}
      <Card className="p-6 bg-muted/30">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">Related Resources</h3>
          <div className="flex gap-4 text-sm">
            <a href="/design-system/foundations/semantic" className="text-primary hover:underline">
              Semantic Colors →
            </a>
            <a href="/design-system/tokens/colors" className="text-primary hover:underline">
              Color Tokens →
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ColorSystem;
