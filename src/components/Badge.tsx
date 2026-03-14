import React from 'react';
type BadgeVariant =
'excellent' |
'good' |
'at-risk' |
'normal' |
'flagged' |
'pending' |
'completed' |
'failed';
interface BadgeProps {
  label: string;
  variant: BadgeVariant;
}
export function Badge({ label, variant }: BadgeProps) {
  const styles: Record<BadgeVariant, string> = {
    excellent: 'bg-farm-100 text-farm-800 border-farm-200',
    good: 'bg-blue-100 text-blue-800 border-blue-200',
    'at-risk': 'bg-amber-100 text-amber-800 border-amber-200',
    normal: 'bg-gray-100 text-gray-800 border-gray-200',
    flagged: 'bg-red-100 text-red-800 border-red-200',
    pending: 'bg-amber-100 text-amber-800 border-amber-200',
    completed: 'bg-farm-100 text-farm-800 border-farm-200',
    failed: 'bg-red-100 text-red-800 border-red-200'
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[variant]}`}>
      
      {label}
    </span>);

}