export interface Statistics {
  mean: number;
  median: number;
  min: number;
  max: number;
}

export interface ChartData {
  identifiers: string[];
  results: number[];
}

export interface UploadResponse {
  stats: Statistics;
  chartData: ChartData;
}

export const ProgressStep = {
  IDLE: 'idle',
  PROCESSING: 'processing',
  CALCULATING: 'calculating',
  RENDERING: 'rendering',
  DONE: 'done',
} as const;

export type ProgressStepType = typeof ProgressStep[keyof typeof ProgressStep];
