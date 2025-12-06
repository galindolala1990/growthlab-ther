import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getPriorityConfig } from "@/config/badge-config";

interface Action {
  title: string;
  description: string;
  priority: "critical" | "high" | "medium" | "low";
  category: "experiments" | "timeline" | "canvas" | "resources";
}

interface ActionCardProps {
  action: Action;
}

export function ActionCard({ action }: ActionCardProps) {
  const navigate = useNavigate();

  const getCategoryRoute = (category: string) => {
    switch (category) {
      case "experiments":
        return "/experiments";
      case "timeline":
        return "/roadmap?view=timeline";
      case "canvas":
        return "/roadmap?view=canvas";
      default:
        return "/roadmap";
    }
  };

  const priorityConfig = getPriorityConfig(action.priority);

  return (
    <Card className="hover:shadow-lg transition-all border-l-4 border-l-primary">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1">
            <div className="p-2 bg-primary-soft rounded-lg">
              <Lightbulb className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <CardTitle className="text-base">{action.title}</CardTitle>
                <Badge className={priorityConfig.badgeClass}>
                  {priorityConfig.label}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{action.description}</p>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-primary hover:text-primary-hover h-8 px-3"
                onClick={() => navigate(getCategoryRoute(action.category))}
              >
                <span className="text-xs font-medium capitalize">Go to {action.category}</span>
                <ArrowRight className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}