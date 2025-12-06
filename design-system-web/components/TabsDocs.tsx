import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ComponentAuditMetrics } from "@/components/design-system/ComponentAuditMetrics";
import { FileText, Lock } from "lucide-react";

const TabsDocs = () => {
  const [currentTab, setCurrentTab] = useState("overview");

  return (
    <div className="container mx-auto p-8 max-w-7xl space-y-8">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Tabs</h1>
          <Badge variant="success" className="text-xs">PRODUCTION</Badge>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Built on Radix UI Tabs primitive, providing accessible content panel navigation
          with full keyboard support and ARIA compliance. Used for organizing content into separate panels.
        </p>
      </div>

      {/* Component Audit Report */}
      <ComponentAuditMetrics
        data={{
          totalInstances: 11,
          componentAdoption: 100,
          wcagCompliant: 100,
          issuesFound: 0,
          adoptionStatus: "production",
          keyFindings: [
            "✓ Built on @radix-ui/react-tabs primitive (accessible by default)",
            "✓ Full keyboard navigation (Arrow keys, Home, End, Tab)",
            "✓ ARIA tablist/tab/tabpanel pattern with automatic focus management",
            "✓ Focus-visible ring (2px primary ring with offset)",
            "✓ Active state uses primary background with on-primary text",
            "✓ 100% design token compliance (bg-bg-surface, border-neutral-200, text-text-muted)",
            "✓ MUST have associated TabsContent panels (content organization, not view switching)"
          ],
          currentUsage: [
            "✓ FeatureDetailsPanel - Overview/Iterations content tabs (6 instances)",
            "✓ Auth - Sign In and Sign Up form navigation (5 instances)",
            "✓ All implementations properly use TabsContent for content panels",
            "✓ All implementations use semantic tokens for colors and spacing"
          ],
          designSystemStatus: [
            "✓ Production-ready with Radix UI foundation",
            "✓ WCAG AA compliant (keyboard + screen reader support)",
            "✓ Consistent styling across all usage contexts",
            "✓ Zero hard-coded colors, full token adoption"
          ]
        }}
      />

      {/* Usage Examples */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">Usage Examples</h2>
          <p className="text-sm text-text-muted">
            Interactive demonstrations of Tabs component in different contexts.
          </p>
        </div>

        {/* Content Tabs Example */}
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Content Tabs
            </h3>
            <p className="text-sm text-text-muted">
              Used for organizing related content into separate panels (e.g., FeatureDetailsPanel).
            </p>
          </div>
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="rounded-lg border border-border bg-bg-subtle p-6">
                <h4 className="font-semibold mb-2">Overview Content</h4>
                <p className="text-sm text-text-muted">
                  Main overview information displayed here. Content is separated into logical panels
                  for better organization and readability.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="details" className="space-y-4">
              <div className="rounded-lg border border-border bg-bg-subtle p-6">
                <h4 className="font-semibold mb-2">Detailed Information</h4>
                <p className="text-sm text-text-muted">
                  Additional details, specifications, and extended information.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="history" className="space-y-4">
              <div className="rounded-lg border border-border bg-bg-subtle p-6">
                <h4 className="font-semibold mb-2">History Log</h4>
                <p className="text-sm text-text-muted">
                  Timeline of changes, iterations, and historical data.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Form Navigation Example */}
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              Form Navigation
            </h3>
            <p className="text-sm text-text-muted">
              Used for switching between related forms (e.g., Auth page sign in and sign up).
            </p>
          </div>
          <Tabs defaultValue="signin" className="w-full max-w-md mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin" className="space-y-4">
              <div className="rounded-lg border border-border bg-bg-subtle p-6">
                <p className="text-sm text-text-muted">
                  Sign in form content - email/password fields, login button.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="signup" className="space-y-4">
              <div className="rounded-lg border border-border bg-bg-subtle p-6">
                <p className="text-sm text-text-muted">
                  Sign up form content - registration fields, create account button.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>

      {/* API Reference */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">API Reference</h2>
          <p className="text-sm text-text-muted">
            Component props and usage patterns.
          </p>
        </div>

        <Card className="p-6 space-y-6">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Tabs (Root)</h3>
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-[140px_1fr] gap-2 py-2 border-b border-border">
                <code className="text-xs bg-bg-subtle px-2 py-1 rounded">value</code>
                <span className="text-text-muted">Controlled active tab value</span>
              </div>
              <div className="grid grid-cols-[140px_1fr] gap-2 py-2 border-b border-border">
                <code className="text-xs bg-bg-subtle px-2 py-1 rounded">defaultValue</code>
                <span className="text-text-muted">Uncontrolled default active tab</span>
              </div>
              <div className="grid grid-cols-[140px_1fr] gap-2 py-2 border-b border-border">
                <code className="text-xs bg-bg-subtle px-2 py-1 rounded">onValueChange</code>
                <span className="text-text-muted">Callback when active tab changes</span>
              </div>
              <div className="grid grid-cols-[140px_1fr] gap-2 py-2">
                <code className="text-xs bg-bg-subtle px-2 py-1 rounded">orientation</code>
                <span className="text-text-muted">"horizontal" or "vertical" (default: horizontal)</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">TabsList</h3>
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-[140px_1fr] gap-2 py-2 border-b border-border">
                <code className="text-xs bg-bg-subtle px-2 py-1 rounded">className</code>
                <span className="text-text-muted">Additional CSS classes (e.g., grid w-full grid-cols-3)</span>
              </div>
              <div className="grid grid-cols-[140px_1fr] gap-2 py-2">
                <Badge variant="outline" className="text-xs w-fit">Default Styles</Badge>
                <span className="text-text-muted">bg-bg-surface, border-neutral-200, rounded-lg, h-10</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">TabsTrigger</h3>
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-[140px_1fr] gap-2 py-2 border-b border-border">
                <code className="text-xs bg-bg-subtle px-2 py-1 rounded">value</code>
                <span className="text-text-muted">Unique identifier for this tab</span>
              </div>
              <div className="grid grid-cols-[140px_1fr] gap-2 py-2 border-b border-border">
                <code className="text-xs bg-bg-subtle px-2 py-1 rounded">disabled</code>
                <span className="text-text-muted">Disable tab interaction (opacity-50)</span>
              </div>
              <div className="grid grid-cols-[140px_1fr] gap-2 py-2 border-b border-border">
                <Badge variant="outline" className="text-xs w-fit">Active State</Badge>
                <span className="text-text-muted">bg-primary, text-text-on-primary, shadow-sm</span>
              </div>
              <div className="grid grid-cols-[140px_1fr] gap-2 py-2">
                <Badge variant="outline" className="text-xs w-fit">Inactive State</Badge>
                <span className="text-text-muted">text-text-muted, hover:bg-bg-subtle</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">TabsContent</h3>
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-[140px_1fr] gap-2 py-2 border-b border-border">
                <code className="text-xs bg-bg-subtle px-2 py-1 rounded">value</code>
                <span className="text-text-muted">Matches TabsTrigger value to display content</span>
              </div>
              <div className="grid grid-cols-[140px_1fr] gap-2 py-2 border-b border-border">
                <code className="text-xs bg-bg-subtle px-2 py-1 rounded">forceMount</code>
                <span className="text-text-muted">Keep content mounted when inactive</span>
              </div>
              <div className="grid grid-cols-[140px_1fr] gap-2 py-2">
                <Badge variant="outline" className="text-xs w-fit">Default Styles</Badge>
                <span className="text-text-muted">mt-2, focus-visible:ring-2 ring-primary</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Code Examples */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">Code Examples</h2>
          <p className="text-sm text-text-muted">
            Common implementation patterns.
          </p>
        </div>

        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Basic Usage</h3>
          <pre className="bg-bg-subtle p-4 rounded-lg overflow-x-auto text-sm">
            <code>{`import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="details">Details</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">
    Overview content
  </TabsContent>
  <TabsContent value="details">
    Details content
  </TabsContent>
</Tabs>`}</code>
          </pre>
        </Card>

        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Controlled State</h3>
          <pre className="bg-bg-subtle p-4 rounded-lg overflow-x-auto text-sm">
            <code>{`const [currentTab, setCurrentTab] = useState("list");

<Tabs value={currentTab} onValueChange={setCurrentTab}>
  <TabsList>
    <TabsTrigger value="list">List</TabsTrigger>
    <TabsTrigger value="cards">Cards</TabsTrigger>
  </TabsList>
  <TabsContent value="list">List view</TabsContent>
  <TabsContent value="cards">Card view</TabsContent>
</Tabs>`}</code>
          </pre>
        </Card>

        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Full Width Grid Layout</h3>
          <pre className="bg-bg-subtle p-4 rounded-lg overflow-x-auto text-sm">
            <code>{`<Tabs defaultValue="signin">
  <TabsList className="grid w-full grid-cols-2">
    <TabsTrigger value="signin">Sign In</TabsTrigger>
    <TabsTrigger value="signup">Sign Up</TabsTrigger>
  </TabsList>
  <TabsContent value="signin">Sign in form</TabsContent>
  <TabsContent value="signup">Sign up form</TabsContent>
</Tabs>`}</code>
          </pre>
        </Card>
      </div>

      {/* Accessibility */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">Accessibility</h2>
          <p className="text-sm text-text-muted">
            Built-in accessibility features from Radix UI.
          </p>
        </div>

        <Card className="p-6 space-y-4">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Keyboard Navigation</h3>
            <div className="grid gap-2 text-sm">
              <div className="flex items-start gap-3 p-3 bg-bg-subtle rounded-lg">
                <Badge variant="outline" className="text-xs">Tab</Badge>
                <span className="text-text-muted">Move focus to and from TabsList</span>
              </div>
              <div className="flex items-start gap-3 p-3 bg-bg-subtle rounded-lg">
                <Badge variant="outline" className="text-xs">Arrow Keys</Badge>
                <span className="text-text-muted">Navigate between tabs (automatic orientation support)</span>
              </div>
              <div className="flex items-start gap-3 p-3 bg-bg-subtle rounded-lg">
                <Badge variant="outline" className="text-xs">Home</Badge>
                <span className="text-text-muted">Jump to first tab</span>
              </div>
              <div className="flex items-start gap-3 p-3 bg-bg-subtle rounded-lg">
                <Badge variant="outline" className="text-xs">End</Badge>
                <span className="text-text-muted">Jump to last tab</span>
              </div>
              <div className="flex items-start gap-3 p-3 bg-bg-subtle rounded-lg">
                <Badge variant="outline" className="text-xs">Space / Enter</Badge>
                <span className="text-text-muted">Activate focused tab</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">ARIA Pattern</h3>
            <div className="space-y-2 text-sm text-text-muted">
              <p>✓ Implements WAI-ARIA Tabs Pattern</p>
              <p>✓ TabsList has role="tablist"</p>
              <p>✓ TabsTrigger has role="tab" with aria-selected</p>
              <p>✓ TabsContent has role="tabpanel" with aria-labelledby</p>
              <p>✓ Automatic focus management and keyboard roving tabindex</p>
              <p>✓ Focus-visible ring for keyboard navigation (2px primary ring with offset)</p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Screen Reader Support</h3>
            <div className="space-y-2 text-sm text-text-muted">
              <p>✓ Announces tab count and position ("1 of 3")</p>
              <p>✓ Announces selected state changes</p>
              <p>✓ Supports orientation (horizontal or vertical) announcement</p>
              <p>✓ Disabled tabs are properly announced and unfocusable</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Design Tokens */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">Design Tokens</h2>
          <p className="text-sm text-text-muted">
            All styling uses semantic design tokens for consistency.
          </p>
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-[200px_1fr] gap-4 text-sm pb-3 border-b border-border">
              <span className="font-semibold">Token</span>
              <span className="font-semibold">Usage</span>
            </div>
            <div className="grid grid-cols-[200px_1fr] gap-4 text-sm py-2">
              <code className="text-xs bg-bg-subtle px-2 py-1 rounded">bg-bg-surface</code>
              <span className="text-text-muted">TabsList background</span>
            </div>
            <div className="grid grid-cols-[200px_1fr] gap-4 text-sm py-2">
              <code className="text-xs bg-bg-subtle px-2 py-1 rounded">border-neutral-200</code>
              <span className="text-text-muted">TabsList border</span>
            </div>
            <div className="grid grid-cols-[200px_1fr] gap-4 text-sm py-2">
              <code className="text-xs bg-bg-subtle px-2 py-1 rounded">bg-primary</code>
              <span className="text-text-muted">Active TabsTrigger background</span>
            </div>
            <div className="grid grid-cols-[200px_1fr] gap-4 text-sm py-2">
              <code className="text-xs bg-bg-subtle px-2 py-1 rounded">text-text-on-primary</code>
              <span className="text-text-muted">Active TabsTrigger text</span>
            </div>
            <div className="grid grid-cols-[200px_1fr] gap-4 text-sm py-2">
              <code className="text-xs bg-bg-subtle px-2 py-1 rounded">text-text-muted</code>
              <span className="text-text-muted">Inactive TabsTrigger text</span>
            </div>
            <div className="grid grid-cols-[200px_1fr] gap-4 text-sm py-2">
              <code className="text-xs bg-bg-subtle px-2 py-1 rounded">bg-bg-subtle</code>
              <span className="text-text-muted">Inactive TabsTrigger hover background</span>
            </div>
            <div className="grid grid-cols-[200px_1fr] gap-4 text-sm py-2">
              <code className="text-xs bg-bg-subtle px-2 py-1 rounded">ring-primary</code>
              <span className="text-text-muted">Focus-visible ring color</span>
            </div>
          </div>
        </Card>
      </div>

      {/* When to Use */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">When to Use</h2>
          <p className="text-sm text-text-muted">
            Guidance for choosing Tabs vs other navigation components.
          </p>
        </div>

        <div className="grid gap-4">
          <Card className="p-6 space-y-3 border-l-4 border-l-success">
            <h3 className="text-lg font-semibold text-success">✓ Use Tabs when:</h3>
            <ul className="space-y-2 text-sm text-text-muted">
              <li>• Organizing related content into separate panels</li>
              <li>• Switching between different views of the same data</li>
              <li>• Navigating between related forms</li>
              <li>• Content sections are mutually exclusive</li>
              <li>• User needs to compare different sections by switching</li>
              <li>• Space is limited and all content cannot be shown at once</li>
            </ul>
          </Card>

          <Card className="p-6 space-y-3 border-l-4 border-l-error">
            <h3 className="text-lg font-semibold text-error">✗ Do NOT use Tabs when:</h3>
            <ul className="space-y-2 text-sm text-text-muted">
              <li>• <strong>Switching views without content panels</strong> - use SegmentedControl instead</li>
              <li>• Content is a sequential workflow - use stepper or wizard instead</li>
              <li>• User needs to see multiple sections simultaneously - use accordions</li>
              <li>• Navigation is for entire page sections - use main navigation</li>
              <li>• Options change page URL - use router-based navigation</li>
            </ul>
          </Card>
        </div>

        <Card className="p-6 space-y-3 bg-primary-soft border-primary">
          <h3 className="text-lg font-semibold">Critical: Tabs vs SegmentedControl</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <Badge variant="default" className="text-xs">Use Tabs</Badge>
              <p className="text-text font-semibold">MUST have TabsContent panels</p>
              <ul className="space-y-1 text-text-muted">
                <li>• Different content per tab (Overview, Details, History)</li>
                <li>• Forms with multiple sections (Sign In and Sign Up)</li>
                <li>• Content loads or renders differently per tab</li>
                <li>• Each tab reveals a different content area</li>
              </ul>
            </div>
            <div className="space-y-2">
              <Badge variant="outline" className="text-xs">Use SegmentedControl</Badge>
              <p className="text-text font-semibold">NO content panels needed</p>
              <ul className="space-y-1 text-text-muted">
                <li>• View mode toggles (list, cards, grid)</li>
                <li>• Time range selectors (weeks, months)</li>
                <li>• Filter toggles (all, active, archived)</li>
                <li>• Same content, different visualization</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TabsDocs;
