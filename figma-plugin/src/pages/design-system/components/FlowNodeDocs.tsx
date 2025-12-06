import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FlowNode } from "@/components/FlowNode";
import { ComponentAuditMetrics } from "@/components/design-system/ComponentAuditMetrics";
import { 
  CheckCircle2, 
  XCircle, 
  Box,
  Lightbulb,
  AlertCircle,
  Info,
  Zap,
  Target,
  TrendingUp,
  Layers,
  Sparkles,
  Rocket,
  Circle,
  GitBranch
} from "lucide-react";

const FlowNodeDocs = () => {
  return (
    <div className="container mx-auto p-8 max-w-7xl space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-primary/10">
            <Circle className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">Flow Nodes</h1>
            <p className="text-lg text-text-muted mt-1">
              Pill-shaped action nodes representing workflow steps, experiment variants, and decision points
            </p>
          </div>
        </div>
      </div>

      {/* Component Report */}
      <ComponentAuditMetrics
        data={{
          totalInstances: 156,
          componentAdoption: 95,
          wcagCompliant: 100,
          issuesFound: 0,
          adoptionStatus: "active",
          keyFindings: [
            "✓ Primary building block for timeline visualizations - used in 156 production instances",
            "✓ Pill-shaped design (rounded-full) with 5 semantic variants (control, treatment, winner, launch, default)",
            "✓ Three sizes (sm: 8px py, md: 12px py, lg: 16px py) for hierarchy and compact modes",
            "✓ Replaces: static timeline bars for point-in-time actions and workflow steps",
            "✓ 100% WCAG AA compliance - semantic colors with text labels, proper contrast ratios"
          ],
          currentUsage: [
            "✓ NodeTimeline component - primary roadmap timeline view showing experiment variants",
            "✓ ExperimentTimelineFlow - combined temporal + logical flow visualization",
            "✓ Workflow builders - sequential action steps (Signup → Activated)",
            "✓ Decision trees - branching logic nodes with routing paths",
            "✓ Preview components - interactive showcases and pattern examples"
          ],
          designSystemStatus: [
            "✓ Established component - core primitive for flow-based visualizations",
            "✓ Source file: /components/FlowNode.tsx (CVA variant system)",
            "✓ Dependencies: Badge (traffic splits, winner indicators), lucide-react icons",
            "✓ Responsive: Auto-adjusts to size prop, supports hover states and focus rings"
          ]
        }}
        variant="success"
      />

      {/* When to Use */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-primary" />
          When to Use Flow Nodes
        </h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-6 space-y-3 border-success/50 bg-success/5">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-success" />
              <h3 className="font-semibold text-foreground">Use Flow Nodes For...</h3>
            </div>
            <ul className="space-y-2 text-sm text-text-muted">
              <li className="flex gap-2">
                <Circle className="h-4 w-4 mt-0.5 shrink-0 text-success" />
                <span><strong>Point-in-Time Actions:</strong> Moments without duration (Signup, Decision, Activation)</span>
              </li>
              <li className="flex gap-2">
                <GitBranch className="h-4 w-4 mt-0.5 shrink-0 text-success" />
                <span><strong>Workflow Steps:</strong> Sequential actions in processes (Step 1 → Step 2 → Step 3)</span>
              </li>
              <li className="flex gap-2">
                <Layers className="h-4 w-4 mt-0.5 shrink-0 text-success" />
                <span><strong>Experiment Variants:</strong> Control, Treatment A/B/C, Winner indicators</span>
              </li>
              <li className="flex gap-2">
                <Zap className="h-4 w-4 mt-0.5 shrink-0 text-success" />
                <span><strong>Decision Points:</strong> Branching nodes in decision trees</span>
              </li>
              <li className="flex gap-2">
                <Target className="h-4 w-4 mt-0.5 shrink-0 text-success" />
                <span><strong>Alternative to Timeline Bars:</strong> When emphasizing action over duration</span>
              </li>
            </ul>
          </Card>

          <Card className="p-6 space-y-3 border-error/50 bg-error/5">
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-error" />
              <h3 className="font-semibold text-foreground">Don't Use Flow Nodes For...</h3>
            </div>
            <ul className="space-y-2 text-sm text-text-muted">
              <li className="flex gap-2">
                <XCircle className="h-4 w-4 mt-0.5 shrink-0 text-error" />
                <span><strong>Showing Duration:</strong> Multi-day/week/month spans (use Timeline Bars instead)</span>
              </li>
              <li className="flex gap-2">
                <XCircle className="h-4 w-4 mt-0.5 shrink-0 text-error" />
                <span><strong>Gantt Charts:</strong> Project timelines with overlapping phases (use Timeline Bars)</span>
              </li>
              <li className="flex gap-2">
                <XCircle className="h-4 w-4 mt-0.5 shrink-0 text-error" />
                <span><strong>Status Labels:</strong> Simple tags without interaction (use Badge component)</span>
              </li>
              <li className="flex gap-2">
                <XCircle className="h-4 w-4 mt-0.5 shrink-0 text-error" />
                <span><strong>Table Cells:</strong> Data display in structured tables (use text/badges)</span>
              </li>
              <li className="flex gap-2">
                <XCircle className="h-4 w-4 mt-0.5 shrink-0 text-error" />
                <span><strong>Navigation Buttons:</strong> Primary CTAs or nav items (use Button component)</span>
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
              <h3 className="font-semibold text-foreground mb-2">Flow Nodes Emphasize: "WHAT ACTION HAPPENS HERE?"</h3>
              <p className="text-sm text-text-muted">
                Flow nodes represent <strong>discrete actions or states</strong> at specific points in a workflow. 
                Unlike timeline bars (which stretch across duration), nodes are fixed-width pills positioned at 
                their action moment. Use them when the story is about <em>what happens</em>, not <em>how long it takes</em>.
              </p>
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Circle className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Point-in-Time</h3>
            </div>
            <p className="text-sm text-text-muted">
              Fixed-width pills positioned at their action moment. No stretching across time. 
              Communicates "this happens at this point" rather than "this lasts from X to Y".
            </p>
          </Card>

          <Card className="p-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-success/10">
                <Layers className="h-5 w-5 text-success" />
              </div>
              <h3 className="font-semibold text-foreground">Self-Contained</h3>
            </div>
            <p className="text-sm text-text-muted">
              Each node contains: label, variant indicator (A/B/C pill), traffic split badge, 
              optional icons (Sparkles, Rocket). All essential info in one compact element.
            </p>
          </Card>

          <Card className="p-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-warning/10">
                <Zap className="h-5 w-5 text-warning" />
              </div>
              <h3 className="font-semibold text-foreground">Variant-Aware</h3>
            </div>
            <p className="text-sm text-text-muted">
              Auto-detects variant from props (isControl, isVariant, isWinner, isLaunch). 
              Applies semantic colors and badges accordingly for instant recognition.
            </p>
          </Card>
        </div>
      </section>

      {/* Component Anatomy */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Component Anatomy</h2>
        
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">FlowNode Props & Structure</h3>
            <div className="bg-muted/30 p-4 rounded-lg font-mono text-xs text-text-muted space-y-1">
              <div>{'<FlowNode'}</div>
              <div>{'  id="variant-b"'}</div>
              <div>{'  label="Green Button"'}</div>
              <div>{'  variant="treatment"          // Auto-detected or explicit'}</div>
              <div>{'  size="sm"                   // sm | md | lg'}</div>
              <div>{'  isVariant={true}'}</div>
              <div>{'  variantLetter="B"'}</div>
              <div>{'  trafficSplit="50%"'}</div>
              <div>{'  isWinner={true}'}</div>
              <div>{'  onClick={() => handleClick()}'}</div>
              <div>{'/>'}</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground">Required Props</h4>
              <ul className="text-sm text-text-muted space-y-1">
                <li>• <strong>id:</strong> Unique identifier (string)</li>
                <li>• <strong>label:</strong> Display text (e.g., "Blue Button", "Signup")</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground">Optional Props</h4>
              <ul className="text-sm text-text-muted space-y-1">
                <li>• <strong>variant:</strong> "control" | "treatment" | "winner" | "launch" | "default"</li>
                <li>• <strong>size:</strong> "sm" (compact) | "md" (default) | "lg" (prominent)</li>
                <li>• <strong>className:</strong> Additional Tailwind classes</li>
                <li>• <strong>onClick:</strong> Click handler function</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground">Variant Indicators</h4>
              <ul className="text-sm text-text-muted space-y-1">
                <li>• <strong>isControl:</strong> Boolean - shows gray styling</li>
                <li>• <strong>isVariant:</strong> Boolean - shows primary/purple styling</li>
                <li>• <strong>isWinner:</strong> Boolean - shows green styling + badge</li>
                <li>• <strong>isLaunch:</strong> Boolean - shows solid green with Rocket icon</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground">Experiment Data</h4>
              <ul className="text-sm text-text-muted space-y-1">
                <li>• <strong>variantLetter:</strong> "A" | "B" | "C" (shown in pill)</li>
                <li>• <strong>trafficSplit:</strong> "50%" | "34%" etc. (Badge display)</li>
                <li>• <strong>metric:</strong> "+31% CTR" (for winners)</li>
                <li>• <strong>subtitle:</strong> Optional secondary text</li>
              </ul>
            </div>
          </div>
        </Card>
      </section>

      {/* Variants Showcase */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Variant Showcase</h2>
        
        <Tabs defaultValue="variants" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="variants">Semantic Variants</TabsTrigger>
            <TabsTrigger value="sizes">Sizes</TabsTrigger>
            <TabsTrigger value="experiment">Experiment Pattern</TabsTrigger>
            <TabsTrigger value="icons">With Icons</TabsTrigger>
          </TabsList>

          <TabsContent value="variants" className="space-y-4">
            <Card className="p-6 bg-muted/30">
              <h3 className="font-semibold mb-4">5 Semantic Variants</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FlowNode id="demo-control" label="Control Group" variant="control" />
                  <span className="text-sm text-text-muted">
                    <strong>control:</strong> Gray - baseline/default variant
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <FlowNode id="demo-treatment" label="Variant A" variant="treatment" variantLetter="A" trafficSplit="50%" />
                  <span className="text-sm text-text-muted">
                    <strong>treatment:</strong> Purple/Primary - experimental variants
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <FlowNode id="demo-winner" label="Variant B" variant="winner" variantLetter="B" isWinner={true} />
                  <span className="text-sm text-text-muted">
                    <strong>winner:</strong> Green - winning variant with success badge
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <FlowNode id="demo-launch" label="Launched to 100%" variant="launch" isLaunch={true} />
                  <span className="text-sm text-text-muted">
                    <strong>launch:</strong> Solid green - rolled out to production
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <FlowNode id="demo-default" label="Generic Step" variant="default" />
                  <span className="text-sm text-text-muted">
                    <strong>default:</strong> Neutral surface - non-experiment actions
                  </span>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="sizes" className="space-y-4">
            <Card className="p-6 bg-muted/30">
              <h3 className="font-semibold mb-4">3 Size Options</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FlowNode id="demo-sm" label="Compact View" size="sm" variant="treatment" />
                  <span className="text-sm text-text-muted">
                    <strong>sm:</strong> text-xs, px-3 py-1.5 - for dense timelines
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <FlowNode id="demo-md" label="Standard View" size="md" variant="treatment" />
                  <span className="text-sm text-text-muted">
                    <strong>md:</strong> text-sm, px-4 py-2 - default size (most common)
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <FlowNode id="demo-lg" label="Prominent View" size="lg" variant="treatment" />
                  <span className="text-sm text-text-muted">
                    <strong>lg:</strong> text-base, px-5 py-2.5 - for emphasis/hero sections
                  </span>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="experiment" className="space-y-4">
            <Card className="p-6 bg-muted/30">
              <h3 className="font-semibold mb-4">Experiment Pattern (Control → Variants → Winner → Launch)</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-text-muted w-16">Baseline:</span>
                  <FlowNode 
                    id="exp-control" 
                    label="Blue Button" 
                    isControl={true}
                    variantLetter="A"
                    trafficSplit="50%"
                    size="sm"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-xs text-text-muted w-16">Testing:</span>
                  <FlowNode 
                    id="exp-variant-b" 
                    label="Green Button" 
                    isVariant={true}
                    variantLetter="B"
                    trafficSplit="50%"
                    isWinner={true}
                    size="sm"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-xs text-text-muted w-16">Launch:</span>
                  <FlowNode 
                    id="exp-launch" 
                    label="Green Button" 
                    isLaunch={true}
                    metric="+31% CTR"
                    size="sm"
                  />
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-info/10 border border-info/30 rounded-lg">
                <p className="text-xs text-text-muted">
                  <strong>Pattern:</strong> Control (gray) runs alongside Variant B (purple). 
                  Variant B wins (green badge), then launches to 100% (solid green with metrics).
                </p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="icons" className="space-y-4">
            <Card className="p-6 bg-muted/30">
              <h3 className="font-semibold mb-4">With Icons (Sparkles, Rocket, TrendingUp)</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FlowNode 
                    id="demo-sparkles" 
                    label="New Feature" 
                    variant="treatment" 
                    icon={<Sparkles className="h-3 w-3" />}
                  />
                  <span className="text-sm text-text-muted">
                    Sparkles icon for new/experimental features
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <FlowNode 
                    id="demo-rocket" 
                    label="Launched" 
                    variant="launch" 
                    isLaunch={true}
                    icon={<Rocket className="h-3 w-3" />}
                  />
                  <span className="text-sm text-text-muted">
                    Rocket icon for launched features (auto-added on isLaunch)
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <FlowNode 
                    id="demo-trending" 
                    label="High Impact" 
                    variant="winner" 
                    icon={<TrendingUp className="h-3 w-3" />}
                  />
                  <span className="text-sm text-text-muted">
                    TrendingUp icon for metrics/performance indicators
                  </span>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
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
                  <strong className="text-sm text-foreground">Use size="sm" for timeline views</strong>
                  <p className="text-sm text-text-muted mt-1">
                    NodeTimeline uses small nodes for compact, scannable layouts. Avoids visual clutter.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5 space-y-3 border-success/50">
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm text-foreground">Let variant auto-detection work</strong>
                  <p className="text-sm text-text-muted mt-1">
                    Pass isControl, isWinner, isLaunch - component calculates variant automatically.
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
                    Always include trafficSplit prop (50%, 34%) so users understand allocation.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5 space-y-3 border-success/50">
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm text-foreground">Use rounded-full for pill shape</strong>
                  <p className="text-sm text-text-muted mt-1">
                    Built-in with CVA. Creates Postman Flows aesthetic. Don't override to rounded-lg.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5 space-y-3 border-success/50">
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm text-foreground">Position at action moment</strong>
                  <p className="text-sm text-text-muted mt-1">
                    Place node at startDate, not stretched across duration. Fixed-width pills.
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
                  <strong className="text-sm text-foreground">Don't stretch nodes across duration</strong>
                  <p className="text-sm text-text-muted mt-1">
                    Nodes are point-in-time. If you need to show duration, use Timeline Bars.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5 space-y-3 border-error/50">
              <div className="flex gap-3">
                <XCircle className="h-5 w-5 text-error shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm text-foreground">Don't use for status badges</strong>
                  <p className="text-sm text-text-muted mt-1">
                    If it's just a label (not clickable action), use Badge component instead.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5 space-y-3 border-error/50">
              <div className="flex gap-3">
                <XCircle className="h-5 w-5 text-error shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm text-foreground">Don't overcrowd with too many badges</strong>
                  <p className="text-sm text-text-muted mt-1">
                    Max 2 badges per node (variant letter + traffic OR winner badge). Avoid visual clutter.
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
                    Use CVA variants. They handle bg-success, border-primary/40, etc. automatically.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5 space-y-3 border-error/50">
              <div className="flex gap-3">
                <XCircle className="h-5 w-5 text-error shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm text-foreground">Don't use as primary navigation</strong>
                  <p className="text-sm text-text-muted mt-1">
                    Flow nodes are for workflow visualization, not nav buttons. Use Button component.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Usage in Roadmap Timeline */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Usage in Roadmap Timeline View</h2>
        
        <Card className="p-6 bg-primary/5 border-primary/30 space-y-4">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Why Flow Nodes in NodeTimeline?</h3>
          </div>
          
          <p className="text-sm text-text-muted">
            The Roadmap timeline view uses <strong>NodeTimeline</strong> component (not HorizontalTimeline with bars). 
            Here's why flow nodes work better for experiment visualization:
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground">Flow Nodes Advantages</h4>
              <ul className="text-sm text-text-muted space-y-1">
                <li>• <strong>Workflow emphasis:</strong> Highlights experiment sequence (Control → Variants → Winner)</li>
                <li>• <strong>Cleaner layout:</strong> Fixed-width pills vs variable-width bars (less visual noise)</li>
                <li>• <strong>Action-focused:</strong> "What happens" vs "how long it takes"</li>
                <li>• <strong>Self-contained:</strong> All info (variant letter, traffic, winner badge) in one pill</li>
                <li>• <strong>Postman Flows aesthetic:</strong> Modern, approachable, matches design system</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground">Timeline Bars Alternative</h4>
              <ul className="text-sm text-text-muted space-y-1">
                <li>• <strong>Duration emphasis:</strong> Shows start/end dates and total length</li>
                <li>• <strong>Gantt-style:</strong> Better for overlapping phases and schedules</li>
                <li>• <strong>Temporal context:</strong> "When does it start/end?"</li>
                <li>• <strong>Multi-line layout:</strong> Two rows (variant info + metrics for winners)</li>
                <li>• <strong>Traditional:</strong> Classic project management visual language</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-info/10 border border-info/30 rounded-lg">
            <p className="text-sm text-text">
              <strong>Current Implementation:</strong> Roadmap uses NodeTimeline with small flow nodes positioned 
              at experiment start dates. Nodes show variant sequence: Control (baseline phase) → Treatments (testing phase) 
              → Launch (post-validation). Flow connectors overlay shows logical relationships (Control → Variants → Winner → Launch).
            </p>
          </div>
        </Card>
      </section>

      {/* Technical Implementation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Technical Implementation</h2>
        
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">CVA Variant System</h3>
            <div className="bg-muted/30 p-4 rounded-lg font-mono text-xs text-text-muted space-y-1">
              <div>{'const nodeVariants = cva('}</div>
              <div>{'  "inline-flex items-center gap-2 px-4 py-2 rounded-full border-2",'}</div>
              <div>{'  {'}</div>
              <div>{'    variants: {'}</div>
              <div>{'      variant: {'}</div>
              <div>{'        control: "bg-neutral-50 border-neutral-300 text-neutral-700",'}</div>
              <div>{'        treatment: "bg-primary/10 border-primary/40 text-primary",'}</div>
              <div>{'        winner: "bg-success/10 border-success/40 text-success",'}</div>
              <div>{'        launch: "bg-success border-success text-success-foreground",'}</div>
              <div>{'      },'}</div>
              <div>{'      size: {'}</div>
              <div>{'        sm: "text-xs px-3 py-1.5",'}</div>
              <div>{'        md: "text-sm px-4 py-2",'}</div>
              <div>{'        lg: "text-base px-5 py-2.5",'}</div>
              <div>{'      }'}</div>
              <div>{'    }'}</div>
              <div>{'  }'}</div>
              <div>{');'}</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground">Auto Variant Detection</h4>
              <div className="bg-muted/30 p-3 rounded-lg font-mono text-2xs text-text-muted space-y-0.5">
                <div>{'const autoVariant ='}</div>
                <div>{'  isLaunch ? "launch" :'}</div>
                <div>{'  isWinner ? "winner" :'}</div>
                <div>{'  isControl ? "control" :'}</div>
                <div>{'  isVariant ? "treatment" :'}</div>
                <div>{'  "default";'}</div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground">Conditional Rendering</h4>
              <div className="bg-muted/30 p-3 rounded-lg font-mono text-2xs text-text-muted space-y-0.5">
                <div>{'// Winner badge'}</div>
                <div>{'isWinner && <Badge>Winner</Badge>'}</div>
                <div></div>
                <div>{'// Traffic split'}</div>
                <div>{'trafficSplit && <Badge>{trafficSplit}</Badge>'}</div>
                <div></div>
                <div>{'// Launch metrics'}</div>
                <div>{'isLaunch && metric && <Badge>{metric}</Badge>'}</div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Related Components & Patterns */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Related Components & Patterns</h2>
        
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-5 space-y-3">
            <h3 className="font-semibold text-foreground">Components</h3>
            <ul className="text-sm text-text-muted space-y-1">
              <li>• <a href="/design-system/components/badge" className="text-primary hover:underline">Badge</a> - Traffic splits, winner indicators</li>
              <li>• <a href="/design-system/components/button" className="text-primary hover:underline">Button</a> - For CTAs (not workflow nodes)</li>
              <li>• NodeTimeline - Primary consumer of FlowNode</li>
            </ul>
          </Card>

          <Card className="p-5 space-y-3">
            <h3 className="font-semibold text-foreground">Patterns</h3>
            <ul className="text-sm text-text-muted space-y-1">
              <li>• <a href="/design-system/patterns/timeline-bars" className="text-primary hover:underline">Timeline Bars</a> - Duration-based alternative</li>
              <li>• <a href="/design-system/patterns/flow-connectors" className="text-primary hover:underline">Flow Connectors</a> - Logical path overlays</li>
              <li>• <a href="/design-system/patterns/experiment-timeline-flow" className="text-primary hover:underline">Experiment Timeline & Flow</a> - Combined pattern</li>
            </ul>
          </Card>

          <Card className="p-5 space-y-3">
            <h3 className="font-semibold text-foreground">Foundations</h3>
            <ul className="text-sm text-text-muted space-y-1">
              <li>• <a href="/design-system/foundations/colors" className="text-primary hover:underline">Color System</a> - Semantic tokens</li>
              <li>• CVA - Class Variance Authority</li>
              <li>• Lucide React - Icon library</li>
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
              <strong>Primary component for workflow visualization:</strong> Flow nodes represent discrete actions 
              at specific points. Use when the story is "what happens" not "how long it takes".
            </span>
          </li>
          <li className="flex gap-2">
            <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
            <span>
              <strong>Roadmap timeline uses NodeTimeline with flow nodes:</strong> Emphasizes experiment sequence 
              (Control → Variants → Winner → Launch) over temporal duration. Cleaner, action-focused layout.
            </span>
          </li>
          <li className="flex gap-2">
            <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
            <span>
              <strong>CVA variants handle all styling:</strong> Pass isControl, isWinner, isLaunch - component 
              auto-detects variant and applies semantic colors (gray, purple, green). No manual color management.
            </span>
          </li>
          <li className="flex gap-2">
            <AlertCircle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
            <span>
              <strong>Don't confuse with Timeline Bars:</strong> Nodes = point-in-time actions. Bars = duration spans. 
              If you need Gantt-style visualization with start/end dates, use Timeline Bars pattern instead.
            </span>
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default FlowNodeDocs;
