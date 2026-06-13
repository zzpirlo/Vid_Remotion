import React from 'react';

export const SafeZone = ({ show = false }: { show?: boolean }) => {
  if (!show) return null;
  return (
    <div style={{
      position: 'absolute',
      top: 120,
      left: 0,
      right: 0,
      bottom: 120,
      border: '2px dashed rgba(255,255,255,0.2)',
      pointerEvents: 'none',
    }}>
    {/* Optional label */}
    <div style={{
      position: 'absolute',
      top: 10,
      left: 10,
      color: 'rgba(255,255,255,0.5)',
      fontSize: 14,
    }}>
      Safe Zone
    </div>
  </div>
);
