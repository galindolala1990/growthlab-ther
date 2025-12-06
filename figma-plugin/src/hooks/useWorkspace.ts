import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export interface Workspace {
  id: string;
  name: string;
  description: string | null;
  owner_id: string;
  created_at: string;
  updated_at: string;
}

export interface Roadmap {
  id: string;
  workspace_id: string;
  name: string;
  description: string | null;
  status: string | null;
  created_at: string;
  updated_at: string;
}

export function useWorkspace() {
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [activeRoadmap, setActiveRoadmap] = useState<Roadmap | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    fetchOrCreateWorkspace();
  }, [user]);

  const fetchOrCreateWorkspace = async () => {
    if (!user) return;

    try {
      // Try to fetch existing workspace
      const { data: workspaces, error: fetchError } = await supabase
        .from("workspaces")
        .select("*")
        .eq("owner_id", user.id)
        .limit(1);

      if (fetchError) throw fetchError;

      let currentWorkspace: Workspace;

      if (workspaces && workspaces.length > 0) {
        currentWorkspace = workspaces[0] as Workspace;
        setWorkspace(currentWorkspace);
      } else {
        // Create default workspace
        const { data: newWorkspace, error: createError } = await supabase
          .from("workspaces")
          .insert({
            name: "My Workspace",
            description: "Default workspace",
            owner_id: user.id,
          })
          .select()
          .single();

        if (createError) throw createError;
        currentWorkspace = newWorkspace;
        setWorkspace(newWorkspace);
      }

      // Fetch or create default roadmap
      const { data: roadmaps, error: roadmapError } = await supabase
        .from("roadmaps")
        .select("*")
        .eq("workspace_id", currentWorkspace.id)
        .limit(1);

      if (roadmapError) throw roadmapError;

      if (roadmaps && roadmaps.length > 0) {
        setActiveRoadmap(roadmaps[0] as Roadmap);
      } else {
        // Create default roadmap
        const { data: newRoadmap, error: createRoadmapError } = await supabase
          .from("roadmaps")
          .insert({
            workspace_id: currentWorkspace.id,
            name: "Product Roadmap",
            description: "Main product roadmap",
            status: "active",
          })
          .select()
          .single();

        if (createRoadmapError) throw createRoadmapError;
        setActiveRoadmap(newRoadmap);
      }
    } catch (error: any) {
      console.error("Workspace error:", error);
      toast({
        title: "Error loading workspace",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateWorkspace = async (updates: Partial<Workspace>) => {
    if (!workspace) return;

    try {
      const { data, error } = await supabase
        .from("workspaces")
        .update(updates)
        .eq("id", workspace.id)
        .select()
        .single();

      if (error) throw error;
      setWorkspace(data);
      toast({
        title: "Workspace updated",
        description: "Your workspace has been updated successfully.",
      });
    } catch (error: any) {
      console.error("Update workspace error:", error);
      toast({
        title: "Error updating workspace",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return { workspace, activeRoadmap, loading, updateWorkspace };
}
