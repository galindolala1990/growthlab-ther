import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface ExperimentCreationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  roadmapId: string;
  onSuccess?: () => void;
}

export function ExperimentCreationDialog({ 
  isOpen, 
  onClose, 
  roadmapId,
  onSuccess 
}: ExperimentCreationDialogProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: "",
    hypothesis: "",
    description: "",
    primaryMetric: "conversion_rate",
    segment: "all_users",
    team: "",
    priority: "medium",
    controlName: "Control (A)",
    variantName: "Variant B",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create the experiment feature
      const { data: feature, error: featureError } = await supabase
        .from("features")
        .insert({
          roadmap_id: roadmapId,
          title: formData.title,
          description: formData.description,
          hypothesis: formData.hypothesis,
          primary_metric: formData.primaryMetric,
          experiment_segment: formData.segment,
          team: formData.team,
          priority: formData.priority,
          stage: "planning",
          is_experiment: true,
          experiment_status: "draft",
          progress: 0,
        })
        .select()
        .single();

      if (featureError) throw featureError;

      // Create control variant
      const { error: controlError } = await supabase
        .from("experiment_variants")
        .insert({
          feature_id: feature.id,
          name: formData.controlName,
          description: "Control variant (baseline)",
          is_control: true,
          user_count: 0,
        });

      if (controlError) throw controlError;

      // Create variant B
      const { error: variantError } = await supabase
        .from("experiment_variants")
        .insert({
          feature_id: feature.id,
          name: formData.variantName,
          description: "Test variant",
          is_control: false,
          user_count: 0,
        });

      if (variantError) throw variantError;

      toast({
        title: "Experiment created",
        description: "Your experiment has been set up with control and test variants.",
      });

      onSuccess?.();
      onClose();
      
      // Reset form
      setFormData({
        title: "",
        hypothesis: "",
        description: "",
        primaryMetric: "conversion_rate",
        segment: "all_users",
        team: "",
        priority: "medium",
        controlName: "Control (A)",
        variantName: "Variant B",
      });
    } catch (error: any) {
      console.error("Error creating experiment:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create experiment",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Experiment</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Experiment Name *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Checkout button color test"
                required
              />
            </div>

            <div>
              <Label htmlFor="hypothesis">Hypothesis *</Label>
              <Textarea
                id="hypothesis"
                value={formData.hypothesis}
                onChange={(e) => setFormData({ ...formData, hypothesis: e.target.value })}
                placeholder="e.g., Changing the checkout button from blue to green will increase conversion by 15%"
                required
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Additional context about this experiment..."
                rows={2}
              />
            </div>
          </div>

          {/* Metrics & Targeting */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="primaryMetric">Primary Metric *</Label>
              <Select
                value={formData.primaryMetric}
                onValueChange={(value) => setFormData({ ...formData, primaryMetric: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conversion_rate">Conversion Rate</SelectItem>
                  <SelectItem value="click_through_rate">Click-Through Rate</SelectItem>
                  <SelectItem value="engagement_rate">Engagement Rate</SelectItem>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="retention">Retention</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="segment">Audience Segment *</Label>
              <Select
                value={formData.segment}
                onValueChange={(value) => setFormData({ ...formData, segment: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_users">All Users</SelectItem>
                  <SelectItem value="new_users">New Users</SelectItem>
                  <SelectItem value="returning_users">Returning Users</SelectItem>
                  <SelectItem value="mobile">Mobile Only</SelectItem>
                  <SelectItem value="desktop">Desktop Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Team & Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="team">Team</Label>
              <Input
                id="team"
                value={formData.team}
                onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                placeholder="e.g., Growth Team"
              />
            </div>

            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData({ ...formData, priority: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Variants */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Initial Variants</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="controlName">Control Name</Label>
                <Input
                  id="controlName"
                  value={formData.controlName}
                  onChange={(e) => setFormData({ ...formData, controlName: e.target.value })}
                  placeholder="Control (A)"
                />
              </div>
              <div>
                <Label htmlFor="variantName">Variant Name</Label>
                <Input
                  id="variantName"
                  value={formData.variantName}
                  onChange={(e) => setFormData({ ...formData, variantName: e.target.value })}
                  placeholder="Variant B"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Create Experiment
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}