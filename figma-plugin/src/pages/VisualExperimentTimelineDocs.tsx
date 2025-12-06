import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExperimentFlowMap } from "@/components/ExperimentFlowMap";
import { VisualTreatmentCard } from "@/components/VisualTreatmentCard";
import { mockVisualExperiments } from "@/lib/mockVisualExperiments";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Beaker, 
  Layout, 
  GitBranch, 
  Trophy, 
  Rocket,
  Image as ImageIcon,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

export function ExperimentFlowMapDocs() {
  const [hideVisuals, setHideVisuals] = useState(false);
  return (
    <div className="container mx-auto px-8 py-12 max-w-7xl space-y-12">
      {/* Hero Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Beaker className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Visual Experiment Timeline
            </h1>
            <p className="text-lg text-text-muted mt-1">
              Tell the story of your experiments with visual treatment cards
            </p>
          </div>
        </div>
      </div>

      {/* Overview */}
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-text flex items-center gap-2">
            <Layout className="w-6 h-6 text-primary" />
            Overview
          </h2>
          <p className="text-text leading-relaxed">
            The <code className="px-2 py-1 bg-bg-surface rounded text-primary font-mono text-sm">ExperimentFlowMap</code> component 
            is designed for <strong>growth teams</strong> who need to communicate experiment results quickly and clearly. 
            It uses a <strong>3-column flow layout</strong> (Control → Variants → Launched) with compact cards and visible flow connectors.
            Cards show only 5 growth-critical elements: variant label, mini visual, micro metric, traffic allocation, and one-line annotation.
            This flow-first approach emphasizes the winner path with green connectors from control → winning variant → launched badge.
            <strong>Connectors are scroll-aware</strong> and cards manage their own hover state to prevent re-renders and maintain visual stability.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="p-4 bg-bg-surface rounded-lg border border-border">
              <h3 className="font-semibold text-text mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                Best For
              </h3>
              <ul className="space-y-1 text-sm text-text-muted">
                <li>• Sprint reviews & growth standups</li>
                <li>• Quick experiment retrospectives</li>
                <li>• Executive 1-pagers</li>
                <li>• Experiment galleries & archives</li>
              </ul>
            </div>
            
            <div className="p-4 bg-bg-surface rounded-lg border border-border">
              <h3 className="font-semibold text-text mb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                Growth-Optimized Design
              </h3>
              <ul className="space-y-1 text-sm text-text-muted">
                <li>• 70% smaller cards (compact flow view)</li>
                <li>• 5 essentials only per card</li>
                <li>• Micro metrics (+28% CTR format)</li>
                <li>• One-line annotations max</li>
                <li>• Clear winner → launch flow</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>

      {/* When to Use */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-text flex items-center gap-2">
          <GitBranch className="w-6 h-6 text-primary" />
          When to Use This Component
        </h2>
        
        <div className="grid gap-4">
          <Card className="p-5 border-l-4 border-l-success">
            <h3 className="font-semibold text-success mb-2">✓ Perfect Use Cases</h3>
            <ul className="space-y-2 text-sm text-text-muted">
              <li><strong>Growth Sprint Reviews:</strong> Show experiment results in 30 seconds or less</li>
              <li><strong>Experiment Galleries:</strong> Compact visual archive of all tests run</li>
              <li><strong>Executive 1-Pagers:</strong> Winner → launch story fits in one view</li>
              <li><strong>Team Standups:</strong> Quick visual of what shipped vs what's testing</li>
            </ul>
          </Card>
          
          <Card className="p-5 border-l-4 border-l-warning">
            <h3 className="font-semibold text-warning mb-2">⚠ Not Ideal For</h3>
            <ul className="space-y-2 text-sm text-text-muted">
              <li><strong>Deep dive analysis:</strong> Use full analytics dashboards for metric exploration</li>
              <li><strong>Real-time monitoring:</strong> This is retrospective, not live dashboards</li>
              <li><strong>Backend experiments:</strong> No UI to show = use traditional metrics view</li>
            </ul>
          </Card>
        </div>
      </div>

      {/* Anatomy */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-text">Component Anatomy</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Flow Layout */}
          <Card className="p-5">
            <h3 className="font-semibold text-text mb-4 flex items-center gap-2">
              <Layout className="w-5 h-5 text-primary" />
              3-Column Flow Layout
            </h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-bg-subtle rounded-md">
                <div className="font-semibold text-text mb-1">Column 1: Entry (Control)</div>
                <div className="text-text-muted">
                  Control variant card, vertically centered
                </div>
              </div>
              <div className="p-3 bg-bg-subtle rounded-md">
                <div className="font-semibold text-text mb-1">Column 2: Variants</div>
                <div className="text-text-muted">
                  All test variants (stacked vertically with even spacing)<br />
                  Winner variant shows green "Winner" badge
                </div>
              </div>
              <div className="p-3 bg-bg-subtle rounded-md">
                <div className="font-semibold text-text mb-1">Column 3: Launched</div>
                <div className="text-text-muted">
                  Simple solid green badge with rocket icon<br />
                  Aligned with winner variant
                </div>
              </div>
              <div className="p-3 bg-success/5 border border-success/30 rounded-md">
                <div className="font-semibold text-success mb-1">Flow Connectors</div>
                <div className="text-text-muted">
                  Bezier curves connect Control → Variants (green for winner) and Winner → Launched.<br />
                  Scroll-aware positioning prevents shifting on scroll or hover.
                </div>
              </div>
            </div>
          </Card>

          {/* Card Anatomy */}
          <Card className="p-5">
            <h3 className="font-semibold text-text mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-primary" />
              Growth Labs Mini Card (Thumbnail-First)
            </h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-bg-subtle rounded-md border-l-4 border-l-primary">
                <div className="font-mono text-2xs text-text-muted mb-2">
                  ┌──────────────────────────────┐<br/>
                  │ [  thumbnail  ]             │ ← 112px visual<br/>
                  │ ─────────────────────────── │<br/>
                  │ Variant B    50%    🏆       │ ← 18px header<br/>
                  │                             │<br/>
                  │ +28% CTR                    │ ← bold metric<br/>
                  │ "Green CTA + urgency"       │ ← 1-line quote<br/>
                  └──────────────────────────────┘<br/>
                  <strong className="text-text">192px × ~160px</strong>
                </div>
              </div>
              <div className="p-3 bg-success/5 rounded-md">
                <div className="font-semibold text-success mb-1">1. Thumbnail (112px / 7rem)</div>
                <div className="text-text-muted">
                  Cropped UI element — button/copy/header area
                </div>
              </div>
              <div className="p-3 bg-success/5 rounded-md">
                <div className="font-semibold text-success mb-1">2. Tiny Header Row (18px)</div>
                <div className="text-text-muted">
                  Badge + Traffic % + Trophy icon (inline)
                </div>
              </div>
              <div className="p-3 bg-success/5 rounded-md">
                <div className="font-semibold text-success mb-1">3. Bold Key Metric</div>
                <div className="text-text-muted">
                  "+28% CTR" (green, bold) — delta-first format
                </div>
              </div>
              <div className="p-3 bg-success/5 rounded-md">
                <div className="font-semibold text-success mb-1">4. Quoted 1-Line Annotation</div>
                <div className="text-text-muted">
                  "Green CTA w/ urgency" — italic, quoted, muted
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-warning/5 border border-warning/30 rounded-md">
              <p className="text-xs text-warning-foreground">
                <strong>Dimensions:</strong> 192px × ~160px (thumbnail: 112px / 7rem)
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Live Examples */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-text flex items-center gap-2">
            <Trophy className="w-6 h-6 text-primary" />
            Live Examples
          </h2>
          
          {/* Hide Visuals Toggle */}
          <div className="flex items-center gap-2">
            <Switch 
              id="hide-visuals" 
              checked={hideVisuals}
              onCheckedChange={setHideVisuals}
            />
            <Label htmlFor="hide-visuals" className="cursor-pointer">
              Hide Thumbnails (Non-Visual Mode)
            </Label>
          </div>
        </div>

        <Tabs defaultValue="ab-test" className="w-full">
          <TabsList className="grid w-full max-w-2xl grid-cols-2">
            <TabsTrigger value="ab-test">A/B Test</TabsTrigger>
            <TabsTrigger value="multivariant">A/B/C Test</TabsTrigger>
          </TabsList>

          <TabsContent value="ab-test" className="space-y-4">
            <Card className="p-4 bg-bg-subtle">
              <h3 className="font-semibold text-text mb-2">Example 1: Simple A/B Test</h3>
              <p className="text-sm text-text-muted mb-4">
                Control → Variant B (winner with green connector) → Launched badge. Notice the flow connectors showing the winner path.
                {hideVisuals && " Thumbnails hidden to simulate non-visual backend experiments."}
              </p>
            </Card>
            <div className="min-h-[600px]">
              <ExperimentFlowMap 
                experiment={{
                  ...mockVisualExperiments.ctaButton,
                  variants: mockVisualExperiments.ctaButton.variants.map(v => ({
                    ...v,
                    showThumbnail: !hideVisuals
                  }))
                }}
                onVariantClick={(variant) => console.log("Clicked:", variant)}
              />
            </div>
          </TabsContent>

          <TabsContent value="multivariant" className="space-y-4">
            <Card className="p-4 bg-bg-subtle">
              <h3 className="font-semibold text-text mb-2">Example 2: Multivariant Test (A/B/C)</h3>
              <p className="text-sm text-text-muted mb-4">
                Control fans out to multiple variants in column 2. Green connector highlights winner path: Control → Winner Variant → Launched.
                {hideVisuals && " Thumbnails hidden to simulate non-visual backend experiments."}
              </p>
            </Card>
            <div className="min-h-[600px]">
              <ExperimentFlowMap 
                experiment={{
                  ...mockVisualExperiments.pricingCard,
                  variants: mockVisualExperiments.pricingCard.variants.map(v => ({
                    ...v,
                    showThumbnail: !hideVisuals
                  }))
                }}
                onVariantClick={(variant) => console.log("Clicked:", variant)}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Props API */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-text">Props & API Reference</h2>
        
        <Card className="p-6">
          <h3 className="font-semibold text-lg text-text mb-4">ExperimentFlowMap Props</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 font-semibold text-text">Prop</th>
                  <th className="text-left py-2 px-3 font-semibold text-text">Type</th>
                  <th className="text-left py-2 px-3 font-semibold text-text">Description</th>
                </tr>
              </thead>
              <tbody className="text-text-muted">
                <tr className="border-b border-border/50">
                  <td className="py-2 px-3 font-mono text-primary">experiment</td>
                  <td className="py-2 px-3 font-mono">VisualExperimentData</td>
                  <td className="py-2 px-3">Complete experiment data including variants and phases</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 px-3 font-mono text-primary">onVariantClick?</td>
                  <td className="py-2 px-3 font-mono">(variant) =&gt; void</td>
                  <td className="py-2 px-3">Callback when variant card is clicked</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 px-3 font-mono text-primary">className?</td>
                  <td className="py-2 px-3 font-mono">string</td>
                  <td className="py-2 px-3">Additional CSS classes for container</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-lg text-text mb-4">VisualVariant Interface</h3>
          <ScrollArea className="h-64">
            <pre className="text-xs font-mono text-text-muted bg-bg-subtle p-4 rounded-lg overflow-x-auto">
{`interface VisualVariant {
  id: string;
  name: string;
  variantLabel: string;
  
  // Visual content (choose one)
  thumbnailUrl?: string;           // URL to screenshot/image
  thumbnailContent?: React.ReactNode; // React component
  
  // State flags
  isControl?: boolean;
  isWinner?: boolean;
  
  // Metrics
  trafficSplit?: number;           // 0-100 percentage
  primaryMetric?: {
    label: string;
    value: number;
    delta?: number;                // % change vs control
  };
  
  // Annotations
  annotations?: string[];          // Bullet points
  statusChip?: string;             // e.g., "p < 0.01"
}`}
            </pre>
          </ScrollArea>
        </Card>
      </div>

      {/* Best Practices */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-text flex items-center gap-2">
          <Rocket className="w-6 h-6 text-primary" />
          Best Practices
        </h2>

        <div className="grid gap-4">
          <Card className="p-5">
            <h3 className="font-semibold text-success mb-3">✓ Do's (Growth Best Practices)</h3>
            <ul className="space-y-2 text-sm text-text-muted">
              <li className="flex items-start gap-2">
                <span className="text-success mt-0.5">✓</span>
                <div>
                  <strong>Crop to the change:</strong> Show ONLY the UI element that changed (button, header, copy)
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success mt-0.5">✓</span>
                <div>
                  <strong>One-line annotations:</strong> "Green CTA w/ urgency" not a paragraph
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success mt-0.5">✓</span>
                <div>
                  <strong>Use micro metrics:</strong> "+28% CTR" format — not "Conversion Rate: 4.1% (+28.1% vs control)"
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success mt-0.5">✓</span>
                <div>
                  <strong>Emphasize the flow:</strong> Control → Winner → Launched with green connectors showing the winner path
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success mt-0.5">✓</span>
                <div>
                  <strong>Launched is a badge:</strong> Column 3 shows simple solid green "Launched" badge (not duplicate card)
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success mt-0.5">✓</span>
                <div>
                  <strong>Hover for details:</strong> Cards show detailed metrics in a popover on hover without affecting connectors
                </div>
              </li>
            </ul>
          </Card>

          <Card className="p-5">
            <h3 className="font-semibold text-error mb-3">✗ Don'ts</h3>
            <ul className="space-y-2 text-sm text-text-muted">
              <li className="flex items-start gap-2">
                <span className="text-error mt-0.5">✗</span>
                <div>
                  <strong>No full-page screenshots:</strong> Too small, defeats the purpose
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-error mt-0.5">✗</span>
                <div>
                  <strong>No case study content:</strong> Skip long descriptions, hero sections, heavy branding
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-error mt-0.5">✗</span>
                <div>
                  <strong>No multi-line annotations:</strong> Max 1 line, keep it scannable
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-error mt-0.5">✗</span>
                <div>
                  <strong>Don't bury the metric:</strong> Delta should jump out visually (+28% in green)
                </div>
              </li>
            </ul>
          </Card>
        </div>
      </div>

      {/* Code Example */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-text">Usage Example</h2>
        
        <Card className="p-6">
          <ScrollArea className="h-96">
            <pre className="text-xs font-mono text-text bg-bg-subtle p-4 rounded-lg overflow-x-auto">
{`import { ExperimentFlowMap } from "@/components/ExperimentFlowMap";
import { Button } from "@/components/ui/button";

const myExperiment = {
  id: "exp-001",
  name: "CTA Button Color Test",
  description: "Testing green vs blue button",
  winnerId: "variant-b",
  variants: [
    {
      id: "control",
      name: "Blue Button",
      variantLabel: "Control A",
      isControl: true,
      thumbnailContent: (
        <Button variant="default">Sign Up</Button>
      ),
      trafficSplit: 50,
      primaryMetric: {
        label: "CTR",
        value: 3.2,
        delta: 0,
      },
      annotations: ["Original blue CTA"],
    },
    {
      id: "variant-b",
      name: "Green Button",
      variantLabel: "Variant B",
      isWinner: true,
      thumbnailContent: (
        <Button className="bg-success">Sign Up</Button>
      ),
      trafficSplit: 50,
      primaryMetric: {
        label: "CTR",
        value: 4.5,
        delta: 40.6,
      },
      statusChip: "p < 0.01",
      annotations: ["Green CTA with urgency copy"],
    },
  ],
  launchedVariantId: "variant-b", // ID of the winner that got launched
};

function MyComponent() {
  return (
    <ExperimentFlowMap
      experiment={myExperiment}
      onVariantClick={(variant) => {
        console.log("Clicked:", variant.name);
      }}
    />
  );
}`}
            </pre>
          </ScrollArea>
        </Card>
      </div>

      {/* Design System Integration */}
      <Card className="p-6 bg-gradient-to-br from-success/5 to-primary/5 border-success/20">
        <h2 className="text-xl font-bold text-text mb-4">Design System Integration</h2>
        <p className="text-text-muted mb-4">
          This component uses the Growth Labs design system tokens for consistent styling:
        </p>
        <ul className="space-y-2 text-sm text-text-muted mb-4">
          <li><code className="px-2 py-1 bg-bg-surface rounded">bg-success</code> - Winner cards and launch indicators</li>
          <li><code className="px-2 py-1 bg-bg-surface rounded">bg-primary</code> - Treatment variant cards</li>
          <li><code className="px-2 py-1 bg-bg-surface rounded">bg-neutral-50</code> - Control variant cards</li>
          <li><code className="px-2 py-1 bg-bg-surface rounded">text-text-muted</code> - Annotations and metadata</li>
          <li><code className="px-2 py-1 bg-bg-surface rounded">border-border</code> - Card borders and separators</li>
        </ul>
        <div className="p-3 bg-info/5 border border-info/30 rounded-md">
          <p className="text-xs text-info-foreground">
            <strong>Performance:</strong> Cards manage their own hover state internally to prevent parent re-renders. 
            Connectors listen to scroll events to maintain accurate positioning without flickering.
          </p>
        </div>
      </Card>
    </div>
  );
}

export default ExperimentFlowMapDocs;
