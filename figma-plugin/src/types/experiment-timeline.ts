/**
 * Experiment Timeline & Flow Type Definitions
 * 
 * Data structures for combined timeline + flow visualizations
 */

export type ExperimentPhase = 'setup' | 'baseline' | 'running' | 'analyzing' | 'concluded';
export type VariantType = 'control' | 'treatment' | 'winner';
export type FlowNodeType = 'variant' | 'funnel-step' | 'decision' | 'outcome';

export interface ExperimentVariant {
  id: string;
  name: string;
  label: string;
  type: VariantType;
  trafficSplit: number; // 0-100 percentage
  isWinner?: boolean;
  metrics?: {
    primaryMetric: string;
    value: number;
    delta?: number; // percentage change vs control
    significance?: number; // p-value or confidence level
  };
}

export interface ExperimentPhaseData {
  phase: ExperimentPhase;
  label: string;
  startDate: Date;
  endDate: Date;
  description?: string;
}

export interface FlowConnection {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  label?: string;
  trafficPercentage?: number;
  colorToken?: 'control' | 'variantA' | 'variant' | 'winner' | 'default';
}

export interface FlowNode {
  id: string;
  type: FlowNodeType;
  label: string;
  variant?: ExperimentVariant;
  position: {
    x: number; // Position along timeline (0-100%)
    y: number; // Lane index (0, 1, 2...)
  };
  metrics?: {
    label: string;
    value: string | number;
  }[];
}

export interface ExperimentTimelineData {
  id: string;
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  phases: ExperimentPhaseData[];
  variants: ExperimentVariant[];
  nodes: FlowNode[];
  connections: FlowConnection[];
  hypothesis?: string;
  currentPhase?: ExperimentPhase;
}

/**
 * Mock data generator for examples
 */
export function createMockExperiment(
  type: 'simple' | 'variants' | 'decision-tree' = 'simple'
): ExperimentTimelineData {
  const baseDate = new Date('2025-10-01');
  const addDays = (date: Date, days: number) => 
    new Date(date.getTime() + days * 24 * 60 * 60 * 1000);

  if (type === 'simple') {
    return {
      id: 'exp-001',
      name: 'Homepage CTA Button Test',
      description: 'Testing color impact on conversion',
      startDate: baseDate,
      endDate: addDays(baseDate, 30),
      currentPhase: 'analyzing',
      hypothesis: 'Green CTA will increase conversions by 15%',
      phases: [
        {
          phase: 'setup',
          label: 'Setup',
          startDate: baseDate,
          endDate: addDays(baseDate, 3),
        },
        {
          phase: 'baseline',
          label: 'Baseline',
          startDate: addDays(baseDate, 3),
          endDate: addDays(baseDate, 10),
        },
        {
          phase: 'running',
          label: 'Running',
          startDate: addDays(baseDate, 10),
          endDate: addDays(baseDate, 24),
        },
        {
          phase: 'analyzing',
          label: 'Analyzing',
          startDate: addDays(baseDate, 24),
          endDate: addDays(baseDate, 30),
        },
      ],
      variants: [
        {
          id: 'var-control',
          name: 'Control',
          label: 'Blue Button (Control)',
          type: 'control',
          trafficSplit: 50,
        },
        {
          id: 'var-treatment',
          name: 'Treatment',
          label: 'Green Button',
          type: 'treatment',
          trafficSplit: 50,
          isWinner: true,
          metrics: {
            primaryMetric: 'CTR',
            value: 8.2,
            delta: 23,
            significance: 0.95,
          },
        },
      ],
      nodes: [
        {
          id: 'node-control',
          type: 'variant',
          label: 'Control',
          position: { x: 20, y: 0 },
          variant: {
            id: 'var-control',
            name: 'Control',
            label: 'Blue Button',
            type: 'control',
            trafficSplit: 50,
          },
        },
        {
          id: 'node-treatment',
          type: 'variant',
          label: 'Treatment',
          position: { x: 50, y: 1 },
          variant: {
            id: 'var-treatment',
            name: 'Treatment',
            label: 'Green Button',
            type: 'treatment',
            trafficSplit: 50,
            isWinner: true,
          },
        },
        {
          id: 'node-launched',
          type: 'outcome',
          label: 'Launched',
          position: { x: 80, y: 1 },
          metrics: [
            { label: 'Impact', value: '+23% CTR' },
            { label: 'Confidence', value: '95%' },
          ],
        },
      ],
      connections: [
        {
          id: 'conn-1',
          fromNodeId: 'node-control',
          toNodeId: 'node-treatment',
          colorToken: 'control',
        },
        {
          id: 'conn-2',
          fromNodeId: 'node-treatment',
          toNodeId: 'node-launched',
          colorToken: 'winner',
        },
      ],
    };
  }

  if (type === 'variants') {
    return {
      id: 'exp-002',
      name: 'Pricing Page Multi-Variant Test',
      description: 'Testing 3 pricing structures',
      startDate: baseDate,
      endDate: addDays(baseDate, 45),
      currentPhase: 'running',
      hypothesis: 'Annual billing discount will increase conversions',
      phases: [
        {
          phase: 'setup',
          label: 'Setup',
          startDate: baseDate,
          endDate: addDays(baseDate, 5),
        },
        {
          phase: 'baseline',
          label: 'Baseline',
          startDate: addDays(baseDate, 5),
          endDate: addDays(baseDate, 15),
        },
        {
          phase: 'running',
          label: 'Running',
          startDate: addDays(baseDate, 15),
          endDate: addDays(baseDate, 40),
        },
        {
          phase: 'analyzing',
          label: 'Analyzing',
          startDate: addDays(baseDate, 40),
          endDate: addDays(baseDate, 45),
        },
      ],
      variants: [
        {
          id: 'var-control',
          name: 'Control',
          label: 'Monthly Only',
          type: 'control',
          trafficSplit: 34,
        },
        {
          id: 'var-a',
          name: 'Variant A',
          label: '15% Annual Discount',
          type: 'treatment',
          trafficSplit: 33,
        },
        {
          id: 'var-b',
          name: 'Variant B',
          label: '25% Annual Discount',
          type: 'treatment',
          trafficSplit: 33,
          isWinner: true,
          metrics: {
            primaryMetric: 'ARPU',
            value: 127,
            delta: 42,
            significance: 0.99,
          },
        },
      ],
      nodes: [
        {
          id: 'node-control',
          type: 'variant',
          label: 'Control',
          position: { x: 15, y: 0 },
        },
        {
          id: 'node-var-a',
          type: 'variant',
          label: 'Variant A',
          position: { x: 45, y: 1 },
        },
        {
          id: 'node-var-b',
          type: 'variant',
          label: 'Variant B',
          position: { x: 45, y: 2 },
        },
        {
          id: 'node-launched',
          type: 'outcome',
          label: 'Launched',
          position: { x: 80, y: 2 },
          metrics: [
            { label: 'Impact', value: '+42% ARPU' },
          ],
        },
      ],
      connections: [
        {
          id: 'conn-1',
          fromNodeId: 'node-control',
          toNodeId: 'node-var-a',
          trafficPercentage: 33,
          colorToken: 'variantA',
        },
        {
          id: 'conn-2',
          fromNodeId: 'node-control',
          toNodeId: 'node-var-b',
          trafficPercentage: 33,
          colorToken: 'variant',
        },
        {
          id: 'conn-3',
          fromNodeId: 'node-var-b',
          toNodeId: 'node-launched',
          colorToken: 'winner',
        },
      ],
    };
  }

  // Decision tree
  return {
    id: 'exp-003',
    name: 'Onboarding Flow Decision Tree',
    description: 'Testing personalized onboarding paths',
    startDate: baseDate,
    endDate: addDays(baseDate, 60),
    currentPhase: 'running',
    hypothesis: 'Personalized flows increase activation by 30%',
    phases: [
      {
        phase: 'setup',
        label: 'Setup',
        startDate: baseDate,
        endDate: addDays(baseDate, 7),
      },
      {
        phase: 'running',
        label: 'Running',
        startDate: addDays(baseDate, 7),
        endDate: addDays(baseDate, 52),
      },
      {
        phase: 'analyzing',
        label: 'Analyzing',
        startDate: addDays(baseDate, 52),
        endDate: addDays(baseDate, 60),
      },
    ],
    variants: [
      {
        id: 'var-control',
        name: 'Control',
        label: 'Generic Flow',
        type: 'control',
        trafficSplit: 50,
      },
      {
        id: 'var-personalized',
        name: 'Treatment',
        label: 'Personalized Paths',
        type: 'treatment',
        trafficSplit: 50,
        isWinner: true,
        metrics: {
          primaryMetric: 'Activation',
          value: 68,
          delta: 35,
          significance: 0.99,
        },
      },
    ],
    nodes: [
      {
        id: 'node-entry',
        type: 'funnel-step',
        label: 'Signup',
        position: { x: 10, y: 1 },
      },
      {
        id: 'node-decision',
        type: 'decision',
        label: 'User Type?',
        position: { x: 30, y: 1 },
      },
      {
        id: 'node-generic',
        type: 'variant',
        label: 'Generic Flow',
        position: { x: 50, y: 0 },
      },
      {
        id: 'node-developer',
        type: 'variant',
        label: 'Developer Path',
        position: { x: 50, y: 1.5 },
      },
      {
        id: 'node-business',
        type: 'variant',
        label: 'Business Path',
        position: { x: 50, y: 2.5 },
      },
      {
        id: 'node-launched',
        type: 'outcome',
        label: 'Launched',
        position: { x: 80, y: 2 },
        metrics: [
          { label: 'Rate', value: '68%' },
          { label: 'vs Control', value: '+35%' },
        ],
      },
    ],
    connections: [
      {
        id: 'conn-1',
        fromNodeId: 'node-entry',
        toNodeId: 'node-decision',
        colorToken: 'default',
      },
      {
        id: 'conn-2',
        fromNodeId: 'node-decision',
        toNodeId: 'node-generic',
        label: '50% Control',
        trafficPercentage: 50,
        colorToken: 'control',
      },
      {
        id: 'conn-3',
        fromNodeId: 'node-decision',
        toNodeId: 'node-developer',
        label: '25% Dev',
        trafficPercentage: 25,
        colorToken: 'variantA',
      },
      {
        id: 'conn-4',
        fromNodeId: 'node-decision',
        toNodeId: 'node-business',
        label: '25% Biz',
        trafficPercentage: 25,
        colorToken: 'variant',
      },
      {
        id: 'conn-5',
        fromNodeId: 'node-developer',
        toNodeId: 'node-launched',
        colorToken: 'winner',
      },
      {
        id: 'conn-6',
        fromNodeId: 'node-business',
        toNodeId: 'node-launched',
        colorToken: 'winner',
      },
    ],
  };
}
