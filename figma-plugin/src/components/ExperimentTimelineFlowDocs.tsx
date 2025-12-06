import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExperimentTimelineFlow } from "@/components/ExperimentTimelineFlow";
import { createMockExperiment } from "@/types/experiment-timeline";
import { 
  BookOpen, 
  Clock, 
  GitBranch, 
  Lightbulb, 
  CheckCircle2, 
  XCircle,
  Palette,
  Type,
  Layers
} from "lucide-react";

/**
 * Experiment Timeline & Flow Documentation
 * 
 * Storybook-style documentation for the combined timeline + flow visualization pattern
 */

export function ExperimentTimelineFlowDocs() {
  const simpleExperiment = createMockExperiment('simple');
  const variantsExperiment = createMockExperiment('variants');
  const decisionTreeExperiment = createMockExperiment('decision-tree');

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Hero Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-primary/10">
            <GitBranch className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-foreground">Experiment Timeline & Flow</h1>
            <p className="text-lg text-text-muted mt-1">
              Combined visualization showing both temporal phases and logical flow
            </p>
          </div>
        </div>
      </div>

      {/* Overview */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <BookOpen className="h-6 w-6" />
          Overview
        </h2>
        <Card className="p-6 space-y-3">
          <p className="text-base text-text">
            The <strong>Experiment Timeline & Flow</strong> visualization combines two powerful patterns: 
            timeline bars (showing <em>when</em> things happen) and flow connectors (showing <em>how</em> things relate). 
            This dual approach is perfect for experiments, A/B tests, and feature rollouts where you need to understand 
            both the temporal sequence and the logical relationships between variants.
          </p>
          <p className="text-base text-text">
            Use this pattern when you want to communicate: "Here's what we're testing, when each phase happens, 
            how users flow through variants, and which path won."
          </p>
        </Card>
      </section>

      {/* When to Use */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Lightbulb className="h-6 w-6" />
          When to Use
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-5 space-y-3 border-success/50">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-success" />
              <h3 className="font-semibold text-foreground">Best For</h3>
            </div>
            <ul className="space-y-2 text-sm text-text-muted">
              <li className="flex gap-2">
                <span className="text-success">✓</span>
                <span>Visualizing A/B/n experiments over time with multiple variants</span>
              </li>
              <li className="flex gap-2">
                <span className="text-success">✓</span>
                <span>Showing how traffic is routed between control and treatment groups</span>
              </li>
              <li className="flex gap-2">
                <span className="text-success">✓</span>
                <span>Explaining decision trees for personalized experiment logic</span>
              </li>
              <li className="flex gap-2">
                <span className="text-success">✓</span>
                <span>Comparing experiment phases (setup, baseline, running, analyzing)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-success">✓</span>
                <span>Feature rollouts with gradual traffic ramps and cohorts</span>
              </li>
            </ul>
          </Card>

          <Card className="p-5 space-y-3 border-error/50">
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-error" />
              <h3 className="font-semibold text-foreground">Not Ideal For</h3>
            </div>
            <ul className="space-y-2 text-sm text-text-muted">
              <li className="flex gap-2">
                <span className="text-error">✗</span>
                <span>Simple yes/no status updates (use a Badge instead)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-error">✗</span>
                <span>Static data visualization without temporal or flow context</span>
              </li>
              <li className="flex gap-2">
                <span className="text-error">✗</span>
                <span>Very complex flows with {'>'}8 nodes (becomes spaghetti)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-error">✗</span>
                <span>Real-time streaming data (use charts/graphs)</span>
              </li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Anatomy */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Layers className="h-6 w-6" />
          Anatomy
        </h2>
        <Card className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Timeline Components</h3>
              <ul className="space-y-2 text-sm text-text-muted">
                <li className="flex items-start gap-2">
                  <Clock className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                  <div>
                    <strong>Phase Bar:</strong> Horizontal bar showing experiment phases 
                    (Setup, Baseline, Running, Analyzing, Concluded)
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                  <div>
                    <strong>Time Axis:</strong> Date labels showing start/end of each phase
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                  <div>
                    <strong>Current Time Marker:</strong> Vertical line indicating "today" 
                    for in-progress experiments
                  </div>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Flow Components</h3>
              <ul className="space-y-2 text-sm text-text-muted">
                <li className="flex items-start gap-2">
                  <GitBranch className="h-4 w-4 mt-0.5 shrink-0 text-success" />
                  <div>
                    <strong>Variant Nodes:</strong> Pill-shaped nodes representing Control, 
                    Variant A, Variant B, etc.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <GitBranch className="h-4 w-4 mt-0.5 shrink-0 text-success" />
                  <div>
                    <strong>Flow Connectors:</strong> Bezier curves showing how variants connect 
                    and which path won
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <GitBranch className="h-4 w-4 mt-0.5 shrink-0 text-success" />
                  <div>
                    <strong>Outcome Nodes:</strong> Launch or result nodes showing final metrics 
                    and winning variant
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </section>

      {/* Timeline vs Flow - Core Rules */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Timeline vs Flow – When to Use Each</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Timeline Bars */}
          <Card className="p-6 space-y-4 bg-blue-50/50 border-blue-200">
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
                <p className="text-sm font-semibold text-text mb-1">Great For:</p>
                <ul className="text-sm text-text-muted space-y-1 ml-4 list-disc">
                  <li>Experiment phases with start/end dates</li>
                  <li>Showing overlapping timelines</li>
                  <li>Gantt-style project views</li>
                  <li>Campaign durations</li>
                </ul>
              </div>

              <div>
                <p className="text-sm font-semibold text-text mb-1">Answers:</p>
                <ul className="text-sm text-text-muted space-y-1 ml-4 list-disc">
                  <li>"What happened first/next/last?"</li>
                  <li>"How long did each phase last?"</li>
                  <li>"Are we on schedule?"</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Flow Connectors */}
          <Card className="p-6 space-y-4 bg-green-50/50 border-green-200">
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
                <p className="text-sm font-semibold text-text mb-1">Great For:</p>
                <ul className="text-sm text-text-muted space-y-1 ml-4 list-disc">
                  <li>User journey funnels</li>
                  <li>Traffic routing rules (50/50 split)</li>
                  <li>Branching logic and decision trees</li>
                  <li>State transitions and workflows</li>
                </ul>
              </div>

              <div>
                <p className="text-sm font-semibold text-text mb-1">Answers:</p>
                <ul className="text-sm text-text-muted space-y-1 ml-4 list-disc">
                  <li>"What path does a user take?"</li>
                  <li>"What happens if we go this way vs that way?"</li>
                  <li>"Which variant won and why?"</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Decision Guide */}
        <Card className="p-6 bg-primary/5 border-primary/20">
          <h3 className="text-base font-semibold text-foreground mb-3">Which One Should I Use?</h3>
          <ul className="space-y-2 text-sm text-text">
            <li className="flex gap-2">
              <span className="shrink-0">📅</span>
              <span>
                Use <strong>Timeline bars</strong> when the story is primarily about <strong>time</strong> 
                (schedules, durations, deadlines).
              </span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0">🔀</span>
              <span>
                Use <strong>Flow connectors</strong> when the story is primarily about <strong>logic, 
                funnels, or routing</strong> (how users flow, what connects to what).
              </span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0">🎯</span>
              <span>
                Use <strong>both together</strong> when you need to show how a flow/journey evolves over 
                a timeframe (experiments, feature rollouts, multi-phase campaigns).
              </span>
            </li>
          </ul>
        </Card>
      </section>

      {/* Examples */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Examples</h2>
        
        <Tabs defaultValue="simple" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="simple">Simple Experiment</TabsTrigger>
            <TabsTrigger value="variants">Multi-Variant Test</TabsTrigger>
            <TabsTrigger value="decision">Decision Tree</TabsTrigger>
          </TabsList>

          <TabsContent value="simple" className="space-y-4">
            <Card className="p-4 bg-muted/30">
              <h3 className="font-semibold mb-2">Example 1: Simple A/B Test</h3>
              <p className="text-sm text-text-muted mb-4">
                Basic experiment with Control vs Treatment. Timeline shows phases (Setup → Baseline → Running → Analyzing). 
                Flow shows Control testing against Treatment, with Treatment winning and launching.
              </p>
              <div className="bg-background rounded-lg p-2">
                <ExperimentTimelineFlow data={simpleExperiment} height={300} />
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="variants" className="space-y-4">
            <Card className="p-4 bg-muted/30">
              <h3 className="font-semibold mb-2">Example 2: Multi-Variant Pricing Test</h3>
              <p className="text-sm text-text-muted mb-4">
                Three-way test (Control + Variant A + Variant B). Timeline shows longer testing phase. 
                Flow shows Control branching to both variants, with Variant B (25% annual discount) winning.
              </p>
              <div className="bg-background rounded-lg p-2">
                <ExperimentTimelineFlow data={variantsExperiment} height={350} />
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="decision" className="space-y-4">
            <Card className="p-4 bg-muted/30">
              <h3 className="font-semibold mb-2">Example 3: Personalized Onboarding Flow</h3>
              <p className="text-sm text-text-muted mb-4">
                Decision tree routing users to personalized paths based on user type. 
                Shows how generic flow compares against developer and business-specific paths.
              </p>
              <div className="bg-background rounded-lg p-2">
                <ExperimentTimelineFlow data={decisionTreeExperiment} height={350} />
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* Accessibility & Readability */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Accessibility & Readability</h2>
        <Card className="p-6 space-y-4">
          <ul className="space-y-3 text-sm text-text">
            <li className="flex gap-3">
              <Badge variant="success" className="h-6 shrink-0">✓</Badge>
              <div>
                <strong>Color + Labels:</strong> Never rely on color alone. Each node and phase has text labels. 
                Use semantic colors (control=gray, treatment=purple, winner=green) consistently.
              </div>
            </li>
            <li className="flex gap-3">
              <Badge variant="success" className="h-6 shrink-0">✓</Badge>
              <div>
                <strong>Keep Labels Short:</strong> Use concise labels like "Control", "Variant B", "Launched" 
                instead of long descriptions. Full details go in tooltips or metric cards.
              </div>
            </li>
            <li className="flex gap-3">
              <Badge variant="success" className="h-6 shrink-0">✓</Badge>
              <div>
                <strong>Avoid Spaghetti:</strong> If you have {'>'}6-8 connections, consider grouping nodes, 
                collapsing phases, or splitting into multiple views. Dense flows are hard to parse.
              </div>
            </li>
            <li className="flex gap-3">
              <Badge variant="success" className="h-6 shrink-0">✓</Badge>
              <div>
                <strong>Semantic HTML:</strong> Use proper heading hierarchy (h1 → h2 → h3), 
                landmark roles, and ARIA labels for screen readers.
              </div>
            </li>
          </ul>
        </Card>
      </section>

      {/* Related Foundations & Components */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Related Foundations & Components</h2>
        
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">Foundations</h3>
            </div>
            <ul className="space-y-2 text-sm text-text-muted">
              <li>• Color System (semantic tokens)</li>
              <li>• Typography (hierarchy)</li>
              <li>• Spacing (8px grid)</li>
            </ul>
          </Card>

          <Card className="p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-success" />
              <h3 className="font-semibold text-foreground">Components</h3>
            </div>
            <ul className="space-y-2 text-sm text-text-muted">
              <li>• FlowNode (pill nodes)</li>
              <li>• FlowConnector (Bezier curves)</li>
              <li>• Badge (phase labels)</li>
              <li>• Card (container)</li>
            </ul>
          </Card>

          <Card className="p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Type className="h-5 w-5 text-warning" />
              <h3 className="font-semibold text-foreground">Patterns</h3>
            </div>
            <ul className="space-y-2 text-sm text-text-muted">
              <li>• Timeline visualization</li>
              <li>• Flow builder patterns</li>
              <li>• Funnel diagrams</li>
              <li>• State machines</li>
            </ul>
          </Card>
        </div>
      </section>
    </div>
  );
}
