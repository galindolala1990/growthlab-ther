import { supabase } from "@/integrations/supabase/client";

export async function createSampleData(workspaceId: string, roadmapId: string) {
  // Sample features with experiments for 2025
  const sampleFeatures = [
    // Requested 2025 test items
    {
      roadmap_id: roadmapId,
      title: "Sample – Pricing Page Experiment",
      description: "A/B test comparing value-based vs feature-based pricing presentation with conversion tracking",
      stage: "testing",
      progress: 75,
      start_date: "2025-02-01",
      end_date: "2025-03-31",
      team: "Growth",
      priority: "high",
      swimlane: "Marketing",
      is_experiment: true,
      experiment_status: "running",
      preview_image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
    },
    {
      roadmap_id: roadmapId,
      title: "Sample – Onboarding Flow v2",
      description: "Redesigned user onboarding with progressive disclosure and contextual help",
      stage: "development",
      progress: 60,
      start_date: "2025-04-01",
      end_date: "2025-06-30",
      team: "Activation",
      priority: "critical",
      swimlane: "User Experience",
      is_experiment: false,
      preview_image_url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=450&fit=crop",
    },
    {
      roadmap_id: roadmapId,
      title: "Sample – Team Dashboard Redesign",
      description: "Analytics dashboard with customizable widgets and real-time collaboration metrics",
      stage: "design",
      progress: 35,
      start_date: "2025-07-01",
      end_date: "2025-08-31",
      team: "Analytics",
      priority: "medium",
      swimlane: "Product",
      is_experiment: false,
      preview_image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
    },
    {
      roadmap_id: roadmapId,
      title: "Sample – Mobile App Paywall",
      description: "Completed experiment: Soft vs hard paywall approach - 23% conversion increase",
      stage: "launch",
      progress: 100,
      start_date: "2025-10-01",
      end_date: "2025-11-30",
      team: "Monetization",
      priority: "critical",
      swimlane: "Mobile",
      is_experiment: true,
      experiment_status: "shipped",
      preview_image_url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=450&fit=crop",
    },
    {
      roadmap_id: roadmapId,
      title: "Sample – Notification Timing Optimization",
      description: "Testing optimal send times for engagement notifications across time zones",
      stage: "testing",
      progress: 50,
      start_date: "2025-09-01",
      end_date: "2025-10-15",
      team: "Growth",
      priority: "high",
      swimlane: "Marketing",
      is_experiment: true,
      experiment_status: "running",
      preview_image_url: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=450&fit=crop",
    },
    
    // Q1 2025 - January-March
    {
      roadmap_id: roadmapId,
      title: "Pricing Page Redesign",
      description: "A/B testing new pricing table layouts and CTA placements to increase conversions",
      stage: "testing",
      progress: 65,
      start_date: "2025-01-05",
      end_date: "2025-02-20",
      team: "Growth",
      priority: "critical",
      swimlane: "Marketing",
      is_experiment: true,
      experiment_status: "running",
      preview_image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
    },
    {
      roadmap_id: roadmapId,
      title: "Email Campaign Optimization",
      description: "Testing subject lines and preview text to improve open rates",
      stage: "testing",
      progress: 80,
      start_date: "2025-01-20",
      end_date: "2025-03-10",
      team: "Marketing",
      priority: "high",
      swimlane: "Marketing",
      is_experiment: true,
      experiment_status: "running",
      preview_image_url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=450&fit=crop",
    },
    {
      roadmap_id: roadmapId,
      title: "Dashboard Widget Layouts",
      description: "Modern analytics dashboard with customizable widget arrangements",
      stage: "development",
      progress: 70,
      start_date: "2025-01-15",
      end_date: "2025-03-31",
      team: "Product",
      priority: "medium",
      swimlane: "Product",
      is_experiment: false,
      preview_image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
    },
    {
      roadmap_id: roadmapId,
      title: "Product Tour Experience",
      description: "Interactive vs video-based product tours for new users",
      stage: "testing",
      progress: 55,
      start_date: "2025-02-01",
      end_date: "2025-03-25",
      team: "Product",
      priority: "high",
      swimlane: "User Experience",
      is_experiment: true,
      experiment_status: "running",
      preview_image_url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=450&fit=crop",
    },
    {
      roadmap_id: roadmapId,
      title: "Search Autocomplete",
      description: "AI-powered search suggestions with predictive results",
      stage: "development",
      progress: 45,
      start_date: "2025-02-10",
      end_date: "2025-04-15",
      team: "Engineering",
      priority: "medium",
      swimlane: "Product",
      is_experiment: false,
      preview_image_url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=450&fit=crop",
    },
    {
      roadmap_id: roadmapId,
      title: "Dark Mode Implementation",
      description: "System-wide dark theme with automatic switching",
      stage: "design",
      progress: 35,
      start_date: "2025-02-20",
      end_date: "2025-05-10",
      team: "Design",
      priority: "low",
      swimlane: "Product",
      is_experiment: false,
      preview_image_url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=450&fit=crop",
    },
    
    // Q2 2025 - April-June
    {
      roadmap_id: roadmapId,
      title: "Mobile Navigation Redesign",
      description: "Testing bottom nav vs hamburger menu for mobile users",
      stage: "design",
      progress: 30,
      start_date: "2025-03-01",
      end_date: "2025-04-30",
      team: "Mobile",
      priority: "medium",
      swimlane: "Mobile",
      is_experiment: true,
      experiment_status: "draft",
      preview_image_url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=450&fit=crop",
    },
    {
      roadmap_id: roadmapId,
      title: "Referral Program Launch",
      description: "Incentivized referral system to drive viral growth",
      stage: "planning",
      progress: 20,
      start_date: "2025-03-15",
      end_date: "2025-06-30",
      team: "Growth",
      priority: "high",
      swimlane: "Marketing",
      is_experiment: false,
      preview_image_url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=450&fit=crop",
    },
    {
      roadmap_id: roadmapId,
      title: "Push Notification Copy Test",
      description: "Testing different message styles for engagement notifications",
      stage: "planning",
      progress: 15,
      start_date: "2025-04-01",
      end_date: "2025-05-20",
      team: "Growth",
      priority: "medium",
      swimlane: "Marketing",
      is_experiment: true,
      experiment_status: "draft",
      preview_image_url: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=450&fit=crop",
    },
    {
      roadmap_id: roadmapId,
      title: "Payment Flow Redesign",
      description: "Streamlined checkout with express payment options",
      stage: "development",
      progress: 40,
      start_date: "2025-04-15",
      end_date: "2025-07-10",
      team: "Engineering",
      priority: "critical",
      swimlane: "Conversion",
      is_experiment: false,
      preview_image_url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=450&fit=crop",
    },
    {
      roadmap_id: roadmapId,
      title: "Onboarding Video Experiment",
      description: "Testing animated video vs static images in first-time user experience",
      stage: "design",
      progress: 25,
      start_date: "2025-05-01",
      end_date: "2025-06-30",
      team: "Product",
      priority: "high",
      swimlane: "User Experience",
      is_experiment: true,
      experiment_status: "draft",
      preview_image_url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=450&fit=crop",
    },
    
    // Q3 2025 - July-September
    {
      roadmap_id: roadmapId,
      title: "AI Chatbot Assistant",
      description: "Intelligent support bot for common user questions",
      stage: "planning",
      progress: 10,
      start_date: "2025-06-01",
      end_date: "2025-09-30",
      team: "Engineering",
      priority: "medium",
      swimlane: "Product",
      is_experiment: false,
      preview_image_url: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=450&fit=crop",
    },
    {
      roadmap_id: roadmapId,
      title: "Homepage Hero Messaging",
      description: "Testing benefit-focused vs feature-focused hero copy",
      stage: "planning",
      progress: 5,
      start_date: "2025-07-01",
      end_date: "2025-08-15",
      team: "Marketing",
      priority: "high",
      swimlane: "Marketing",
      is_experiment: true,
      experiment_status: "draft",
      preview_image_url: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&h=450&fit=crop",
    },
    {
      roadmap_id: roadmapId,
      title: "Social Media Integration",
      description: "One-click sharing to LinkedIn, Twitter, and Facebook",
      stage: "planning",
      progress: 8,
      start_date: "2025-07-15",
      end_date: "2025-10-01",
      team: "Product",
      priority: "low",
      swimlane: "Product",
      is_experiment: false,
      preview_image_url: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=450&fit=crop",
    },
    {
      roadmap_id: roadmapId,
      title: "Mobile App Performance",
      description: "Optimization for faster load times and smoother animations",
      stage: "planning",
      progress: 12,
      start_date: "2025-08-01",
      end_date: "2025-10-30",
      team: "Mobile",
      priority: "high",
      swimlane: "Mobile",
      is_experiment: false,
      preview_image_url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=450&fit=crop",
    },
    
    // Q4 2025 - October-December
    {
      roadmap_id: roadmapId,
      title: "Holiday Campaign Landing Page",
      description: "Testing seasonal designs for Q4 promotions",
      stage: "planning",
      progress: 0,
      start_date: "2025-10-01",
      end_date: "2025-11-15",
      team: "Marketing",
      priority: "high",
      swimlane: "Marketing",
      is_experiment: true,
      experiment_status: "draft",
      preview_image_url: "https://images.unsplash.com/photo-1607827448387-a67db1383b59?w=800&h=450&fit=crop",
    },
    {
      roadmap_id: roadmapId,
      title: "Team Collaboration Features",
      description: "Real-time co-editing and commenting system",
      stage: "planning",
      progress: 5,
      start_date: "2025-10-15",
      end_date: "2026-01-31",
      team: "Product",
      priority: "critical",
      swimlane: "Product",
      is_experiment: false,
      preview_image_url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=450&fit=crop",
    },
    {
      roadmap_id: roadmapId,
      title: "Year-End Analytics Dashboard",
      description: "Annual performance summary with insights and recommendations",
      stage: "planning",
      progress: 3,
      start_date: "2025-11-01",
      end_date: "2025-12-20",
      team: "Product",
      priority: "medium",
      swimlane: "Product",
      is_experiment: false,
      preview_image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
    },
    
    // Completed/Shipped experiments from late 2024
    {
      roadmap_id: roadmapId,
      title: "Checkout Flow Simplification",
      description: "Completed test: Single-page checkout vs multi-step - 18% conversion lift",
      stage: "launch",
      progress: 100,
      start_date: "2024-11-15",
      end_date: "2025-01-10",
      team: "Growth",
      priority: "critical",
      swimlane: "Conversion",
      is_experiment: true,
      experiment_status: "shipped",
      preview_image_url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=450&fit=crop",
    },
    {
      roadmap_id: roadmapId,
      title: "Social Proof Notifications",
      description: "Completed: Real-time signup notifications increased trust by 31%",
      stage: "launch",
      progress: 100,
      start_date: "2024-12-01",
      end_date: "2025-01-20",
      team: "Growth",
      priority: "high",
      swimlane: "Conversion",
      is_experiment: true,
      experiment_status: "shipped",
      preview_image_url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=450&fit=crop",
    },
  ];

  try {
    const { data: features, error: featuresError } = await supabase
      .from("features")
      .insert(sampleFeatures)
      .select();

    if (featuresError) throw featuresError;

    // Add experiment variants for experiments
    const experimentFeatures = features?.filter((f: any) => f.is_experiment) || [];

    for (const feature of experimentFeatures) {
      const isShipped = feature.experiment_status === "shipped";
      const isRunning = feature.experiment_status === "running";
      
      const variants = [
        {
          feature_id: feature.id,
          name: "Control (A)",
          description: "Original design baseline",
          conversion_rate: isShipped ? 12.4 : (isRunning ? 14.2 : null),
          engagement_rate: isShipped ? 45.2 : (isRunning ? 52.1 : null),
          user_count: isRunning || isShipped ? 5000 : 0,
        },
        {
          feature_id: feature.id,
          name: "Variant (B)",
          description: "Optimized design with bold CTA",
          conversion_rate: isShipped ? 15.3 : (isRunning ? 17.8 : null),
          engagement_rate: isShipped ? 58.7 : (isRunning ? 61.3 : null),
          user_count: isRunning || isShipped ? 5000 : 0,
        },
      ];

      if (isShipped) {
        variants.push({
          feature_id: feature.id,
          name: "Variant (C)",
          description: "Minimal design approach",
          conversion_rate: 11.8,
          engagement_rate: 43.5,
          user_count: 5000,
        });
      }

      const { data: createdVariants, error: variantsError } = await supabase
        .from("experiment_variants")
        .insert(variants)
        .select();

      if (variantsError) throw variantsError;

      // Set winning variant for shipped experiments
      if (isShipped && createdVariants && createdVariants.length > 0) {
        const winningVariant = createdVariants.reduce((max: any, v: any) => 
          v.conversion_rate > max.conversion_rate ? v : max
        );

        await supabase
          .from("features")
          .update({ winning_variant_id: winningVariant.id })
          .eq("id", feature.id);
      }
    }

    return { success: true, features };
  } catch (error) {
    console.error("Sample data error:", error);
    return { success: false, error };
  }
}
