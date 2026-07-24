// src/components/ui/ClassBadge.jsx
import { CLASS_LEVELS } from '../../context/DataContext';

export default function ClassBadge({ value, size = 'md' }) {
  const info = CLASS_LEVELS.find(c => c.value === value) ?? CLASS_LEVELS[0];
  const fontSize = size === 'sm' ? '.68rem' : size === 'lg' ? '.9rem' : '.75rem';
  const padding  = size === 'sm' ? '.15rem .55rem' : size === 'lg' ? '.4rem 1rem' : '.25rem .75rem';

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding, borderRadius: '999px', fontSize, fontWeight: 700,
      color: info.color, background: info.bg, border: `1px solid ${info.border}`,
      whiteSpace: 'nowrap', lineHeight: 1.4,
    }}>
      {info.label}
    </span>
  );
}
