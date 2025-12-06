import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Users, Target, Trophy } from "lucide-react";
import { Feature } from "@/hooks/useFeatures";
import { VariantComparisonSlider } from "./VariantComparisonSlider";

interface GrowthExperimentCardProps {
  feature: Feature;
  variants?: Array<{
    id: string;
    name: string;
    description: string;
    conversion_rate: number;
    engagement_rate: number;
    user_count: number;
    image_url?: string;
  }>;
  onClick?: () => void;
}

export function GrowthExperimentCard({ feature, variants = [], onClick }: GrowthExperimentCardProps) {
  const isRunning = feature.experiment_status === "running";
  const isCompleted = feature.experiment_status === "completed";

  // Find winning variant if completed
  const winningVariant = variants.find((v) => v.id === feature.winning_variant_id);
  const sortedVariants = [...variants].sort((a, b) => b.conversion_rate - a.conversion_rate);

  return (
    <Card 
      className="group cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 hover:border-accent" 
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`View experiment details for ${feature.title}`}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && onClick) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Header */}
      <div className="p-6 border-b bg-gradient-to-r from-accent/5 to-accent/10">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold">{feature.title}</h3>
              {isCompleted && (
                <Badge className="bg-success text-success-foreground">
                  <Trophy className="w-3 h-3 mr-1" />
                  Concluded
                </Badge>
              )}
              {isRunning && (
                <Badge className="bg-accent text-accent-foreground animate-pulse">
                  Live
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </div>
        </div>

        {/* Experiment Stats */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center p-3 bg-background/50 rounded-lg">
            <div className="text-2xl font-bold text-primary">
              {variants.reduce((sum, v) => sum + v.user_count, 0).toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Total Users</div>
          </div>
          <div className="text-center p-3 bg-background/50 rounded-lg">
            <div className="text-2xl font-bold text-accent">{variants.length}</div>
            <div className="text-xs text-muted-foreground mt-1">Variants</div>
          </div>
          <div className="text-center p-3 bg-background/50 rounded-lg">
            <div className="text-2xl font-bold text-success">
              {isCompleted
                ? `+${((sortedVariants[0]?.conversion_rate || 0) - (sortedVariants[1]?.conversion_rate || 0)).toFixed(1)}%`
                : "—"}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Lift</div>
          </div>
        </div>
      </div>

      {/* Visual Variant Comparison */}
      <div className="p-6">
        {sortedVariants.length >= 2 ? (
          <div className="space-y-6">
            {/* Interactive Comparison Slider */}
            <VariantComparisonSlider
              variantA={sortedVariants[0]}
              variantB={sortedVariants[1]}
              winningVariantId={feature.winning_variant_id}
            />

            {/* Detailed Metrics Grid */}
            <div className="grid grid-cols-2 gap-6">
              {sortedVariants.slice(0, 2).map((variant, index) => {
                const isWinner = variant.id === feature.winning_variant_id;
                const conversionDiff =
                  index === 1
                    ? ((variant.conversion_rate - sortedVariants[0].conversion_rate) / sortedVariants[0].conversion_rate) * 100
                    : 0;

                return (
                  <div key={variant.id} className="space-y-3">
                    {/* Variant Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">{variant.name}</span>
                        {isWinner && (
                          <Badge className="bg-success text-success-foreground text-xs">
                            <Trophy className="w-3 h-3 mr-1" />
                            Winner
                          </Badge>
                        )}
                        {index === 0 && !isWinner && (
                          <Badge variant="outline" className="text-xs">
                            Leading
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="space-y-2">
                      {/* Conversion Rate */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1">
                            <Target className="w-3 h-3 text-primary" />
                            <span className="font-medium">Conversion</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="font-bold text-primary">{variant.conversion_rate}%</span>
                            {index === 1 && (
                              <span
                                className={`text-xs ${
                                  conversionDiff < 0 ? "text-destructive" : "text-success"
                                }`}
                              >
                                {conversionDiff < 0 ? (
                                  <TrendingDown className="w-3 h-3 inline" />
                                ) : (
                                  <TrendingUp className="w-3 h-3 inline" />
                                )}
                                {Math.abs(conversionDiff).toFixed(1)}%
                              </span>
                            )}
                          </div>
                        </div>
                        <Progress value={variant.conversion_rate} className="h-2" />
                      </div>

                      {/* Engagement Rate */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-3 h-3 text-accent" />
                            <span className="font-medium">Engagement</span>
                          </div>
                          <span className="font-bold text-accent">{variant.engagement_rate}%</span>
                        </div>
                        <Progress value={variant.engagement_rate} className="h-2" />
                      </div>

                      {/* User Count */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>Users tested</span>
                        </div>
                        <span className="font-medium">{variant.user_count.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">Add at least 2 variants to compare</p>
          </div>
        )}

        {/* Description */}
        {sortedVariants.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-xs text-muted-foreground">
              {isCompleted
                ? `Winner: ${winningVariant?.name || sortedVariants[0].name} achieved ${sortedVariants[0].conversion_rate}% conversion rate`
                : `Current leader: ${sortedVariants[0].name} with ${sortedVariants[0].conversion_rate}% conversion`}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
