
import './tailwind.css';
import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
// Simple test component
const HelloWorld = ({ onClick }: { onClick?: () => void }) => (
  <button
    style={{ padding: '12px 24px', background: '#007bff', color: '#fff', borderRadius: '6px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
    onClick={onClick}
  >
    Hello World Button
  </button>
);


const App = () => {
  useEffect(() => {
    console.log('App mounted');
    const rootDiv = document.getElementById('root');
    if (rootDiv) {
      console.log('Found #root element:', rootDiv);
    } else {
      console.error('Could not find #root element');
    }
  }, []);

  return (
    <>
      <div style={{position: 'absolute', top: 0, left: 0, width: '100%', background: '#ffeeba', color: '#856404', padding: '8px', textAlign: 'center', zIndex: 9999}}>
        React UI loaded (fallback message)
      </div>
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
          <HelloWorld
            onClick={() => {
              console.log('HelloWorld button clicked');
            }}
          />
          {/* More action buttons will be added here */}
        </div>
      </div>
    </>
  );
};


const rootDiv = document.getElementById('root');
if (rootDiv) {
  console.log('Rendering App into #root');
  const root = createRoot(rootDiv);
  root.render(<App />);
} else {
  console.error('Failed to find #root for rendering');
}
