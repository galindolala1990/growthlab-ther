import { VisualExperimentData } from "@/components/ExperimentFlowMap";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/**
 * Mock Visual Experiment Data
 * These represent real experiment scenarios with visual UI treatments
 */

// Sample UI treatment components - Growth-optimized minimal versions
export const CTAButtonTreatments = {
  control: (
    <Button variant="primary" size="sm" className="text-xs px-3 py-1.5">
      Sign Up Free
    </Button>
  ),
  variantB: (
    <Button className="bg-success hover:bg-success/90 text-success-foreground text-xs px-3 py-1.5" size="sm">
      Try It Free →
    </Button>
  ),
  variantC: (
    <Button className="bg-primary hover:bg-primary-hover text-primary-foreground shadow-md text-xs px-3 py-1.5" size="sm">
      Get Started Now
    </Button>
  ),
};

export const PricingCardTreatments = {
  control: (
    <div className="flex flex-col gap-1.5 p-2 bg-bg-surface border border-border rounded text-2xs">
      <div className="font-bold text-text">$29<span className="text-text-muted">/mo</span></div>
      <div className="text-text-muted">Pro Plan</div>
    </div>
  ),
  variantB: (
    <div className="flex flex-col gap-1.5 p-2 bg-primary/5 border border-primary/30 rounded text-2xs">
      <Badge className="bg-primary text-primary-foreground w-fit text-3xs px-1 py-0">Popular</Badge>
      <div className="font-bold text-primary">$29<span className="text-text-muted line-through text-3xs ml-1">$39</span></div>
      <div className="text-text">Pro Plan</div>
    </div>
  ),
};

// Example 1: A/B Test - Simple CTA Button Color Test
export const ctaButtonExperiment: VisualExperimentData = {
  id: "exp-cta-001",
  name: "Homepage CTA Button Optimization",
  description: "Testing button color and copy to increase conversion rate",
  winnerId: "variant-b",
  variants: [
    {
      id: "control",
      name: "Control (Blue Button)",
      variantLabel: "Control A",
      isControl: true,
      thumbnailContent: CTAButtonTreatments.control,
      trafficSplit: 50,
      primaryMetric: {
        label: "Conversion Rate",
        value: 3.2,
        delta: 0,
      },
      annotations: [
        "Standard blue button",
        "Generic copy: 'Sign Up Free'",
      ],
    },
    {
      id: "variant-b",
      name: "Variant B",
      variantLabel: "Variant B",
      isWinner: true,
      thumbnailContent: CTAButtonTreatments.variantB,
      trafficSplit: 50,
      primaryMetric: {
        label: "CTR",
        value: 4.1,
        delta: 28,
      },
      secondaryMetrics: [
        { label: "Conversion Rate", value: 4.8, delta: 50 },
        { label: "Bounce Rate", value: 32.5, delta: -15 },
        { label: "Time on Page", value: 142, delta: 22 },
      ],
      annotations: [
        "Green CTA with urgency messaging.",
        "Arrow icon increases click intent by creating directional flow.",
        "Success color psychology drives action-oriented behavior.",
      ],
      statusChip: "p < 0.01",
    },
  ],
  launchedVariantId: "variant-b",  // Use winner as launched
};

// Example 2: A/B/C Test - Pricing Card (Growth-Optimized)
export const pricingCardExperiment: VisualExperimentData = {
  id: "exp-pricing-002",
  name: "Pricing Card Design Test",
  description: "Testing visual emphasis and social proof for plan selection",
  winnerId: "variant-b",
  variants: [
    {
      id: "control",
      name: "Control",
      variantLabel: "Control A",
      isControl: true,
      thumbnailContent: PricingCardTreatments.control,
      trafficSplit: 34,
      primaryMetric: {
        label: "Selection",
        value: 12.5,
        delta: 0,
      },
      annotations: ["Minimal design"],
    },
    {
      id: "variant-b",
      name: "Variant B",
      variantLabel: "Variant B",
      isWinner: true,
      thumbnailContent: PricingCardTreatments.variantB,
      trafficSplit: 33,
      primaryMetric: {
        label: "Selection",
        value: 18.2,
        delta: 46,
      },
      annotations: ["Popular badge + strikethrough"],
      statusChip: "p < 0.001",
    },
    {
      id: "variant-c",
      name: "Variant C",
      variantLabel: "Variant C",
      thumbnailContent: PricingCardTreatments.variantB,
      trafficSplit: 33,
      primaryMetric: {
        label: "Selection",
        value: 15.8,
        delta: 26,
      },
      annotations: ["Animated hover"],
      statusChip: "Not sig.",
    },
  ],
  launchedVariantId: "variant-b",  // Use winner as launched
};

// Example 3: Image-based - Onboarding Flow (Growth-Optimized)
export const onboardingFlowExperiment: VisualExperimentData = {
  id: "exp-onboarding-003",
  name: "Onboarding Flow Redesign",
  description: "Testing step-by-step vs single-page completion",
  winnerId: "variant-b",
  variants: [
    {
      id: "control",
      name: "Control",
      variantLabel: "Control A",
      isControl: true,
      thumbnailUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=250&fit=crop",
      trafficSplit: 50,
      primaryMetric: {
        label: "Completion",
        value: 45.2,
        delta: 0,
      },
      annotations: ["5-step wizard"],
    },
    {
      id: "variant-b",
      name: "Variant B",
      variantLabel: "Variant B",
      isWinner: true,
      thumbnailUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
      trafficSplit: 50,
      primaryMetric: {
        label: "Completion",
        value: 58.7,
        delta: 30,
      },
      annotations: ["Single page form"],
      statusChip: "p < 0.01",
    },
  ],
  launchedVariantId: "variant-b",  // Use winner as launched
};

// Example 4: Non-Visual Backend Experiment (Algorithm Test)
export const recommendationAlgorithmExperiment: VisualExperimentData = {
  id: "exp-algo-001",
  name: "Recommendation Algorithm Optimization",
  description: "Testing collaborative filtering vs content-based recommendations",
  winnerId: "variant-b",
  variants: [
    {
      id: "control-a",
      name: "Control A",
      variantLabel: "Control",
      isControl: true,
      showThumbnail: false, // Non-visual experiment
      trafficSplit: 50,
      primaryMetric: {
        label: "Click Rate",
        value: 12.3,
        delta: 0,
      },
      secondaryMetrics: [
        { label: "Engagement", value: 45.2, delta: 0 },
        { label: "Session Duration", value: 3.2, delta: 0 },
      ],
      annotations: ["Collaborative filtering algorithm", "Based on user similarity patterns"],
    },
    {
      id: "variant-b",
      name: "Variant B",
      variantLabel: "Variant B",
      isWinner: true,
      showThumbnail: false, // Non-visual experiment
      trafficSplit: 50,
      primaryMetric: {
        label: "Click Rate",
        value: 16.8,
        delta: 37,
      },
      secondaryMetrics: [
        { label: "Engagement", value: 52.4, delta: 16 },
        { label: "Session Duration", value: 3.9, delta: 22 },
      ],
      annotations: ["Hybrid algorithm with boosted diversity", "Content + collaborative signals"],
      statusChip: "p < 0.001",
    },
  ],
  launchedVariantId: "variant-b",
};

// Export all experiments for easy access
export const mockVisualExperiments = {
  ctaButton: ctaButtonExperiment,
  pricingCard: pricingCardExperiment,
  onboardingFlow: onboardingFlowExperiment,
  recommendationAlgorithm: recommendationAlgorithmExperiment,
};
