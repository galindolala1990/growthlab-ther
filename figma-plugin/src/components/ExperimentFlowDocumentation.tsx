import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FlowConnector } from "@/components/FlowConnector";
import { InteractiveTimelineBar } from "@/components/InteractiveTimelineBar";
import { Rocket, Info } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Visual documentation and examples for the Experiment Timeline & Flow System
 * 
 * This component serves as a living style guide showing:
 * - Timeline bars vs flow connectors
 * - When to use each element
 * - Visual patterns and examples
 * - Component API demonstrations
 */
export function ExperimentFlowDocumentation() {
  return (
    <div className="space-y-8 p-8 bg-background">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-4xl font-bold">Experiment Timeline & Flow System</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Visual guide for combining temporal scheduling with logical flow to represent 
          A/B tests, multi-variant experiments, funnels, and decision trees.
        </p>
      </div>

      {/* Core Concepts */}
      <Tabs defaultValue="bars" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="bars">Timeline Bars</TabsTrigger>
          <TabsTrigger value="connectors">Flow Connectors</TabsTrigger>
        </TabsList>

        <TabsContent value="bars" className="space-y-4">
          <Card className="p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-full bg-primary rounded-full" />
              <div className="flex-1 space-y-3">
                <h3 className="text-xl font-semibold">What Are Timeline Bars?</h3>
                <p className="text-muted-foreground">
                  Horizontal pill-shaped nodes representing a stage, variant, or phase with a start and end date.
                </p>
                
                <div className="space-y-2">
                  <h4 className="font-medium">What They Communicate:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li><strong>Duration</strong> — Width represents time span</li>
                    <li><strong>Status</strong> — Color indicates Planning/Running/Analyzing/Launched</li>
                    <li><strong>Type</strong> — Accent strip shows Control/Variant/Winner</li>
                    <li><strong>Impact</strong> — Inline metrics like "+31% CTR"</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">When to Use:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>A/B test variants that run in parallel</li>
                    <li>Sequential experiment phases (Test → Analyze → Launch)</li>
                    <li>Feature rollouts with time constraints</li>
                    <li>Funnel steps with temporal boundaries</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Visual Example */}
            <div className="border rounded-lg p-6 bg-muted/30 space-y-4">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase">Visual Example</h4>
              <div className="space-y-3">
                {/* Control Bar */}
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Control Variant</div>
                  <div className="relative h-10 w-80 rounded-2xl bg-stage-testing border border-white/40 overflow-hidden flex items-center px-4">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-muted-foreground/50" />
                    <div className="flex items-center justify-between w-full ml-2">
                      <div className="flex items-center gap-2">
                        <div className="px-1.5 py-0.5 rounded bg-white/20 text-white text-xs font-bold border border-white/40">A</div>
                        <span className="text-xs font-medium text-white">Control</span>
                      </div>
                      <span className="text-xs font-semibold text-white/90">50%</span>
                    </div>
                  </div>
                </div>

                {/* Variant Bar */}
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Treatment Variant</div>
                  <div className="relative h-10 w-80 rounded-2xl bg-stage-testing border border-white/40 overflow-hidden flex items-center px-4">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                    <div className="flex items-center justify-between w-full ml-2">
                      <div className="flex items-center gap-2">
                        <div className="px-1.5 py-0.5 rounded bg-white/20 text-white text-xs font-bold border border-white/40">B</div>
                        <span className="text-xs font-medium text-white">Variant</span>
                      </div>
                      <span className="text-xs font-semibold text-white/90">50%</span>
                    </div>
                  </div>
                </div>

                {/* Winner Bar */}
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Winner Variant</div>
                  <div className="relative h-10 w-80 rounded-2xl bg-stage-testing border-success/60 shadow-md overflow-hidden flex items-center px-4">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-success" />
                    <div className="flex items-center justify-between w-full ml-2">
                      <div className="flex items-center gap-2">
                        <div className="px-1.5 py-0.5 rounded bg-white/20 text-white text-xs font-bold border border-white/40">C</div>
                        <span className="text-xs font-medium text-white">Winner</span>
                        <Rocket className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-xs font-semibold text-white/90">33%</span>
                    </div>
                  </div>
                </div>

                {/* Launch Bar */}
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Launched Feature</div>
                  <div className="relative h-12 w-96 rounded-2xl bg-stage-launch border overflow-hidden flex items-center px-4">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-white/20 text-white text-xs font-semibold border border-white/40">Launched</span>
                      <span className="px-2 py-0.5 rounded bg-success text-success-foreground text-xs font-bold shadow-sm">+31% CTR</span>
                      <span className="text-2xs text-white/75">vs Control</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="connectors" className="space-y-4">
          <Card className="p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-full bg-success rounded-full" />
              <div className="flex-1 space-y-3">
                <h3 className="text-xl font-semibold">What Are Flow Connectors?</h3>
                <p className="text-muted-foreground">
                  Smooth Bezier curves connecting timeline bars to show logical dependencies and data flow.
                </p>
                
                <div className="space-y-2">
                  <h4 className="font-medium">What They Communicate:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li><strong>Cause-and-effect</strong> — Control tests → Variant selected → Launch</li>
                    <li><strong>Routing logic</strong> — Traffic splits to B or C</li>
                    <li><strong>Winner selection</strong> — Which variant won and shipped</li>
                    <li><strong>Sequential dependencies</strong> — Phase A before B</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">When to Use:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Showing which variants are tested against control</li>
                    <li>Indicating winner → launch relationships</li>
                    <li>Visualizing funnel progression</li>
                    <li>Representing decision tree branches</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Visual Example */}
            <div className="border rounded-lg p-6 bg-muted/30 space-y-4">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase">Visual Example</h4>
              <div className="relative h-48">
                <svg className="absolute inset-0 w-full h-full">
                  {/* Control to Variant A */}
                  <FlowConnector
                    from={{ x: 80, y: 40 }}
                    to={{ x: 200, y: 60 }}
                    colorToken="variantA"
                    offsetIndex={-1}
                    showStartDot={true}
                  />
                  {/* Control to Variant B */}
                  <FlowConnector
                    from={{ x: 80, y: 40 }}
                    to={{ x: 200, y: 100 }}
                    colorToken="variant"
                    offsetIndex={1}
                    showStartDot={false}
                  />
                  {/* Winner to Launch */}
                  <FlowConnector
                    from={{ x: 300, y: 100 }}
                    to={{ x: 420, y: 80 }}
                    colorToken="winner"
                    offsetIndex={0}
                    showStartDot={true}
                  />
                </svg>

                <div className="absolute top-8 left-4 text-xs font-medium">Control</div>
                <div className="absolute top-12 left-200 text-xs font-medium">Variant A</div>
                <div className="absolute top-24 left-200 text-xs font-medium">Variant B (Winner)</div>
                <div className="absolute top-16 left-420 text-xs font-medium">Launched</div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-info/10 border border-info/20 rounded-lg">
                <Info className="w-4 h-4 text-info shrink-0 mt-0.5" />
                <div className="text-xs text-muted-foreground">
                  <strong>Note:</strong> Connectors are purely visual. They have no text labels. 
                  All context comes from the bars they connect. Use different colors to distinguish 
                  connection types.
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Visual Patterns */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Visual Patterns</h2>
        
        <div className="grid gap-6">
          {/* Pattern 1: A/B Test */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Pattern 1: A/B Test (2 Variants)</h3>
                <p className="text-sm text-muted-foreground">Test new pricing page vs control</p>
              </div>
              <Badge variant="outline">2 Variants</Badge>
            </div>

            <div className="border rounded-lg p-4 bg-muted/20 relative h-32"
              style={{
                backgroundImage: 'radial-gradient(circle, hsl(var(--muted-foreground) / 0.03) 1px, transparent 1px)',
                backgroundSize: '16px 16px'
              }}
            >
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-32 h-8 rounded-2xl bg-stage-testing border border-white/40 flex items-center px-3">
                    <div className="w-0.5 h-full bg-muted-foreground/50 absolute left-0" />
                    <span className="text-white text-2xs ml-2">Control (A)</span>
                  </div>
                  <span className="text-muted-foreground">50%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-8 rounded-2xl bg-stage-testing border-success/60 flex items-center px-3">
                    <div className="w-0.5 h-full bg-success absolute left-0" />
                    <span className="text-white text-2xs ml-2">Winner (B)</span>
                  </div>
                  <span className="text-muted-foreground">50%</span>
                  <span className="text-muted-foreground mx-4">→</span>
                  <div className="w-40 h-8 rounded-2xl bg-stage-launch flex items-center px-3 gap-2">
                    <span className="text-white text-2xs">Launched</span>
                    <span className="text-success-foreground bg-success px-1.5 py-0.5 rounded text-2xs font-bold">+31%</span>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-2 left-2 text-2xs text-muted-foreground">
                Purple lines = Testing | Green line = Winner → Production
              </div>
            </div>
          </Card>

          {/* Pattern 2: Multi-Variant */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Pattern 2: Multi-Variant Test</h3>
                <p className="text-sm text-muted-foreground">Test multiple variations simultaneously</p>
              </div>
              <Badge variant="outline">3 Variants</Badge>
            </div>

            <div className="border rounded-lg p-4 bg-muted/20 relative h-40"
              style={{
                backgroundImage: 'radial-gradient(circle, hsl(var(--muted-foreground) / 0.03) 1px, transparent 1px)',
                backgroundSize: '16px 16px'
              }}
            >
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-32 h-7 rounded-2xl bg-stage-testing border border-white/40 flex items-center px-3">
                    <span className="text-white text-2xs">Control (A)</span>
                  </div>
                  <span className="text-muted-foreground text-2xs">34%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-7 rounded-2xl bg-stage-testing border border-white/40 flex items-center px-3">
                    <span className="text-white text-2xs">Variant (B)</span>
                  </div>
                  <span className="text-muted-foreground text-2xs">33%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-7 rounded-2xl bg-stage-testing border-success/60 flex items-center px-3">
                    <span className="text-white text-2xs">Winner (C)</span>
                  </div>
                  <span className="text-muted-foreground text-2xs">33%</span>
                  <span className="text-muted-foreground mx-2">→</span>
                  <div className="w-44 h-7 rounded-2xl bg-stage-launch flex items-center px-3 gap-2">
                    <span className="text-white text-2xs">Launched</span>
                    <span className="text-success-foreground bg-success px-1.5 py-0.5 rounded text-2xs font-bold">+42% ARPU</span>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-2 left-2 text-2xs text-muted-foreground">
                Control → B & C (purple/blue) | Winner C → Launch (green)
              </div>
            </div>
          </Card>

          {/* Pattern 3: Sequential Funnel */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Pattern 3: Sequential Funnel</h3>
                <p className="text-sm text-muted-foreground">Onboarding flow with time-based stages</p>
              </div>
              <Badge variant="outline">Funnel</Badge>
            </div>

            <div className="border rounded-lg p-4 bg-muted/20 relative h-24">
              <div className="flex items-center gap-3 text-xs">
                <div className="space-y-1">
                  <div className="w-24 h-8 rounded-2xl bg-stage-planning flex items-center justify-center">
                    <span className="text-white text-2xs">Awareness</span>
                  </div>
                  <div className="text-2xs text-muted-foreground text-center">2 weeks</div>
                </div>
                <span className="text-muted-foreground">→</span>
                <div className="space-y-1">
                  <div className="w-24 h-8 rounded-2xl bg-stage-design flex items-center justify-center">
                    <span className="text-white text-2xs">Signup</span>
                  </div>
                  <div className="text-2xs text-muted-foreground text-center">1 week</div>
                </div>
                <span className="text-muted-foreground">→</span>
                <div className="space-y-1">
                  <div className="w-28 h-8 rounded-2xl bg-stage-testing flex items-center justify-center">
                    <span className="text-white text-2xs">Activation</span>
                  </div>
                  <div className="text-2xs text-muted-foreground text-center">2 weeks</div>
                </div>
                <span className="text-muted-foreground">→</span>
                <div className="space-y-1">
                  <div className="w-24 h-8 rounded-2xl bg-stage-launch flex items-center justify-center">
                    <span className="text-white text-2xs">Retention</span>
                  </div>
                  <div className="text-2xs text-muted-foreground text-center">Ongoing</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Decision Matrix */}
      <Card className="p-6 space-y-4">
        <h2 className="text-2xl font-bold">When to Use What</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 font-semibold">Scenario</th>
                <th className="text-center p-3 font-semibold">Timeline Bar</th>
                <th className="text-center p-3 font-semibold">Flow Connector</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="p-3">Show when Control starts/ends</td>
                <td className="p-3 text-center text-success">✅ Yes</td>
                <td className="p-3 text-center text-muted-foreground">—</td>
              </tr>
              <tr>
                <td className="p-3">Show Control is being tested against B & C</td>
                <td className="p-3 text-center text-muted-foreground">—</td>
                <td className="p-3 text-center text-success">✅ Yes</td>
              </tr>
              <tr>
                <td className="p-3">Display traffic split (50/25/25)</td>
                <td className="p-3 text-center text-success">✅ Yes (label)</td>
                <td className="p-3 text-center text-muted-foreground">—</td>
              </tr>
              <tr>
                <td className="p-3">Indicate Variant C won</td>
                <td className="p-3 text-center text-success">✅ Yes (badge)</td>
                <td className="p-3 text-center text-success">✅ Yes (green to Launch)</td>
              </tr>
              <tr>
                <td className="p-3">Show launch impact (+31% CTR)</td>
                <td className="p-3 text-center text-success">✅ Yes (inline)</td>
                <td className="p-3 text-center text-muted-foreground">—</td>
              </tr>
              <tr>
                <td className="p-3">Represent funnel stage duration</td>
                <td className="p-3 text-center text-success">✅ Yes</td>
                <td className="p-3 text-center text-muted-foreground">—</td>
              </tr>
              <tr>
                <td className="p-3">Represent funnel progression</td>
                <td className="p-3 text-center text-muted-foreground">—</td>
                <td className="p-3 text-center text-success">✅ Yes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Color Tokens */}
      <Card className="p-6 space-y-4">
        <h2 className="text-2xl font-bold">Color Tokens</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="h-16 rounded-lg bg-muted-foreground/50 border" />
            <div className="text-sm font-medium">Control</div>
            <code className="text-xs text-muted-foreground">var(--muted-foreground)</code>
          </div>
          <div className="space-y-2">
            <div className="h-16 rounded-lg border" style={{ backgroundColor: 'hsl(257 100% 70%)' }} />
            <div className="text-sm font-medium">Variant A</div>
            <code className="text-xs text-muted-foreground">hsl(257 100% 70%)</code>
          </div>
          <div className="space-y-2">
            <div className="h-16 rounded-lg border" style={{ backgroundColor: 'hsl(220 90% 65%)' }} />
            <div className="text-sm font-medium">Variant B</div>
            <code className="text-xs text-muted-foreground">hsl(220 90% 65%)</code>
          </div>
          <div className="space-y-2">
            <div className="h-16 rounded-lg bg-success border" />
            <div className="text-sm font-medium">Winner</div>
            <code className="text-xs text-muted-foreground">hsl(142 76% 45%)</code>
          </div>
        </div>
      </Card>
    </div>
  );
}
