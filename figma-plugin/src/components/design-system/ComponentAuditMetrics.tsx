import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, XCircle, TrendingUp, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Standardized Component Audit Metrics Display
 * 
 * Unified metrics card for all component documentation pages.
 * Displays consistent health metrics across the design system.
 */

export interface ComponentAuditData {
  // Core Metrics (always displayed)
  totalInstances: number;
  componentAdoption: number; // percentage (0-100)
  wcagCompliant: number; // percentage (0-100)
  issuesFound: number;
  
  // Status
  adoptionStatus?: "active" | "low-adoption" | "high-usage" | "production" | "canonical";
  
  // Key Findings
  keyFindings: string[];
  
  // Additional sections (optional)
  currentUsage?: string[];
  designSystemStatus?: string[];
}

interface ComponentAuditMetricsProps {
  data: ComponentAuditData;
  componentName?: string;
  variant?: "default" | "success" | "warning" | "info";
  className?: string;
}

export const ComponentAuditMetrics: React.FC<ComponentAuditMetricsProps> = ({
  data,
  componentName,
  variant = "default",
  className
}) => {
  // Determine status badge
  const getStatusBadge = () => {
    switch (data.adoptionStatus) {
      case "canonical":
        return <Badge variant="success" className="text-xs">CANONICAL</Badge>;
      case "active":
      case "production":
        return <Badge variant="success">Active</Badge>;
      case "high-usage":
        return <Badge variant="success">High Usage</Badge>;
      case "low-adoption":
        return <Badge variant="warning">Low Adoption</Badge>;
      default:
        return <Badge variant="neutral">Active</Badge>;
    }
  };

  // Determine metric status (success, warning, error)
  const getMetricStatus = (value: number, threshold: { success: number; warning: number }) => {
    if (value >= threshold.success) return "success";
    if (value >= threshold.warning) return "warning";
    return "error";
  };

  const adoptionStatus = getMetricStatus(data.componentAdoption, { success: 90, warning: 50 });
  const wcagStatus = getMetricStatus(data.wcagCompliant, { success: 100, warning: 90 });

  // Determine card variant styling
  const variantStyles = {
    default: "bg-info-soft/20 border-info/30",
    success: "bg-success-soft/20 border-success/30",
    warning: "bg-warning-soft/20 border-warning/30",
    info: "bg-info-soft/20 border-info/30"
  };

  const headerIcon = variant === "success" ? (
    <Sparkles className="h-6 w-6 text-success shrink-0 mt-0.5" />
  ) : (
    <TrendingUp className={cn(
      "h-6 w-6 shrink-0 mt-0.5",
      variant === "warning" ? "text-warning" : "text-info"
    )} />
  );

  return (
    <Card className={cn("p-6", variantStyles[variant], className)}>
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        {headerIcon}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-1">Component Audit Report</h3>
          <p className="text-sm text-muted-foreground">
            {variant === "success" 
              ? "✅ Single source of truth established - 100% compliant across all metrics"
              : "Current usage metrics and implementation quality across the codebase"}
          </p>
        </div>
      </div>
      
      {/* Metrics Grid */}
      <div className="grid md:grid-cols-4 gap-4">
        {/* Total Instances */}
        <Card className="p-4 bg-background">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-foreground">{data.totalInstances}</div>
            <div className="text-xs text-muted-foreground">Total Instances</div>
            {getStatusBadge()}
          </div>
        </Card>
        
        {/* Component Adoption */}
        <Card className="p-4 bg-background">
          <div className="space-y-1">
            <div className={cn(
              "text-2xl font-bold",
              adoptionStatus === "success" && "text-success",
              adoptionStatus === "warning" && "text-warning",
              adoptionStatus === "error" && "text-error"
            )}>
              {data.componentAdoption}%
            </div>
            <div className="text-xs text-muted-foreground">Component Adoption</div>
            <div className={cn(
              "flex items-center gap-1 mt-2 text-xs",
              adoptionStatus === "success" && "text-success",
              adoptionStatus === "warning" && "text-warning",
              adoptionStatus === "error" && "text-error"
            )}>
              {adoptionStatus === "success" && <CheckCircle2 className="h-3 w-3" />}
              {adoptionStatus === "warning" && <AlertCircle className="h-3 w-3" />}
              {adoptionStatus === "error" && <XCircle className="h-3 w-3" />}
              <span>
                {adoptionStatus === "success" && (data.componentAdoption === 100 ? "Perfect" : "Excellent")}
                {adoptionStatus === "warning" && "Needs Work"}
                {adoptionStatus === "error" && "Critical"}
              </span>
            </div>
          </div>
        </Card>
        
        {/* WCAG AA Compliance */}
        <Card className="p-4 bg-background">
          <div className="space-y-1">
            <div className={cn(
              "text-2xl font-bold",
              wcagStatus === "success" && "text-success",
              wcagStatus === "warning" && "text-warning",
              wcagStatus === "error" && "text-error"
            )}>
              {data.wcagCompliant}%
            </div>
            <div className="text-xs text-muted-foreground">WCAG AA</div>
            <div className={cn(
              "flex items-center gap-1 mt-2 text-xs",
              wcagStatus === "success" && "text-success",
              wcagStatus === "warning" && "text-warning",
              wcagStatus === "error" && "text-error"
            )}>
              {wcagStatus === "success" && <CheckCircle2 className="h-3 w-3" />}
              {wcagStatus === "warning" && <AlertCircle className="h-3 w-3" />}
              {wcagStatus === "error" && <XCircle className="h-3 w-3" />}
              <span>
                {wcagStatus === "success" && "Compliant"}
                {wcagStatus === "warning" && "Needs Work"}
                {wcagStatus === "error" && "Non-Compliant"}
              </span>
            </div>
          </div>
        </Card>
        
        {/* Issues Found */}
        <Card className="p-4 bg-background">
          <div className="space-y-1">
            <div className={cn(
              "text-2xl font-bold",
              data.issuesFound === 0 ? "text-success" : "text-error"
            )}>
              {data.issuesFound}
            </div>
            <div className="text-xs text-muted-foreground">Issues Found</div>
            <div className={cn(
              "flex items-center gap-1 mt-2 text-xs",
              data.issuesFound === 0 ? "text-success" : "text-error"
            )}>
              {data.issuesFound === 0 ? (
                <>
                  <CheckCircle2 className="h-3 w-3" />
                  <span>Clean</span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-3 w-3" />
                  <span>Action Needed</span>
                </>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Key Findings */}
      <div className="mt-4 pt-4 border-t border-border space-y-2">
        <h4 className="text-sm font-semibold text-foreground">Key Findings</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          {data.keyFindings.map((finding, index) => (
            <li key={index}>{finding}</li>
          ))}
        </ul>
      </div>

      {/* Current Usage (optional) */}
      {data.currentUsage && data.currentUsage.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border space-y-2">
          <h4 className="text-sm font-semibold text-foreground">Current Usage</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            {data.currentUsage.map((usage, index) => (
              <li key={index}>{usage}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Design System Status (optional) */}
      {data.designSystemStatus && data.designSystemStatus.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border space-y-2">
          <h4 className="text-sm font-semibold text-foreground">Design System Status</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            {data.designSystemStatus.map((status, index) => (
              <li key={index}>{status}</li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
};
