import './App.css'
import { ProgressStep } from '@/types'
import { useFileProcessor } from '@hooks/useFileProcessor';
import { Toaster } from 'react-hot-toast';
import { CsvUploader } from '@components/uploader/csv-uploader';
import { ProgressBar } from '@components/progress-bar/progress-bar';
import { StatsSummary } from '@components/stats-summary/stats-summary';
import { AnalyticsChart } from '@components/analytics-chart/analytics-chart';

function App() {
  const { step, message, results, processFiles, reset } = useFileProcessor();

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Analytics App</h1>

      <Toaster position="top-right" /> 

      {step === ProgressStep.IDLE && (
        <CsvUploader onValidFiles={processFiles} />
      )}

      <ProgressBar message={message} />

      {step === ProgressStep.DONE && results && (
        <div>
          <StatsSummary stats={results.stats} />
          <AnalyticsChart data={results.chartData} />

          <button
            onClick={reset}
            className='reset-button'
          >
            Clear the data
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
