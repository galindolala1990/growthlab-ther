import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, TrendingUp, Users, Zap, CheckCircle2 } from "lucide-react";

interface IntegrationStatus {
  name: string;
  status: "connected" | "syncing" | "disconnected";
  lastSync?: string;
  icon: string;
}

interface AIInsightsPanelProps {
  integrations?: IntegrationStatus[];
  insights?: string[];
}

const defaultIntegrations: IntegrationStatus[] = [
  { name: "Figma", status: "connected", lastSync: "2 min ago", icon: "🎨" },
  { name: "Jira", status: "syncing", lastSync: "Syncing now", icon: "📋" },
  { name: "Miro", status: "connected", lastSync: "5 min ago", icon: "🖼️" },
  { name: "Notion", status: "connected", lastSync: "1 min ago", icon: "📝" },
  { name: "Slack", status: "connected", lastSync: "Just now", icon: "💬" },
];

const defaultInsights: string[] = [
  "3 features grouped into 'Profile Redesign' cluster",
  "Figma designs auto-synced for 5 features",
  "Launch timeline optimized based on dependencies",
  "2 experiments showing positive results",
  "Team velocity: +15% this sprint",
];

export const AIInsightsPanel = ({ 
  integrations = defaultIntegrations, 
  insights = defaultInsights 
}: AIInsightsPanelProps) => {
  const getStatusVariant = (status: string): "success" | "default" | "neutral" => {
    switch (status) {
      case "connected":
        return "success";
      case "syncing":
        return "default";
      case "disconnected":
        return "neutral";
      default:
        return "neutral";
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 via-accent/5 to-background border-primary/20">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
            <Sparkles className="w-5 h-5 text-on-primary" />
          </div>
          <div>
            <h3 className="font-bold text-lg">AI-Powered Insights</h3>
            <p className="text-xs text-muted-foreground">Auto-generated from connected tools</p>
          </div>
        </div>

        {/* Integrations Status */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Zap className="w-4 h-4 text-warning" />
            <span>Connected Integrations</span>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {integrations.map((integration) => (
              <div
                key={integration.name}
                className="flex flex-col items-center gap-1 p-2 rounded-lg bg-background/50 border border-border/50"
              >
                <span className="text-2xl">{integration.icon}</span>
                <span className="text-xs font-medium">{integration.name}</span>
                <Badge
                  variant={getStatusVariant(integration.status)}
                  className="text-xs h-5"
                >
                  {integration.status === "syncing" ? (
                    <span className="flex items-center gap-1">
                      <span className="animate-pulse">●</span>
                      {integration.status}
                    </span>
                  ) : (
                    integration.status
                  )}
                </Badge>
                {integration.lastSync && (
                  <span className="text-2xs text-muted-foreground">
                    {integration.lastSync}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <TrendingUp className="w-4 h-4 text-success" />
            <span>Smart Insights</span>
          </div>
          <div className="space-y-2">
            {insights.map((insight, index) => (
              <div
                key={index}
                className="flex items-start gap-2 p-3 rounded-lg bg-background/50 border border-border/50 hover:border-primary/30 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{insight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 pt-3 border-t border-border/50">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">12</div>
            <div className="text-xs text-muted-foreground">Auto-synced</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">5</div>
            <div className="text-xs text-muted-foreground">Clustered</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">3</div>
            <div className="text-xs text-muted-foreground">Generated</div>
          </div>
        </div>
      </div>
    </Card>
  );
};