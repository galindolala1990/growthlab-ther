import './tailwind.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ExampleButton } from './design-system';

const App = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main content area (future: flow preview) */}
      <div className="flex-1 p-8">
        <h2 className="text-blue-700 text-2xl font-bold mb-4">Experiment Flow Visualizer</h2>
        <p className="text-gray-600 mb-8">Build and visualize A/B and multi-step experiments as Figma diagrams.</p>
        {/* Placeholder for flow preview */}
        <div className="border border-dashed border-gray-300 rounded-lg h-64 flex items-center justify-center text-gray-400">
          Flow preview will appear here
        </div>
      </div>
      {/* Sidebar actions panel */}
      <div className="w-80 bg-white border-l border-gray-200 p-6 flex flex-col gap-4 shadow-lg">
        <h3 className="text-lg font-semibold mb-2">Actions</h3>
        <ExampleButton
          onClick={() => parent.postMessage({ pluginMessage: { type: 'create-experiment-skeleton' } }, '*')}
        >
          Create Experiment Skeleton
        </ExampleButton>
        {/* More action buttons will be added here */}
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
