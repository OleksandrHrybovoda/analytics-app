import type { UploadResponse } from "@/types";

const API_URL = import.meta.env.VITE_API_URL;

export const uploadCsvFiles = async (files: File[]): Promise<UploadResponse> => {
  const formData = new FormData();
  files.forEach(file => formData.append('files', file));

  const response = await fetch(`${API_URL}/api/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || `Server Error: ${response.status}`);
  }

  return await response.json();
};