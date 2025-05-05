import { ChangeEvent, useState } from 'react';
import { Upload } from 'lucide-react';

interface DataUploaderProps {
  onDataUpload: (data: Record<string, any>[], headers: string[]) => void;
}

const DataUploader = ({ onDataUpload }: DataUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processCSVFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type === 'text/csv') {
      processCSVFile(file);
    }
  };

  const processCSVFile = (file: File) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const csvText = event.target?.result as string;
      const { data, headers } = parseCSV(csvText);
      onDataUpload(data, headers);
    };
    
    reader.readAsText(file);
  };

  const parseCSV = (text: string): { data: Record<string, any>[], headers: string[] } => {
    const lines = text.trim().split('\n');
    
    if (lines.length === 0) {
      return { data: [], headers: [] };
    }
    
    // Parse headers (first line)
    const headers = lines[0].split(',').map(header => header.trim());
    
    // Parse data rows
    const data = lines.slice(1).map(line => {
      const values = line.split(',').map(value => value.trim());
      const row: Record<string, any> = {};
      
      headers.forEach((header, index) => {
        // Try to convert to number if possible
        const value = values[index] || '';
        const numValue = Number(value);
        row[header] = isNaN(numValue) ? value : numValue;
      });
      
      return row;
    });
    
    return { data, headers };
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
        isDragging 
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
          : 'border-gray-300 dark:border-gray-700'
      }`}
    >
      <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600 mb-4" />
      <h3 className="text-lg font-medium mb-2">Upload CSV File</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Drag and drop your CSV file here, or click to select
      </p>
      <input
        type="file"
        accept=".csv"
        id="file-upload"
        className="hidden"
        onChange={handleFileChange}
      />
      <label
        htmlFor="file-upload"
        className="btn btn-primary cursor-pointer"
      >
        Select File
      </label>
    </div>
  );
};

export default DataUploader;