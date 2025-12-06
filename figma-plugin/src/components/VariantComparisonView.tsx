import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy, TrendingUp, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Variant {
  id: string;
  name: string;
  description: string | null;
  conversion_rate: number | null;
  engagement_rate: number | null;
  user_count: number | null;
}

interface VariantComparisonViewProps {
  variants: Variant[];
  winningVariantId?: string | null;
  featureTitle: string;
  onSendToRoadmap?: () => void;
}

export function VariantComparisonView({
  variants,
  winningVariantId,
  featureTitle,
  onSendToRoadmap,
}: VariantComparisonViewProps) {
  if (variants.length < 2) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No variants to compare</p>
      </div>
    );
  }

  const winner = variants.find(v => v.id === winningVariantId);
  const avgConversion = variants.reduce((sum, v) => sum + (v.conversion_rate || 0), 0) / variants.length;
  const winnerConversion = winner?.conversion_rate || 0;
  const lift = winner ? ((winnerConversion - avgConversion) / avgConversion) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Summary */}
      <Card className="border-primary/50 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            Experiment Results: {featureTitle}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-lg">
            <span className="font-semibold">{winner?.name || "No winner"}</span>
            {lift > 0 && (
              <>
                {" increased "}
                <span className="text-primary font-bold">+{lift.toFixed(1)}%</span>
                {" conversion rate"}
              </>
            )}
          </div>
          {onSendToRoadmap && (
            <Button onClick={onSendToRoadmap} className="gap-2">
              <ArrowRight className="w-4 h-4" />
              Send Winner to Roadmap
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Side-by-side comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {variants.map((variant) => {
          const isWinner = variant.id === winningVariantId;
          
          return (
            <Card
              key={variant.id}
              className={`relative ${
                isWinner
                  ? "border-primary ring-2 ring-primary/20"
                  : "opacity-70 hover:opacity-100"
              } transition-all`}
            >
              {isWinner && (
                <div className="absolute -top-3 -right-3 bg-primary text-on-primary rounded-full p-2 shadow-lg">
                  <Trophy className="w-4 h-4" />
                </div>
              )}

              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{variant.name}</CardTitle>
                  {isWinner && (
                    <Badge className="bg-primary text-on-primary">Winner</Badge>
                  )}
                </div>
                {variant.description && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {variant.description}
                  </p>
                )}
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Conversion Rate */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span className="font-medium">Conversion Rate</span>
                    </div>
                    <span className="text-lg font-bold">
                      {variant.conversion_rate?.toFixed(1) || 0}%
                    </span>
                  </div>
                  <Progress
                    value={variant.conversion_rate || 0}
                    className={`h-2 ${isWinner ? "bg-primary/20" : ""}`}
                  />
                </div>

                {/* Engagement Rate */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-muted-foreground">
                      Engagement Rate
                    </span>
                    <span className="font-semibold">
                      {variant.engagement_rate?.toFixed(1) || 0}%
                    </span>
                  </div>
                  <Progress
                    value={variant.engagement_rate || 0}
                    className="h-1.5"
                  />
                </div>

                {/* User Count */}
                <div className="flex items-center justify-between text-sm pt-2 border-t border-border">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>Users Tested</span>
                  </div>
                  <span className="font-semibold">
                    {variant.user_count?.toLocaleString() || 0}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
