import { useState, useRef } from "react";
import { Upload, FileText, X } from "lucide-react";
import { Button } from "./ui/button";

interface PdfUploaderProps {
  onTextExtracted: (text: string) => void;
  label: string;
  placeholder?: string;
}

export function PdfUploader({ onTextExtracted, label, placeholder }: PdfUploaderProps) {
  const [fileName, setFileName] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    if (file.type !== "application/pdf") {
      alert("Por favor, selecione apenas arquivos PDF.");
      return;
    }

    setFileName(file.name);

    // Use FileReader to read the PDF as text
    // Note: This is a simplified approach. For better PDF parsing, use a library like pdf-parse
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result as string;
      // For now, we'll just use a placeholder text extraction
      // In a real application, you'd use a PDF parsing library
      onTextExtracted(`[Conteúdo extraído de ${file.name}]\n\nTexto do PDF será processado aqui...`);
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleClearFile = () => {
    setFileName("");
    onTextExtracted("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full">
      <label className="block mb-3" style={{ color: '#2D6073' }}>
        {label}
      </label>
      
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border-2 border-dashed rounded-xl p-8 transition-all ${
          isDragging ? 'border-primary scale-105' : ''
        }`}
        style={{
          borderColor: isDragging ? '#2D6073' : '#65B8A6',
          backgroundColor: isDragging ? '#F0F7DA' : '#ffffff'
        }}
      >
        {!fileName ? (
          <div className="flex flex-col items-center gap-4">
            <Upload 
              className="w-12 h-12" 
              style={{ color: '#65B8A6' }}
            />
            <div className="text-center">
              <p style={{ color: '#2D6073' }}>
                {placeholder || "Arraste seu PDF aqui ou clique para selecionar"}
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileInputChange}
              className="hidden"
              id={`pdf-upload-${label}`}
            />
            <Button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              style={{
                backgroundColor: '#2D6073',
                color: '#F0F7DA'
              }}
            >
              Selecionar PDF
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8" style={{ color: '#65B8A6' }} />
              <span style={{ color: '#2D6073' }}>{fileName}</span>
            </div>
            <Button
              type="button"
              variant="ghost"
              onClick={handleClearFile}
              className="hover:bg-red-50"
            >
              <X className="w-5 h-5" style={{ color: '#d4183d' }} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
