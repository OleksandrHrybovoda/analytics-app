import type { Statistics } from '@/types';
import styles from './stats-summary.module.css';

interface StatsSummaryProps {
  stats: Statistics;
}

const format = (value: number) => (Number.isFinite(value) ? value.toFixed(2) : '—');

export function StatsSummary({ stats }: StatsSummaryProps) {
  return (
    <div className={styles.container}>
      <StatItem label="Mean" value={stats.mean} />
      <StatItem label="Median" value={stats.median} />
      <StatItem label="Min" value={stats.min} />
      <StatItem label="Max" value={stats.max} />
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: number }) {
  return (
    <div className={styles.card}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{format(value)}</div>
    </div>
  );
}