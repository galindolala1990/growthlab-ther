import { supabase } from "@/integrations/supabase/client";

/**
 * Adds specific test items to an existing roadmap for a given year
 * Safe to run multiple times - won't duplicate items
 */
export async function add2025TestData(roadmapId: string, year: number = new Date().getFullYear()) {
  const testItems = [
    {
      roadmap_id: roadmapId,
      title: "Sample – Pricing Page Experiment",
      description: "A/B test comparing value-based vs feature-based pricing presentation with conversion tracking",
      stage: "testing" as const,
      progress: 75,
      start_date: `${year}-02-01`,
      end_date: `${year}-03-31`,
      team: "Growth",
      priority: "high" as const,
      swimlane: "Marketing",
      is_experiment: true,
      experiment_status: "running" as const,
      preview_image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
    },
    {
      roadmap_id: roadmapId,
      title: "Sample – Onboarding Flow v2",
      description: "Redesigned user onboarding with progressive disclosure and contextual help",
      stage: "development" as const,
      progress: 60,
      start_date: `${year}-04-01`,
      end_date: `${year}-06-30`,
      team: "Activation",
      priority: "critical" as const,
      swimlane: "User Experience",
      is_experiment: false,
      experiment_status: null,
      preview_image_url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=450&fit=crop",
    },
    {
      roadmap_id: roadmapId,
      title: "Sample – Team Dashboard Redesign",
      description: "Analytics dashboard with customizable widgets and real-time collaboration metrics",
      stage: "design" as const,
      progress: 35,
      start_date: `${year}-07-01`,
      end_date: `${year}-08-31`,
      team: "Analytics",
      priority: "medium" as const,
      swimlane: "Product",
      is_experiment: false,
      experiment_status: null,
      preview_image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
    },
    {
      roadmap_id: roadmapId,
      title: "Sample – Mobile App Paywall",
      description: "Completed experiment: Soft vs hard paywall approach - 23% conversion increase",
      stage: "launch" as const,
      progress: 100,
      start_date: `${year}-10-01`,
      end_date: `${year}-11-30`,
      team: "Monetization",
      priority: "critical" as const,
      swimlane: "Mobile",
      is_experiment: true,
      experiment_status: "completed" as const,
      preview_image_url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=450&fit=crop",
    },
    {
      roadmap_id: roadmapId,
      title: "Sample – Notification Timing Optimization",
      description: "Testing optimal send times for engagement notifications across time zones",
      stage: "testing" as const,
      progress: 50,
      start_date: `${year}-09-01`,
      end_date: `${year}-10-15`,
      team: "Growth",
      priority: "high" as const,
      swimlane: "Marketing",
      is_experiment: true,
      experiment_status: "running" as const,
      preview_image_url: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=450&fit=crop",
    },
  ];

  try {
    // Check if items already exist
    const { data: existing } = await supabase
      .from("features")
      .select("title")
      .eq("roadmap_id", roadmapId)
      .like("title", "Sample –%");

    const existingTitles = new Set(existing?.map(f => f.title) || []);
    const itemsToAdd = testItems.filter(item => !existingTitles.has(item.title));

    if (itemsToAdd.length === 0) {
      return { success: true, message: "Test items already exist", added: 0 };
    }

    const { data: features, error: featuresError } = await supabase
      .from("features")
      .insert(itemsToAdd)
      .select();

    if (featuresError) throw featuresError;

    // Add experiment variants for experiments
    const experimentFeatures = features?.filter((f: any) => f.is_experiment) || [];

    for (const feature of experimentFeatures) {
      const isCompleted = feature.experiment_status === "completed";
      const isRunning = feature.experiment_status === "running";
      
      const variants = [
        {
          feature_id: feature.id,
          name: "Control (A)",
          description: "Original design baseline",
          conversion_rate: isCompleted ? 12.4 : (isRunning ? 14.2 : null),
          engagement_rate: isCompleted ? 45.2 : (isRunning ? 52.1 : null),
          user_count: isRunning || isCompleted ? 5000 : 0,
        },
        {
          feature_id: feature.id,
          name: "Variant (B)",
          description: "Optimized design with bold CTA",
          conversion_rate: isCompleted ? 15.3 : (isRunning ? 17.8 : null),
          engagement_rate: isCompleted ? 58.7 : (isRunning ? 61.3 : null),
          user_count: isRunning || isCompleted ? 5000 : 0,
        },
      ];

      const { data: createdVariants, error: variantsError } = await supabase
        .from("experiment_variants")
        .insert(variants)
        .select();

      if (variantsError) throw variantsError;

      // Set winning variant for completed experiments
      if (isCompleted && createdVariants && createdVariants.length > 0) {
        const winningVariant = createdVariants.reduce((max: any, v: any) => 
          v.conversion_rate > max.conversion_rate ? v : max
        );

        await supabase
          .from("features")
          .update({ winning_variant_id: winningVariant.id })
          .eq("id", feature.id);
      }
    }

    return { 
      success: true, 
      message: `Added ${itemsToAdd.length} test items for ${year}`,
      added: itemsToAdd.length,
      features 
    };
  } catch (error) {
    console.error("Error adding 2025 test data:", error);
    return { success: false, error };
  }
}
