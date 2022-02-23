import React from 'react';
import './badge.css';

export const Badge = ({ displayText, isSelected }) => (
  <div className={`badge-container ${isSelected ? 'selected-badge' : ''}`}>
    {displayText}
  </div>
);