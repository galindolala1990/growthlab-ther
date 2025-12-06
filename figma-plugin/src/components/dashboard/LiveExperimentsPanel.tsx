import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus, Clock } from "lucide-react";
import { Feature } from "@/hooks/useFeatures";

interface LiveExperimentsPanelProps {
  experiments: Feature[];
}

export function LiveExperimentsPanel({ experiments }: LiveExperimentsPanelProps) {
  const runningExperiments = experiments.filter((e) => e.experiment_status === "running");

  if (runningExperiments.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Experiments</CardTitle>
        <CardDescription>Currently running tests with early signals</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {runningExperiments.slice(0, 3).map((exp) => {
            const lift = exp.lift || 0;
            const daysRunning = exp.start_date
              ? Math.floor((new Date().getTime() - new Date(exp.start_date).getTime()) / (1000 * 60 * 60 * 24))
              : 0;

            return (
              <div key={exp.id} className="p-4 rounded-lg border border-border bg-card/30 hover:bg-card/50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm mb-1">{exp.title}</h4>
                    <p className="text-xs text-muted-foreground">{exp.hypothesis || "Testing impact on primary metric"}</p>
                  </div>
                  {lift !== 0 && (
                    <Badge variant={lift > 0 ? "success" : lift < 0 ? "error" : "neutral"} className="ml-2 gap-1">
                      {lift > 0 ? <TrendingUp className="h-3 w-3" /> : lift < 0 ? <TrendingDown className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
                      {lift > 0 ? "+" : ""}{lift}%
                    </Badge>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Progress to significance</span>
                    <span className="font-medium">{exp.progress || 45}%</span>
                  </div>
                  <Progress value={exp.progress || 45} className="h-1.5" />
                </div>

                <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{daysRunning} days running</span>
                  </div>
                  {exp.experiment_owner && (
                    <div className="flex items-center gap-1">
                      <span>Owner: {exp.experiment_owner}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
