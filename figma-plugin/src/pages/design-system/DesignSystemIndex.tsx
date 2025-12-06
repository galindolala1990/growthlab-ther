import React from "react";
import { Link } from "react-router-dom";
import { Palette, Layers, Box, Layout, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/**
 * Design System Index
 * 
 * Landing page for the design system documentation.
 * Provides overview and quick navigation to all sections.
 */

const sections = [
  {
    title: "Foundations",
    description: "Core design principles including colors, typography, spacing, and layout systems.",
    icon: Palette,
    links: [
      { label: "Color System", path: "/design-system/foundations/colors" },
      { label: "Semantic Colors", path: "/design-system/foundations/semantic" },
      { label: "Typography", path: "/design-system/foundations/typography" },
      { label: "Spacing & Layout", path: "/design-system/foundations/spacing" },
    ],
    color: "bg-primary-soft text-primary",
  },
  {
    title: "Tokens",
    description: "Design tokens are the single source of truth for all design values.",
    icon: Layers,
    links: [
      { label: "Color Tokens", path: "/design-system/tokens/colors" },
      { label: "Semantic Status Tokens", path: "/design-system/tokens/semantic" },
    ],
    color: "bg-accent-soft text-accent",
  },
  {
    title: "Components",
    description: "Reusable UI components built with our design tokens and foundations.",
    icon: Box,
    links: [
      { label: "Button", path: "/design-system/components/button" },
      { label: "Badge", path: "/design-system/components/badge" },
      { label: "Chip", path: "/design-system/components/chip" },
      { label: "Card", path: "/design-system/components/card" },
      { label: "SegmentedControl", path: "/design-system/components/segmented-control" },
      { label: "Tabs", path: "/design-system/components/tabs" },
    ],
    color: "bg-success/10 text-success",
  },
  {
    title: "Patterns",
    description: "Common UI patterns showing how components work together.",
    icon: Layout,
    links: [
      { label: "Filters & Chips", path: "/design-system/patterns/filters" },
      { label: "Status & Messaging", path: "/design-system/patterns/status" },
      { label: "Forms", path: "/design-system/patterns/forms" },
    ],
    color: "bg-warning/10 text-warning",
  },
];

const DesignSystemIndex = () => {
  return (
    <div className="container mx-auto p-8 max-w-7xl space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Growth Labs Design System
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Token-based design system with 100% WCAG AA compliance and zero technical debt. 
          A comprehensive library of foundations, tokens, components, and patterns for building consistent, accessible UIs.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-2xl font-bold text-success">48</div>
          <div className="text-sm text-muted-foreground">Color Tokens</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-success">6</div>
          <div className="text-sm text-muted-foreground">Core Components</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-success">100%</div>
          <div className="text-sm text-muted-foreground">Token Adoption</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-success">0</div>
          <div className="text-sm text-muted-foreground">Hard-coded Colors</div>
        </Card>
      </div>

      {/* Navigation Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section) => (
          <Card key={section.title} className="p-6 space-y-4">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg ${section.color}`}>
                <section.icon className="h-6 w-6" />
              </div>
              <div className="flex-1 space-y-2">
                <h2 className="text-xl font-bold text-foreground">{section.title}</h2>
                <p className="text-sm text-muted-foreground">{section.description}</p>
              </div>
            </div>

            <div className="space-y-2">
              {section.links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors group"
                >
                  <span className="text-sm text-foreground">{link.label}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Footer Resources */}
      <Card className="p-6 bg-muted/30">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">Additional Resources</h3>
            <p className="text-sm text-muted-foreground">
              Learn more about our design system conventions and guidelines.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link to="/design-system/foundations/colors">Get Started</Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DesignSystemIndex;
