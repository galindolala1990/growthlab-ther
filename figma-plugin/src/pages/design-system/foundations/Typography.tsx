import React from "react";
import { Card } from "@/components/ui/card";

/**
 * Typography Foundation
 * 
 * Type scale, font families, weights, and hierarchy guidelines.
 */

const Typography = () => {
  return (
    <div className="container mx-auto p-8 max-w-7xl space-y-8">
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Typography</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Our typography system ensures clear hierarchy and readability across all interfaces.
        </p>
      </div>

      <Card className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="pb-4 border-b border-border">
            <h1 className="text-4xl font-bold text-foreground">Heading 1</h1>
            <p className="text-xs text-muted-foreground mt-2">
              <code>text-4xl font-bold</code> · 36px / 2.25rem · Line height: 1.2
            </p>
          </div>

          <div className="pb-4 border-b border-border">
            <h2 className="text-2xl font-bold text-foreground">Heading 2</h2>
            <p className="text-xs text-muted-foreground mt-2">
              <code>text-2xl font-bold</code> · 24px / 1.5rem · Line height: 1.3
            </p>
          </div>

          <div className="pb-4 border-b border-border">
            <h3 className="text-xl font-semibold text-foreground">Heading 3</h3>
            <p className="text-xs text-muted-foreground mt-2">
              <code>text-xl font-semibold</code> · 20px / 1.25rem · Line height: 1.4
            </p>
          </div>

          <div className="pb-4 border-b border-border">
            <p className="text-base font-medium text-foreground">Body Large</p>
            <p className="text-xs text-muted-foreground mt-2">
              <code>text-base font-medium</code> · 16px / 1rem · Line height: 1.5
            </p>
          </div>

          <div className="pb-4 border-b border-border">
            <p className="text-sm text-foreground">Body Default</p>
            <p className="text-xs text-muted-foreground mt-2">
              <code>text-sm</code> · 14px / 0.875rem · Line height: 1.5
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Caption / Label</p>
            <p className="text-xs text-muted-foreground mt-2">
              <code>text-xs</code> · 12px / 0.75rem · Line height: 1.4
            </p>
          </div>
        </div>
      </Card>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Font Weights</h2>
        <Card className="p-6 space-y-4">
          <div className="space-y-3">
            <p className="font-normal text-foreground">Normal (400) - Body text, descriptions</p>
            <p className="font-medium text-foreground">Medium (500) - Emphasized text, labels</p>
            <p className="font-semibold text-foreground">Semibold (600) - Subheadings, section titles</p>
            <p className="font-bold text-foreground">Bold (700) - Headings, strong emphasis</p>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Typography;
