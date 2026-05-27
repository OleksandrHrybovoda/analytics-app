export const validateCsvHeaders = async (file: File): Promise<void> => {
  return new Promise((resolve, reject) => {
    const blobChunk = file.slice(0, 1024 * 10);
    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target?.result as string;
      
      if (!text) {
        return reject(new Error('The file is empty or could not be read.'));
      }

      const [firstLine] = text.split('\n');
      const headers = firstLine.split(',').map(h => h.replaceAll('"', '').trim().toLowerCase());

      if (!headers.includes('result')) {
        return reject(new Error('Required column missing: "result"'));
      }
      
      if (!headers.includes('test_id') && !headers.includes('index')) {
        return reject(new Error('There must be a "test_id" or "index" column'));
      }

      resolve();
    };

    reader.onerror = () => reject(new Error('There must be a "test_id" or "index" column'));
    reader.readAsText(blobChunk);
  });
};