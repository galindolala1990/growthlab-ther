import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Palette, Layers, Box, Layout, Home } from "lucide-react";

/**
 * Design System Navigation
 * 
 * Storybook-style left sidebar navigation for design system documentation.
 * Organized into: Foundations, Tokens, Components, and Patterns.
 */

interface NavSection {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: NavItem[];
}

interface NavItem {
  title: string;
  path: string;
}

const navSections: NavSection[] = [
  {
    title: "Foundations",
    icon: Palette,
    items: [
      { title: "Color System", path: "/design-system/foundations/colors" },
      { title: "Semantic Colors", path: "/design-system/foundations/semantic" },
      { title: "Typography", path: "/design-system/foundations/typography" },
      { title: "Spacing & Layout", path: "/design-system/foundations/spacing" },
    ],
  },
  {
    title: "Tokens",
    icon: Layers,
    items: [
      { title: "Color Tokens", path: "/design-system/tokens/colors" },
      { title: "Semantic Status Tokens", path: "/design-system/tokens/semantic" },
    ],
  },
  {
    title: "Components",
    icon: Box,
    items: [
      { title: "Button", path: "/design-system/components/button" },
      { title: "Badge", path: "/design-system/components/badge" },
      { title: "Chip", path: "/design-system/components/chip" },
      { title: "Card", path: "/design-system/components/card" },
      { title: "Flow Node", path: "/design-system/components/flow-node" },
      { title: "Flow Connector", path: "/design-system/components/flow-connector" },
      { title: "Input", path: "/design-system/components/input" },
      { title: "Alert", path: "/design-system/components/alert" },
      { title: "SegmentedControl", path: "/design-system/components/segmented-control" },
      { title: "Tabs", path: "/design-system/components/tabs" },
    ],
  },
  {
    title: "Patterns",
    icon: Layout,
    items: [
      { title: "Filters & Chips", path: "/design-system/patterns/filters" },
      { title: "Timeline Bars", path: "/design-system/patterns/timeline-bars" },
      { title: "Flow Connectors", path: "/design-system/patterns/flow-connectors" },
      { title: "Experiment Timeline & Flow", path: "/design-system/patterns/experiment-timeline-flow" },
      { title: "Experiment Flow Map", path: "/design-system/patterns/experiment-flow-map" },
      { title: "Status & Messaging", path: "/design-system/patterns/status" },
      { title: "Forms", path: "/design-system/patterns/forms" },
    ],
  },
];

export const DesignSystemNav = () => {
  return (
    <nav className="w-64 border-r border-border bg-background h-full overflow-y-auto">
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-bold text-foreground">Design System</h2>
        <p className="text-xs text-muted-foreground mt-1">
          Growth Labs component library
        </p>
      </div>

      <div className="p-4 space-y-6">
        {/* Overview Link */}
        <div className="space-y-2">
          <NavLink
            to="/design-system"
            end
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                isActive
                  ? "bg-primary-soft text-primary font-medium"
                  : "text-foreground hover:bg-muted hover:text-foreground"
              )
            }
          >
            <Home className="h-4 w-4" />
            <span>Overview</span>
          </NavLink>
        </div>

        {navSections.map((section) => (
          <div key={section.title} className="space-y-2">
            <div className="flex items-center gap-2 px-2">
              <section.icon className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {section.title}
              </h3>
            </div>
            <div className="space-y-1">
              {section.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "block px-3 py-2 rounded-md text-sm transition-colors",
                      isActive
                        ? "bg-primary-soft text-primary font-medium"
                        : "text-foreground hover:bg-muted hover:text-foreground"
                    )
                  }
                >
                  {item.title}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
};
