import React, { useState } from 'react';

const GeneratedLinks = ({ links }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);
  let textareas = [];
  let currentText = '';

  links.forEach((link) => {
    const newLinkText = `${link.timestamp} - [${link.text}](${link.url})\n`;

    if (currentText.length + newLinkText.length > 2000) {
      textareas.push(currentText);
      currentText = newLinkText;
    } else {
      currentText += newLinkText;
    }
  });

  if (currentText) {
    textareas.push(currentText);
  }

  const copyToClipboard = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (textareas.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 space-y-6">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
        Generated Links
      </h2>
      <div className="space-y-4">
        {textareas.map((text, i) => (
          <div key={i} className="relative">
            <div className="absolute right-2 top-2 z-10">
              <button
                onClick={() => copyToClipboard(text, i)}
                className="inline-flex items-center px-3 py-1 bg-violet-600 text-white text-sm font-medium rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-all duration-200"
              >
                {copiedIndex === i ? (
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </span>
                ) : (
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    Copy
                  </span>
                )}
              </button>
            </div>
            <textarea
              value={text}
              readOnly
              className="w-full h-64 p-4 bg-zinc-800 border border-zinc-700 rounded-lg text-white font-mono text-sm focus:ring-2 focus:ring-violet-600 focus:border-transparent transition-all duration-200"
            />
          </div>
        ))}
      </div>
      <p className="text-sm text-zinc-400">
        {textareas.length > 1 
          ? "* Links have been split into multiple sections due to Discord's character limit"
          : ""}
      </p>
    </div>
  );
};

export default GeneratedLinks;