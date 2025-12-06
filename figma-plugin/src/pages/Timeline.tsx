import { GanttTimeline } from "@/components/GanttTimeline";
import { Swimlane, Feature } from "@/types/roadmap";
import { FeatureDetailsPanel } from "@/components/FeatureDetailsPanel";
import { useState } from "react";

const swimlanes: Swimlane[] = [
  {
    id: "mobile",
    name: "Mobile App Experience",
    features: [
      {
        id: "m1",
        title: "User Authentication",
        description: "Secure login and signup flow with biometric support and social auth integration",
        stage: "launch",
        progress: 95,
        startDate: new Date(2024, 0, 1),
        endDate: new Date(2024, 1, 15),
        team: "Mobile",
        priority: "critical",
      },
      {
        id: "m2",
        title: "Onboarding Flow",
        description: "Interactive tutorial and feature discovery for new users with personalized paths",
        stage: "testing",
        progress: 75,
        startDate: new Date(2024, 1, 1),
        endDate: new Date(2024, 2, 30),
        team: "Mobile",
        priority: "high",
        dependencies: ["m1"],
        isExperiment: true,
        experimentStatus: "running",
        variants: [
          {
            id: "v1",
            name: "Variant A",
            description: "Step-by-step tutorial",
            metrics: {
              conversion: 45,
              engagement: 67,
              users: 5000,
            },
          },
          {
            id: "v2",
            name: "Variant B",
            description: "Interactive exploration",
            metrics: {
              conversion: 58,
              engagement: 82,
              users: 5000,
            },
          },
        ],
        winningVariant: "v2",
      },
      {
        id: "m3",
        title: "Push Notifications",
        description: "Real-time notifications with customizable preferences and smart delivery",
        stage: "development",
        progress: 45,
        startDate: new Date(2024, 2, 1),
        endDate: new Date(2024, 3, 15),
        team: "Mobile",
        priority: "medium",
      },
      {
        id: "m4",
        title: "Offline Mode",
        description: "Enable core functionality without internet connection with smart sync",
        stage: "design",
        progress: 20,
        startDate: new Date(2024, 3, 1),
        endDate: new Date(2024, 5, 30),
        team: "Mobile",
        priority: "high",
      },
    ],
  },
  {
    id: "web",
    name: "Web Platform",
    features: [
      {
        id: "w1",
        title: "Dashboard Redesign",
        description: "Modern, data-rich dashboard with customizable widgets and real-time updates",
        stage: "development",
        progress: 60,
        startDate: new Date(2024, 0, 15),
        endDate: new Date(2024, 2, 1),
        team: "Design",
        priority: "high",
        isExperiment: true,
        experimentStatus: "running",
        variants: [
          {
            id: "v1",
            name: "Variant A",
            description: "Card-based layout",
            metrics: {
              conversion: 38,
              engagement: 55,
            },
          },
          {
            id: "v2",
            name: "Variant B",
            description: "List-based layout",
            metrics: {
              conversion: 42,
              engagement: 61,
            },
          },
          {
            id: "v3",
            name: "Variant C",
            description: "Hybrid layout",
            metrics: {
              conversion: 51,
              engagement: 73,
            },
          },
        ],
        winningVariant: "v3",
      },
      {
        id: "w2",
        title: "Advanced Analytics",
        description: "Real-time metrics, custom reports, and interactive data visualization tools",
        stage: "design",
        progress: 30,
        startDate: new Date(2024, 2, 1),
        endDate: new Date(2024, 4, 15),
        team: "Data",
        priority: "medium",
        dependencies: ["w1"],
      },
      {
        id: "w3",
        title: "Collaboration Tools",
        description: "Team comments, shared workspaces, and version control for seamless teamwork",
        stage: "planning",
        progress: 10,
        startDate: new Date(2024, 4, 1),
        endDate: new Date(2024, 6, 30),
        team: "Product",
        priority: "medium",
      },
    ],
  },
  {
    id: "api",
    name: "API & Infrastructure",
    features: [
      {
        id: "a1",
        title: "GraphQL API v2",
        description: "Enhanced API with improved performance, new endpoints, and better documentation",
        stage: "testing",
        progress: 80,
        startDate: new Date(2024, 0, 1),
        endDate: new Date(2024, 2, 15),
        team: "Backend",
        priority: "critical",
      },
      {
        id: "a2",
        title: "Webhook System",
        description: "Event-driven webhooks for third-party integrations with retry logic",
        stage: "development",
        progress: 50,
        startDate: new Date(2024, 1, 15),
        endDate: new Date(2024, 3, 30),
        team: "Backend",
        priority: "high",
      },
      {
        id: "a3",
        title: "Rate Limiting",
        description: "Smart rate limiting with tiered access levels and usage analytics",
        stage: "planning",
        progress: 5,
        startDate: new Date(2024, 3, 1),
        endDate: new Date(2024, 4, 15),
        team: "Backend",
        priority: "low",
      },
    ],
  },
];

const Timeline = () => {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleFeatureClick = (feature: Feature) => {
    setSelectedFeature(feature);
    setIsPanelOpen(true);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Visual Roadmap</h1>
        <p className="text-muted-foreground">
          Interactive Gantt-style timeline showing feature development across teams
        </p>
      </div>

      <GanttTimeline swimlanes={swimlanes} onFeatureClick={handleFeatureClick} />

      <FeatureDetailsPanel
        feature={selectedFeature}
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
      />
    </div>
  );
};

export default Timeline;
