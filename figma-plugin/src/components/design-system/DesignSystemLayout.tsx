import React from "react";
import { Outlet } from "react-router-dom";
import { DesignSystemNav } from "./DesignSystemNav";

/**
 * Design System Layout
 * 
 * Main layout wrapper for all design system documentation pages.
 * Provides consistent sidebar navigation and content area.
 */

export const DesignSystemLayout = () => {
  return (
    <div className="flex h-screen bg-background-subtle">
      <DesignSystemNav />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
