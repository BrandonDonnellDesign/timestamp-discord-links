import React from 'react';

const GeneratedLinks = ({ links}) => {
  let textareas = [];
  let currentText = '';

  links.forEach((link) => {
    const newLinkText = `${link.timestamp} - [${link.text}](${link.url})\n`;

    if (currentText.length + newLinkText.length > 2000) {
      textareas.push(
        <textarea
          rows='14'
          className='w-full border border-gray-300 rounded p-2 text-black'
          value={currentText}
          readOnly
        />
      );
      currentText = newLinkText;
    } else {
      currentText += newLinkText;
    }
  });

  if (currentText) {
    textareas.push(
      <textarea
        rows='14'
        className='w-full border border-gray-300 rounded p-2 text-black'
        value={currentText}
        readOnly
      />
    );
  }

  return (
    <div className='w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 overflow-auto'>
      <h2 className='text-black font-bold'>Generated Links:</h2>
      {textareas.map((textarea, i) => (
        <div key={i} className='mb-4'>
          {textarea}
        </div>
      ))}
    </div>
  );
};

export default GeneratedLinks;