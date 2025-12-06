import React from "react";
import { Card } from "@/components/ui/card";

/**
 * Spacing & Layout Foundation
 * 
 * 8px grid system, spacing scale, and layout guidelines.
 */

const SpacingLayout = () => {
  return (
    <div className="container mx-auto p-8 max-w-7xl space-y-8">
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Spacing & Layout</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Our spacing system is based on an 8px grid for consistent, harmonious layouts.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Spacing Scale</h2>
        <Card className="p-6">
          <div className="space-y-6">
            {[
              { name: "space-1", value: "4px", rem: "0.25rem", width: "4px" },
              { name: "space-2", value: "8px", rem: "0.5rem", width: "8px" },
              { name: "space-3", value: "12px", rem: "0.75rem", width: "12px" },
              { name: "space-4", value: "16px", rem: "1rem", width: "16px" },
              { name: "space-5", value: "20px", rem: "1.25rem", width: "20px" },
              { name: "space-6", value: "24px", rem: "1.5rem", width: "24px" },
              { name: "space-8", value: "32px", rem: "2rem", width: "32px" },
              { name: "space-12", value: "48px", rem: "3rem", width: "48px" },
            ].map((item) => (
              <div key={item.name} className="flex items-center gap-6">
                <div className="w-32">
                  <code className="text-xs font-semibold text-foreground">{item.name}</code>
                  <p className="text-xs text-muted-foreground">{item.value} / {item.rem}</p>
                </div>
                <div className="h-8 bg-primary rounded" style={{ width: item.width }}></div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Common Spacing Patterns</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-6 space-y-3">
            <h3 className="font-semibold text-foreground">Component Spacing</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• <code>gap-2</code> (8px) - Icon + text</li>
              <li>• <code>gap-3</code> (12px) - Button groups, chips</li>
              <li>• <code>gap-4</code> (16px) - Form fields</li>
              <li>• <code>gap-6</code> (24px) - Card content sections</li>
            </ul>
          </Card>

          <Card className="p-6 space-y-3">
            <h3 className="font-semibold text-foreground">Page Layout</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• <code>p-4</code> (16px) - Card padding</li>
              <li>• <code>p-6</code> (24px) - Section padding</li>
              <li>• <code>p-8</code> (32px) - Page padding</li>
              <li>• <code>space-y-6</code> (24px) - Section spacing</li>
            </ul>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default SpacingLayout;
