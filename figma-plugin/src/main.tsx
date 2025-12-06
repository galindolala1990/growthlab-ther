import React from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
  console.log('React Minimal Test executed');
  return (
    <div style={{ background: 'lime', color: 'black', padding: '16px', fontSize: '24px' }}>
      React Minimal Test
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
