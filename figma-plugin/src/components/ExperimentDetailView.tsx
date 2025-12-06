import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { getExperimentStatusConfig, SPECIAL_BADGES } from "@/config/badge-config";
import { 
  TrendingUp, 
  Users, 
  Target, 
  Trophy,
  ExternalLink,
  Calendar,
  BarChart3,
  Loader2
} from "lucide-react";
import { Feature } from "@/hooks/useFeatures";
import { useExperimentVariants } from "@/hooks/useExperimentVariants";
import { format } from "date-fns";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ExperimentDetailViewProps {
  experiment: Feature;
  isOpen: boolean;
  onClose: () => void;
  onRefresh?: () => void;
}

export const ExperimentDetailView = ({ experiment, isOpen, onClose, onRefresh }: ExperimentDetailViewProps) => {
  const { variants, loading: variantsLoading } = useExperimentVariants(experiment.id);
  const { toast } = useToast();
  const [declaringWinner, setDeclaringWinner] = useState(false);
  const [selectedWinner, setSelectedWinner] = useState<string | null>(null);
  const [showDeclareDialog, setShowDeclareDialog] = useState(false);
  const [decisionNotes, setDecisionNotes] = useState("");

  if (!experiment.is_experiment) {
    return null;
  }

  const control = variants.find(v => v.is_control);
  const winningVariant = variants.find(v => v.id === experiment.winning_variant_id);

  const getVariantLift = (variant: any) => {
    if (!control || !variant.conversion_rate || !control.conversion_rate) return null;
    
    const lift = ((variant.conversion_rate - control.conversion_rate) / control.conversion_rate) * 100;
    
    return {
      value: lift,
      isPositive: lift > 0,
    };
  };

  const handleDeclareWinner = async () => {
    if (!selectedWinner) return;
    
    setDeclaringWinner(true);
    try {
      // Calculate lift
      const winner = variants.find(v => v.id === selectedWinner);
      let lift = 0;
      if (winner && control && winner.conversion_rate && control.conversion_rate) {
        lift = ((winner.conversion_rate - control.conversion_rate) / control.conversion_rate) * 100;
      }

      // Update feature with winner and status
      const { error: featureError } = await supabase
        .from("features")
        .update({
          winning_variant_id: selectedWinner,
          experiment_status: "completed",
          lift: lift,
          experiment_decision: decisionNotes,
        })
        .eq("id", experiment.id);

      if (featureError) throw featureError;

      // Mark the winning variant
      const { error: variantError } = await supabase
        .from("experiment_variants")
        .update({ is_winner: true })
        .eq("id", selectedWinner);

      if (variantError) throw variantError;

      toast({
        title: "Winner declared",
        description: `${winner?.name} has been marked as the winning variant.`,
      });

      setShowDeclareDialog(false);
      setSelectedWinner(null);
      setDecisionNotes("");
      onRefresh?.();
    } catch (error: any) {
      console.error("Error declaring winner:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to declare winner",
        variant: "destructive",
      });
    } finally {
      setDeclaringWinner(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-2xl mb-2">{experiment.title}</DialogTitle>
              <p className="text-sm text-muted-foreground">{experiment.description}</p>
              {experiment.hypothesis && (
                <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                  <p className="text-sm font-medium text-primary mb-1">Hypothesis</p>
                  <p className="text-sm">{experiment.hypothesis}</p>
                </div>
              )}
            </div>
            <Badge className={getExperimentStatusConfig(experiment.experiment_status).className}>
              {getExperimentStatusConfig(experiment.experiment_status).label}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Experiment Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Experiment Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {experiment.primary_metric && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Primary Metric</p>
                    <p className="text-base font-semibold capitalize">
                      {experiment.primary_metric.replace(/_/g, " ")}
                    </p>
                  </div>
                )}
                {experiment.experiment_segment && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Segment</p>
                    <p className="text-base font-semibold capitalize">
                      {experiment.experiment_segment.replace(/_/g, " ")}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Team</p>
                  <p className="text-base font-semibold">{experiment.experiment_owner || experiment.team || "—"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Priority</p>
                  <Badge variant="outline" className="capitalize">
                    {experiment.priority || "medium"}
                  </Badge>
                </div>
                {experiment.start_date && experiment.end_date && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Timeline</p>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-3 h-3" />
                      {format(new Date(experiment.start_date), "MMM d")} - {format(new Date(experiment.end_date), "MMM d, yyyy")}
                    </div>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Progress</p>
                  <div className="flex items-center gap-2">
                    <Progress value={experiment.progress || 0} className="flex-1" />
                    <span className="text-sm font-semibold">{experiment.progress || 0}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Winning Variant Banner */}
          {winningVariant && (
            <Card className="border-success/50 bg-success/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-success" />
                  Winning Variant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-lg font-bold">{winningVariant.name}</p>
                    <p className="text-sm text-muted-foreground">{winningVariant.description}</p>
                    {experiment.experiment_decision && (
                      <div className="mt-3 p-2 bg-background rounded border">
                        <p className="text-xs font-medium text-muted-foreground mb-1">Decision Notes</p>
                        <p className="text-sm">{experiment.experiment_decision}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-6">
                    {winningVariant.conversion_rate !== null && (
                      <div className="text-center">
                        <p className="text-2xl font-bold text-success">
                          {winningVariant.conversion_rate}%
                        </p>
                        <p className="text-xs text-muted-foreground">Conversion</p>
                      </div>
                    )}
                    {experiment.lift !== null && (
                      <div className="text-center">
                        <p className="text-2xl font-bold text-success">
                          +{experiment.lift.toFixed(1)}%
                        </p>
                        <p className="text-xs text-muted-foreground">Lift</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Declare Winner Button */}
          {!winningVariant && variants.length >= 2 && experiment.experiment_status === "running" && (
            <Button 
              className="w-full" 
              variant="primary"
              onClick={() => setShowDeclareDialog(true)}
            >
              <Trophy className="w-4 h-4 mr-2" />
              Declare Winner & Ship
            </Button>
          )}

          {/* Variant Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Variant Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {variantsLoading ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                    Loading variants...
                  </div>
                ) : variants.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No variants found
                  </div>
                ) : (
                  variants.map((variant) => {
                    const isWinner = variant.id === experiment.winning_variant_id;
                    const lift = getVariantLift(variant);

                    return (
                      <Card 
                        key={variant.id}
                        className={`relative ${isWinner ? "border-success/30 bg-success/5" : ""} ${
                          !winningVariant && !variant.is_control ? "cursor-pointer hover:border-primary/50" : ""
                        }`}
                        onClick={() => {
                          if (!winningVariant && !variant.is_control) {
                            setSelectedWinner(variant.id);
                          }
                        }}
                      >
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-base">{variant.name}</h4>
                                {isWinner && (
                                  <Badge className={SPECIAL_BADGES.winner.className}>{SPECIAL_BADGES.winner.label}</Badge>
                                )}
                                {variant.is_control && (
                                  <Badge className={SPECIAL_BADGES.control.className}>{SPECIAL_BADGES.control.label}</Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{variant.description}</p>
                            </div>
                            {variant.user_count !== null && (
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Users className="w-4 h-4" />
                                {variant.user_count.toLocaleString()} users
                              </div>
                            )}
                          </div>

                          <Separator className="my-4" />

                          <div className="grid grid-cols-2 gap-6">
                            {variant.conversion_rate !== null && (
                              <div>
                                <p className="text-sm font-medium text-muted-foreground mb-2">
                                  Conversion Rate
                                </p>
                                <div className="flex items-end gap-3">
                                  <span className="text-3xl font-bold">
                                    {variant.conversion_rate}%
                                  </span>
                                  {lift && !variant.is_control && (
                                    <Badge
                                      variant={lift.isPositive ? "success" : "error"}
                                    >
                                      {lift.isPositive ? "+" : ""}
                                      {lift.value.toFixed(1)}%
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            )}

                            {variant.engagement_rate !== null && (
                              <div>
                                <p className="text-sm font-medium text-muted-foreground mb-2">
                                  Engagement Rate
                                </p>
                                <div className="flex items-end gap-3">
                                  <span className="text-3xl font-bold">
                                    {variant.engagement_rate}%
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>

        {/* Declare Winner Dialog */}
        <AlertDialog open={showDeclareDialog} onOpenChange={setShowDeclareDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Declare Winner & Ship</AlertDialogTitle>
              <AlertDialogDescription>
                Choose the winning variant to ship to production. This will update the experiment status to "completed".
              </AlertDialogDescription>
            </AlertDialogHeader>
            
            <div className="space-y-4 my-4">
              <div>
                <Label>Select Winner</Label>
                <div className="grid gap-2 mt-2">
                  {variants.filter(v => !v.is_control).map(variant => (
                    <div
                      key={variant.id}
                      className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedWinner === variant.id 
                          ? "border-primary bg-primary/5" 
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedWinner(variant.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{variant.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {variant.conversion_rate}% conversion
                          </p>
                        </div>
                        {getVariantLift(variant) && (
                          <Badge variant="success">
                            +{getVariantLift(variant)!.value.toFixed(1)}% lift
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="decisionNotes">Decision Notes</Label>
                <Textarea
                  id="decisionNotes"
                  value={decisionNotes}
                  onChange={(e) => setDecisionNotes(e.target.value)}
                  placeholder="What did we learn? Why did this variant win?"
                  rows={3}
                  className="mt-2"
                />
              </div>
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel disabled={declaringWinner}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeclareWinner}
                disabled={!selectedWinner || declaringWinner}
              >
                {declaringWinner && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Declare Winner & Ship
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DialogContent>
    </Dialog>
  );
};
