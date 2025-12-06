import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ComponentAuditMetrics } from "@/components/design-system/ComponentAuditMetrics";
import { Plus, Settings, Zap } from "lucide-react";

/**
 * Button Component Documentation
 * 
 * Primary CTA and navigation buttons with variants, sizes, and states.
 */

const ButtonDocs = () => {
  return (
    <div className="container mx-auto p-8 max-w-7xl space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Button</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Primary CTA component with token-based styling, interactive states, and WCAG AA compliance.
        </p>
      </div>

      {/* Component Audit Report */}
      <ComponentAuditMetrics
        data={{
          totalInstances: 113,
          componentAdoption: 100,
          wcagCompliant: 100,
          issuesFound: 0,
          adoptionStatus: "active",
          keyFindings: [
            "✓ 113 Button instances across entire application",
            "✓ 100% adoption - fully standardized on design system component",
            "✓ All buttons meet focus ring and keyboard navigation requirements",
            "✓ Zero anti-patterns - all clickable elements use proper semantics",
            "✓ Comprehensive variant coverage: default, primary, destructive, outline, ghost"
          ],
          currentUsage: [
            "✓ Dashboard - Action buttons, CTAs, navigation controls",
            "✓ Roadmap - Feature actions, filters, view controls",
            "✓ Experiments - Experiment controls, variant management",
            "✓ Forms - Submit, cancel, and action buttons throughout",
            "✓ Modals & Dialogs - Primary and secondary actions",
            "✓ Navigation - Menu items, sidebar actions, breadcrumbs"
          ],
          designSystemStatus: [
            "✓ Canonical component - established standard for all button UI",
            "✓ 100% token compliance - all variants use semantic color tokens",
            "✓ Production-ready - stable API with comprehensive documentation"
          ]
        }}
        variant="default"
      />

      {/* When to Use */}
      <Card className="p-6 bg-primary-soft/30 border-primary/30">
        <h3 className="font-semibold text-foreground mb-2">When to use</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Primary actions: Submit, Save, Create, Add</li>
          <li>• Secondary actions: Cancel, Edit, Settings</li>
          <li>• Destructive actions: Delete, Remove (use destructive variant)</li>
          <li>• Navigation: When action changes route or context</li>
        </ul>
      </Card>

      {/* Playground */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Playground</h2>
        <Card className="p-6 space-y-6">
          {/* Variants */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase text-muted-foreground">Variants</h3>
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
            <h3 className="text-sm font-semibold uppercase text-muted-foreground">Sizes</h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          {/* With Icons */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase text-muted-foreground">With Icons</h3>
            <div className="flex flex-wrap gap-3">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Feature
              </Button>
              <Button variant="outline" className="gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
              <Button variant="ghost" className="gap-2">
                <Zap className="h-4 w-4" />
                Boost
              </Button>
            </div>
          </div>

          {/* States */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase text-muted-foreground">States</h3>
            <div className="flex flex-wrap gap-3">
              <Button>Normal</Button>
              <Button disabled>Disabled</Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Variant Guidelines */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Variant Guidelines</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Primary</h3>
              <Button size="sm">Example</Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Main action in a flow. Use sparingly (1-2 per view). Purple background with white text.
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Secondary</h3>
              <Button variant="secondary" size="sm">Example</Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Alternative actions. Neutral gray background, lower visual weight than primary.
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Outline</h3>
              <Button variant="outline" size="sm">Example</Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Tertiary actions, cancel, or inline with primary. Border only, transparent background.
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Ghost</h3>
              <Button variant="ghost" size="sm">Example</Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Low-priority actions, toolbar buttons. No border, minimal visual weight.
            </p>
          </Card>

          <Card className="p-6 space-y-3 md:col-span-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Destructive</h3>
              <Button variant="destructive" size="sm">Example</Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Destructive actions (delete, remove, reset). Red background with white text. Always confirm destructive actions.
            </p>
          </Card>
        </div>
      </section>

      {/* Accessibility */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Accessibility</h2>
        <Card className="p-6 space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">✓</div>
            <div>
              <p className="text-sm font-semibold text-foreground">WCAG AA Contrast</p>
              <p className="text-sm text-muted-foreground">Primary button: 4.7:1 contrast ratio (white on purple)</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">✓</div>
            <div>
              <p className="text-sm font-semibold text-foreground">Touch Target</p>
              <p className="text-sm text-muted-foreground">Minimum height 40px (medium size) meets mobile guidelines</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">✓</div>
            <div>
              <p className="text-sm font-semibold text-foreground">Focus Indicators</p>
              <p className="text-sm text-muted-foreground">2px visible ring on keyboard navigation (focus-visible)</p>
            </div>
          </div>
        </Card>
      </section>

      {/* API Reference */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Props</h2>
        <Card className="p-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 font-semibold text-foreground">Prop</th>
                <th className="text-left py-2 font-semibold text-foreground">Type</th>
                <th className="text-left py-2 font-semibold text-foreground">Default</th>
                <th className="text-left py-2 font-semibold text-foreground">Description</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border">
                <td className="py-2 font-mono text-xs">variant</td>
                <td className="py-2">primary | secondary | outline | ghost | destructive</td>
                <td className="py-2">primary</td>
                <td className="py-2">Visual style variant</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 font-mono text-xs">size</td>
                <td className="py-2">sm | md | lg</td>
                <td className="py-2">md</td>
                <td className="py-2">Button size</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 font-mono text-xs">disabled</td>
                <td className="py-2">boolean</td>
                <td className="py-2">false</td>
                <td className="py-2">Disabled state</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-xs">className</td>
                <td className="py-2">string</td>
                <td className="py-2">-</td>
                <td className="py-2">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </section>

      {/* Related */}
      <Card className="p-6 bg-muted/30">
        <h3 className="font-semibold text-foreground mb-2">Related</h3>
        <div className="flex gap-4 text-sm">
          <a href="/design-system/foundations/colors" className="text-primary hover:underline">Color System →</a>
          <a href="/design-system/patterns/forms" className="text-primary hover:underline">Form Patterns →</a>
        </div>
      </Card>
    </div>
  );
};

export default ButtonDocs;
