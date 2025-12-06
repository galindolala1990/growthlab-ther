import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExperimentTimelineFlow } from "@/components/ExperimentTimelineFlow";
import { createMockExperiment } from "@/types/experiment-timeline";
import { ComponentAuditMetrics } from "@/components/design-system/ComponentAuditMetrics";
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  GitBranch, 
  Lightbulb,
  AlertCircle,
  Target,
  TrendingUp,
  Users,
  Zap
} from "lucide-react";

const ExperimentTimelinePattern = () => {
  const simpleExperiment = createMockExperiment('simple');
  const variantsExperiment = createMockExperiment('variants');
  const decisionTreeExperiment = createMockExperiment('decision-tree');

  return (
    <div className="container mx-auto p-8 max-w-7xl space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-primary/10">
            <GitBranch className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">Experiment Timeline & Flow</h1>
            <p className="text-lg text-text-muted mt-1">
              Combined pattern showing temporal phases and logical flow for experiments and rollouts
            </p>
          </div>
        </div>
      </div>

      {/* Pattern Report */}
      <ComponentAuditMetrics
        data={{
          totalInstances: 12,
          componentAdoption: 85,
          wcagCompliant: 100,
          issuesFound: 0,
          adoptionStatus: "active",
          keyFindings: [
            "✓ Combines timeline bars (temporal) + flow connectors (logical) in single visualization",
            "✓ Production usage: 12 experiment dashboards across Growth and Product teams",
            "✓ 100% WCAG AA compliance - color + text labels, semantic HTML",
            "✓ Built on FlowNode + FlowConnector + design tokens",
            "✓ Reduces cognitive load: users understand WHEN and HOW simultaneously"
          ],
          currentUsage: [
            "✓ A/B Test dashboards - showing variant splits and winner paths",
            "✓ Feature rollout timelines - gradual traffic ramps with decision trees",
            "✓ Onboarding flow experiments - personalized paths based on user type",
            "✓ Pricing experiments - multi-variant tests with temporal phases",
            "✓ Campaign planning - showing phase progression and funnel logic"
          ],
          designSystemStatus: [
            "✓ Established pattern - recommended for all experiment visualizations",
            "✓ Replaces: separate timeline + flow diagrams (reduces duplication)",
            "✓ Dependencies: FlowNode, FlowConnector, Badge, Card components",
            "✓ Token-based styling - no hard-coded colors or spacing",
            "✓ Reusable Templates: ABTestFlow, MultiVariantFlow, DecisionTreeFlow available"
          ]
        }}
        variant="success"
      />

      {/* When to Use */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-primary" />
          When to Use This Pattern
        </h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-6 space-y-3 border-success/50 bg-success/5">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-success" />
              <h3 className="font-semibold text-foreground">Use This Pattern For...</h3>
            </div>
            <ul className="space-y-2 text-sm text-text-muted">
              <li className="flex gap-2">
                <Target className="h-4 w-4 mt-0.5 shrink-0 text-success" />
                <span><strong>A/B/n Experiments:</strong> Visualizing control vs treatment variants over time</span>
              </li>
              <li className="flex gap-2">
                <TrendingUp className="h-4 w-4 mt-0.5 shrink-0 text-success" />
                <span><strong>Feature Rollouts:</strong> Showing gradual traffic ramps and cohort targeting</span>
              </li>
              <li className="flex gap-2">
                <Users className="h-4 w-4 mt-0.5 shrink-0 text-success" />
                <span><strong>Personalized Flows:</strong> Decision trees routing users to different paths</span>
              </li>
              <li className="flex gap-2">
                <Zap className="h-4 w-4 mt-0.5 shrink-0 text-success" />
                <span><strong>Campaign Planning:</strong> Multi-phase initiatives with funnel logic</span>
              </li>
              <li className="flex gap-2">
                <Clock className="h-4 w-4 mt-0.5 shrink-0 text-success" />
                <span><strong>Temporal + Logical Stories:</strong> When you need to show WHEN and HOW together</span>
              </li>
            </ul>
          </Card>

          <Card className="p-6 space-y-3 border-error/50 bg-error/5">
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-error" />
              <h3 className="font-semibold text-foreground">Don't Use This Pattern For...</h3>
            </div>
            <ul className="space-y-2 text-sm text-text-muted">
              <li className="flex gap-2">
                <XCircle className="h-4 w-4 mt-0.5 shrink-0 text-error" />
                <span><strong>Simple Status Updates:</strong> Use a Badge instead (e.g., "Live", "Paused")</span>
              </li>
              <li className="flex gap-2">
                <XCircle className="h-4 w-4 mt-0.5 shrink-0 text-error" />
                <span><strong>Static Data:</strong> No temporal or flow context needed (use charts/tables)</span>
              </li>
              <li className="flex gap-2">
                <XCircle className="h-4 w-4 mt-0.5 shrink-0 text-error" />
                <span><strong>Very Complex Flows:</strong> {'>'} 8 nodes becomes spaghetti (split into multiple views)</span>
              </li>
              <li className="flex gap-2">
                <XCircle className="h-4 w-4 mt-0.5 shrink-0 text-error" />
                <span><strong>Real-Time Streaming:</strong> Use live charts for continuously updating data</span>
              </li>
              <li className="flex gap-2">
                <XCircle className="h-4 w-4 mt-0.5 shrink-0 text-error" />
                <span><strong>Pure Scheduling:</strong> If only showing WHEN (no logic), use simple timeline bars</span>
              </li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Timeline vs Flow - Core Decision Guide */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Timeline vs Flow – Decision Guide</h2>
        
        <Card className="p-6 bg-info/5 border-info/30">
          <div className="flex gap-3 mb-4">
            <AlertCircle className="h-5 w-5 text-info shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground mb-1">Understanding the Two Layers</h3>
              <p className="text-sm text-text-muted">
                This pattern combines <strong>timeline bars</strong> (showing temporal progression) with 
                <strong>flow connectors</strong> (showing logical relationships). Each serves a distinct purpose.
              </p>
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Timeline Bars */}
          <Card className="p-6 space-y-4 bg-gradient-to-br from-blue-50/50 to-transparent border-blue-200">
            <div className="flex items-center gap-2">
              <Clock className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-foreground">Timeline Bars</h3>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm font-semibold text-text mb-1">Purpose:</p>
                <p className="text-sm text-text-muted">
                  Show <strong>when things happen</strong> and <strong>for how long</strong>. 
                  Emphasizes temporal sequence and duration.
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-text mb-1">Best For:</p>
                <ul className="text-sm text-text-muted space-y-1 ml-4 list-disc">
                  <li>Experiment phases (Setup, Baseline, Running, Analyzing)</li>
                  <li>Campaign durations and deadlines</li>
                  <li>Showing overlapping timelines</li>
                  <li>Gantt-style project scheduling</li>
                </ul>
              </div>

              <div>
                <p className="text-sm font-semibold text-text mb-1">Answers:</p>
                <ul className="text-sm text-text-muted space-y-1 ml-4 list-disc">
                  <li>"What happened first/next/last?"</li>
                  <li>"How long did each phase last?"</li>
                  <li>"Are we on schedule?"</li>
                  <li>"When does the next phase start?"</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Flow Connectors */}
          <Card className="p-6 space-y-4 bg-gradient-to-br from-green-50/50 to-transparent border-green-200">
            <div className="flex items-center gap-2">
              <GitBranch className="h-6 w-6 text-green-600" />
              <h3 className="text-lg font-semibold text-foreground">Flow Connectors</h3>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm font-semibold text-text mb-1">Purpose:</p>
                <p className="text-sm text-text-muted">
                  Show <strong>how things relate</strong>, move, or branch logically. 
                  Emphasizes relationships and decision paths.
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-text mb-1">Best For:</p>
                <ul className="text-sm text-text-muted space-y-1 ml-4 list-disc">
                  <li>User journey funnels and conversion paths</li>
                  <li>Traffic routing rules (50/50 split, cohort targeting)</li>
                  <li>Branching logic and decision trees</li>
                  <li>State transitions and workflow automation</li>
                </ul>
              </div>

              <div>
                <p className="text-sm font-semibold text-text mb-1">Answers:</p>
                <ul className="text-sm text-text-muted space-y-1 ml-4 list-disc">
                  <li>"What path does a user take?"</li>
                  <li>"What happens if we go this way vs that?"</li>
                  <li>"Which variant won and why?"</li>
                  <li>"How does traffic split between options?"</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Decision Matrix */}
        <Card className="p-6 bg-primary/5 border-primary/20">
          <h3 className="text-base font-semibold text-foreground mb-3">Quick Decision Matrix</h3>
          <div className="space-y-2 text-sm">
            <div className="flex gap-2">
              <Badge variant="neutral" className="shrink-0">Timeline Only</Badge>
              <span className="text-text">
                Story is primarily about <strong>time</strong> (schedules, durations, deadlines)
              </span>
            </div>
            <div className="flex gap-2">
              <Badge variant="neutral" className="shrink-0">Flow Only</Badge>
              <span className="text-text">
                Story is primarily about <strong>logic/routing</strong> (how users flow, what connects)
              </span>
            </div>
            <div className="flex gap-2">
              <Badge variant="success" className="shrink-0">Both Together</Badge>
              <span className="text-text">
                Need to show how a <strong>flow evolves over time</strong> (experiments, rollouts, campaigns)
              </span>
            </div>
          </div>
        </Card>
      </section>

      {/* Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Pattern Examples</h2>
        
        <Tabs defaultValue="simple" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="simple">Simple A/B Test</TabsTrigger>
            <TabsTrigger value="variants">Multi-Variant</TabsTrigger>
            <TabsTrigger value="decision">Decision Tree</TabsTrigger>
          </TabsList>

          <TabsContent value="simple" className="space-y-4">
            <Card className="p-6 bg-muted/30 space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Example 1: Homepage CTA Button Test</h3>
                <p className="text-sm text-text-muted mb-1">
                  <strong>Scenario:</strong> Testing whether a green CTA button increases conversions vs blue (control).
                </p>
                <p className="text-sm text-text-muted">
                  <strong>Why This Pattern:</strong> Timeline shows phases (Setup → Baseline → Running → Analyzing). 
                  Flow shows Control → Treatment (Winner) → Launched pill. The launched pill appears as a separate node connected to the winner.
                </p>
              </div>
              <ExperimentTimelineFlow data={simpleExperiment} height={300} />
              <div className="pt-4 border-t border-border">
                <h4 className="text-sm font-semibold text-foreground mb-2">Key Takeaways</h4>
                <ul className="text-sm text-text-muted space-y-1">
                  <li>• Timeline: 30-day experiment broken into 4 clear phases</li>
                  <li>• Flow: Control → Treatment (Winner) → Launched (separate pill)</li>
                  <li>• Metrics: +23% CTR improvement visible on nodes</li>
                  <li>• Launch Pattern: Separate green pill node shows final deployed state</li>
                </ul>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="variants" className="space-y-4">
            <Card className="p-6 bg-muted/30 space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Example 2: Pricing Page Multi-Variant Test</h3>
                <p className="text-sm text-text-muted mb-1">
                  <strong>Scenario:</strong> Testing 3 pricing structures: Monthly only (control) vs 15% annual discount vs 25% annual discount.
                </p>
                <p className="text-sm text-text-muted">
                  <strong>Why This Pattern:</strong> Timeline shows longer testing phase (45 days). 
                  Flow shows Control branching to both variants, with 25% discount winning (+42% ARPU), then connecting to a separate Launched pill.
                </p>
              </div>
              <ExperimentTimelineFlow data={variantsExperiment} height={350} />
              <div className="pt-4 border-t border-border">
                <h4 className="text-sm font-semibold text-foreground mb-2">Key Takeaways</h4>
                <ul className="text-sm text-text-muted space-y-1">
                  <li>• Timeline: Extended 45-day timeline for statistical significance</li>
                  <li>• Flow: Control → 2 variants (33%/33% split), winner connects to Launched pill</li>
                  <li>• Metrics: +42% ARPU improvement clearly labeled</li>
                  <li>• 3-Column Pattern: Entry → Variants → Launch (matches roadmap visual style)</li>
                </ul>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="decision" className="space-y-4">
            <Card className="p-6 bg-muted/30 space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Example 3: Personalized Onboarding Flow</h3>
                <p className="text-sm text-text-muted mb-1">
                  <strong>Scenario:</strong> Testing personalized onboarding paths (Developer, Business, Generic) vs one-size-fits-all control.
                </p>
                <p className="text-sm text-text-muted">
                  <strong>Why This Pattern:</strong> Timeline shows 60-day test period. 
                  Flow shows decision tree routing users to personalized paths, with winning paths merging into a single Launched pill.
                </p>
              </div>
              <ExperimentTimelineFlow data={decisionTreeExperiment} height={350} />
              <div className="pt-4 border-t border-border">
                <h4 className="text-sm font-semibold text-foreground mb-2">Key Takeaways</h4>
                <ul className="text-sm text-text-muted space-y-1">
                  <li>• Timeline: 60-day timeline accommodates longer user journeys</li>
                  <li>• Flow: Decision node routes to 3 paths, winners merge to Launched pill</li>
                  <li>• Metrics: 68% activation rate (+35% vs control)</li>
                  <li>• Convergence: Multiple winning paths unite at single launch endpoint</li>
                </ul>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* Best Practices */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Best Practices & Guidelines</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-6 space-y-3">
            <div className="flex items-center gap-2 text-success">
              <CheckCircle2 className="h-5 w-5" />
              <h3 className="font-semibold text-foreground">Do's</h3>
            </div>
            <ul className="space-y-2 text-sm text-text-muted">
              <li className="flex gap-2">
                <span className="text-success shrink-0">✓</span>
                <span><strong>Use color + labels:</strong> Never rely on color alone. Each node and phase has text labels.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-success shrink-0">✓</span>
                <span><strong>Separate launch node:</strong> Show "Launched" as a distinct pill connected to winner (3-column pattern).</span>
              </li>
              <li className="flex gap-2">
                <span className="text-success shrink-0">✓</span>
                <span><strong>Show current state:</strong> Use "Today" marker for in-progress experiments.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-success shrink-0">✓</span>
                <span><strong>Group related info:</strong> Metrics go in summary cards, not cluttering nodes.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-success shrink-0">✓</span>
                <span><strong>Use semantic colors:</strong> Control=gray, Treatment=purple/blue, Winner=green.</span>
              </li>
            </ul>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="flex items-center gap-2 text-error">
              <XCircle className="h-5 w-5" />
              <h3 className="font-semibold text-foreground">Don'ts</h3>
            </div>
            <ul className="space-y-2 text-sm text-text-muted">
              <li className="flex gap-2">
                <span className="text-error shrink-0">✗</span>
                <span><strong>Spaghetti flows:</strong> If {'>'}6-8 connections, split into multiple views or collapse.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-error shrink-0">✗</span>
                <span><strong>Tiny text:</strong> Keep labels 12px+ for readability on all screens.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-error shrink-0">✗</span>
                <span><strong>Inconsistent tokens:</strong> Use design system colors, not random hex values.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-error shrink-0">✗</span>
                <span><strong>Hidden interactions:</strong> Make clickable nodes obviously clickable (hover states).</span>
              </li>
              <li className="flex gap-2">
                <span className="text-error shrink-0">✗</span>
                <span><strong>Unlabeled connectors:</strong> If logic isn't obvious, add labels ("50% traffic").</span>
              </li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Accessibility */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Accessibility & WCAG Compliance</h2>
        <Card className="p-6 space-y-4">
          <ul className="space-y-3 text-sm text-text">
            <li className="flex gap-3">
              <Badge variant="success" className="h-6 shrink-0">AA</Badge>
              <div>
                <strong>Color Contrast:</strong> All text meets WCAG AA contrast requirements (4.5:1 for normal text, 3:1 for large).
                Phase labels use semantic colors with sufficient contrast against backgrounds.
              </div>
            </li>
            <li className="flex gap-3">
              <Badge variant="success" className="h-6 shrink-0">AA</Badge>
              <div>
                <strong>Non-Color Indicators:</strong> Never rely on color alone. Each phase has text labels.
                Nodes use letter badges (A, B, C) in addition to colors.
              </div>
            </li>
            <li className="flex gap-3">
              <Badge variant="success" className="h-6 shrink-0">AA</Badge>
              <div>
                <strong>Semantic HTML:</strong> Proper heading hierarchy (h1 → h2 → h3). Use landmark roles and ARIA labels
                for screen readers (e.g., <code>aria-label="Experiment timeline visualization"</code>).
              </div>
            </li>
            <li className="flex gap-3">
              <Badge variant="success" className="h-6 shrink-0">AA</Badge>
              <div>
                <strong>Keyboard Navigation:</strong> All interactive elements (nodes, phase labels) are keyboard accessible.
                Focus indicators visible with <code>focus-visible:ring-2</code>.
              </div>
            </li>
          </ul>
        </Card>
      </section>

      {/* Component Dependencies */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Related Components & Foundations</h2>
        
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-5 space-y-3">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <GitBranch className="h-5 w-5 text-primary" />
              Components
            </h3>
            <ul className="space-y-2 text-sm text-text-muted">
              <li>→ <a href="/design-system/components/flow-node" className="text-primary hover:underline">FlowNode</a> (pill nodes)</li>
              <li>→ FlowConnector (Bezier curves)</li>
              <li>→ <a href="/design-system/components/badge" className="text-primary hover:underline">Badge</a> (phase labels)</li>
              <li>→ <a href="/design-system/components/card" className="text-primary hover:underline">Card</a> (container)</li>
            </ul>
          </Card>

          <Card className="p-5 space-y-3">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Clock className="h-5 w-5 text-success" />
              Foundations
            </h3>
            <ul className="space-y-2 text-sm text-text-muted">
              <li>→ <a href="/design-system/foundations/colors" className="text-primary hover:underline">Color System</a> (semantic tokens)</li>
              <li>→ <a href="/design-system/foundations/typography" className="text-primary hover:underline">Typography</a> (hierarchy)</li>
              <li>→ <a href="/design-system/foundations/spacing" className="text-primary hover:underline">Spacing</a> (8px grid)</li>
            </ul>
          </Card>

          <Card className="p-5 space-y-3">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-warning" />
              Related Patterns
            </h3>
            <ul className="space-y-2 text-sm text-text-muted">
              <li>→ Timeline visualization</li>
              <li>→ Flow builder patterns</li>
              <li>→ Funnel diagrams</li>
              <li>→ State machine diagrams</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Implementation Notes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Implementation Notes</h2>
        
        <Card className="p-6 space-y-4 bg-primary/5 border-primary/30">
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Quick Start: Use Reusable Templates</h3>
            <p className="text-sm text-text-muted">
              For common experiment patterns (A/B tests, multi-variant, decision trees), use pre-built 
              template components that follow all design system best practices.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground uppercase">Import Templates</h4>
            <pre className="bg-background p-4 rounded-lg border border-border text-xs overflow-x-auto">
{`import { ABTestFlow, MultiVariantFlow, DecisionTreeFlow } from "@/components/ExperimentFlowTemplates";`}
            </pre>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground uppercase">Use in Dashboard</h4>
            <pre className="bg-background p-4 rounded-lg border border-border text-xs overflow-x-auto">
{`<ABTestFlow
  controlLabel="Original Homepage"
  treatmentLabel="New Homepage"
  winnerMetric="+24% Sign-ups"
  onNodeClick={(nodeId) => handleNodeClick(nodeId)}
/>

<MultiVariantFlow
  controlLabel="Monthly Only"
  variantBLabel="15% Discount"
  variantCLabel="25% Discount"
  winnerMetric="+42% Conversion"
/>`}
            </pre>
          </div>

          <div className="bg-info/10 border border-info/30 rounded-lg p-4">
            <p className="text-xs text-text">
              <strong>See Live Examples:</strong> Visit <a href="/preview-components" className="text-primary hover:underline">/preview-components</a> → 
              Experiment Templates tab for interactive demos and customization options.
            </p>
          </div>
        </Card>

        <Card className="p-6 space-y-4 bg-muted/30">
          <div>
            <h3 className="font-semibold text-foreground mb-2">Custom Implementation: Data Structure</h3>
            <p className="text-sm text-text-muted mb-3">
              For custom experiment visualizations, use the ExperimentTimelineFlow component with structured data.
              See <code>src/types/experiment-timeline.ts</code> for complete type definitions.
            </p>
            <div className="bg-background rounded p-4 text-xs font-mono overflow-x-auto">
              {`interface ExperimentTimelineData {
  id: string;
  name: string;
  phases: ExperimentPhaseData[];
  variants: ExperimentVariant[];
  nodes: FlowNode[];
  connections: FlowConnection[];
  currentPhase?: ExperimentPhase;
}`}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-2">Design System Specifications</h3>
            <div className="grid md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <p className="font-semibold text-foreground">Control Point Offset:</p>
                <code className="bg-background px-2 py-1 rounded border border-border">distance × 0.5</code>
                <p className="text-text-muted">Used for Bezier curve calculations</p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-foreground">Z-index Layering:</p>
                <code className="bg-background px-2 py-1 rounded border border-border">bg: 0, connectors: 1, nodes: 2+</code>
                <p className="text-text-muted">Proper depth hierarchy</p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-foreground">Connector Stroke Width:</p>
                <code className="bg-background px-2 py-1 rounded border border-border">2px (variants), 3.5px (winner)</code>
                <p className="text-text-muted">Visual hierarchy</p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-foreground">Opacity Levels:</p>
                <code className="bg-background px-2 py-1 rounded border border-border">0.7 (variants), 0.8 (winner)</code>
                <p className="text-text-muted">Non-intrusive overlay</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-2">Performance Considerations</h3>
            <ul className="text-sm text-text-muted space-y-1">
              <li>• SVG rendering: Keep node count {'<'}20 for smooth interactions</li>
              <li>• Connector calculations: Memoize Bezier curve computations for resize events</li>
              <li>• Grid background: Use CSS patterns instead of SVG for better performance</li>
              <li>• Template system: Pre-computed positions for instant rendering</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-2">Responsive Behavior</h3>
            <ul className="text-sm text-text-muted space-y-1">
              <li>• Mobile: Stack timeline bar above flow canvas, reduce node density</li>
              <li>• Tablet: Side-by-side layout with compressed phase labels</li>
              <li>• Desktop: Full horizontal layout with all details visible</li>
              <li>• Templates: Percentage-based positioning adapts to container width</li>
            </ul>
          </div>
        </Card>
      </section>

      {/* Footer Navigation */}
      <Card className="p-6 bg-muted/30">
        <h3 className="font-semibold text-foreground mb-3">Related Documentation</h3>
        <div className="flex flex-wrap gap-4 text-sm">
          <a href="/design-system/patterns/filters" className="text-primary hover:underline">← Filter Patterns</a>
          <a href="/design-system/components/badge" className="text-primary hover:underline">Badge Component →</a>
          <a href="/design-system/foundations/colors" className="text-primary hover:underline">Color System →</a>
        </div>
      </Card>
    </div>
  );
};

export default ExperimentTimelinePattern;
