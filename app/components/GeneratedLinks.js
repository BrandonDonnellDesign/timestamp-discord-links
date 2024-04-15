// components/GeneratedLinks.js
import React from 'react';

const GeneratedLinks = ({ links }) => {
  return (
    <div className='w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 overflow-auto'>
      <h2 className='text-black font-bold'>Generated Links:</h2>
      <ul>
        {links.map((link, index) => (
          <li key={index} className="list-none text-gray-700">
            {link.timestamp} - [{link.text}]({link.url})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GeneratedLinks;
