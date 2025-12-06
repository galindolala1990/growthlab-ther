import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Award } from "lucide-react";
import { Feature } from "@/hooks/useFeatures";
import { format } from "date-fns";

interface BiggestWinsPanelProps {
  experiments: Feature[];
}

export function BiggestWinsPanel({ experiments }: BiggestWinsPanelProps) {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const recentWins = experiments
    .filter((e) => 
      e.experiment_status === "shipped" && 
      e.lift && 
      e.lift > 0 &&
      e.launched_at &&
      new Date(e.launched_at) > thirtyDaysAgo
    )
    .sort((a, b) => (b.lift || 0) - (a.lift || 0))
    .slice(0, 3);

  if (recentWins.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          Biggest Wins (Last 30 Days)
        </CardTitle>
        <CardDescription>Top performing experiments recently shipped</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {recentWins.map((win) => (
            <div key={win.id} className="group p-4 rounded-lg border border-border bg-gradient-to-br from-primary/5 to-transparent hover:from-primary/10 transition-all">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-base mb-1 group-hover:text-primary transition-colors">{win.title}</h4>
                  {win.experiment_decision && (
                    <p className="text-sm text-muted-foreground line-clamp-2">{win.experiment_decision}</p>
                  )}
                </div>
                <Badge variant="success" className="ml-3 gap-1.5">
                  <TrendingUp className="h-3.5 w-3.5" />
                  +{win.lift}%
                </Badge>
              </div>

              <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                {win.primary_metric && (
                  <span className="px-2 py-0.5 rounded bg-muted">
                    {win.primary_metric}
                  </span>
                )}
                {win.launched_at && (
                  <span>Shipped {format(new Date(win.launched_at), "MMM d")}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
