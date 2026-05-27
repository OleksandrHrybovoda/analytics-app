import { validateCsvHeaders } from '@utils/csv-validator';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import styles from './csv-uploader.module.css';

interface CsvUploaderProps {
  onValidFiles: (files: File[]) => void;
}

export function CsvUploader({ onValidFiles }: CsvUploaderProps) {

  const onDropFiles = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    validateCsvHeaders(acceptedFiles[0])
      .then(() => {
        onValidFiles(acceptedFiles);
      })
      .catch((err: Error) => {
        toast.error(err.message);
      });
  }, [onValidFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropFiles,
    accept: { 'text/csv': ['.csv'] },
    multiple: true,
  });

  return (
    <div 
      {...getRootProps()} 
      className={`${styles.dropzone} ${isDragActive ? styles.dropzoneActive : ''}`}
    >
      <input {...getInputProps()} />
      <p className={styles.text}>
        Drag the CSV files here (required columns: result and test_id/index)
      </p>
    </div>
  );
};