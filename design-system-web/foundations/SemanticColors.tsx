import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, XCircle, Info } from "lucide-react";

/**
 * Semantic Colors Foundation
 * 
 * Guidance on using semantic colors for status, feedback, and messaging.
 * Covers success, warning, danger, and info states with usage patterns.
 */

const SemanticColors = () => {
  return (
    <div className="container mx-auto p-8 max-w-7xl space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Semantic Colors
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Semantic colors communicate status, provide feedback, and guide user attention. 
          Use these colors consistently to create predictable, accessible interfaces.
        </p>
      </div>

      {/* Overview Grid */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-6 space-y-3">
          <div className="w-12 h-12 bg-success rounded-lg flex items-center justify-center">
            <CheckCircle2 className="h-6 w-6 text-white" />
          </div>
          <h3 className="font-semibold text-foreground">Success</h3>
          <p className="text-sm text-muted-foreground">Positive outcomes, completions</p>
        </Card>

        <Card className="p-6 space-y-3">
          <div className="w-12 h-12 bg-warning rounded-lg flex items-center justify-center">
            <AlertCircle className="h-6 w-6 text-white" />
          </div>
          <h3 className="font-semibold text-foreground">Warning</h3>
          <p className="text-sm text-muted-foreground">Caution, potential issues</p>
        </Card>

        <Card className="p-6 space-y-3">
          <div className="w-12 h-12 bg-danger rounded-lg flex items-center justify-center">
            <XCircle className="h-6 w-6 text-white" />
          </div>
          <h3 className="font-semibold text-foreground">Danger/Error</h3>
          <p className="text-sm text-muted-foreground">Errors, destructive actions</p>
        </Card>

        <Card className="p-6 space-y-3">
          <div className="w-12 h-12 bg-info rounded-lg flex items-center justify-center">
            <Info className="h-6 w-6 text-white" />
          </div>
          <h3 className="font-semibold text-foreground">Info</h3>
          <p className="text-sm text-muted-foreground">Neutral information, tips</p>
        </Card>
      </div>

      {/* Success Colors */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Success (Green)</h2>
          <p className="text-sm text-muted-foreground">Use for positive states, successful actions, and completion</p>
        </div>

        <Card className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-24 bg-success rounded-lg flex items-center justify-center">
                <span className="text-white font-mono text-sm">DEFAULT</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">bg-success</p>
                <p className="text-xs text-muted-foreground font-mono">#15803D</p>
                <p className="text-xs text-success">✓ Primary success color</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-24 bg-success-soft border border-success/30 rounded-lg flex items-center justify-center">
                <span className="text-success font-mono text-sm">SOFT</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">bg-success-soft</p>
                <p className="text-xs text-muted-foreground font-mono">#ECFDF3</p>
                <p className="text-xs text-muted-foreground">Backgrounds, highlights</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-24 bg-white border border-border rounded-lg flex items-center justify-center">
                <span className="text-success font-semibold">text-success</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">text-success</p>
                <p className="text-xs text-muted-foreground">Text and icons</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-24 bg-white border border-border rounded-lg flex items-center justify-center">
                <Badge variant="success">Live</Badge>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">Example</p>
                <p className="text-xs text-muted-foreground">Badge variant</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border space-y-3">
            <h4 className="text-sm font-semibold text-foreground">When to use</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Successful form submissions or operations</li>
              <li>• Positive status indicators ("Live", "Active", "Healthy")</li>
              <li>• Progress completion and achievements</li>
              <li>• Data within acceptable ranges</li>
            </ul>
          </div>
        </Card>
      </section>

      {/* Warning Colors */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Warning (Amber)</h2>
          <p className="text-sm text-muted-foreground">Use for cautionary states and potential issues</p>
        </div>

        <Card className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-24 bg-warning rounded-lg flex items-center justify-center">
                <span className="text-white font-mono text-sm">DEFAULT</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">bg-warning</p>
                <p className="text-xs text-muted-foreground font-mono">#B45309</p>
                <p className="text-xs text-warning">⚠ Primary warning color</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-24 bg-warning-soft border border-warning/30 rounded-lg flex items-center justify-center">
                <span className="text-warning font-mono text-sm">SOFT</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">bg-warning-soft</p>
                <p className="text-xs text-muted-foreground font-mono">#FFFBEB</p>
                <p className="text-xs text-muted-foreground">Backgrounds, highlights</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-24 bg-white border border-border rounded-lg flex items-center justify-center">
                <span className="text-warning font-semibold">text-warning</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">text-warning</p>
                <p className="text-xs text-muted-foreground">Text and icons</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-24 bg-white border border-border rounded-lg flex items-center justify-center">
                <Badge variant="warning">At Risk</Badge>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">Example</p>
                <p className="text-xs text-muted-foreground">Badge variant</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border space-y-3">
            <h4 className="text-sm font-semibold text-foreground">When to use</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Non-blocking errors or validation issues</li>
              <li>• Items approaching limits or deadlines</li>
              <li>• Important information requiring attention</li>
              <li>• Potentially risky actions (but not destructive)</li>
            </ul>
          </div>
        </Card>
      </section>

      {/* Danger/Error Colors */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Danger/Error (Red)</h2>
          <p className="text-sm text-muted-foreground">Use for errors, failures, and destructive actions</p>
        </div>

        <Card className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-24 bg-danger rounded-lg flex items-center justify-center">
                <span className="text-white font-mono text-sm">DEFAULT</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">bg-danger</p>
                <p className="text-xs text-muted-foreground font-mono">#DC2626</p>
                <p className="text-xs text-danger">✗ Primary error color</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-24 bg-danger-soft border border-danger/30 rounded-lg flex items-center justify-center">
                <span className="text-danger font-mono text-sm">SOFT</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">bg-danger-soft</p>
                <p className="text-xs text-muted-foreground font-mono">#FEF2F2</p>
                <p className="text-xs text-muted-foreground">Backgrounds, highlights</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-24 bg-white border border-border rounded-lg flex items-center justify-center">
                <span className="text-danger font-semibold">text-danger</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">text-danger</p>
                <p className="text-xs text-muted-foreground">Text and icons</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-24 bg-white border border-border rounded-lg flex items-center justify-center">
                <Badge variant="error">Critical</Badge>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">Example</p>
                <p className="text-xs text-muted-foreground">Badge variant</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border space-y-3">
            <h4 className="text-sm font-semibold text-foreground">When to use</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Form validation errors and failures</li>
              <li>• Critical system errors or outages</li>
              <li>• Destructive actions (delete, remove, reset)</li>
              <li>• Failed operations or transactions</li>
            </ul>
          </div>
        </Card>
      </section>

      {/* Info Colors */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Info (Blue)</h2>
          <p className="text-sm text-muted-foreground">Use for neutral information and helpful tips</p>
        </div>

        <Card className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-24 bg-info rounded-lg flex items-center justify-center">
                <span className="text-white font-mono text-sm">DEFAULT</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">bg-info</p>
                <p className="text-xs text-muted-foreground font-mono">#2563EB</p>
                <p className="text-xs text-info">ⓘ Primary info color</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-24 bg-info-soft border border-info/30 rounded-lg flex items-center justify-center">
                <span className="text-info font-mono text-sm">SOFT</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">bg-info-soft</p>
                <p className="text-xs text-muted-foreground font-mono">#EFF6FF</p>
                <p className="text-xs text-muted-foreground">Backgrounds, highlights</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-24 bg-white border border-border rounded-lg flex items-center justify-center">
                <span className="text-info font-semibold">text-info</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">text-info</p>
                <p className="text-xs text-muted-foreground">Text and icons</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-24 bg-white border border-border rounded-lg flex items-center justify-center">
                <Badge variant="neutral">Info</Badge>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">Example</p>
                <p className="text-xs text-muted-foreground">Badge variant</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border space-y-3">
            <h4 className="text-sm font-semibold text-foreground">When to use</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Informational messages and tips</li>
              <li>• Help text and documentation links</li>
              <li>• Neutral status indicators</li>
              <li>• System notifications (non-critical)</li>
            </ul>
          </div>
        </Card>
      </section>

      {/* Usage Patterns */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Usage Patterns</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Accessibility</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">Never rely on color alone.</strong> Always pair semantic 
                colors with icons, text labels, or other visual indicators for accessibility.
              </p>
              <div className="flex items-center gap-2 p-3 bg-success-soft border border-success/30 rounded-md">
                <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
                <span className="text-success">Success: Operation completed</span>
              </div>
              <p className="text-xs">Icon + color + text = accessible for all users</p>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Consistency</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">Be consistent across contexts.</strong> If green means 
                "success" in one area, it should mean the same everywhere.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                  <span className="text-foreground text-xs">Always = Success, On Track</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-danger rounded-full"></div>
                  <span className="text-foreground text-xs">Always = Error, Risk, Delete</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Related Links */}
      <Card className="p-6 bg-muted/30">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">Related Resources</h3>
          <div className="flex gap-4 text-sm">
            <a href="/design-system/foundations/colors" className="text-primary hover:underline">
              ← Color System
            </a>
            <a href="/design-system/components/badge" className="text-primary hover:underline">
              Badge Component →
            </a>
            <a href="/design-system/patterns/status" className="text-primary hover:underline">
              Status Patterns →
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SemanticColors;
