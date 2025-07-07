'use client';

import { useState, useRef } from 'react';
import { analyzeCV, AIAnalysisResult } from '@/lib/cvData';

interface CVImportProps {
  onImportComplete: (result: AIAnalysisResult) => void;
}

export default function CVImport({ onImportComplete }: CVImportProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList) => {
    if (files.length === 0) return;
    
    const file = files[0];
    if (!file.type.includes('pdf') && !file.type.includes('document')) {
      alert('Please upload a PDF or Word document');
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // In a real app, you would extract text from PDF/DOCX here
      // For now, we'll simulate AI analysis without using the actual file content
      
      const result = await analyzeCV();
      onImportComplete(result);
    } catch (error) {
      console.error('Error analyzing CV:', error);
      alert('Error analyzing CV. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Import Existing CV</h3>
        <p className="text-gray-600">
          Upload your CV and let AI extract and organize the information automatically
        </p>
      </div>

      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive 
            ? 'border-indigo-500 bg-indigo-50' 
            : 'border-gray-300 hover:border-gray-400'
        } ${isAnalyzing ? 'pointer-events-none opacity-50' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isAnalyzing}
        />
        
        {isAnalyzing ? (
          <div className="space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <div>
              <p className="text-lg font-medium text-gray-900">Analyzing your CV...</p>
              <p className="text-sm text-gray-600">AI is extracting and categorizing information</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mx-auto w-12 h-12 text-gray-400">
              📄
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900">
                Drop your CV here or click to browse
              </p>
              <p className="text-sm text-gray-600">
                Supports PDF and Word documents (max 10MB)
              </p>
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Choose File
            </button>
          </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">🤖 AI-Powered Analysis</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Automatically extract personal information</li>
          <li>• Categorize skills by technology and proficiency</li>
          <li>• Parse work experience and achievements</li>
          <li>• Identify languages and certifications</li>
          <li>• Suggest improvements and missing information</li>
        </ul>
      </div>
    </div>
  );
}