import React from 'react';

const GeneratedLinks = ({ links }) => {
  // Convert the list of links to a string
  const linksString = links.map((link, index) => `${link.timestamp} - [${link.text}](${link.url})`).join('\n');

  return (
    <div className='w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 overflow-auto'>
      <h2 className='text-black font-bold'>Generated Links:</h2>
      <textarea rows="14"
        className="w-full border border-gray-300 rounded p-2 text-black"
        value={linksString}
        readOnly
      />
    </div>
  );
};

export default GeneratedLinks;
