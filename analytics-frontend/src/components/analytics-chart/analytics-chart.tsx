import type { ChartData } from '@/types';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import { useMemo } from 'react';


interface ResultsChartProps {
  data: ChartData;
}

export function AnalyticsChart({ data }: ResultsChartProps) {
  
  const option = useMemo<EChartsOption>(
    () => ({
      tooltip: { trigger: 'axis' },
      grid: { left: 48, right: 16, top: 16, bottom: 64 },
      xAxis: {
        type: 'category',
        data: data.identifiers,
        name: 'identifier',
      },
      yAxis: {
        type: 'value',
        name: 'result',
      },
      dataZoom: [
        { type: 'inside' },
        { type: 'slider' },
      ],
      series: [
        {
          type: 'line',
          data: data.results,
          showSymbol: false,
          sampling: 'lttb',
          lineStyle: { width: 1 },
        },
      ],
    }),
    [data],
  );


  if (!data || data.results.length === 0) return null;

  return (
    <ReactECharts
      option={option}
      style={{ height: 500 }}
      notMerge
      opts={{ renderer: 'canvas' }}
    />
  );
}