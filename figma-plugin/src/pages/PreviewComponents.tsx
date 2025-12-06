import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Chip } from "@/components/ui/chip";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { Card } from "@/components/ui/card";
import { Plus, Settings, Zap, CheckCircle2, AlertCircle, XCircle, BookOpen, Sparkles, GitCompare, GitBranch, Beaker } from "lucide-react";
import Roadmap from "@/pages/Roadmap";
import { ExperimentFlowDocumentation } from "@/components/ExperimentFlowDocumentation";
import { TimelineComparison } from "@/components/TimelineComparison";
import { ExperimentTimelineFlowDocs } from "@/components/ExperimentTimelineFlowDocs";
import { ABTestFlow, MultiVariantFlow, DecisionTreeFlow } from "@/components/ExperimentFlowTemplates";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FlowNode } from "@/components/FlowNode";

/**
 * PreviewComponents
 * 
 * Showcases the refactored design system components:
 * - Updated Button with token-based styling
 * - New Chip component for filters and tags
 * - New SegmentedControl component for grouped selections
 * - Refactored Roadmap page with normalized spacing and hierarchy
 */

const PreviewComponents = () => {
  const [selectedZoom, setSelectedZoom] = useState("months");
  const [selectedChips, setSelectedChips] = useState<Set<string>>(new Set(["planning"]));

  const toggleChip = (id: string) => {
    const newSet = new Set(selectedChips);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedChips(newSet);
  };

  const buttonSizes = ["sm", "md", "lg"] as const;
  const buttonVariants = ["primary", "secondary", "outline", "ghost", "destructive"] as const;
  const chipVariants = ["neutral", "primary", "outline", "primary-soft"] as const;

  return (
    <div className="container mx-auto p-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Design System Components</h1>
        <p className="text-lg text-muted-foreground">
          Preview of refactored components using token-based colors and consistent spacing
        </p>
      </div>

      <Tabs defaultValue="components" className="w-full">
        <TabsList>
          <TabsTrigger value="components">UI Components</TabsTrigger>
          <TabsTrigger value="experiment-templates">
            <Beaker className="w-4 h-4 mr-2" />
            Experiment Templates
          </TabsTrigger>
          <TabsTrigger value="experiment-flow">
            <BookOpen className="w-4 h-4 mr-2" />
            Experiment Timeline & Flow
          </TabsTrigger>
          <TabsTrigger value="bars-vs-nodes">
            <GitCompare className="w-4 h-4 mr-2" />
            Bars vs Nodes
          </TabsTrigger>
          <TabsTrigger value="timeline-flow-docs">
            <GitBranch className="w-4 h-4 mr-2" />
            Timeline + Flow Pattern
          </TabsTrigger>
        </TabsList>

        <TabsContent value="experiment-templates" className="space-y-8">
          {/* Experiment Flow Templates */}
          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-foreground">Experiment Flow Templates</h2>
              <p className="text-sm text-muted-foreground">
                Reusable instances for A/B tests, multi-variant experiments, and decision trees.
                Use these templates to visualize current and future experiments.
              </p>
            </div>

            {/* A/B Test Pattern */}
            <Card className="p-6 space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">Pattern 1: Simple A/B Test</h3>
                <p className="text-sm text-text-muted">
                  Control (50%) vs Treatment (50%) → Winner → Launch. Best for: Homepage CTAs, 
                  email subject lines, pricing page tests.
                </p>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-foreground uppercase">Default Example</h4>
                <ABTestFlow 
                  controlLabel="Blue Button"
                  treatmentLabel="Green Button"
                  winnerMetric="+31% CTR"
                  onNodeClick={(nodeId) => console.log("Clicked:", nodeId)}
                />
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-foreground uppercase">Custom Example: Email Campaign</h4>
                <ABTestFlow 
                  controlLabel="Subject: Save 20%"
                  treatmentLabel="Subject: Limited Time!"
                  winnerMetric="+18% Open Rate"
                />
              </div>

              <div className="bg-info/10 border border-info/30 rounded-lg p-4">
                <p className="text-xs text-text">
                  <strong>Usage:</strong> Import <code className="bg-muted px-1 py-0.5 rounded text-2xs">ABTestFlow</code> component. 
                  Pass custom labels and metric to match your experiment.
                </p>
              </div>
            </Card>

            {/* Multi-Variant Pattern */}
            <Card className="p-6 space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">Pattern 2: Multi-Variant Test (3 variants)</h3>
                <p className="text-sm text-text-muted">
                  Control → Variant B + Variant C → Winner C → Launch. Best for: Pricing experiments, 
                  multi-message tests, complex feature variations.
                </p>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-foreground uppercase">Default Example</h4>
                <MultiVariantFlow 
                  controlLabel="Monthly Only"
                  variantBLabel="15% Discount"
                  variantCLabel="25% Discount"
                  winnerMetric="+42% Conversion"
                  onNodeClick={(nodeId) => console.log("Clicked:", nodeId)}
                />
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-foreground uppercase">Custom Example: Onboarding Flow</h4>
                <MultiVariantFlow 
                  controlLabel="5-Step Form"
                  variantBLabel="3-Step Form"
                  variantCLabel="1-Step Form"
                  winnerMetric="+67% Completion"
                />
              </div>

              <div className="bg-info/10 border border-info/30 rounded-lg p-4">
                <p className="text-xs text-text">
                  <strong>Usage:</strong> Import <code className="bg-muted px-1 py-0.5 rounded text-2xs">MultiVariantFlow</code> component. 
                  Supports up to 3 variants (Control + B + C). Winner path shown with bold green connector + arrow.
                </p>
              </div>
            </Card>

            {/* Decision Tree Pattern */}
            <Card className="p-6 space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">Pattern 3: Decision Tree</h3>
                <p className="text-sm text-text-muted">
                  Entry → Decision Node → 3 Persona Paths → Outcomes. Best for: Onboarding flows, 
                  personalization paths, multi-step wizards.
                </p>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-foreground uppercase">Default Example</h4>
                <DecisionTreeFlow 
                  entryLabel="Signup"
                  decisionLabel="User Type?"
                  path1Label="Generic"
                  path2Label="Developer"
                  path3Label="Business"
                  onNodeClick={(nodeId) => console.log("Clicked:", nodeId)}
                />
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-foreground uppercase">Custom Example: Product Recommendations</h4>
                <DecisionTreeFlow 
                  entryLabel="Quiz Start"
                  decisionLabel="Budget?"
                  path1Label="< $50"
                  path2Label="$50-$100"
                  path3Label="> $100"
                />
              </div>

              <div className="bg-info/10 border border-info/30 rounded-lg p-4">
                <p className="text-xs text-text">
                  <strong>Usage:</strong> Import <code className="bg-muted px-1 py-0.5 rounded text-2xs">DecisionTreeFlow</code> component. 
                  Shows branching logic from single decision point to 3 paths. Winner badge indicates primary path.
                </p>
              </div>
            </Card>

            {/* Implementation Guide */}
            <Card className="p-6 space-y-4 bg-primary/5 border-primary/30">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Beaker className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="text-lg font-semibold text-foreground">How to Use These Templates</h3>
                  <div className="space-y-2 text-sm text-text-muted">
                    <p>
                      <strong>1. Import the component:</strong>
                    </p>
                    <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
{`import { ABTestFlow, MultiVariantFlow, DecisionTreeFlow } from "@/components/ExperimentFlowTemplates";`}
                    </pre>
                    
                    <p className="mt-3">
                      <strong>2. Use in your experiment dashboard:</strong>
                    </p>
                    <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
{`<ABTestFlow
  controlLabel="Original Homepage"
  treatmentLabel="New Homepage"
  winnerMetric="+24% Sign-ups"
  onNodeClick={(nodeId) => handleNodeClick(nodeId)}
/>`}
                    </pre>

                    <p className="mt-3">
                      <strong>3. Customize labels to match your experiment:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>All labels are customizable via props</li>
                      <li>Winner metric can show any format: "+31% CTR", "$2.4M ARR", "67% Completion"</li>
                      <li>onNodeClick handler receives node ID for interaction tracking</li>
                      <li>Follows /design-system/patterns/flow-connectors best practices</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </section>
        </TabsContent>

        <TabsContent value="components" className="space-y-8">
      {/* Button Component Showcase */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-foreground">Button Component</h2>
          <p className="text-sm text-muted-foreground">
            Primary CTA and navigation buttons with token-based colors, states, and focus rings
          </p>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-6 space-y-6">
          {/* By Variant */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground-muted uppercase">Variants</h3>
            <div className="flex flex-wrap gap-3">
              {buttonVariants.map((variant) => (
                <Button key={variant} variant={variant as any} size="md" className="capitalize">
                  {variant}
                </Button>
              ))}
            </div>
          </div>

          {/* By Size */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground-muted uppercase">Sizes</h3>
            <div className="flex flex-wrap items-center gap-3">
              {buttonSizes.map((size) => (
                <Button key={size} size={size} className="gap-2">
                  <Plus className="w-4 h-4" />
                  {size.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>

          {/* With Icon */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground-muted uppercase">With Icons</h3>
            <div className="flex flex-wrap gap-3">
              <Button size="md" className="gap-2">
                <Plus className="w-4 h-4" />
                Add Feature
              </Button>
              <Button size="md" variant="outline" className="gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </Button>
              <Button size="md" variant="ghost" className="gap-2">
                <Zap className="w-4 h-4" />
                Boost
              </Button>
            </div>
          </div>

          {/* States */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground-muted uppercase">States</h3>
            <div className="flex flex-wrap gap-3">
              <Button size="md">Normal</Button>
              <Button size="md" disabled>
                Disabled
              </Button>
            </div>
          </div>

          {/* Interactive State Demonstration */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground-muted uppercase">Interactive State Demo</h3>
            <div className="bg-neutral-50 rounded-lg p-4 space-y-3">
              <p className="text-xs text-foreground-muted">Interact with these buttons to see all states:</p>
              <div className="flex flex-wrap gap-3">
                <Button size="md" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Hover & Click Me
                </Button>
                <Button size="md" variant="outline" className="gap-2">
                  <Settings className="w-4 h-4" />
                  Try Focus Ring
                </Button>
              </div>
              <div className="text-xs text-foreground-muted space-y-1">
                <p>• <strong>Default:</strong> Primary purple background (#6F4CFF)</p>
                <p>• <strong>Hover:</strong> Darker purple (#5F3DE6)</p>
                <p>• <strong>Active:</strong> Darkest purple (#4D2DCB) - visible when clicking</p>
                <p>• <strong>Focus:</strong> 2px ring in soft purple (#E6E3FF)</p>
                <p>• <strong>Disabled:</strong> 60% opacity, no pointer</p>
              </div>
            </div>
          </div>

          {/* WCAG Compliance */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground-muted uppercase">WCAG AA Compliance</h3>
            <div className="bg-success/10 border border-success/30 rounded-lg p-4 space-y-2">
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-success flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">✓</div>
                <div className="text-xs text-foreground">
                  <strong>Primary button contrast: 4.7:1</strong><br/>
                  White text (#FFFFFF) on primary purple (#6F4CFF) meets WCAG AA standards
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-success flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">✓</div>
                <div className="text-xs text-foreground">
                  <strong>Minimum height: 40px</strong><br/>
                  Default button size (md) meets touch target guidelines
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-success flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">✓</div>
                <div className="text-xs text-foreground">
                  <strong>Focus indicators:</strong><br/>
                  2px ring visible on keyboard navigation
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dark Background Test */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-foreground">Dark Background Test</h2>
          <p className="text-sm text-foreground-muted">
            Primary buttons maintain WCAG AA contrast on both light and dark backgrounds
          </p>
        </div>

        <div className="bg-bg-dark-DEFAULT rounded-lg p-6 space-y-4">
          <p className="text-white text-sm mb-4">Buttons on dark background (#050816):</p>
          <div className="flex flex-wrap gap-3">
            <Button size="md" className="gap-2">
              <Plus className="w-4 h-4" />
              Primary Action
            </Button>
            <Button size="md" variant="outline" className="gap-2 border-neutral-400 text-white hover:bg-white/10">
              <Settings className="w-4 h-4" />
              Secondary
            </Button>
            <Button size="md" disabled className="gap-2">
              <Zap className="w-4 h-4" />
              Disabled
            </Button>
          </div>
        </div>
      </section>

      {/* Badge vs Chip Guidelines */}
      <section className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Badge vs Chip — When to Use Each</h2>
          <p className="text-sm text-foreground-muted">
            Badges display read-only metadata. Chips enable interactive selections, filtering, and tagging.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Badge Use Cases */}
          <Card className="p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">Use a Badge when...</h3>
              <p className="text-sm text-muted-foreground">Read-only status, type, or priority labels</p>
            </div>

            <div className="space-y-4">
              {/* Status Example */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">✅ Showing status</p>
                <div className="flex gap-2">
                  <Badge variant="success">Live</Badge>
                  <Badge variant="warning">At risk</Badge>
                  <Badge variant="neutral">Paused</Badge>
                </div>
              </div>

              {/* Type Example */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">✅ Showing type/category</p>
                <div className="flex gap-2">
                  <Badge variant="default">Experiment</Badge>
                  <Badge variant="outline">Feature flag</Badge>
                  <Badge variant="neutral">A/B test</Badge>
                </div>
              </div>

              {/* Priority Example */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">✅ Showing priority</p>
                <div className="flex gap-2">
                  <Badge variant="error">Critical</Badge>
                  <Badge variant="warning">High</Badge>
                  <Badge variant="neutral">Low</Badge>
                </div>
              </div>

              {/* Inline Example */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">✅ Inline with text</p>
                <Card className="p-3 bg-muted/30">
                  <h4 className="text-sm font-medium">Launch email redesign</h4>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="warning">High priority</Badge>
                    <Badge variant="success">On track</Badge>
                  </div>
                </Card>
              </div>
            </div>
          </Card>

          {/* Chip Use Cases */}
          <Card className="p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">Use a Chip when...</h3>
              <p className="text-sm text-muted-foreground">Interactive filtering, selection, or tagging</p>
            </div>

            <div className="space-y-4">
              {/* Filter Example */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">✅ User can filter data</p>
                <div className="flex gap-2">
                  <Chip label="Planning" selected onClick={() => {}} />
                  <Chip label="In Progress" onClick={() => {}} />
                  <Chip label="Completed" onClick={() => {}} />
                </div>
              </div>

              {/* Multi-select Example */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">✅ Multi-select options</p>
                <div className="flex flex-wrap gap-2">
                  <Chip label="Conversion" selected onClick={() => {}} />
                  <Chip label="Revenue" selected onClick={() => {}} />
                  <Chip label="Retention" onClick={() => {}} />
                </div>
              </div>

              {/* Removable Example */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">✅ User can remove items</p>
                <div className="flex gap-2">
                  <Chip label="Growth" removable onRemove={() => {}} />
                  <Chip label="Retention" removable onRemove={() => {}} />
                </div>
              </div>

              {/* Token Example */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">✅ Chosen token display</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Metric:</span>
                  <Chip label="Conversion rate" removable onRemove={() => {}} />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Do/Don't Examples */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* DO: Badge for Status */}
          <Card className="p-6 space-y-3 border-success/50">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-success" />
              <h3 className="text-sm font-semibold text-foreground">DO: Use Badge for status</h3>
            </div>
            <Card className="p-3 bg-muted/30">
              <div className="flex items-center justify-between">
                <span className="text-sm">Email redesign</span>
                <Badge variant="success">Live</Badge>
              </div>
            </Card>
            <p className="text-xs text-muted-foreground">Status is read-only metadata, not interactive</p>
          </Card>

          {/* DON'T: Chip for Status */}
          <Card className="p-6 space-y-3 border-error/50">
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-destructive" />
              <h3 className="text-sm font-semibold text-foreground">DON'T: Use Chip for status</h3>
            </div>
            <Card className="p-3 bg-muted/30">
              <div className="flex items-center justify-between">
                <span className="text-sm">Email redesign</span>
                <Chip label="Live" selected />
              </div>
            </Card>
            <p className="text-xs text-muted-foreground">Chip implies interactivity when there is none</p>
          </Card>

          {/* DO: Chip for Filters */}
          <Card className="p-6 space-y-3 border-success/50">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-success" />
              <h3 className="text-sm font-semibold text-foreground">DO: Use Chip for filters</h3>
            </div>
            <div className="flex gap-2">
              <Chip label="Planning" selected onClick={() => {}} />
              <Chip label="In Progress" onClick={() => {}} />
            </div>
            <p className="text-xs text-muted-foreground">Users can click to toggle filter states</p>
          </Card>

          {/* DON'T: Badge for Filters */}
          <Card className="p-6 space-y-3 border-error/50">
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-destructive" />
              <h3 className="text-sm font-semibold text-foreground">DON'T: Use Badge for filters</h3>
            </div>
            <div className="flex gap-2">
              <Badge variant="default">Planning</Badge>
              <Badge variant="neutral">In Progress</Badge>
            </div>
            <p className="text-xs text-muted-foreground">Badges can't be clicked or toggled</p>
          </Card>
        </div>

        {/* Common Patterns */}
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Common Patterns</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Pattern 1: Card with Badges */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Pattern: Card metadata with Badges</p>
              <Card className="p-4 bg-muted/30">
                <h4 className="text-base font-semibold">Launch checkout redesign</h4>
                <p className="text-sm text-muted-foreground mt-1">Q4 2025 growth initiative</p>
                <div className="flex gap-2 mt-3">
                  <Badge variant="default">Experiment</Badge>
                  <Badge variant="success">Live</Badge>
                  <Badge variant="warning">High</Badge>
                </div>
              </Card>
            </div>

            {/* Pattern 2: Filter Bar with Chips */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Pattern: Filter bar with Chips</p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <div className="flex gap-2">
                    <Chip label="Planning" selected onClick={() => {}} />
                    <Chip label="Active" onClick={() => {}} />
                    <Chip label="Done" onClick={() => {}} />
                  </div>
                </div>
              </div>
            </div>

            {/* Pattern 3: Active Filters */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Pattern: Active filters (removable)</p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                <Chip label="Growth" removable onRemove={() => {}} />
                <Chip label="Q4 2025" removable onRemove={() => {}} />
              </div>
            </div>

            {/* Pattern 4: Chosen Tokens */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Pattern: Selected metadata tokens</p>
              <div className="flex gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Metric:</span>
                  <Chip label="Conversion rate" removable onRemove={() => {}} />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Audience:</span>
                  <Chip label="New users" removable onRemove={() => {}} />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Badge Component Showcase */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-foreground">Badge Component API</h2>
          <p className="text-sm text-foreground-muted">
            Read-only labels for status, type, and priority — no interaction handlers
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 space-y-6">
          {/* All Badge Variants */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground-muted uppercase">All Variants</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Default</Badge>
              <Badge variant="neutral">Neutral</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </div>

          {/* Semantic Usage */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground-muted uppercase">Recommended Usage</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Status indicators</p>
                <div className="flex gap-2">
                  <Badge variant="success">Live</Badge>
                  <Badge variant="warning">At risk</Badge>
                  <Badge variant="neutral">Paused</Badge>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Priority levels</p>
                <div className="flex gap-2">
                  <Badge variant="error">Critical</Badge>
                  <Badge variant="warning">High</Badge>
                  <Badge variant="neutral">Low</Badge>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Type/category</p>
                <div className="flex gap-2">
                  <Badge variant="default">Experiment</Badge>
                  <Badge variant="outline">Feature flag</Badge>
                  <Badge variant="neutral">A/B test</Badge>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Health status</p>
                <div className="flex gap-2">
                  <Badge variant="success">Healthy</Badge>
                  <Badge variant="warning">Degraded</Badge>
                  <Badge variant="error">Down</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chip Component Showcase */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-foreground">Chip Component API</h2>
          <p className="text-sm text-foreground-muted">
            Interactive filter pills and tags with selection support and optional remove button
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 space-y-6">
          {/* By Variant */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground-muted uppercase">Variants</h3>
            <div className="flex flex-wrap gap-2">
              {chipVariants.map((variant) => (
                <Chip
                  key={variant}
                  variant={variant as any}
                  label={variant.charAt(0).toUpperCase() + variant.slice(1).replace("-", " ")}
                />
              ))}
            </div>
          </div>

          {/* Selected State */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground-muted uppercase">With Selection</h3>
            <div className="flex flex-wrap gap-2">
              {["planning", "design", "development", "testing", "launch"].map((status) => (
                <Chip
                  key={status}
                  variant="outline"
                  label={status.charAt(0).toUpperCase() + status.slice(1)}
                  selected={selectedChips.has(status)}
                  onClick={() => toggleChip(status)}
                />
              ))}
            </div>
          </div>

          {/* Removable */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground-muted uppercase">Removable Chips</h3>
            <div className="flex flex-wrap gap-2">
              <Chip
                variant="primary-soft"
                label="Feature Complete"
                removable
                onRemove={() => console.log("Removed")}
              />
              <Chip
                variant="primary-soft"
                label="High Priority"
                removable
                onRemove={() => console.log("Removed")}
              />
              <Chip
                variant="primary-soft"
                label="In Progress"
                removable
                onRemove={() => console.log("Removed")}
              />
            </div>
          </div>

          {/* Priority Tags */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground-muted uppercase">Priority Tags</h3>
            <div className="flex flex-wrap gap-2">
              {["critical", "high", "medium", "low"].map((priority) => (
                <Chip
                  key={priority}
                  variant={priority === "critical" || priority === "high" ? "primary" : "neutral"}
                  label={priority.charAt(0).toUpperCase() + priority.slice(1)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FlowNode Component Showcase */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-foreground">FlowNode Component</h2>
          <p className="text-sm text-foreground-muted">
            Pill-shaped action nodes for flow builders, node graphs, and step-based UIs (Zapier/n8n style)
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 space-y-6">
          {/* Variants */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground-muted uppercase">Variants</h3>
            <div className="flex flex-wrap gap-3">
              <FlowNode id="node-1" label="Default Node" />
              <FlowNode id="node-2" label="Control" variant="control" />
              <FlowNode id="node-3" label="Treatment" variant="treatment" />
              <FlowNode id="node-4" label="Winner" variant="winner" />
              <FlowNode id="node-5" label="Launched" variant="launch" />
            </div>
          </div>

          {/* Experiment Flow Pattern */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground-muted uppercase">Experiment Flow Pattern</h3>
            <div className="flex flex-wrap gap-3">
              <FlowNode 
                id="control" 
                label="Control" 
                variantLetter="A" 
                isControl 
                isVariant 
                trafficSplit="50%" 
              />
              <FlowNode 
                id="variant-b" 
                label="Variant B" 
                variantLetter="B" 
                isVariant 
                isWinner 
                trafficSplit="50%" 
              />
              <FlowNode 
                id="launch" 
                label="Launched" 
                isLaunch 
                metric="+31% CTR" 
                comparisonLabel="Control" 
              />
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground-muted uppercase">Sizes</h3>
            <div className="flex flex-wrap items-center gap-3">
              <FlowNode id="sm" label="Small Node" size="sm" />
              <FlowNode id="md" label="Medium Node" size="md" />
              <FlowNode id="lg" label="Large Node" size="lg" />
            </div>
          </div>

          {/* With Icons */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground-muted uppercase">With Icons</h3>
            <div className="flex flex-wrap gap-3">
              <FlowNode 
                id="icon-1" 
                label="Send Email" 
                icon={<Zap className="h-4 w-4" />} 
              />
              <FlowNode 
                id="icon-2" 
                label="Experiment" 
                icon={<Sparkles className="h-4 w-4" />} 
                variant="treatment" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* SegmentedControl Component Showcase */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-foreground">SegmentedControl Component</h2>
          <p className="text-sm text-foreground-muted">
            Grouped selection control for view modes, time ranges, and zoom levels
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 space-y-6">
          {/* Zoom Options */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground-muted uppercase">Timeline Zoom</h3>
            <SegmentedControl
              options={[
                { id: "weeks", label: "Weeks" },
                { id: "months", label: "Months" },
                { id: "quarters", label: "Quarters" },
              ]}
              value={selectedZoom}
              onChange={setSelectedZoom}
              size="md"
            />
          </div>

          {/* View Mode Options */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground-muted uppercase">View Mode</h3>
            <SegmentedControl
              options={[
                { id: "cards", label: "Cards", icon: "□" },
                { id: "timeline", label: "Timeline", icon: "—" },
                { id: "list", label: "List", icon: "≡" },
              ]}
              value="cards"
              onChange={() => {}}
              size="md"
            />
          </div>

          {/* Size Variations */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground-muted uppercase">Size Variations</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-foreground-muted mb-2">Small</p>
                <SegmentedControl
                  options={[
                    { id: "today", label: "Today" },
                    { id: "week", label: "Week" },
                    { id: "month", label: "Month" },
                  ]}
                  value="today"
                  onChange={() => {}}
                  size="sm"
                />
              </div>
              <div>
                <p className="text-xs text-foreground-muted mb-2">Medium (default)</p>
                <SegmentedControl
                  options={[
                    { id: "today", label: "Today" },
                    { id: "week", label: "Week" },
                    { id: "month", label: "Month" },
                  ]}
                  value="today"
                  onChange={() => {}}
                  size="md"
                />
              </div>
              <div>
                <p className="text-xs text-foreground-muted mb-2">Large</p>
                <SegmentedControl
                  options={[
                    { id: "today", label: "Today" },
                    { id: "week", label: "Week" },
                    { id: "month", label: "Month" },
                  ]}
                  value="today"
                  onChange={() => {}}
                  size="lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Color Tokens Reference */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-foreground">Color Tokens</h2>
          <p className="text-sm text-foreground-muted">
            All components use these centralized design tokens for consistent branding
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Primary */}
          <div className="bg-card border border-border rounded-lg p-4 space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Primary</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-foreground-muted">Default</span>
                <div className="w-12 h-8 bg-primary rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-foreground-muted">Hover</span>
                <div className="w-12 h-8 bg-primary-hover rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-foreground-muted">Active</span>
                <div className="w-12 h-8 bg-primary-active rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-foreground-muted">Soft</span>
                <div className="w-12 h-8 bg-primary-soft rounded border border-border" />
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="bg-card border border-border rounded-lg p-4 space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Text Colors</h3>
            <div className="space-y-2">
              <div className="text-foreground">Default text</div>
              <div className="text-foreground-muted">Muted text</div>
              <div className="text-foreground-subtle">Subtle text</div>
              <div className="bg-primary text-foreground-on-primary px-2 py-1 rounded">
                On Primary
              </div>
            </div>
          </div>

          {/* Backgrounds */}
          <div className="bg-card border border-border rounded-lg p-4 space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Backgrounds</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-foreground-muted">Surface</span>
                <div className="w-12 h-8 bg-card rounded border border-border" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-foreground-muted">Subtle</span>
                <div className="w-12 h-8 bg-bg-subtle rounded border border-border" />
              </div>
            </div>
          </div>

          {/* Neutrals */}
          <div className="bg-card border border-border rounded-lg p-4 space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Neutral Scale</h3>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-foreground-muted">50</span>
                <div className="w-12 h-6 bg-neutral-50 rounded border border-border" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-foreground-muted">200</span>
                <div className="w-12 h-6 bg-neutral-200 rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-foreground-muted">400</span>
                <div className="w-12 h-6 bg-neutral-400 rounded" />
              </div>
            </div>
          </div>

          {/* Spacing */}
          <div className="bg-card border border-border rounded-lg p-4 space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Spacing Grid (8px)</h3>
            <div className="space-y-2 text-xs text-foreground-muted">
              <div>• 8px = xs</div>
              <div>• 12px = sm</div>
              <div>• 16px = md</div>
              <div>• 20px = lg</div>
              <div>• 24px = xl</div>
              <div>• 32px = 2xl</div>
            </div>
          </div>

          {/* Typography */}
          <div className="bg-card border border-border rounded-lg p-4 space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Hierarchy</h3>
            <div className="space-y-3">
              <div>
                <h4 className="text-lg font-bold text-foreground">H1: Page Title</h4>
              </div>
              <div>
                <h5 className="text-base font-semibold text-foreground">H2: Section</h5>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground-muted">Body: Content</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Layout Example */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-foreground">Layout Hierarchy</h2>
          <p className="text-sm text-foreground-muted">
            Refactored Roadmap page demonstrates proper spacing and visual hierarchy
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="space-y-6 text-sm text-foreground-muted">
            <div className="p-4 bg-bg-subtle rounded border-l-4 border-primary">
              <p className="font-mono">
                Block 1: Header (H1 + Description) — space-y-2
              </p>
            </div>
            <div className="p-4 bg-bg-subtle rounded border-l-4 border-primary">
              <p className="font-mono">
                Block 2: Controls (Filters, Toggles, CTA) — gap-3
              </p>
            </div>
            <div className="p-4 bg-bg-subtle rounded border-l-4 border-primary">
              <p className="font-mono">
                Block 3: Timeline/Content — space-y-6
              </p>
            </div>
            <div className="p-4 bg-bg-subtle rounded border-l-4 border-primary">
              <p className="font-mono">
                All blocks stacked with space-y-6 and px-8 py-6 padding
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Color Palettes */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-foreground">Color Palettes</h2>
          <p className="text-sm text-foreground-muted">
            Complete color scales for semantic colors (all WCAG AA compliant)
          </p>
        </div>

        <div className="space-y-6">
          {/* Green Scale */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-3">
            <h3 className="text-base font-semibold text-foreground">Green (Success)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              <div className="space-y-2">
                <div className="h-20 bg-success-50 rounded-lg border border-border"></div>
                <p className="text-xs font-mono text-foreground-muted">50 · #ECFDF3</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 bg-success-100 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">100 · #D1FAE5</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 bg-success-300 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">300 · #4ADE80</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 bg-success-500 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">500 · #22C55E</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 bg-success rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">600 ★</span>
                </div>
                <p className="text-xs font-mono text-foreground-muted">600 · #15803D ★</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 bg-success-700 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">700 · #16A34A</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 bg-success-800 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">800 · #166534</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 bg-success-900 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">900 · #14532D</p>
              </div>
            </div>
          </div>

          {/* Red Scale */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-3">
            <h3 className="text-base font-semibold text-foreground">Red (Danger)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              <div className="space-y-2">
                <div className="h-20 bg-danger-50 rounded-lg border border-border"></div>
                <p className="text-xs font-mono text-foreground-muted">50 · #FEF2F2</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 bg-danger-100 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">100 · #FEE2E2</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 bg-danger-300 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">300 · #FCA5A5</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 bg-danger rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">500 ★</span>
                </div>
                <p className="text-xs font-mono text-foreground-muted">500 · #DC2626 ★</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 bg-danger-600 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">600 · #B91C1C</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 bg-danger-700 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">700 · #991B1B</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 bg-danger-800 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">800 · #7F1D1D</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 bg-danger-900 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">900 · #450A0A</p>
              </div>
            </div>
          </div>

          {/* Amber Scale */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-3">
            <h3 className="text-base font-semibold text-foreground">Amber (Warning)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              <div className="space-y-2">
                <div className="h-20 bg-warning-50 rounded-lg border border-border"></div>
                <p className="text-xs font-mono text-foreground-muted">50 · #FFFBEB</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 bg-warning-100 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">100 · #FEF3C7</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 bg-warning-300 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">300 · #FACC15</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 bg-warning-500 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">500 · #D97706</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 bg-warning rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">600 ★</span>
                </div>
                <p className="text-xs font-mono text-foreground-muted">600 · #B45309 ★</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 bg-warning-700 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">700 · #92400E</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 bg-warning-800 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">800 · #78350F</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 bg-warning-900 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">900 · #451A03</p>
              </div>
            </div>
          </div>

          {/* Blue Scale */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-3">
            <h3 className="text-base font-semibold text-foreground">Blue (Info)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              <div className="space-y-2">
                <div className="h-20 bg-info-50 rounded-lg border border-border"></div>
                <p className="text-xs font-mono text-foreground-muted">50 · #EFF6FF</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 bg-info-100 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">100 · #DBEAFE</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 bg-info-300 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">300 · #60A5FA</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 bg-info rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">500 ★</span>
                </div>
                <p className="text-xs font-mono text-foreground-muted">500 · #2563EB ★</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 bg-info-600 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">600 · #1D4ED8</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 bg-info-700 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">700 · #1E40AF</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 bg-info-800 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">800 · #1E3A8A</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 bg-info-900 rounded-lg"></div>
                <p className="text-xs font-mono text-foreground-muted">900 · #172554</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notes */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-foreground">Implementation Notes</h2>
          <p className="text-sm text-foreground-muted">
            Key principles applied to the design system refactor
          </p>
        </div>

        <div className="bg-primary-soft border border-border rounded-lg p-6">
          <ul className="space-y-3 text-sm text-foreground">
            <li>
              <strong>Token-Based Colors:</strong> All components use design tokens (primary, text-muted, bg-subtle, etc.) instead of hard-coded hex values
            </li>
            <li>
              <strong>Consistent Spacing:</strong> Pages use 24-32px padding, sections gap by 24px (space-y-6), and follow an 8px grid
            </li>
            <li>
              <strong>Unified Components:</strong> Chip and SegmentedControl replace scattered Badge and Button implementations
            </li>
            <li>
              <strong>Visual Hierarchy:</strong> H1 &gt; Description &gt; Controls &gt; Content &gt; Meta follows consistent styling rules
            </li>
            <li>
              <strong>Focus & Accessibility:</strong> All buttons include focus-visible:ring-primary-soft and proper ARIA attributes
            </li>
            <li>
              <strong>Component Variants:</strong> Button, Chip, and SegmentedControl support multiple variants for different use cases
            </li>
          </ul>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-neutral-200" />

      {/* Full Roadmap Preview */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Full Roadmap Page with Refactored Spacing</h2>
        <p className="text-sm text-foreground-muted mb-6">
          The Roadmap page below demonstrates all refactored components in context
        </p>
      </div>
        </TabsContent>

        <TabsContent value="experiment-flow">
          <ExperimentFlowDocumentation />
        </TabsContent>

        <TabsContent value="bars-vs-nodes">
          <TimelineComparison />
        </TabsContent>

        <TabsContent value="timeline-flow-docs">
          <ExperimentTimelineFlowDocs />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PreviewComponents;
