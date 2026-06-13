import React from 'react';

export const CenteredContainer = ({ children, style }: { children?: React.ReactNode; style?: React.CSSProperties }) => (
  <div style={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    ...style,
  }}>
    {children}
  </div>
);
