import styles from './progress-bar.module.css';

interface ProgressBarProps {
  message: string;
}

export function ProgressBar({ message }: ProgressBarProps) {
  if (!message) return null;

  return (
    <div className={styles.container}>
      {message}
    </div>
  );
}