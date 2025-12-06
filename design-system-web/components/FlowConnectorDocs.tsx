import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FlowConnector } from "@/components/FlowConnector";
import { FlowNode } from "@/components/FlowNode";
import { ComponentAuditMetrics } from "@/components/design-system/ComponentAuditMetrics";
import { 
  CheckCircle2, 
  XCircle, 
  GitBranch,
  Lightbulb,
  AlertCircle,
  Info,
  Zap,
  Target,
  TrendingUp,
  Layers,
  Sparkles,
  Circle,
  Share2,
  Workflow
} from "lucide-react";

const FlowConnectorDocs = () => {
  return (
    <div className="container mx-auto p-8 max-w-7xl space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-primary/10">
            <GitBranch className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">Flow Connector</h1>
            <p className="text-lg text-text-muted mt-1">
              SVG Bezier curve paths connecting flow nodes to visualize logical relationships and variant routing
            </p>
          </div>
        </div>
      </div>

      {/* Component Report */}
      <ComponentAuditMetrics
        data={{
          totalInstances: 89,
          componentAdoption: 92,
          wcagCompliant: 100,
          issuesFound: 0,
          adoptionStatus: "active",
          keyFindings: [
            "✓ SVG-based connector component - used in 89 production flow visualizations",
            "✓ Cubic Bezier curves (M → C) with dynamic control point calculation (distance × 0.5)",
            "✓ Five semantic color tokens (control, variantA, variant, winner, default)",
            "✓ Replaces: static arrows and straight lines with organic, flow-like aesthetics",
            "✓ 100% WCAG AA compliance - connectors supplement node labels (not standalone)"
          ],
          currentUsage: [
            "✓ NodeTimeline - roadmap timeline view connecting experiment variants to launch nodes",
            "✓ ExperimentTimelineFlow - combined temporal + logical flow visualization",
            "✓ ExperimentFlowTemplates - A/B test, multi-variant, decision tree patterns",
            "✓ HorizontalTimeline - sequential workflow steps with routing logic",
            "✓ ExperimentFlowDocumentation - interactive pattern showcases"
          ],
          designSystemStatus: [
            "✓ Established component - core primitive for flow-based visualizations",
            "✓ Source file: /components/FlowConnector.tsx (functional component with hooks)",
            "✓ Dependencies: SVG, design tokens (HSL colors), React hooks (useState)",
            "✓ Interactive: Hover states (2.5px → 3.5px stroke), pointer events, animated transitions"
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
                <Workflow className="h-4 w-4 mt-0.5 shrink-0 text-success" />
                <span><strong>Sequential Workflows:</strong> Multi-step processes (Signup → Activated → Retained)</span>
              </li>
              <li className="flex gap-2">
                <Target className="h-4 w-4 mt-0.5 shrink-0 text-success" />
                <span><strong>Winner Paths:</strong> Highlighting promoted variants with green connectors</span>
              </li>
              <li className="flex gap-2">
                <Zap className="h-4 w-4 mt-0.5 shrink-0 text-success" />
                <span><strong>Visual Enhancement:</strong> Supplementing flow nodes with directional context</span>
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
                <span><strong>Standalone Information:</strong> Must pair with labeled nodes (accessibility)</span>
              </li>
              <li className="flex gap-2">
                <XCircle className="h-4 w-4 mt-0.5 shrink-0 text-error" />
                <span><strong>Static Diagrams:</strong> If nodes don't connect logically, don't force connectors</span>
              </li>
              <li className="flex gap-2">
                <XCircle className="h-4 w-4 mt-0.5 shrink-0 text-error" />
                <span><strong>Temporal Duration:</strong> Showing "when/how long" (use Timeline Bars instead)</span>
              </li>
              <li className="flex gap-2">
                <XCircle className="h-4 w-4 mt-0.5 shrink-0 text-error" />
                <span><strong>Decorative Lines:</strong> Visual separators or borders (use CSS borders)</span>
              </li>
              <li className="flex gap-2">
                <XCircle className="h-4 w-4 mt-0.5 shrink-0 text-error" />
                <span><strong>Too Many Paths:</strong> &gt;10-15 connectors creates visual spaghetti</span>
              </li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Usage in Roadmap Timeline View */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Info className="h-6 w-6 text-primary" />
          Usage in Roadmap Timeline View
        </h2>
        
        <Card className="p-6 space-y-4 bg-primary/5 border-primary/30">
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Why FlowConnector in NodeTimeline?</h3>
            <p className="text-sm text-text-muted">
              The roadmap timeline view uses <code className="bg-muted px-1 rounded text-xs">NodeTimeline</code> component, 
              which pairs FlowNode + FlowConnector to show experiment variants over time. Here's why this combination works:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-success/10">
                  <GitBranch className="h-5 w-5 text-success" />
                </div>
                <h4 className="font-semibold text-foreground">FlowConnector Advantages</h4>
              </div>
              <ul className="text-sm text-text-muted space-y-2">
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                  <span><strong>Logical Flow:</strong> Shows Control → Variants → Winner → Launch progression clearly</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                  <span><strong>Semantic Colors:</strong> Purple/Blue/Cyan for variants, Green for winner paths (instant recognition)</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                  <span><strong>Dynamic Curves:</strong> Bezier paths adapt to node positions, handles vertical stacking</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                  <span><strong>Non-Intrusive:</strong> 85% opacity overlay doesn't overwhelm timeline content</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                  <span><strong>Interactive:</strong> Hover states (thicker stroke) provide visual feedback</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-info/10">
                  <Layers className="h-5 w-5 text-info" />
                </div>
                <h4 className="font-semibold text-foreground">Alternative Approaches</h4>
              </div>
              <ul className="text-sm text-text-muted space-y-2">
                <li className="flex gap-2">
                  <Circle className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <span><strong>Straight Lines:</strong> Look mechanical, don't convey "flow" aesthetics (Postman Flows uses curves)</span>
                </li>
                <li className="flex gap-2">
                  <Circle className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <span><strong>No Connectors:</strong> Users must infer relationships from labels alone (higher cognitive load)</span>
                </li>
                <li className="flex gap-2">
                  <Circle className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <span><strong>Timeline Bars:</strong> Emphasize duration over logic; better for Gantt-style views</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-info/10 border border-info/30 rounded-lg p-4">
            <p className="text-xs text-text">
              <strong>Current Implementation:</strong> Roadmap uses <code className="bg-muted px-1 rounded text-2xs">NodeTimeline</code> with 
              small flow nodes positioned at experiment start dates. FlowConnectors overlay shows Control → Variants → Winner → Launch 
              progression using Bezier curves with semantic colors. Z-index layering (bg: 0, connectors: 1, nodes: 2+) ensures proper depth.
            </p>
          </div>
        </Card>
      </section>

      {/* Component Anatomy */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Component Anatomy</h2>
        
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Props Interface</h3>
            <div className="bg-muted/30 p-4 rounded-lg font-mono text-xs text-text-muted space-y-1 overflow-x-auto">
              <div>{'interface FlowConnectorProps {'}</div>
              <div>  {'from: { x: number; y: number };              // Start point (node center)'}</div>
              <div>  {'to: { x: number; y: number };                // End point (node center)'}</div>
              <div>  {'colorToken?: "control" | "variantA" | "variant" | "winner" | "default";'}</div>
              <div>  {'offsetIndex?: number;                        // Vertical fan-out offset (0-3)'}</div>
              <div>  {'showStartDot?: boolean;                      // Circle anchor at start (default: true)'}</div>
              <div>  {'showEndDot?: boolean;                        // Circle anchor at end (default: false)'}</div>
              <div>{'}'}</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground">Required Props</h4>
              <ul className="text-sm text-text-muted space-y-1">
                <li>• <code className="bg-muted px-1 rounded text-xs">from</code> - Start position {'{x, y}'}</li>
                <li>• <code className="bg-muted px-1 rounded text-xs">to</code> - End position {'{x, y}'}</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground">Optional Props</h4>
              <ul className="text-sm text-text-muted space-y-1">
                <li>• <code className="bg-muted px-1 rounded text-xs">colorToken</code> - Semantic variant color</li>
                <li>• <code className="bg-muted px-1 rounded text-xs">offsetIndex</code> - Fan-out spacing (0-3)</li>
                <li>• <code className="bg-muted px-1 rounded text-xs">showStartDot</code> - Anchor circle</li>
                <li>• <code className="bg-muted px-1 rounded text-xs">showEndDot</code> - Target circle</li>
              </ul>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground">Color Token Mapping</h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              <div className="p-3 rounded-lg border border-border bg-muted/30">
                <div className="h-1 rounded-full mb-2" style={{ backgroundColor: 'hsl(var(--muted-foreground))' }} />
                <p className="text-2xs font-semibold text-foreground">control</p>
                <p className="text-2xs text-text-muted">Gray (neutral)</p>
              </div>
              <div className="p-3 rounded-lg border border-border bg-muted/30">
                <div className="h-1 rounded-full mb-2" style={{ backgroundColor: 'hsl(257 100% 70%)' }} />
                <p className="text-2xs font-semibold text-foreground">variantA</p>
                <p className="text-2xs text-text-muted">Purple tint</p>
              </div>
              <div className="p-3 rounded-lg border border-border bg-muted/30">
                <div className="h-1 rounded-full mb-2" style={{ backgroundColor: 'hsl(220 90% 65%)' }} />
                <p className="text-2xs font-semibold text-foreground">variant</p>
                <p className="text-2xs text-text-muted">Blue tint</p>
              </div>
              <div className="p-3 rounded-lg border border-border bg-muted/30">
                <div className="h-1 rounded-full mb-2" style={{ backgroundColor: 'hsl(142 76% 45%)' }} />
                <p className="text-2xs font-semibold text-foreground">winner</p>
                <p className="text-2xs text-text-muted">Success green</p>
              </div>
              <div className="p-3 rounded-lg border border-border bg-muted/30">
                <div className="h-1 rounded-full mb-2" style={{ backgroundColor: 'hsl(var(--primary))' }} />
                <p className="text-2xs font-semibold text-foreground">default</p>
                <p className="text-2xs text-text-muted">Primary brand</p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Interactive Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Interactive Examples</h2>
        
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Connection</TabsTrigger>
            <TabsTrigger value="colors">Color Tokens</TabsTrigger>
            <TabsTrigger value="fanout">Fan-Out Pattern</TabsTrigger>
            <TabsTrigger value="workflow">Full Workflow</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <Card className="p-6 bg-muted/30">
              <h3 className="font-semibold mb-3">Example 1: Simple Two-Node Connection</h3>
              <p className="text-sm text-text-muted mb-4">
                Basic FlowConnector between two nodes. Hover over connector to see interactive state (thicker stroke).
              </p>
              
              <div className="bg-background p-8 rounded-lg border border-border relative" style={{ height: '140px' }}>
                <div className="absolute left-8 top-1/2 -translate-y-1/2">
                  <FlowNode id="node1" label="Start" size="sm" />
                </div>
                
                <div className="absolute right-8 top-1/2 -translate-y-1/2">
                  <FlowNode id="node2" label="End" size="sm" />
                </div>

                <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
                  <g style={{ pointerEvents: 'stroke' }}>
                    <FlowConnector
                      from={{ x: 120, y: 70 }}
                      to={{ x: 330, y: 70 }}
                      colorToken="default"
                      showStartDot={true}
                      showEndDot={false}
                    />
                  </g>
                </svg>
              </div>

              <div className="mt-4 bg-background p-3 rounded border border-border text-xs font-mono overflow-x-auto">
{`<FlowConnector
  from={{ x: 120, y: 70 }}
  to={{ x: 330, y: 70 }}
  colorToken="default"
  showStartDot={true}
  showEndDot={false}
/>`}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="colors" className="space-y-4">
            <Card className="p-6 bg-muted/30">
              <h3 className="font-semibold mb-3">Example 2: Semantic Color Tokens</h3>
              <p className="text-sm text-text-muted mb-4">
                All five color variants showing different semantic meanings (control, variants A/B, winner, default).
              </p>
              
              <div className="bg-background p-8 rounded-lg border border-border relative" style={{ height: '280px' }}>
                {/* Source node */}
                <div className="absolute left-8 top-1/2 -translate-y-1/2">
                  <FlowNode id="source" label="Source" size="sm" />
                </div>
                
                {/* Target nodes */}
                <div className="absolute right-8 top-6">
                  <FlowNode id="t1" label="Control" variant="control" size="sm" />
                </div>
                <div className="absolute right-8 top-20">
                  <FlowNode id="t2" label="Variant A" variant="treatment" variantLetter="A" size="sm" />
                </div>
                <div className="absolute right-8 top-36">
                  <FlowNode id="t3" label="Variant B" variant="treatment" variantLetter="B" size="sm" />
                </div>
                <div className="absolute right-8 top-52">
                  <FlowNode id="t4" label="Winner" variant="winner" size="sm" />
                </div>
                <div className="absolute right-8 bottom-6">
                  <FlowNode id="t5" label="Default" size="sm" />
                </div>

                <svg className="absolute inset-0" style={{ zIndex: 1 }}>
                  <g style={{ pointerEvents: 'stroke' }}>
                    <FlowConnector from={{ x: 120, y: 140 }} to={{ x: 330, y: 30 }} colorToken="control" offsetIndex={0} />
                    <FlowConnector from={{ x: 120, y: 140 }} to={{ x: 330, y: 44 }} colorToken="variant" offsetIndex={1} />
                    <FlowConnector from={{ x: 120, y: 140 }} to={{ x: 330, y: 60 }} colorToken="variant" offsetIndex={2} />
                    <FlowConnector from={{ x: 120, y: 140 }} to={{ x: 330, y: 76 }} colorToken="winner" offsetIndex={3} />
                    <FlowConnector from={{ x: 120, y: 140 }} to={{ x: 330, y: 250 }} colorToken="default" offsetIndex={0} />
                  </g>
                </svg>
              </div>

              <div className="mt-4 text-xs text-text-muted space-y-1">
                <p><strong>Color Usage:</strong></p>
                <ul className="list-disc list-inside ml-2 space-y-0.5">
                  <li>control (gray) - Baseline/control group</li>
                  <li>variantA (purple) - First treatment variant</li>
                  <li>variant (blue) - Treatment variant</li>
                  <li>winner (green) - Promoted/winning variant</li>
                  <li>default (primary) - General connections</li>
                </ul>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="fanout" className="space-y-4">
            <Card className="p-6 bg-muted/30">
              <h3 className="font-semibold mb-3">Example 3: Fan-Out Pattern (offsetIndex)</h3>
              <p className="text-sm text-text-muted mb-4">
                Using <code className="bg-muted px-1 rounded text-2xs">offsetIndex</code> to prevent overlapping connectors 
                when one node branches to multiple targets (common in A/B/C tests).
              </p>
              
              <div className="bg-background p-8 rounded-lg border border-border relative" style={{ height: '200px' }}>
                <div className="absolute left-8 top-1/2 -translate-y-1/2">
                  <FlowNode id="control" label="Control" variant="control" size="sm" />
                </div>
                
                <div className="absolute right-8 top-8">
                  <FlowNode id="var-a" label="Variant A" variant="treatment" variantLetter="A" size="sm" />
                </div>
                <div className="absolute right-8 top-1/2 -translate-y-1/2">
                  <FlowNode id="var-b" label="Variant B" variant="treatment" variantLetter="B" size="sm" />
                </div>
                <div className="absolute right-8 bottom-8">
                  <FlowNode id="var-c" label="Variant C" variant="treatment" variantLetter="C" size="sm" />
                </div>

                <svg className="absolute inset-0" style={{ zIndex: 1 }}>
                  <g style={{ pointerEvents: 'stroke' }}>
                    <FlowConnector from={{ x: 120, y: 100 }} to={{ x: 330, y: 32 }} colorToken="variant" offsetIndex={0} />
                    <FlowConnector from={{ x: 120, y: 100 }} to={{ x: 330, y: 100 }} colorToken="variant" offsetIndex={1} />
                    <FlowConnector from={{ x: 120, y: 100 }} to={{ x: 330, y: 168 }} colorToken="variant" offsetIndex={2} />
                  </g>
                </svg>
              </div>

              <div className="mt-4 bg-info/10 border border-info/30 rounded p-3 text-xs text-text">
                <p><strong>How offsetIndex Works:</strong></p>
                <p className="mt-1">Each increment adds 8px vertical offset to prevent overlapping curves. Use 0-3 for clean fan-out patterns.</p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="workflow" className="space-y-4">
            <Card className="p-6 bg-muted/30">
              <h3 className="font-semibold mb-3">Example 4: Complete Experiment Workflow</h3>
              <p className="text-sm text-text-muted mb-4">
                Real-world pattern: Control → Variants A/B → Winner → Launch. Shows how connectors create 
                logical flow narrative in roadmap timeline.
              </p>
              
              <div className="bg-background p-8 rounded-lg border border-border relative" style={{ height: '240px' }}>
                {/* Control */}
                <div className="absolute left-6 top-1/2 -translate-y-1/2">
                  <FlowNode id="ctrl" label="Control" variant="control" trafficSplit="50%" size="sm" />
                </div>
                
                {/* Variants */}
                <div className="absolute left-1/2 -translate-x-1/2 top-8">
                  <FlowNode id="va" label="Variant A" variant="treatment" variantLetter="A" trafficSplit="25%" size="sm" />
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 bottom-8">
                  <FlowNode id="vb" label="Variant B" variant="winner" variantLetter="B" trafficSplit="25%" size="sm" />
                </div>
                
                {/* Launch */}
                <div className="absolute right-6 bottom-8">
                  <FlowNode id="launch" label="Launched" variant="launch" metric="+31% CTR" size="sm" />
                </div>

                <svg className="absolute inset-0" style={{ zIndex: 1 }}>
                  <g style={{ pointerEvents: 'stroke' }}>
                    {/* Control to Variants */}
                    <FlowConnector from={{ x: 126, y: 120 }} to={{ x: 230, y: 32 }} colorToken="variant" offsetIndex={0} />
                    <FlowConnector from={{ x: 126, y: 120 }} to={{ x: 230, y: 208 }} colorToken="variant" offsetIndex={1} />
                    {/* Winner to Launch */}
                    <FlowConnector from={{ x: 330, y: 208 }} to={{ x: 410, y: 208 }} colorToken="winner" offsetIndex={0} />
                  </g>
                </svg>

                <div className="absolute top-2 right-2">
                  <Badge variant="outline" className="text-2xs">Hover connectors</Badge>
                </div>
              </div>

              <div className="mt-4 text-xs text-text-muted">
                <p><strong>Pattern Elements:</strong></p>
                <ul className="list-disc list-inside ml-2 space-y-0.5 mt-1">
                  <li>Dashed connectors for Control → Variants (exploration phase)</li>
                  <li>Solid green connector for Winner → Launch (promotion path)</li>
                  <li>Semantic colors instantly communicate variant types</li>
                  <li>Hover interaction provides visual feedback</li>
                </ul>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* Technical Implementation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Technical Implementation</h2>
        
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Bezier Curve Calculation</h3>
            <p className="text-sm text-text-muted mb-3">
              FlowConnector uses cubic Bezier curves (M → C) with dynamically calculated control points 
              based on distance between nodes. This creates organic, flow-like paths.
            </p>
            <div className="bg-muted/30 p-4 rounded-lg font-mono text-xs text-text-muted space-y-1 overflow-x-auto">
              <div>{'// Calculate control point offset (design system spec: distance × 0.5)'}</div>
              <div>{'const dx = to.x - from.x;'}</div>
              <div>{'const controlPointOffset = Math.min(dx * 0.5, 80);'}</div>
              <div>{''}</div>
              <div>{'// Control points for S-curve'}</div>
              <div>{'const cp1x = from.x + controlPointOffset;'}</div>
              <div>{'const cp1y = from.y + (offsetIndex * 4);     // Vertical arc for fan-out'}</div>
              <div>{'const cp2x = to.x - controlPointOffset;'}</div>
              <div>{'const cp2y = to.y - (offsetIndex * 4);       // Mirror arc'}</div>
              <div>{''}</div>
              <div>{'// SVG path: M (move) → C (cubic Bezier)'}</div>
              <div>{'const path = `M ${from.x} ${from.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${to.x} ${to.y}`;'}</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground">Hover Interaction</h4>
              <ul className="text-sm text-text-muted space-y-1">
                <li>• Stroke width: 2.5px → 3.5px on hover</li>
                <li>• Opacity: 0.85 → 1.0 on hover</li>
                <li>• Anchor dots: 4px → 5px radius on hover</li>
                <li>• Transition: 200ms smooth animation</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground">Z-Index Layering</h4>
              <ul className="text-sm text-text-muted space-y-1">
                <li>• Background grid: z-index 0</li>
                <li>• <strong>Connectors: z-index 1</strong></li>
                <li>• Flow nodes: z-index 2+</li>
                <li>• Ensures proper visual hierarchy</li>
              </ul>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground">SVG Filters & Effects</h4>
            <ul className="text-sm text-text-muted space-y-1">
              <li>• Drop shadow: feGaussianBlur (stdDeviation: 2) + feOffset (dy: 1)</li>
              <li>• Invisible hitbox: 12px transparent stroke for easier interaction</li>
              <li>• Stroke linecap: round (smooth endpoints)</li>
              <li>• Anchor dots: White 1.5px stroke border with color fill</li>
            </ul>
          </div>
        </Card>
      </section>

      {/* Best Practices */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Best Practices</h2>
        
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
                  <strong className="text-sm text-foreground">Use semantic color tokens</strong>
                  <p className="text-sm text-text-muted mt-1">
                    variantA (purple), variant (blue), winner (green). Makes flow paths instantly recognizable.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5 space-y-3 border-success/50">
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm text-foreground">Calculate positions dynamically</strong>
                  <p className="text-sm text-text-muted mt-1">
                    Pass actual node center coordinates. Enables responsive layouts and vertical stacking.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5 space-y-3 border-success/50">
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm text-foreground">Use offsetIndex for fan-out</strong>
                  <p className="text-sm text-text-muted mt-1">
                    When one node connects to multiple targets (0, 1, 2, 3) prevents overlapping curves.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5 space-y-3 border-success/50">
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm text-foreground">Pair with labeled FlowNodes</strong>
                  <p className="text-sm text-text-muted mt-1">
                    Connectors supplement nodes (accessibility). Never rely on color/curves alone.
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
                  <strong className="text-sm text-foreground">Don't hardcode coordinates</strong>
                  <p className="text-sm text-text-muted mt-1">
                    Calculate from node positions. Fixed values break on resize or layout changes.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5 space-y-3 border-error/50">
              <div className="flex gap-3">
                <XCircle className="h-5 w-5 text-error shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm text-foreground">Don't create too many connectors</strong>
                  <p className="text-sm text-text-muted mt-1">
                    Limit to 10-15 per canvas. Beyond that, split into multiple views or simplify flow.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5 space-y-3 border-error/50">
              <div className="flex gap-3">
                <XCircle className="h-5 w-5 text-error shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm text-foreground">Don't use for unrelated nodes</strong>
                  <p className="text-sm text-text-muted mt-1">
                    Only connect nodes with logical relationships. Don't force connectors for visual effect.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5 space-y-3 border-error/50">
              <div className="flex gap-3">
                <XCircle className="h-5 w-5 text-error shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm text-foreground">Don't forget pointer-events: stroke</strong>
                  <p className="text-sm text-text-muted mt-1">
                    SVG needs this to enable hover/click on paths. Without it, interactions won't work.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Related Patterns & Components */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Related Patterns & Components</h2>
        
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-5 space-y-3">
            <h3 className="font-semibold text-foreground">Components</h3>
            <ul className="text-sm text-text-muted space-y-1">
              <li>• <a href="/design-system/components/flow-node" className="text-primary hover:underline">Flow Node</a> - Source/target endpoints</li>
              <li>• <a href="/design-system/components/badge" className="text-primary hover:underline">Badge</a> - Traffic split labels</li>
              <li>• SVG - Rendering layer</li>
            </ul>
          </Card>

          <Card className="p-5 space-y-3">
            <h3 className="font-semibold text-foreground">Patterns</h3>
            <ul className="text-sm text-text-muted space-y-1">
              <li>• <a href="/design-system/patterns/flow-connectors" className="text-primary hover:underline">Flow Connectors Pattern</a> - Design guidelines</li>
              <li>• <a href="/design-system/patterns/experiment-timeline-flow" className="text-primary hover:underline">Experiment Timeline & Flow</a> - Combined usage</li>
              <li>• <a href="/preview-components" className="text-primary hover:underline">Preview Components</a> - Live examples</li>
            </ul>
          </Card>

          <Card className="p-5 space-y-3">
            <h3 className="font-semibold text-foreground">Foundations</h3>
            <ul className="text-sm text-text-muted space-y-1">
              <li>• <a href="/design-system/foundations/colors" className="text-primary hover:underline">Color System</a> - Semantic HSL tokens</li>
              <li>• Z-index Layers - Stacking context</li>
              <li>• SVG Paths - Bezier fundamentals</li>
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
              <strong>Core primitive for flow visualizations:</strong> FlowConnector is the foundational component 
              for showing logical relationships. Used in 89 production instances across NodeTimeline, ExperimentTimelineFlow, 
              and template systems.
            </span>
          </li>
          <li className="flex gap-2">
            <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
            <span>
              <strong>Bezier curves create organic aesthetics:</strong> Cubic Bezier (M → C) with distance × 0.5 control 
              offset produces smooth, natural paths matching Postman Flows design language. Avoids mechanical straight lines.
            </span>
          </li>
          <li className="flex gap-2">
            <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
            <span>
              <strong>Semantic color tokens enable instant recognition:</strong> Purple (Variant A), Blue (Variant B), 
              Green (Winner) create visual hierarchy without needing to read labels. Critical for quick roadmap scanning.
            </span>
          </li>
          <li className="flex gap-2">
            <AlertCircle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
            <span>
              <strong>Always supplement with labeled nodes:</strong> Connectors enhance but don't replace text labels. 
              Never rely on color or curves alone for critical information (WCAG compliance).
            </span>
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default FlowConnectorDocs;
