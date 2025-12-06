import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Target, AlertTriangle, TrendingUp } from "lucide-react";
import { getPriorityConfig, type Priority } from "@/config/badge-config";

export function AIInsightsDashboard() {
  const insights = [
    {
      type: "opportunity",
      icon: Target,
      title: "High-impact opportunity in Activation",
      description: "32% drop-off suggests onboarding friction. Test simplified flow.",
      estimatedLift: "+18-25%",
      priority: "high" as Priority,
    },
    {
      type: "bottleneck",
      icon: AlertTriangle,
      title: "Engagement experiments stalled",
      description: "3 experiments in analyzing phase for 14+ days. Review and decide.",
      priority: "medium" as Priority,
    },
    {
      type: "recommendation",
      icon: TrendingUp,
      title: "Winning pattern detected",
      description: "Color contrast improvements consistently lift conversions. Apply to checkout.",
      estimatedLift: "+12-15%",
      priority: "high" as Priority,
    },
  ];

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Insights & Recommendations
        </CardTitle>
        <CardDescription>Smart opportunities and bottlenecks to address</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {insights.map((insight, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border border-border bg-background hover:border-primary/30 transition-all cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10 mt-0.5">
                  <insight.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-medium text-sm leading-tight">{insight.title}</h4>
                    <Badge variant={getPriorityConfig(insight.priority).variant} className="shrink-0">
                      {getPriorityConfig(insight.priority).label}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                  {insight.estimatedLift && (
                    <p className="text-xs font-medium text-success mt-2">
                      Est. impact: {insight.estimatedLift}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
