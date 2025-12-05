import React from 'react';

export const ExampleButton = ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => (
  <button style={{ background: '#1976d2', color: '#fff', padding: '8px 16px', borderRadius: 4, border: 'none' }} onClick={onClick}>
    {children}
  </button>
);

// Example token
export const colors = {
  primary: '#1976d2',
  secondary: '#ff4081',
};
