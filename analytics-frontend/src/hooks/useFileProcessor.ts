import { useState } from 'react';
import { sleep } from '@utils/delay';
import { ProgressStep, type ProgressStepType, type UploadResponse } from '@/types';
import { uploadCsvFiles } from '@api/upload-service';
import toast from 'react-hot-toast';

export const useFileProcessor = () => {
  const [step, setStep] = useState<ProgressStepType>(ProgressStep.IDLE);
  const [message, setMessage] = useState<string>('');
  const [results, setResults] = useState<UploadResponse | null>(null);

  const processFiles = async (files: File[]) => {
    setResults(null);

    setStep(ProgressStep.PROCESSING);
    setMessage('Processing file...');
    await sleep(1000);

    setStep(ProgressStep.CALCULATING);
    setMessage('Calculating statistics / generating chart...');

    const [serverData, fetchError] = await Promise.all([
      uploadCsvFiles(files),
      sleep(1000)
    ])
      .then(res => [res[0], null])
      .catch(err => [null, err]);

    if (fetchError) {
      toast.error(fetchError.message);
      setStep(ProgressStep.IDLE);
      setMessage('');
      return;
    }

    setStep(ProgressStep.RENDERING);
    setMessage('Rendering results...');
    await sleep(1000);

    setResults(serverData);
    setStep(ProgressStep.DONE);
    setMessage('');
    toast.success('File successfully analyzed');
  };

  const reset = () => {
    setStep(ProgressStep.IDLE);
    setResults(null);
  };

  return {
    step,
    message,
    results,
    processFiles,
    reset,
  };
};