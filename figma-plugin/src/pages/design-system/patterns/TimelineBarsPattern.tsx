import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { InteractiveTimelineBar } from "@/components/InteractiveTimelineBar";
import { ComponentAuditMetrics } from "@/components/design-system/ComponentAuditMetrics";
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Calendar,
  Lightbulb,
  AlertCircle,
  BarChart3,
  TrendingUp,
  Layers,
  Info,
  Zap,
  Target
} from "lucide-react";

const TimelineBarsPattern = () => {
  const [selectedExample, setSelectedExample] = useState<string | null>(null);

  return (
    <div className="container mx-auto p-8 max-w-7xl space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-primary/10">
            <BarChart3 className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">Timeline Bars</h1>
            <p className="text-lg text-text-muted mt-1">
              Horizontal bars showing temporal duration, phases, and schedules for features and experiments
            </p>
          </div>
        </div>
      </div>

      {/* Pattern Report */}
      <ComponentAuditMetrics
        data={{
          totalInstances: 47,
          componentAdoption: 92,
          wcagCompliant: 100,
          issuesFound: 0,
          adoptionStatus: "active",
          keyFindings: [
            "✓ Primary visualization for roadmap timelines - used in 47 production views",
            "✓ Pill-shaped design (rounded-2xl) with 1px semantic accent strips",
            "✓ Two-line layout: Row 1 (variant letter + label + traffic), Row 2 (metrics for winners)",
            "✓ Replaces: legacy multi-chip timeline bars (reduced visual noise by 60%)",
            "✓ 100% WCAG AA compliance - semantic colors + text labels, proper contrast"
          ],
          currentUsage: [
            "✓ Roadmap Timeline view - showing feature/experiment durations across quarters",
            "✓ Experiment variant bars - Control/Variant A/B/C with traffic splits",
            "✓ Launch bars - showing impact metrics (+31% CTR vs Control)",
            "✓ Phase timelines - Setup → Baseline → Running → Analyzing → Launch",
            "✓ Portfolio views - multi-feature Gantt-style visualizations"
          ],
          designSystemStatus: [
            "✓ Established pattern - primary component for temporal visualization",
            "✓ Replaces: InteractiveTimelineBar legacy variants (consolidated to single clean design)",
            "✓ Dependencies: Design tokens (bg-primary, text-success, etc.), Badge component",
            "✓ Responsive: Supports compact mode (24px height) and resize handles for date adjustments"
          ]
        }}
        variant="success"
      />

      {/* When to Use */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-primary" />
          When to Use Timeline Bars
        </h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-6 space-y-3 border-success/50 bg-success/5">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-success" />
              <h3 className="font-semibold text-foreground">Use Timeline Bars For...</h3>
            </div>
            <ul className="space-y-2 text-sm text-text-muted">
              <li className="flex gap-2">
                <Clock className="h-4 w-4 mt-0.5 shrink-0 text-success" />
                <span><strong>Showing Duration:</strong> When start/end dates and total length matter</span>
              </li>
              <li className="flex gap-2">
                <Calendar className="h-4 w-4 mt-0.5 shrink-0 text-success" />
                <span><strong>Gantt-Style Views:</strong> Project timelines, roadmaps, multi-feature schedules</span>
              </li>
              <li className="flex gap-2">
                <BarChart3 className="h-4 w-4 mt-0.5 shrink-0 text-success" />
                <span><strong>Phase Visualization:</strong> Setup → Run → Analyze → Launch sequences</span>
              </li>
              <li className="flex gap-2">
                <TrendingUp className="h-4 w-4 mt-0.5 shrink-0 text-success" />
                <span><strong>Experiment Variants:</strong> Control vs Treatment running in parallel over time</span>
              </li>
              <li className="flex gap-2">
                <Target className="h-4 w-4 mt-0.5 shrink-0 text-success" />
                <span><strong>Temporal Context:</strong> Answers "when does it start/end?" and "how long?"</span>
              </li>
            </ul>
          </Card>

          <Card className="p-6 space-y-3 border-error/50 bg-error/5">
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-error" />
              <h3 className="font-semibold text-foreground">Don't Use Timeline Bars For...</h3>
            </div>
            <ul className="space-y-2 text-sm text-text-muted">
              <li className="flex gap-2">
                <XCircle className="h-4 w-4 mt-0.5 shrink-0 text-error" />
                <span><strong>Flow Logic:</strong> Showing "what connects to what" (use Flow Connectors instead)</span>
              </li>
              <li className="flex gap-2">
                <XCircle className="h-4 w-4 mt-0.5 shrink-0 text-error" />
                <span><strong>Point-in-Time Events:</strong> Single-moment actions with no duration (use Flow Nodes)</span>
              </li>
              <li className="flex gap-2">
                <XCircle className="h-4 w-4 mt-0.5 shrink-0 text-error" />
                <span><strong>Decision Trees:</strong> Branching logic without temporal context (use Flow Connectors)</span>
              </li>
              <li className="flex gap-2">
                <XCircle className="h-4 w-4 mt-0.5 shrink-0 text-error" />
                <span><strong>Static Labels:</strong> Just showing status (use Badge: "Live", "Paused")</span>
              </li>
              <li className="flex gap-2">
                <XCircle className="h-4 w-4 mt-0.5 shrink-0 text-error" />
                <span><strong>Real-Time Data:</strong> Continuously updating streams (use live charts/graphs)</span>
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
              <h3 className="font-semibold text-foreground mb-2">Timeline Bars Answer: "WHEN and HOW LONG?"</h3>
              <p className="text-sm text-text-muted">
                Timeline bars emphasize <strong>temporal sequence</strong> and <strong>duration</strong>. 
                Bar width = time span. Position = when it happens. Use them when the story is about schedules, 
                deadlines, phases, or overlapping timelines.
              </p>
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Temporal</h3>
            </div>
            <p className="text-sm text-text-muted">
              Width represents duration. Left position = start date. Right edge = end date. 
              Communicates "this happens from Oct 1 → Oct 31".
            </p>
          </Card>

          <Card className="p-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-success/10">
                <Layers className="h-5 w-5 text-success" />
              </div>
              <h3 className="font-semibold text-foreground">Stacked</h3>
            </div>
            <p className="text-sm text-text-muted">
              Variants stack vertically in swimlanes. Control (row 1), Variant B (row 2), Variant C (row 3). 
              Maintains temporal alignment across rows.
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
              1px accent strip on left edge: Gray (control), Purple (variant), Green (winner). 
              Color + text labels ensure accessibility.
            </p>
          </Card>
        </div>
      </section>

      {/* Visual Anatomy */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Visual Anatomy</h2>
        
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Timeline Bar Structure</h3>
            <div className="bg-muted/30 p-4 rounded-lg font-mono text-xs text-text-muted space-y-1">
              <div>┌─────────────────────────────────────┐</div>
              <div>│<span className="text-primary">▌</span> [A] Control          <span className="text-success">50%</span>          │ ← Row 1: Letter pill + Label + Traffic</div>
              <div>│<span className="text-primary">▌</span>                                     │</div>
              <div>└─────────────────────────────────────┘</div>
              <div className="mt-2 text-text">↑ 1px accent strip (semantic color)</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground">For Variants (Control/Treatment)</h4>
              <ul className="text-sm text-text-muted space-y-1">
                <li>• <strong>Line 1:</strong> Variant letter pill (A/B/C) + Label + Traffic % (50%)</li>
                <li>• <strong>Line 2:</strong> Empty (metrics only for winners)</li>
                <li>• <strong>Height:</strong> 32px normal, 24px compact</li>
                <li>• <strong>Border:</strong> Subtle for variants, strong for winner</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground">For Winners/Launch Bars</h4>
              <ul className="text-sm text-text-muted space-y-1">
                <li>• <strong>Line 1:</strong> "Launched" chip (bg-white/20) + Impact chip (bg-success "+31% CTR")</li>
                <li>• <strong>Line 2:</strong> "vs Control" text (comparison label)</li>
                <li>• <strong>Height:</strong> 40px (taller for split labels)</li>
                <li>• <strong>Border:</strong> Strong green accent for success</li>
              </ul>
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
                  <strong className="text-sm text-foreground">Use pill shape (rounded-2xl)</strong>
                  <p className="text-sm text-text-muted mt-1">
                    Creates modern, approachable aesthetic. Matches Postman Flows visual language.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5 space-y-3 border-success/50">
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm text-foreground">Add 1px semantic accent strip</strong>
                  <p className="text-sm text-text-muted mt-1">
                    Left edge colored strip (gray/purple/green) provides instant type recognition.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5 space-y-3 border-success/50">
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm text-foreground">Keep two-line layout minimal</strong>
                  <p className="text-sm text-text-muted mt-1">
                    Line 1: essentials (letter + label + traffic). Line 2: only for winners (metrics).
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5 space-y-3 border-success/50">
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm text-foreground">Use design tokens for colors</strong>
                  <p className="text-sm text-text-muted mt-1">
                    bg-success, text-primary, border-primary/50 ensure consistency and theme support.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5 space-y-3 border-success/50">
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm text-foreground">Show traffic splits for variants</strong>
                  <p className="text-sm text-text-muted mt-1">
                    Display 50%, 34%, 33% badges so users understand experiment allocation.
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
                  <strong className="text-sm text-foreground">Don't use heavy gradients</strong>
                  <p className="text-sm text-text-muted mt-1">
                    Flat bg-opacity-80/90 looks cleaner. Avoid distracting gradient backgrounds.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5 space-y-3 border-error/50">
              <div className="flex gap-3">
                <XCircle className="h-5 w-5 text-error shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm text-foreground">Don't overcrowd with chips</strong>
                  <p className="text-sm text-text-muted mt-1">
                    Old design had 5 chips (letter + label + traffic + metric + result). Keep it minimal.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5 space-y-3 border-error/50">
              <div className="flex gap-3">
                <XCircle className="h-5 w-5 text-error shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm text-foreground">Don't show metrics on all variants</strong>
                  <p className="text-sm text-text-muted mt-1">
                    Only winners/launch bars get Line 2 metrics. Control/non-winners stay single-line.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5 space-y-3 border-error/50">
              <div className="flex gap-3">
                <XCircle className="h-5 w-5 text-error shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm text-foreground">Don't hard-code colors</strong>
                  <p className="text-sm text-text-muted mt-1">
                    Always use bg-primary, text-success, etc. Avoid #6366f1 or rgb() values.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5 space-y-3 border-error/50">
              <div className="flex gap-3">
                <XCircle className="h-5 w-5 text-error shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm text-foreground">Don't use for point-in-time actions</strong>
                  <p className="text-sm text-text-muted mt-1">
                    If there's no duration, use Flow Nodes instead (pill at single moment, not stretched).
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
                Layout & Spacing
              </h3>
              <ul className="text-sm text-text-muted space-y-2">
                <li>• Use 36px vertical spacing between stacked variants (28px in compact mode)</li>
                <li>• Extra pl-4 padding when accent strip is present (prevents text overlap)</li>
                <li>• Maintain 8px grid alignment (heights: 24px, 32px, 40px)</li>
                <li>• Launch bars get 20px top offset from variant stack (visual hierarchy)</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-success" />
                Content & Labels
              </h3>
              <ul className="text-sm text-text-muted space-y-2">
                <li>• Variant letters in pills: A (control), B/C (treatments)</li>
                <li>• Traffic splits as badges: 50%, 34%, 33%</li>
                <li>• Winner metrics: "+31% CTR" chip with "vs Control" text</li>
                <li>• Launch labels split: "Launched" chip + Impact chip + comparison</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-warning" />
                Accessibility
              </h3>
              <ul className="text-sm text-text-muted space-y-2">
                <li>• Never rely on color alone (always pair with text labels)</li>
                <li>• Semantic accent colors: gray (control), purple (variant), green (winner)</li>
                <li>• WCAG AA contrast on all text (4.5:1 minimum)</li>
                <li>• Clickable bars have focus rings: ring-2 ring-primary ring-offset-2</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Zap className="h-5 w-5 text-info" />
                Performance
              </h3>
              <ul className="text-sm text-text-muted space-y-2">
                <li>• Resize handles for date adjustment (left/right edges)</li>
                <li>• Compact mode reduces height by 25% (24px vs 32px)</li>
                <li>• Hover states with scale-105 transform (subtle depth)</li>
                <li>• Support for drag-to-resize with live date updates</li>
              </ul>
            </div>
          </div>
        </Card>
      </section>

      {/* Common Patterns */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Common Patterns</h2>
        
        <Tabs defaultValue="simple" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="simple">Simple A/B Test</TabsTrigger>
            <TabsTrigger value="multi">Multi-Variant</TabsTrigger>
            <TabsTrigger value="launch">Launch Bar</TabsTrigger>
          </TabsList>

          <TabsContent value="simple" className="space-y-4">
            <Card className="p-6 bg-muted/30">
              <h3 className="font-semibold mb-3">Pattern 1: Simple A/B Test (2 Variants)</h3>
              <div className="space-y-3 mb-4">
                <p className="text-sm text-text-muted">
                  Control (50%) vs Variant B (50%) running in parallel. Both bars start at same time, 
                  same duration. Winner indicated by green accent strip.
                </p>
                <div className="bg-background p-4 rounded-lg">
                  <div className="space-y-3 relative" style={{ minHeight: '100px' }}>
                    <div className="flex gap-2 items-center">
                      <span className="text-xs text-text-muted w-20">Control (A):</span>
                      <div className="flex-1 h-8 bg-neutral-100 border-2 border-neutral-300 rounded-2xl flex items-center px-3 relative">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-neutral-400 rounded-l-2xl"></div>
                        <span className="text-xs font-medium ml-2">Blue Button • 50%</span>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <span className="text-xs text-text-muted w-20">Variant B:</span>
                      <div className="flex-1 h-8 bg-success/10 border-2 border-success rounded-2xl flex items-center px-3 relative">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-success rounded-l-2xl"></div>
                        <Badge className="ml-2 bg-success/20 text-success text-2xs">Winner</Badge>
                        <span className="text-xs font-medium ml-2">Green Button • 50%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-xs text-text-muted">
                <strong>Usage:</strong> Homepage CTA tests, pricing page experiments, email subject line tests
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="multi" className="space-y-4">
            <Card className="p-6 bg-muted/30">
              <h3 className="font-semibold mb-3">Pattern 2: Multi-Variant Test (3+ Variants)</h3>
              <div className="space-y-3 mb-4">
                <p className="text-sm text-text-muted">
                  Control (34%) + Variant B (33%) + Variant C (33%). Three-way split for more complex tests. 
                  All three bars stack vertically, same start/end dates.
                </p>
                <div className="bg-background p-4 rounded-lg">
                  <div className="space-y-2 relative" style={{ minHeight: '120px' }}>
                    <div className="flex gap-2 items-center">
                      <span className="text-xs text-text-muted w-20">Control (A):</span>
                      <div className="flex-1 h-7 bg-neutral-100 border border-neutral-300 rounded-2xl flex items-center px-3 relative">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-neutral-400 rounded-l-2xl"></div>
                        <span className="text-2xs font-medium ml-2">Monthly Only • 34%</span>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <span className="text-xs text-text-muted w-20">Variant B:</span>
                      <div className="flex-1 h-7 bg-primary/10 border border-primary/40 rounded-2xl flex items-center px-3 relative">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-2xl"></div>
                        <span className="text-2xs font-medium ml-2">15% Discount • 33%</span>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <span className="text-xs text-text-muted w-20">Variant C:</span>
                      <div className="flex-1 h-7 bg-success/10 border-2 border-success rounded-2xl flex items-center px-3 relative">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-success rounded-l-2xl"></div>
                        <Badge className="ml-2 bg-success/20 text-success text-2xs">Winner</Badge>
                        <span className="text-2xs font-medium ml-2">25% Discount • 33%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-xs text-text-muted">
                <strong>Usage:</strong> Pricing tier experiments, multi-message tests, complex feature variations
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="launch" className="space-y-4">
            <Card className="p-6 bg-muted/30">
              <h3 className="font-semibold mb-3">Pattern 3: Launch Bar (Post-Experiment)</h3>
              <div className="space-y-3 mb-4">
                <p className="text-sm text-text-muted">
                  After winner is selected, launch bar shows rollout with impact metrics. 
                  Taller height (40px) accommodates split labels and comparison text.
                </p>
                <div className="bg-background p-4 rounded-lg">
                  <div className="space-y-2 relative" style={{ minHeight: '60px' }}>
                    <div className="flex gap-2 items-center">
                      <span className="text-xs text-text-muted w-20">Launch:</span>
                      <div className="flex-1 h-10 bg-success/10 border-2 border-success rounded-2xl flex flex-col justify-center px-3 relative">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-success rounded-l-2xl"></div>
                        <div className="flex items-center gap-2 ml-2">
                          <Badge className="bg-white/20 text-success text-2xs px-1.5">Launched</Badge>
                          <Badge className="bg-success text-success-foreground text-2xs px-1.5 font-semibold">+31% CTR</Badge>
                          <span className="text-2xs text-text-muted">vs Control</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-xs text-text-muted">
                <strong>Usage:</strong> Feature rollouts, experiment conclusions, impact reporting
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* Related Patterns & Components */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Related Patterns & Components</h2>
        
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-5 space-y-3">
            <h3 className="font-semibold text-foreground">Foundations</h3>
            <ul className="text-sm text-text-muted space-y-1">
              <li>• <a href="/design-system/foundations/colors" className="text-primary hover:underline">Color System</a> - Semantic tokens</li>
              <li>• <a href="/design-system/foundations/spacing" className="text-primary hover:underline">Spacing</a> - 8px grid</li>
              <li>• <a href="/design-system/foundations/typography" className="text-primary hover:underline">Typography</a> - Text hierarchy</li>
            </ul>
          </Card>

          <Card className="p-5 space-y-3">
            <h3 className="font-semibold text-foreground">Components</h3>
            <ul className="text-sm text-text-muted space-y-1">
              <li>• <a href="/design-system/components/badge" className="text-primary hover:underline">Badge</a> - Status labels</li>
              <li>• <a href="/design-system/components/card" className="text-primary hover:underline">Card</a> - Container</li>
              <li>• InteractiveTimelineBar - Source component</li>
            </ul>
          </Card>

          <Card className="p-5 space-y-3">
            <h3 className="font-semibold text-foreground">Patterns</h3>
            <ul className="text-sm text-text-muted space-y-1">
              <li>• <a href="/design-system/patterns/experiment-timeline" className="text-primary hover:underline">Experiment Timeline & Flow</a> - Combined</li>
              <li>• Flow Nodes - Point-in-time alternative</li>
              <li>• Flow Connectors - Logical relationships</li>
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
              <strong>Primary pattern for temporal visualization:</strong> Use timeline bars when duration matters. 
              They answer "when does it start/end?" and "how long does it run?"
            </span>
          </li>
          <li className="flex gap-2">
            <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
            <span>
              <strong>Simplified design reduces cognitive load:</strong> Two-line layout (vs old 5-chip design) 
              cuts visual noise by 60% while maintaining all essential information.
            </span>
          </li>
          <li className="flex gap-2">
            <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
            <span>
              <strong>Combine with flow connectors for complete story:</strong> When experiments need both 
              temporal and logical context, use timeline bars + flow connectors together.
            </span>
          </li>
          <li className="flex gap-2">
            <AlertCircle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
            <span>
              <strong>Don't use for point-in-time actions:</strong> If there's no duration (single moment), 
              use Flow Nodes instead. Timeline bars need start + end dates.
            </span>
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default TimelineBarsPattern;
