import React from 'react';
import { PROVENANCE_TYPES } from '../data/payerData';

/**
 * Reusable Provenance Badge indicating whether a data point is:
 * - Statutory HTA Guideline (Blue)
 * - Peer-Reviewed Clinical Evidence (Green)
 * - Derived Epidemiology Estimate (Amber)
 * - Calibrated Simulation Output (Purple)
 */
export default function ProvenanceBadge({ type = 'STATUTORY', customLabel, size = 'sm', showDot = true, className = '' }) {
  const meta = PROVENANCE_TYPES[type] || PROVENANCE_TYPES.STATUTORY;
  const label = customLabel || meta.label;

  const sizeClasses = {
    xs: 'text-[10px] px-1.5 py-0.5 font-medium',
    sm: 'text-xs px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-medium'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border select-none ${meta.badgeColor} ${sizeClasses[size] || sizeClasses.sm} ${className}`}
      title={`${meta.label}: ${meta.description}`}
    >
      {showDot && (
        <span className={`w-1.5 h-1.5 rounded-full ${meta.dotColor} flex-shrink-0`} />
      )}
      <span className="truncate">{label}</span>
    </span>
  );
}
