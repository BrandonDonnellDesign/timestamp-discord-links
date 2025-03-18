'use client';
import React, { useState, useEffect } from 'react';

export default function TimestampModal({ isOpen, onClose, timestamps, videoData, onSave }) {
  const [editedTimestamps, setEditedTimestamps] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && timestamps) {
      // Format the text with header and footer
      const text = `${videoData?.date || 'Date'} Timestamps\n\n${timestamps.join('\n')}\n\nVOD: ${videoData?.url}`;
      
      setEditedTimestamps(text);
      setError('');
    }
  }, [isOpen, timestamps, videoData]);

  const handleSave = () => {
    try {
      // Split the text into lines and process
      const lines = editedTimestamps.split('\n').filter(line => line.trim());
      
      // Remove header and footer to get just the timestamps
      const timestampLines = lines.filter(line => {
        return !line.startsWith('VOD:') && 
               !line.includes('Timestamps');
      });

      console.log('Saving timestamps:', timestampLines);
      
      if (timestampLines.length === 0) {
        setError('Cannot save empty timestamps');
        return;
      }

      // Call the onSave function with the new timestamps
      onSave(timestampLines);
      setError(''); // Clear any previous errors
      onClose(); // Close the modal after saving
    } catch (error) {
      console.error('Error in handleSave:', error);
      setError('Failed to save timestamps');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(editedTimestamps);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-zinc-900 p-8 rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Edit Timestamps</h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="mb-4">
          <h3 className="text-lg font-medium text-white mb-2">Video Information</h3>
          <p className="text-zinc-400">{videoData?.title}</p>
          <p className="text-zinc-400 text-sm mb-1">Date: {videoData?.date}</p>
          <a 
            href={videoData?.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-violet-400 hover:text-violet-300 transition-colors"
          >
            View on Twitch
          </a>
        </div>

        <div className="flex-grow overflow-hidden">
          <textarea
            value={editedTimestamps}
            onChange={(e) => setEditedTimestamps(e.target.value)}
            className="w-full h-full min-h-[300px] p-4 bg-zinc-800 border border-zinc-700 rounded-lg text-white font-mono text-sm focus:ring-2 focus:ring-violet-600 focus:border-transparent transition-all duration-200 resize-none"
            placeholder="Edit your timestamps here..."
          />
        </div>

        {error && (
          <div className="mt-2 text-red-500 text-sm">
            {error}
          </div>
        )}

        <div className="flex justify-between items-center mt-4 pt-4 border-t border-zinc-800">
          <div className="flex gap-4">
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-zinc-700 text-white text-sm font-medium rounded-lg hover:bg-zinc-600 transition-all duration-200"
            >
              {copied ? 'Copied!' : 'Copy All'}
            </button>
            <span className="text-zinc-500 text-sm self-center">
              {editedTimestamps.length}/2000 characters
            </span>
          </div>
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-zinc-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-violet-600 text-white font-medium rounded-lg hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900 transition-all duration-200"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}