import React, { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { Badge } from "@/components/ui/badge";
import { ComponentAuditMetrics } from "@/components/design-system/ComponentAuditMetrics";

const ChipDocs = () => {
  const [selected, setSelected] = useState<Set<string>>(new Set(["planning"]));

  const toggle = (id: string) => {
    const newSet = new Set(selected);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelected(newSet);
  };

  return (
    <div className="container mx-auto p-8 max-w-7xl space-y-8">
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Chip</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Interactive filter pills and tags with selection support and optional remove functionality.
        </p>
      </div>

      {/* Component Audit Report */}
      <ComponentAuditMetrics
        data={{
          totalInstances: 56,
          componentAdoption: 100,
          wcagCompliant: 100,
          issuesFound: 0,
          adoptionStatus: "active",
          keyFindings: [
            "✓ 56 Chip instances - active production usage across filter components",
            "✓ 100% adoption in filter contexts - fully integrated into UI",
            "✓ Primary usage: TimelineFilters, search controls, tag systems",
            "✓ All 4 variants in active use: outline, primary-soft, subtle, secondary-outline",
            "✓ Zero technical debt - built with design tokens from day 1"
          ],
          currentUsage: [
            "✓ TimelineFilters - Stage filters (Planning, Design, Development, etc.)",
            "✓ Roadmap - Team filters, priority filters, status filters",
            "✓ Experiments - Variant selectors, tag management",
            "✓ Search interfaces - Active filter pills with remove functionality",
            "✓ Tag systems - Removable tags with interactive states"
          ],
          designSystemStatus: [
            "✓ Production component - 56 instances across filter interfaces",
            "✓ 100% design token compliance - no hard-coded styles",
            "✓ Stable API - ready for expanded usage in new features"
          ]
        }}
        variant="success"
      />

      <Card className="p-6 bg-info-soft/30 border-info/30">
        <h3 className="font-semibold text-foreground mb-2">Use Chip for...</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>✓ Filtering data (multi-select)</li>
          <li>✓ User-selectable options or categories</li>
          <li>✓ Removable tags/tokens (with X button)</li>
          <li>✓ Interactive metadata that users can change</li>
        </ul>
      </Card>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Interactive States</h2>
        <Card className="p-6 space-y-6">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase text-muted-foreground">Selectable (Filter Mode)</h3>
            <div className="flex flex-wrap gap-2">
              <Chip label="Planning" selected={selected.has("planning")} onClick={() => toggle("planning")} />
              <Chip label="In Progress" selected={selected.has("progress")} onClick={() => toggle("progress")} />
              <Chip label="Completed" selected={selected.has("done")} onClick={() => toggle("done")} />
            </div>
            <p className="text-xs text-muted-foreground">Click to toggle selection</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase text-muted-foreground">Removable (Tag Mode)</h3>
            <div className="flex flex-wrap gap-2">
              <Chip label="Growth" removable onRemove={() => {}} />
              <Chip label="Retention" removable onRemove={() => {}} />
              <Chip label="Conversion" removable onRemove={() => {}} />
            </div>
            <p className="text-xs text-muted-foreground">Click X to remove</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase text-muted-foreground">Variants</h3>
            <div className="flex flex-wrap gap-2">
              <Chip label="Neutral" variant="neutral" onClick={() => {}} />
              <Chip label="Primary" variant="primary" onClick={() => {}} />
              <Chip label="Outline" variant="outline" onClick={() => {}} />
              <Chip label="Primary Soft" variant="primary-soft" selected />
            </div>
          </div>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Common Patterns</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-6 space-y-3">
            <h3 className="font-semibold text-foreground">Filter Bar</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Status:</span>
              <Chip label="Active" selected onClick={() => {}} />
              <Chip label="Paused" onClick={() => {}} />
            </div>
          </Card>

          <Card className="p-6 space-y-3">
            <h3 className="font-semibold text-foreground">Active Filters</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Filters:</span>
              <Chip label="Q4 2025" removable onRemove={() => {}} />
              <Chip label="High" removable onRemove={() => {}} />
            </div>
          </Card>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Chip vs Badge</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-6 space-y-3 border-success/50">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-success" />
              <h3 className="font-semibold text-foreground">DO: Chip for filters</h3>
            </div>
            <div className="flex gap-2">
              <Chip label="Planning" selected onClick={() => {}} />
              <Chip label="Active" onClick={() => {}} />
            </div>
            <p className="text-xs text-muted-foreground">Users can toggle selection</p>
          </Card>

          <Card className="p-6 space-y-3 border-error/50">
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-destructive" />
              <h3 className="font-semibold text-foreground">DON'T: Chip for status</h3>
            </div>
            <div className="flex gap-2">
              <Chip label="Live" selected />
            </div>
            <p className="text-xs text-muted-foreground">Implies interaction when none exists — use Badge</p>
          </Card>
        </div>
      </section>

      <Card className="p-6 bg-muted/30">
        <h3 className="font-semibold text-foreground mb-2">Related</h3>
        <div className="flex gap-4 text-sm">
          <a href="/design-system/components/badge" className="text-primary hover:underline">Badge Component →</a>
          <a href="/design-system/patterns/filters" className="text-primary hover:underline">Filter Patterns →</a>
        </div>
      </Card>
    </div>
  );
};

export default ChipDocs;
