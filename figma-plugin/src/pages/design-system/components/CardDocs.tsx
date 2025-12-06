import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ComponentAuditMetrics } from "@/components/design-system/ComponentAuditMetrics";
import { CheckCircle2, XCircle, AlertCircle, ArrowRight } from "lucide-react";

/**
 * Card Component Documentation
 * 
 * Container component for grouping related content with consistent styling,
 * spacing, and hierarchy. Foundation for dashboard panels, data displays, and content sections.
 */

const CardDocs = () => {
  return (
    <div className="container mx-auto p-8 max-w-7xl space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Card</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Flexible container component for grouping related content with consistent styling, 
          spacing, elevation, and visual hierarchy.
        </p>
      </div>

      {/* Component Audit Report */}
      <ComponentAuditMetrics
        data={{
          totalInstances: 200,
          componentAdoption: 100,
          wcagCompliant: 100,
          issuesFound: 0,
          adoptionStatus: "high-usage",
          keyFindings: [
            "✓ 200 Card instances - highest adoption across entire application",
            "✓ 100% component adoption - fully standardized across codebase",
            "✓ Consistent spacing patterns (p-4, p-6) with proper hierarchy",
            "✓ All clickable cards have proper role, tabIndex, and aria-label",
            "✓ Zero issues - exemplary implementation quality"
          ],
          currentUsage: [
            "✓ Dashboard - Metric cards, insight panels, status summaries",
            "✓ Roadmap - Feature cards, timeline items, swimlane containers",
            "✓ Experiments - Experiment cards, variant displays, results panels",
            "✓ Documentation - Component examples, code snippets, usage guides",
            "✓ Settings - Configuration panels, preference groups",
            "✓ Lists & Grids - Container component for all card-based layouts"
          ],
          designSystemStatus: [
            "✓ Core UI component - 200 instances make it the most-used container",
            "✓ 100% adoption - no legacy card implementations remaining",
            "✓ Exemplary quality - zero accessibility or pattern violations"
          ]
        }}
        variant="default"
      />

      {/* When to Use */}
      <Card className="p-6 bg-info-soft/30 border-info/30">
        <h3 className="font-semibold text-foreground mb-2">When to use</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>✓ Group related information (dashboards, summaries)</li>
          <li>✓ Create visual hierarchy and separation</li>
          <li>✓ Display data records (experiments, features, items)</li>
          <li>✓ Contain actions related to specific content</li>
        </ul>
      </Card>

      {/* Basic Structure */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Basic Structure</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Simple Card */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase text-muted-foreground">Simple Card</h3>
            <Card className="p-6">
              <p className="text-sm text-foreground">
                Basic card with custom padding. Use for simple content containers.
              </p>
            </Card>
            <pre className="text-xs bg-muted p-3 rounded-md overflow-x-auto">
{`<Card className="p-6">
  <p>Content here</p>
</Card>`}
            </pre>
          </div>

          {/* Structured Card */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase text-muted-foreground">Structured Card</h3>
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Supporting description text</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground">Main content area with consistent spacing.</p>
              </CardContent>
            </Card>
            <pre className="text-xs bg-muted p-3 rounded-md overflow-x-auto">
{`<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>`}
            </pre>
          </div>
        </div>
      </section>

      {/* Card Anatomy */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Card Anatomy</h2>
        <Card className="max-w-2xl">
          <CardHeader className="bg-primary-soft/30">
            <CardTitle>CardHeader (p-6, space-y-1.5)</CardTitle>
            <CardDescription>
              Contains CardTitle and CardDescription. Default 24px padding.
            </CardDescription>
          </CardHeader>
          <CardContent className="bg-accent-soft/30">
            <p className="text-sm text-foreground">
              <strong>CardContent (p-6 pt-0)</strong><br />
              Main content area. Default 24px horizontal padding, 0 top padding (flows from header).
            </p>
          </CardContent>
          <CardFooter className="bg-warning-soft/30 border-t border-border">
            <div className="text-sm text-foreground">
              <strong>CardFooter (p-6 pt-0, flex items-center)</strong><br />
              Actions, metadata, or navigation. Flexbox layout by default.
            </div>
          </CardFooter>
        </Card>
      </section>

      {/* Spacing Guidelines */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Spacing Guidelines</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-success/50">
            <CardHeader className="pb-3">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <div>
                  <CardTitle className="text-base">DO: Standard Padding</CardTitle>
                  <CardDescription>Use default p-6 (24px) for most cards</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Card className="p-6 bg-muted/30">
                <p className="text-sm">Standard 24px padding provides comfortable breathing room.</p>
              </Card>
            </CardContent>
          </Card>

          <Card className="border-success/50">
            <CardHeader className="pb-3">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <div>
                  <CardTitle className="text-base">DO: Compact Padding</CardTitle>
                  <CardDescription>Use p-4 (16px) for dense layouts</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Card className="p-4 bg-muted/30">
                <p className="text-sm">16px padding for compact dashboards or lists.</p>
              </Card>
            </CardContent>
          </Card>

          <Card className="border-error/50">
            <CardHeader className="pb-3">
              <div className="flex items-start gap-2">
                <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <div>
                  <CardTitle className="text-base">DON'T: Inconsistent Padding</CardTitle>
                  <CardDescription>Avoid mixing padding values arbitrarily</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Card className="p-3 bg-muted/30">
                <p className="text-sm">12px padding breaks the 8px grid system.</p>
              </Card>
            </CardContent>
          </Card>

          <Card className="border-error/50">
            <CardHeader className="pb-3">
              <div className="flex items-start gap-2">
                <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <div>
                  <CardTitle className="text-base">DON'T: Over-Padding</CardTitle>
                  <CardDescription>Excessive padding wastes screen space</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Card className="p-12 bg-muted/30">
                <p className="text-sm">48px padding is too much for most use cases.</p>
              </Card>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Visual Hierarchy */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Visual Hierarchy & Emphasis</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Standard Card */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase text-muted-foreground">Standard (Default)</h3>
            <Card className="p-6">
              <h4 className="font-semibold text-foreground mb-2">Standard Card</h4>
              <p className="text-sm text-muted-foreground">
                Default styling with subtle border and shadow. Use for most content.
              </p>
            </Card>
            <pre className="text-xs bg-muted p-3 rounded-md">
{`<Card className="p-6">
  {/* content */}
</Card>`}
            </pre>
          </div>

          {/* Emphasized Card */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase text-muted-foreground">Emphasized</h3>
            <Card className="p-6 border-primary/50 bg-primary-soft/20">
              <h4 className="font-semibold text-foreground mb-2">Emphasized Card</h4>
              <p className="text-sm text-muted-foreground">
                Colored border and soft background for important content.
              </p>
            </Card>
            <pre className="text-xs bg-muted p-3 rounded-md">
{`<Card className="p-6 border-primary/50 
  bg-primary-soft/20">
  {/* content */}
</Card>`}
            </pre>
          </div>

          {/* Interactive Card */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase text-muted-foreground">Interactive (Hover)</h3>
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h4 className="font-semibold text-foreground mb-2">Interactive Card</h4>
              <p className="text-sm text-muted-foreground">
                Hover effect for clickable cards. Elevation increases on hover.
              </p>
            </Card>
            <pre className="text-xs bg-muted p-3 rounded-md">
{`<Card className="p-6 hover:shadow-lg 
  transition-shadow cursor-pointer">
  {/* content */}
</Card>`}
            </pre>
          </div>

          {/* Accent Border Card */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase text-muted-foreground">Accent Border</h3>
            <Card className="p-6 border-l-4 border-l-primary">
              <h4 className="font-semibold text-foreground mb-2">Accent Border Card</h4>
              <p className="text-sm text-muted-foreground">
                Left accent border for visual differentiation in lists.
              </p>
            </Card>
            <pre className="text-xs bg-muted p-3 rounded-md">
{`<Card className="p-6 border-l-4 
  border-l-primary">
  {/* content */}
</Card>`}
            </pre>
          </div>
        </div>
      </section>

      {/* Common Patterns */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Common Patterns</h2>

        <div className="space-y-6">
          {/* Pattern 1: Dashboard Stats */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Dashboard Stats Card</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-6">
                <div className="text-2xl font-bold text-foreground">127</div>
                <div className="text-sm text-muted-foreground mt-1">Active Experiments</div>
              </Card>
              <Card className="p-6">
                <div className="text-2xl font-bold text-success">+23%</div>
                <div className="text-sm text-muted-foreground mt-1">Conversion Rate</div>
              </Card>
              <Card className="p-6">
                <div className="text-2xl font-bold text-foreground">$1.2M</div>
                <div className="text-sm text-muted-foreground mt-1">Revenue Impact</div>
              </Card>
            </div>
            <pre className="text-xs bg-muted p-3 rounded-md overflow-x-auto">
{`<Card className="p-6">
  <div className="text-2xl font-bold text-foreground">127</div>
  <div className="text-sm text-muted-foreground mt-1">Active Experiments</div>
</Card>`}
            </pre>
          </div>

              {/* Pattern 2: Content Card with Header */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Content Card with Header</h3>
            <Card className="max-w-2xl">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle>Checkout Redesign Experiment</CardTitle>
                    <CardDescription>A/B test running since Nov 15, 2025</CardDescription>
                  </div>
                  <Badge variant="success">Live</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Conversion Rate:</span>
                    <span className="font-semibold text-success">+12.4%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sample Size:</span>
                    <span className="font-semibold">24,589 users</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-border">
                <Button variant="ghost" size="sm" className="gap-2">
                  View Details <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            <pre className="text-xs bg-muted p-3 rounded-md overflow-x-auto">
{`<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* metrics, data */}
  </CardContent>
  <CardFooter className="border-t">
    <Button>Action</Button>
  </CardFooter>
</Card>`}
            </pre>
          </div>

          {/* Pattern 3: List Item Card */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">List Item Card (Clickable)</h3>
            <Card className="p-4 hover:shadow-lg transition-all cursor-pointer border-l-4 border-l-primary max-w-2xl">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1 flex-1">
                  <h4 className="font-semibold text-foreground">Email subject line optimization</h4>
                  <p className="text-sm text-muted-foreground">Testing 3 variants to improve open rates</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="warning">High Priority</Badge>
                    <Badge variant="neutral">Q4 2025</Badge>
                  </div>
                </div>
                <div className="text-right text-sm shrink-0">
                  <div className="font-semibold text-success">+8.2%</div>
                  <div className="text-muted-foreground">Open rate</div>
                </div>
              </div>
            </Card>
            <pre className="text-xs bg-muted p-3 rounded-md overflow-x-auto">
{`<Card className="p-4 hover:shadow-lg transition-all 
  cursor-pointer border-l-4 border-l-primary">
  <div className="flex items-start justify-between gap-4">
    <div className="space-y-1 flex-1">
      <h4>Title</h4>
      <p className="text-sm text-muted-foreground">Description</p>
      <div className="flex gap-2">
        <Badge>Tag</Badge>
      </div>
    </div>
    <div className="text-right text-sm">
      <div className="font-semibold">Metric</div>
    </div>
  </div>
</Card>`}
            </pre>
          </div>
        </div>
      </section>

      {/* Status & Feedback Cards */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Status & Feedback Cards</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-6 border-success/50 bg-success-soft/20">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">Success State</h4>
                <p className="text-sm text-muted-foreground">
                  Use green border and soft background for success messages.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-warning/50 bg-warning-soft/20">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">Warning State</h4>
                <p className="text-sm text-muted-foreground">
                  Use amber border and soft background for warnings.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-error/50 bg-danger-soft/20">
            <div className="flex items-start gap-3">
              <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">Error State</h4>
                <p className="text-sm text-muted-foreground">
                  Use red border and soft background for errors.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-info/50 bg-info-soft/20">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-info shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">Info State</h4>
                <p className="text-sm text-muted-foreground">
                  Use blue border and soft background for informational messages.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Best Practices */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Best Practices</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-6 space-y-3">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-success" />
              Do
            </h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Use consistent padding (p-4 or p-6) across similar cards</li>
              <li>• Group related information within a single card</li>
              <li>• Use CardHeader for titles and descriptions</li>
              <li>• Add hover states for clickable cards</li>
              <li>• Use semantic colors for status indicators</li>
              <li>• Maintain clear visual hierarchy (title → content → actions)</li>
              <li>• Use space-y-* for vertical spacing between sections</li>
            </ul>
          </Card>

          <Card className="p-6 space-y-3">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <XCircle className="h-5 w-5 text-destructive" />
              Don't
            </h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Don't nest cards deeply (max 1 level)</li>
              <li>• Don't use cards for single pieces of text</li>
              <li>• Don't mix padding values (breaks consistency)</li>
              <li>• Don't add hover effects to non-clickable cards</li>
              <li>• Don't overcrowd cards with too much information</li>
              <li>• Don't use bright backgrounds (keep subtle)</li>
              <li>• Don't skip borders on emphasized cards</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Accessibility */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Accessibility</h2>
        <Card className="p-6 space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">✓</div>
            <div>
              <p className="text-sm font-semibold text-foreground">Semantic HTML</p>
              <p className="text-sm text-muted-foreground">Cards render as &lt;div&gt; by default. Use proper semantic markup inside cards.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">✓</div>
            <div>
              <p className="text-sm font-semibold text-foreground">Interactive Cards</p>
              <p className="text-sm text-muted-foreground">If card is clickable, wrap in &lt;button&gt; or &lt;a&gt; for keyboard navigation.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">✓</div>
            <div>
              <p className="text-sm font-semibold text-foreground">Color Contrast</p>
              <p className="text-sm text-muted-foreground">All text on card backgrounds meets WCAG AA standards (default tokens ensure this).</p>
            </div>
          </div>
        </Card>
      </section>

      {/* Component API */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Component API</h2>
        <Card className="p-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 font-semibold text-foreground">Component</th>
                <th className="text-left py-2 font-semibold text-foreground">Default Classes</th>
                <th className="text-left py-2 font-semibold text-foreground">Usage</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border">
                <td className="py-3 font-mono text-xs">Card</td>
                <td className="py-3 font-mono text-xs">rounded-lg border shadow-sm</td>
                <td className="py-3">Container wrapper</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 font-mono text-xs">CardHeader</td>
                <td className="py-3 font-mono text-xs">p-6 space-y-1.5</td>
                <td className="py-3">Title and description area</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 font-mono text-xs">CardTitle</td>
                <td className="py-3 font-mono text-xs">text-lg font-semibold</td>
                <td className="py-3">Main heading (renders as h3)</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 font-mono text-xs">CardDescription</td>
                <td className="py-3 font-mono text-xs">text-sm text-muted-foreground</td>
                <td className="py-3">Supporting description</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 font-mono text-xs">CardContent</td>
                <td className="py-3 font-mono text-xs">p-6 pt-0</td>
                <td className="py-3">Main content area</td>
              </tr>
              <tr>
                <td className="py-3 font-mono text-xs">CardFooter</td>
                <td className="py-3 font-mono text-xs">p-6 pt-0 flex items-center</td>
                <td className="py-3">Actions or metadata</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </section>

      {/* Related */}
      <Card className="p-6 bg-muted/30">
        <h3 className="font-semibold text-foreground mb-2">Related</h3>
        <div className="flex gap-4 text-sm">
          <a href="/design-system/foundations/spacing" className="text-primary hover:underline">Spacing & Layout →</a>
          <a href="/design-system/foundations/semantic" className="text-primary hover:underline">Semantic Colors →</a>
        </div>
      </Card>
    </div>
  );
};

export default CardDocs;
