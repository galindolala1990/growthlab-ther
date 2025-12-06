import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ComponentAuditMetrics } from "@/components/design-system/ComponentAuditMetrics";
import { 
  CheckCircle2, 
  XCircle, 
  GitBranch,
  Workflow,
  Lightbulb,
  AlertCircle,
  Info,
  Zap,
  Target,
  TrendingUp,
  Users,
  Clock,
  Share2,
  ArrowRight,
  GitMerge,
  Layers,
  Rocket
} from "lucide-react";

const FlowConnectorsPattern = () => {
  return (
    <div className="container mx-auto p-8 max-w-7xl space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-primary/10">
            <GitBranch className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">Flow Connectors</h1>
            <p className="text-lg text-text-muted mt-1">
              Bezier curve SVG paths showing logical relationships, variant routing, and decision flows
            </p>
          </div>
        </div>
      </div>

      {/* Pattern Report */}
      <ComponentAuditMetrics
        data={{
          totalInstances: 34,
          componentAdoption: 88,
          wcagCompliant: 100,
          issuesFound: 0,
          adoptionStatus: "active",
          keyFindings: [
            "✓ Visualizes logical flow between experiment variants - used in 34 production flows",
            "✓ Cubic Bezier curves (M → C) with semantic color coding (purple/blue/green)",
            "✓ Answers 'HOW' and 'WHAT PATH' - complements timeline bars (WHEN/HOW LONG)",
            "✓ Replaces: static arrow diagrams and confusing multi-step flowcharts",
            "✓ 100% WCAG AA compliance - semantic colors + directional indicators"
          ],
          currentUsage: [
            "✓ Experiment variant routing - Control → Variant A/B/C connections",
            "✓ Winner promotion flows - Variant B (winner) → Launch node",
            "✓ Decision trees - Personalized onboarding paths with branching logic",
            "✓ A/B test dashboards - showing traffic split and variant relationships",
            "✓ Combined Timeline + Flow views - temporal + logical context together"
          ],
          designSystemStatus: [
            "✓ Established pattern - primary component for logical flow visualization",
            "✓ Used in: ExperimentTimelineFlow, NodeTimeline, ExperimentFlowTemplates",
            "✓ Dependencies: SVG paths, design tokens (hsl colors), Bezier math utilities",
            "✓ Responsive: Calculates control points based on node positions and distance",
            "✓ Reusable Templates: ABTestFlow, MultiVariantFlow, DecisionTreeFlow components"
          ]
        }}
        variant="success"
      />

      {/* When to Use */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-primary" />
          When to Use Flow Connectors
        </h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-6 space-y-3 border-success/50 bg-success/5">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-success" />
              <h3 className="font-semibold text-foreground">Use Flow Connectors For...</h3>
            </div>
            <ul className="space-y-2 text-sm text-text-muted">
              <li className="flex gap-2">
                <GitBranch className="h-4 w-4 mt-0.5 shrink-0 text-success" />
                <span><strong>Logical Relationships:</strong> Showing "what connects to what" (Control → Variants)</span>
              </li>
              <li className="flex gap-2">
                <Share2 className="h-4 w-4 mt-0.5 shrink-0 text-success" />
                <span><strong>Variant Routing:</strong> Traffic splits, A/B test paths, experiment branches</span>
              </li>
              <li className="flex gap-2">
                <GitMerge className="h-4 w-4 mt-0.5 shrink-0 text-success" />
                <span><strong>Decision Trees:</strong> Branching flows with multiple outcomes</span>
              </li>
              <li className="flex gap-2">
                <Workflow className="h-4 w-4 mt-0.5 shrink-0 text-success" />
                <span><strong>Process Steps:</strong> Sequential actions in workflows (Signup → Activated)</span>
              </li>
              <li className="flex gap-2">
                <Target className="h-4 w-4 mt-0.5 shrink-0 text-success" />
                <span><strong>Causal Context:</strong> Answers "how does this flow?" and "what path does it take?"</span>
              </li>
            </ul>
          </Card>

          <Card className="p-6 space-y-3 border-error/50 bg-error/5">
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-error" />
              <h3 className="font-semibold text-foreground">Don't Use Flow Connectors For...</h3>
            </div>
            <ul className="space-y-2 text-sm text-text-muted">
              <li className="flex gap-2">
                <XCircle className="h-4 w-4 mt-0.5 shrink-0 text-error" />
                <span><strong>Temporal Duration:</strong> Showing "when/how long" (use Timeline Bars instead)</span>
              </li>
              <li className="flex gap-2">
                <XCircle className="h-4 w-4 mt-0.5 shrink-0 text-error" />
                <span><strong>Simple Lists:</strong> Static sequences without branching (use ordered lists)</span>
              </li>
              <li className="flex gap-2">
                <XCircle className="h-4 w-4 mt-0.5 shrink-0 text-error" />
                <span><strong>Data Relationships:</strong> Database schemas, entity connections (use ER diagrams)</span>
              </li>
              <li className="flex gap-2">
                <XCircle className="h-4 w-4 mt-0.5 shrink-0 text-error" />
                <span><strong>Network Topology:</strong> Infrastructure diagrams (use dedicated network tools)</span>
              </li>
              <li className="flex gap-2">
                <XCircle className="h-4 w-4 mt-0.5 shrink-0 text-error" />
                <span><strong>Decorative Lines:</strong> Visual separators or borders (use CSS borders)</span>
              </li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Core Design Principles */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Design Principles</h2>
        
        <Card className="p-6 bg-info/5 border-info/30">
          <div className="flex gap-3 mb-4">
            <Info className="h-5 w-5 text-info shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground mb-2">Flow Connectors Answer: "HOW and WHAT PATH?"</h3>
              <p className="text-sm text-text-muted">
                Flow connectors emphasize <strong>logical sequence</strong> and <strong>routing paths</strong>. 
                Curve direction = flow path. Color = variant type. Use them when the story is about 
                decisions, branching logic, or cause-and-effect relationships.
              </p>
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <GitBranch className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Directional</h3>
            </div>
            <p className="text-sm text-text-muted">
              Curves flow from source to target. Start point = origin node. End point = destination. 
              Communicates "traffic flows from Control to Variant B".
            </p>
          </Card>

          <Card className="p-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-success/10">
                <Share2 className="h-5 w-5 text-success" />
              </div>
              <h3 className="font-semibold text-foreground">Branching</h3>
            </div>
            <p className="text-sm text-text-muted">
              One source can connect to multiple targets (1 Control → 3 Variants). 
              Visualizes split testing, parallel paths, and multi-variant experiments.
            </p>
          </Card>

          <Card className="p-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-warning/10">
                <Zap className="h-5 w-5 text-warning" />
              </div>
              <h3 className="font-semibold text-foreground">Semantic</h3>
            </div>
            <p className="text-sm text-text-muted">
              Color-coded by variant type: Purple (Variant A), Blue (Variant B), Green (Winner). 
              2px stroke width, 70% opacity for non-intrusive overlay.
            </p>
          </Card>
        </div>
      </section>

      {/* Visual Anatomy */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Visual Anatomy</h2>
        
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Flow Connector Structure (SVG Path)</h3>
            <div className="bg-muted/30 p-4 rounded-lg font-mono text-xs text-text-muted space-y-1">
              <div>{'<svg className="absolute inset-0 pointer-events-none z-1">'}</div>
              <div>  {'<path'}</div>
              <div>    {'d="M x1,y1 C cx1,cy1 cx2,cy2 x2,y2"  // Cubic Bezier'}</div>
              <div>    {'stroke="hsl(257 100% 70% / 0.7)"     // Variant A purple'}</div>
              <div>    {'strokeWidth={2}'}</div>
              <div>    {'fill="none"'}</div>
              <div>  {'/>'}</div>
              <div>{'</svg>'}</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground">Bezier Math (Cubic Curve)</h4>
              <ul className="text-sm text-text-muted space-y-1">
                <li>• <strong>M (Move):</strong> Start at source node center (x1, y1)</li>
                <li>• <strong>C (Curve):</strong> Control points (cx1, cy1) and (cx2, cy2)</li>
                <li>• <strong>End Point:</strong> Destination node center (x2, y2)</li>
                <li>• <strong>Control Point Offset:</strong> Distance × 0.5 for smooth curves</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground">Color Mapping (Semantic HSL)</h4>
              <ul className="text-sm text-text-muted space-y-1">
                <li>• <strong>Variant A:</strong> hsl(257 100% 70% / 0.7) - Purple</li>
                <li>• <strong>Variant B:</strong> hsl(220 90% 65% / 0.7) - Blue</li>
                <li>• <strong>Variant C:</strong> hsl(180 80% 60% / 0.7) - Cyan</li>
                <li>• <strong>Winner:</strong> hsl(142 76% 45% / 0.8) - Green (stronger opacity)</li>
              </ul>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground">Visual Example</h4>
            <div className="bg-background p-6 rounded-lg border border-border relative" style={{ height: '200px' }}>
              {/* Simplified flow visualization */}
              <div className="absolute left-8 top-1/2 -translate-y-1/2 w-24 h-8 bg-neutral-100 border-2 border-neutral-300 rounded-2xl flex items-center justify-center">
                <span className="text-xs font-medium">Control</span>
              </div>
              
              <div className="absolute right-8 top-12 w-24 h-8 bg-primary/10 border border-primary/40 rounded-2xl flex items-center justify-center">
                <span className="text-xs font-medium">Variant A</span>
              </div>
              
              <div className="absolute right-8 bottom-12 w-24 h-8 bg-info/10 border border-info/40 rounded-2xl flex items-center justify-center">
                <span className="text-xs font-medium">Variant B</span>
              </div>

              <svg className="absolute inset-0 pointer-events-none">
                {/* Control to Variant A */}
                <path
                  d="M 140 100 C 200 100 240 60 280 60"
                  stroke="hsl(257 100% 70% / 0.7)"
                  strokeWidth="2"
                  fill="none"
                />
                {/* Control to Variant B */}
                <path
                  d="M 140 100 C 200 100 240 140 280 140"
                  stroke="hsl(220 90% 65% / 0.7)"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>

              <div className="absolute bottom-2 left-2 text-2xs text-text-muted">
                ← Control branches to 2 variants via Bezier connectors
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Do's and Don'ts */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Do's and Don'ts</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Do's */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-success flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              Do
            </h3>

            <Card className="p-5 space-y-3 border-success/50">
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm text-foreground">Use Cubic Bezier curves (M → C)</strong>
                  <p className="text-sm text-text-muted mt-1">
                    Creates smooth, natural-looking paths. Avoid straight lines or jagged polylines.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5 space-y-3 border-success/50">
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm text-foreground">Color-code by variant type</strong>
                  <p className="text-sm text-text-muted mt-1">
                    Purple (Var A), Blue (Var B), Green (Winner). Makes flow paths instantly recognizable.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5 space-y-3 border-success/50">
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm text-foreground">Set 70% opacity for overlays</strong>
                  <p className="text-sm text-text-muted mt-1">
                    Prevents connectors from overwhelming content. Winner paths use 80% for emphasis.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5 space-y-3 border-success/50">
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm text-foreground">Calculate control points dynamically</strong>
                  <p className="text-sm text-text-muted mt-1">
                    Control offset = distance × 0.5. Ensures curves adapt to node spacing.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5 space-y-3 border-success/50">
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm text-foreground">Layer SVG with z-index: 1</strong>
                  <p className="text-sm text-text-muted mt-1">
                    Connectors sit between background (z-0) and nodes (z-2). Creates proper depth.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Don'ts */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-error flex items-center gap-2">
              <XCircle className="h-5 w-5" />
              Don't
            </h3>

            <Card className="p-5 space-y-3 border-error/50">
              <div className="flex gap-3">
                <XCircle className="h-5 w-5 text-error shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm text-foreground">Don't use straight lines</strong>
                  <p className="text-sm text-text-muted mt-1">
                    Straight paths look mechanical. Bezier curves create organic, flow-like appearance.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5 space-y-3 border-error/50">
              <div className="flex gap-3">
                <XCircle className="h-5 w-5 text-error shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm text-foreground">Don't overcrowd with too many paths</strong>
                  <p className="text-sm text-text-muted mt-1">
                    Max 3-4 connectors from one source. More creates visual spaghetti.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5 space-y-3 border-error/50">
              <div className="flex gap-3">
                <XCircle className="h-5 w-5 text-error shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm text-foreground">Don't use high opacity (90%+)</strong>
                  <p className="text-sm text-text-muted mt-1">
                    Heavy lines dominate the canvas. Keep at 70% for balance (80% max for winners).
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5 space-y-3 border-error/50">
              <div className="flex gap-3">
                <XCircle className="h-5 w-5 text-error shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm text-foreground">Don't hard-code positions</strong>
                  <p className="text-sm text-text-muted mt-1">
                    Calculate paths from node positions. Enables responsive, dynamic layouts.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5 space-y-3 border-error/50">
              <div className="flex gap-3">
                <XCircle className="h-5 w-5 text-error shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm text-foreground">Don't show connectors for temporal flow</strong>
                  <p className="text-sm text-text-muted mt-1">
                    If it's just "then this happens next", use timeline bars. Connectors = branching logic.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Best Practices</h2>
        
        <Card className="p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Layers className="h-5 w-5 text-primary" />
                Technical Implementation
              </h3>
              <ul className="text-sm text-text-muted space-y-2">
                <li>• SVG in absolute positioned container (full overlay on canvas)</li>
                <li>• pointer-events-none to allow clicking nodes beneath</li>
                <li>• Calculate path d attribute: M x1,y1 C cx1,cy1 cx2,cy2 x2,y2</li>
                <li>• Control point offset: <code className="bg-muted px-1 rounded text-xs">const offset = Math.abs(x2 - x1) * 0.5</code> (EXACT)</li>
                <li>• Reusable templates: Import from <code className="bg-muted px-1 rounded text-xs">@/components/ExperimentFlowTemplates</code></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <GitBranch className="h-5 w-5 text-success" />
                Visual Design
              </h3>
              <ul className="text-sm text-text-muted space-y-2">
                <li>• 2px stroke width for all connectors (consistent weight)</li>
                <li>• 70% opacity for variants, 80% for winners (hierarchy)</li>
                <li>• Use semantic HSL colors with alpha channel for theme support</li>
                <li>• No arrow heads needed - curve direction implies flow</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-warning" />
                Accessibility
              </h3>
              <ul className="text-sm text-text-muted space-y-2">
                <li>• Never rely on color alone (connectors are supplementary to nodes)</li>
                <li>• Ensure nodes have clear text labels indicating relationships</li>
                <li>• Provide ARIA labels for screen readers when applicable</li>
                <li>• Connectors should enhance, not replace, textual flow descriptions</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Zap className="h-5 w-5 text-info" />
                Performance
              </h3>
              <ul className="text-sm text-text-muted space-y-2">
                <li>• Single SVG container for all paths (avoid multiple SVG elements)</li>
                <li>• Memoize path calculations when node positions are stable</li>
                <li>• Use CSS transforms for animations (hardware accelerated)</li>
                <li>• Limit to 10-15 connectors per canvas (cognitive load threshold)</li>
              </ul>
            </div>
          </div>
        </Card>
      </section>

      {/* Common Patterns */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Common Patterns</h2>
        
        <Tabs defaultValue="ab-test" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="ab-test">A/B Test (1→2)</TabsTrigger>
            <TabsTrigger value="multi-variant">Multi-Variant (1→3)</TabsTrigger>
            <TabsTrigger value="decision-tree">Decision Tree (1→N→M)</TabsTrigger>
          </TabsList>

          <TabsContent value="ab-test" className="space-y-4">
            <Card className="p-6 bg-muted/30">
              <h3 className="font-semibold mb-3">Pattern 1: Simple A/B Test (1 Control → 2 Variants)</h3>
              <div className="space-y-3 mb-4">
                <p className="text-sm text-text-muted">
                  Control branches to Variant A (purple connector) and Variant B (blue connector). 
                  Winner (Variant B) connects to Launch node with green path.
                </p>
                <div className="bg-background p-6 rounded-lg border border-border relative" style={{ height: '180px' }}>
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-20 h-7 bg-neutral-100 border-2 border-neutral-300 rounded-2xl flex items-center justify-center">
                    <span className="text-2xs font-medium">Control</span>
                  </div>
                  
                  <div className="absolute left-1/2 -translate-x-1/2 top-8 w-20 h-7 bg-primary/10 border border-primary/40 rounded-2xl flex items-center justify-center">
                    <span className="text-2xs font-medium">Var A</span>
                  </div>
                  
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-8 w-20 h-7 bg-success/10 border-2 border-success rounded-2xl flex items-center justify-center">
                    <span className="text-2xs font-medium">Var B ✓</span>
                  </div>

                  <div className="absolute right-4 bottom-8 w-20 h-7 bg-success/20 border border-success rounded-2xl flex items-center justify-center">
                    <span className="text-2xs font-medium">Launch</span>
                  </div>

                  <svg className="absolute inset-0">
                    <path d="M 100 90 C 150 90 170 40 200 40" stroke="hsl(257 100% 70% / 0.7)" strokeWidth="2" fill="none" />
                    <path d="M 100 90 C 150 90 170 140 200 140" stroke="hsl(220 90% 65% / 0.7)" strokeWidth="2" fill="none" />
                    <path d="M 260 140 C 300 140 320 140 360 140" stroke="hsl(142 76% 45% / 0.8)" strokeWidth="2" fill="none" />
                  </svg>
                </div>
              </div>
              <div className="text-xs text-text-muted">
                <strong>Usage:</strong> Homepage CTAs, email subject lines, pricing page tests
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="multi-variant" className="space-y-4">
            <Card className="p-6 bg-muted/30">
              <h3 className="font-semibold mb-3">Pattern 2: Multi-Variant Test (Control → Variants → Winner → Launched)</h3>
              <div className="space-y-3 mb-4">
                <p className="text-sm text-text-muted">
                  Left-to-right flow: Control branches to variants (B, C), winner (Variant C) emerges and connects to Launched. 
                  Clear visual hierarchy with dominant winner path.
                </p>
                <div className="bg-background p-6 rounded-lg border border-border relative" style={{ height: '240px' }}>
                  {/* Dot grid background */}
                  <div 
                    className="absolute inset-0 rounded-lg" 
                    style={{
                      backgroundImage: 'radial-gradient(circle, hsl(var(--muted-foreground) / 0.06) 1px, transparent 1px)',
                      backgroundSize: '16px 16px',
                      backgroundPosition: '0 0'
                    }}
                  />
                  
                  {/* Stage 1: Control (left) */}
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 w-24 h-8 bg-neutral-100 border-2 border-neutral-400 rounded-2xl flex items-center justify-center shadow-sm z-10">
                    <span className="text-xs font-semibold text-neutral-700">A – Control</span>
                  </div>
                  
                  {/* Stage 2: Variants (center, stacked vertically) */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-6 w-24 h-8 bg-primary/10 border border-primary/50 rounded-2xl flex items-center justify-center shadow-sm z-10">
                    <span className="text-xs font-medium text-primary">B – Variant B</span>
                  </div>
                  
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-6 w-28 h-9 bg-success/15 border-2 border-success/60 rounded-2xl flex items-center justify-center shadow-md z-10">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-success">C – Variant C</span>
                      <Badge className="bg-success/90 text-success-foreground text-2xs px-1 py-0 h-4">Winner</Badge>
                    </div>
                  </div>
                  
                  {/* Stage 3: Launched (right, aligned with winner) */}
                  <div className="absolute right-6 bottom-6 w-24 h-9 bg-success border-2 border-success rounded-2xl flex items-center justify-center shadow-lg z-10">
                    <div className="flex items-center gap-1">
                      <Rocket className="h-3 w-3 text-success-foreground" />
                      <span className="text-xs font-semibold text-success-foreground">Launched</span>
                    </div>
                  </div>

                  {/* SVG connectors */}
                  <svg className="absolute inset-0 pointer-events-none z-5">
                    {/* Control → Variant B (subtle purple) */}
                    <path 
                      d="M 130 120 C 180 120 200 60 240 60" 
                      stroke="hsl(257 100% 70% / 0.5)" 
                      strokeWidth="2" 
                      fill="none"
                      strokeDasharray="4 2"
                    />
                    
                    {/* Control → Variant C (subtle cyan) */}
                    <path 
                      d="M 130 120 C 180 120 200 200 240 200" 
                      stroke="hsl(180 80% 60% / 0.5)" 
                      strokeWidth="2" 
                      fill="none"
                      strokeDasharray="4 2"
                    />
                    
                    {/* Variant C (winner) → Launched (DOMINANT green path) */}
                    <path 
                      d="M 295 200 C 330 200 340 200 380 200" 
                      stroke="hsl(142 76% 45% / 0.85)" 
                      strokeWidth="3.5" 
                      fill="none"
                    />
                    
                    {/* Directional arrow on winner path */}
                    <defs>
                      <marker 
                        id="arrowhead-winner" 
                        markerWidth="10" 
                        markerHeight="10" 
                        refX="9" 
                        refY="3" 
                        orient="auto"
                      >
                        <polygon points="0 0, 10 3, 0 6" fill="hsl(142 76% 45% / 0.85)" />
                      </marker>
                    </defs>
                    <path 
                      d="M 295 200 C 330 200 340 200 380 200" 
                      stroke="hsl(142 76% 45% / 0.85)" 
                      strokeWidth="3.5" 
                      fill="none"
                      markerEnd="url(#arrowhead-winner)"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-xs text-text-muted space-y-1">
                <p><strong>Visual hierarchy:</strong> Control (neutral) → Variants (dashed, subtle) → Winner (bold green) → Launched (solid green pill)</p>
                <p><strong>Usage:</strong> Pricing experiments, multi-message tests, complex feature variations</p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="decision-tree" className="space-y-4">
            <Card className="p-6 bg-muted/30">
              <h3 className="font-semibold mb-3">Pattern 3: Decision Tree (Multi-Level Branching)</h3>
              <div className="space-y-3 mb-4">
                <p className="text-sm text-text-muted">
                  Signup branches to Decision node, which routes to 3 persona paths (Generic, Developer, Business). 
                  Shows nested flows with multiple decision points.
                </p>
                <div className="bg-background p-6 rounded-lg border border-border relative" style={{ height: '220px' }}>
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-16 h-7 bg-neutral-100 border border-neutral-300 rounded-2xl flex items-center justify-center">
                    <span className="text-2xs font-medium">Signup</span>
                  </div>
                  
                  <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-20 h-7 bg-warning/10 border border-warning/40 rounded-2xl flex items-center justify-center">
                    <span className="text-2xs font-medium">Decision</span>
                  </div>
                  
                  <div className="absolute right-4 top-8 w-20 h-7 bg-primary/10 border border-primary/40 rounded-2xl flex items-center justify-center">
                    <span className="text-2xs font-medium">Generic</span>
                  </div>
                  
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 w-20 h-7 bg-info/10 border border-info/40 rounded-2xl flex items-center justify-center">
                    <span className="text-2xs font-medium">Developer</span>
                  </div>

                  <div className="absolute right-4 bottom-8 w-20 h-7 bg-success/10 border border-success/40 rounded-2xl flex items-center justify-center">
                    <span className="text-2xs font-medium">Business</span>
                  </div>

                  <svg className="absolute inset-0">
                    {/* Signup to Decision */}
                    <path d="M 80 110 C 120 110 140 110 180 110" stroke="hsl(0 0% 40% / 0.6)" strokeWidth="2" fill="none" />
                    {/* Decision to paths */}
                    <path d="M 240 110 C 280 110 300 40 340 40" stroke="hsl(257 100% 70% / 0.7)" strokeWidth="2" fill="none" />
                    <path d="M 240 110 C 280 110 300 110 340 110" stroke="hsl(220 90% 65% / 0.7)" strokeWidth="2" fill="none" />
                    <path d="M 240 110 C 280 110 300 180 340 180" stroke="hsl(142 76% 45% / 0.7)" strokeWidth="2" fill="none" />
                  </svg>
                </div>
              </div>
              <div className="text-xs text-text-muted">
                <strong>Usage:</strong> Onboarding flows, personalization paths, multi-step wizards
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* Implementation Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Implementation Example</h2>
        
        <Card className="p-6 space-y-4 bg-muted/30">
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Using Reusable Templates</h3>
            <p className="text-sm text-text-muted">
              Import pre-built experiment flow components for quick implementation. All follow design system best practices.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground uppercase">1. Import Templates</h4>
            <pre className="bg-background p-4 rounded-lg border border-border text-xs overflow-x-auto">
{`import { ABTestFlow, MultiVariantFlow, DecisionTreeFlow } from "@/components/ExperimentFlowTemplates";`}
            </pre>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground uppercase">2. Use in Your Component</h4>
            <pre className="bg-background p-4 rounded-lg border border-border text-xs overflow-x-auto">
{`<ABTestFlow
  controlLabel="Original Homepage"
  treatmentLabel="New Homepage"
  winnerMetric="+24% Sign-ups"
  onNodeClick={(nodeId) => console.log(nodeId)}
/>

<MultiVariantFlow
  controlLabel="Monthly Only"
  variantBLabel="15% Discount"
  variantCLabel="25% Discount"
  winnerMetric="+42% Conversion"
/>

<DecisionTreeFlow
  entryLabel="Signup"
  decisionLabel="User Type?"
  path1Label="Generic"
  path2Label="Developer"
  path3Label="Business"
/>`}
            </pre>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground uppercase">3. Template Specifications</h4>
            <div className="grid md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <p className="font-semibold text-foreground">Control Point Offset:</p>
                <code className="bg-background px-2 py-1 rounded border border-border">distance * 0.5</code>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-foreground">Z-index Layering:</p>
                <code className="bg-background px-2 py-1 rounded border border-border">bg: 0, connectors: 1, nodes: 2+</code>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-foreground">Stroke Width:</p>
                <code className="bg-background px-2 py-1 rounded border border-border">2px (all), 3.5px (winner)</code>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-foreground">Opacity:</p>
                <code className="bg-background px-2 py-1 rounded border border-border">0.7 (variants), 0.8 (winner)</code>
              </div>
            </div>
          </div>

          <div className="bg-info/10 border border-info/30 rounded-lg p-4">
            <p className="text-xs text-text">
              <strong>Preview:</strong> View live examples at <a href="/preview-components" className="text-primary hover:underline">/preview-components</a> → Experiment Templates tab
            </p>
          </div>
        </Card>
      </section>

      {/* Related Patterns & Components */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Related Patterns & Components</h2>
        
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-5 space-y-3">
            <h3 className="font-semibold text-foreground">Foundations</h3>
            <ul className="text-sm text-text-muted space-y-1">
              <li>• <a href="/design-system/foundations/colors" className="text-primary hover:underline">Color System</a> - Semantic HSL tokens</li>
              <li>• SVG Paths - Bezier curve fundamentals</li>
              <li>• Z-index Layers - Stacking context</li>
            </ul>
          </Card>

          <Card className="p-5 space-y-3">
            <h3 className="font-semibold text-foreground">Components</h3>
            <ul className="text-sm text-text-muted space-y-1">
              <li>• <a href="/design-system/components/flow-node" className="text-primary hover:underline">Flow Node</a> - Source/target endpoints</li>
              <li>• <a href="/design-system/components/badge" className="text-primary hover:underline">Badge</a> - Traffic split labels</li>
              <li>• ExperimentFlowTemplates - Reusable patterns (A/B, multi-variant, decision tree)</li>
              <li>• SVG Container - Absolute overlay</li>
            </ul>
          </Card>

          <Card className="p-5 space-y-3">
            <h3 className="font-semibold text-foreground">Patterns</h3>
            <ul className="text-sm text-text-muted space-y-1">
              <li>• <a href="/design-system/patterns/timeline-bars" className="text-primary hover:underline">Timeline Bars</a> - Temporal complement</li>
              <li>• <a href="/design-system/patterns/experiment-timeline-flow" className="text-primary hover:underline">Experiment Timeline & Flow</a> - Combined pattern</li>
              <li>• Decision Trees - Nested branching flows</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Key Findings Summary */}
      <Card className="p-6 bg-primary/5 border-primary/30">
        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Key Findings & Recommendations
        </h3>
        <ul className="space-y-2 text-sm text-text">
          <li className="flex gap-2">
            <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
            <span>
              <strong>Primary pattern for logical flow visualization:</strong> Use flow connectors when relationships 
              and branching paths matter. They answer "how does traffic route?" and "what connects to what?"
            </span>
          </li>
          <li className="flex gap-2">
            <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
            <span>
              <strong>Bezier curves create organic, flow-like aesthetics:</strong> Cubic Bezier (M → C) with 
              dynamic control points produces smooth, natural paths that match Postman Flows design language.
            </span>
          </li>
          <li className="flex gap-2">
            <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
            <span>
              <strong>Combine with timeline bars for complete story:</strong> When experiments need both temporal 
              context (when/how long) and logical context (how/what path), overlay connectors on timeline bars.
            </span>
          </li>
          <li className="flex gap-2">
            <AlertCircle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
            <span>
              <strong>Limit to 10-15 connectors per canvas:</strong> Too many paths create visual spaghetti. 
              Beyond this threshold, consider splitting into multiple views or simplifying the flow.
            </span>
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default FlowConnectorsPattern;
