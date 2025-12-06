export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      analytics_events: {
        Row: {
          created_at: string | null
          event_data: Json | null
          event_type: string
          feature_id: string | null
          id: string
          workspace_id: string
        }
        Insert: {
          created_at?: string | null
          event_data?: Json | null
          event_type: string
          feature_id?: string | null
          id?: string
          workspace_id: string
        }
        Update: {
          created_at?: string | null
          event_data?: Json | null
          event_type?: string
          feature_id?: string | null
          id?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "analytics_events_feature_id_fkey"
            columns: ["feature_id"]
            isOneToOne: false
            referencedRelation: "features"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "analytics_events_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      canvas_connections: {
        Row: {
          connection_type: string
          created_at: string | null
          id: string
          label: string | null
          roadmap_id: string
          source_id: string
          source_type: string
          target_id: string
          target_type: string
          updated_at: string | null
        }
        Insert: {
          connection_type: string
          created_at?: string | null
          id?: string
          label?: string | null
          roadmap_id: string
          source_id: string
          source_type: string
          target_id: string
          target_type: string
          updated_at?: string | null
        }
        Update: {
          connection_type?: string
          created_at?: string | null
          id?: string
          label?: string | null
          roadmap_id?: string
          source_id?: string
          source_type?: string
          target_id?: string
          target_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "canvas_connections_roadmap_id_fkey"
            columns: ["roadmap_id"]
            isOneToOne: false
            referencedRelation: "roadmaps"
            referencedColumns: ["id"]
          },
        ]
      }
      design_iterations: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          feature_id: string
          figma_url: string | null
          id: string
          image_url: string
          title: string
          version: number
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          feature_id: string
          figma_url?: string | null
          id?: string
          image_url: string
          title: string
          version: number
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          feature_id?: string
          figma_url?: string | null
          id?: string
          image_url?: string
          title?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "design_iterations_feature_id_fkey"
            columns: ["feature_id"]
            isOneToOne: false
            referencedRelation: "features"
            referencedColumns: ["id"]
          },
        ]
      }
      experiment_variants: {
        Row: {
          conversion_rate: number | null
          created_at: string | null
          description: string | null
          engagement_rate: number | null
          feature_id: string
          id: string
          is_control: boolean | null
          is_winner: boolean | null
          name: string
          updated_at: string | null
          user_count: number | null
        }
        Insert: {
          conversion_rate?: number | null
          created_at?: string | null
          description?: string | null
          engagement_rate?: number | null
          feature_id: string
          id?: string
          is_control?: boolean | null
          is_winner?: boolean | null
          name: string
          updated_at?: string | null
          user_count?: number | null
        }
        Update: {
          conversion_rate?: number | null
          created_at?: string | null
          description?: string | null
          engagement_rate?: number | null
          feature_id?: string
          id?: string
          is_control?: boolean | null
          is_winner?: boolean | null
          name?: string
          updated_at?: string | null
          user_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "experiment_variants_feature_id_fkey"
            columns: ["feature_id"]
            isOneToOne: false
            referencedRelation: "features"
            referencedColumns: ["id"]
          },
        ]
      }
      features: {
        Row: {
          canvas_x: number | null
          canvas_y: number | null
          created_at: string | null
          description: string | null
          design_images: Json | null
          end_date: string | null
          experiment_decision: string | null
          experiment_notes: string | null
          experiment_owner: string | null
          experiment_segment: string | null
          experiment_status: string | null
          figma_url: string | null
          hypothesis: string | null
          id: string
          is_experiment: boolean | null
          jira_key: string | null
          launched_at: string | null
          lift: number | null
          p_value: number | null
          preview_image_url: string | null
          primary_metric: string | null
          priority: string | null
          progress: number | null
          roadmap_id: string
          secondary_metrics: string[] | null
          stage: string
          start_date: string | null
          swimlane: string | null
          team: string | null
          title: string
          updated_at: string | null
          winning_variant_id: string | null
        }
        Insert: {
          canvas_x?: number | null
          canvas_y?: number | null
          created_at?: string | null
          description?: string | null
          design_images?: Json | null
          end_date?: string | null
          experiment_decision?: string | null
          experiment_notes?: string | null
          experiment_owner?: string | null
          experiment_segment?: string | null
          experiment_status?: string | null
          figma_url?: string | null
          hypothesis?: string | null
          id?: string
          is_experiment?: boolean | null
          jira_key?: string | null
          launched_at?: string | null
          lift?: number | null
          p_value?: number | null
          preview_image_url?: string | null
          primary_metric?: string | null
          priority?: string | null
          progress?: number | null
          roadmap_id: string
          secondary_metrics?: string[] | null
          stage: string
          start_date?: string | null
          swimlane?: string | null
          team?: string | null
          title: string
          updated_at?: string | null
          winning_variant_id?: string | null
        }
        Update: {
          canvas_x?: number | null
          canvas_y?: number | null
          created_at?: string | null
          description?: string | null
          design_images?: Json | null
          end_date?: string | null
          experiment_decision?: string | null
          experiment_notes?: string | null
          experiment_owner?: string | null
          experiment_segment?: string | null
          experiment_status?: string | null
          figma_url?: string | null
          hypothesis?: string | null
          id?: string
          is_experiment?: boolean | null
          jira_key?: string | null
          launched_at?: string | null
          lift?: number | null
          p_value?: number | null
          preview_image_url?: string | null
          primary_metric?: string | null
          priority?: string | null
          progress?: number | null
          roadmap_id?: string
          secondary_metrics?: string[] | null
          stage?: string
          start_date?: string | null
          swimlane?: string | null
          team?: string | null
          title?: string
          updated_at?: string | null
          winning_variant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "features_roadmap_id_fkey"
            columns: ["roadmap_id"]
            isOneToOne: false
            referencedRelation: "roadmaps"
            referencedColumns: ["id"]
          },
        ]
      }
      ideas: {
        Row: {
          canvas_cluster: string | null
          canvas_impact_score: number | null
          cluster_x: number | null
          cluster_y: number | null
          created_at: string | null
          description: string | null
          id: string
          impact: string | null
          roadmap_id: string
          stage: string | null
          sticky_note_color: string | null
          tags: string[] | null
          theme: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          canvas_cluster?: string | null
          canvas_impact_score?: number | null
          cluster_x?: number | null
          cluster_y?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          impact?: string | null
          roadmap_id: string
          stage?: string | null
          sticky_note_color?: string | null
          tags?: string[] | null
          theme?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          canvas_cluster?: string | null
          canvas_impact_score?: number | null
          cluster_x?: number | null
          cluster_y?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          impact?: string | null
          roadmap_id?: string
          stage?: string | null
          sticky_note_color?: string | null
          tags?: string[] | null
          theme?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ideas_roadmap_id_fkey"
            columns: ["roadmap_id"]
            isOneToOne: false
            referencedRelation: "roadmaps"
            referencedColumns: ["id"]
          },
        ]
      }
      insights_history: {
        Row: {
          actions: Json | null
          bottlenecks: Json | null
          cluster_health: Json | null
          confidence: string | null
          created_at: string | null
          generated_at: string | null
          id: string
          opportunities: Json | null
          patterns: Json | null
          quality_reasoning: string | null
          quality_score: string | null
          roadmap_id: string | null
          workspace_id: string
        }
        Insert: {
          actions?: Json | null
          bottlenecks?: Json | null
          cluster_health?: Json | null
          confidence?: string | null
          created_at?: string | null
          generated_at?: string | null
          id?: string
          opportunities?: Json | null
          patterns?: Json | null
          quality_reasoning?: string | null
          quality_score?: string | null
          roadmap_id?: string | null
          workspace_id: string
        }
        Update: {
          actions?: Json | null
          bottlenecks?: Json | null
          cluster_health?: Json | null
          confidence?: string | null
          created_at?: string | null
          generated_at?: string | null
          id?: string
          opportunities?: Json | null
          patterns?: Json | null
          quality_reasoning?: string | null
          quality_score?: string | null
          roadmap_id?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "insights_history_roadmap_id_fkey"
            columns: ["roadmap_id"]
            isOneToOne: false
            referencedRelation: "roadmaps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "insights_history_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      roadmaps: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          status: string | null
          updated_at: string | null
          workspace_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          status?: string | null
          updated_at?: string | null
          workspace_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          status?: string | null
          updated_at?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "roadmaps_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspaces: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          owner_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          owner_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          owner_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
