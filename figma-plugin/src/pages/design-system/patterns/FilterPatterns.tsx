import React from "react";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";

const FilterPatterns = () => {
  return (
    <div className="container mx-auto p-8 max-w-7xl space-y-8">
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Filters & Chips</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Common patterns for filtering data using Chip components and filter bars.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Filter Bar Pattern</h2>
        <Card className="p-6 space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Status:</span>
              <div className="flex gap-2">
                <Chip label="Planning" selected onClick={() => {}} />
                <Chip label="In Progress" onClick={() => {}} />
                <Chip label="Completed" onClick={() => {}} />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Priority:</span>
              <div className="flex gap-2">
                <Chip label="High" onClick={() => {}} />
                <Chip label="Medium" onClick={() => {}} />
                <Chip label="Low" onClick={() => {}} />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <h4 className="text-sm font-semibold text-foreground mb-2">Guidelines</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Group related filters with labels</li>
              <li>• Show selected state clearly</li>
              <li>• Support multi-select when appropriate</li>
            </ul>
          </div>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Active Filters Pattern</h2>
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            <Chip label="Q4 2025" removable onRemove={() => {}} />
            <Chip label="High Priority" removable onRemove={() => {}} />
            <Chip label="Growth Team" removable onRemove={() => {}} />
          </div>

          <div className="pt-4 border-t border-border">
            <h4 className="text-sm font-semibold text-foreground mb-2">Guidelines</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Make it easy to remove individual filters</li>
              <li>• Show all active filters in one place</li>
              <li>• Consider a "Clear all" option for multiple filters</li>
            </ul>
          </div>
        </Card>
      </section>

      <Card className="p-6 bg-muted/30">
        <h3 className="font-semibold text-foreground mb-2">Related</h3>
        <div className="flex gap-4 text-sm">
          <a href="/design-system/components/chip" className="text-primary hover:underline">← Chip Component</a>
        </div>
      </Card>
    </div>
  );
};

export default FilterPatterns;
