// components/InputForm.js
import React, { useState } from 'react';

const InputForm = ({ onSubmit }) => {
  const [baseUrl, setBaseUrl] = useState('');
  const [inputList, setInputList] = useState(''); // Define inputList state

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(baseUrl, inputList); // Pass both baseUrl and inputList to onSubmit
  };

  return (
    <div className='w-full'>
      <form
        className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
        onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'>
            Base URL for Twitch:
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='bases'
            type='text'
            value={baseUrl} onChange={(e) => setBaseUrl(e.target.value)} 
          />
        </div>
        <div className='mb-6'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'>
            Paste the list of timestamps and text:
          </label>
          <textarea
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline h-96'
            id='list'
            type='text'
            value={inputList} onChange={(e) => setInputList(e.target.value)}
          />
        </div>
        <div className='flex items-center justify-between'>
          <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button'>Generate Links</button>
        </div>
      </form>
    </div>
  );
};

export default InputForm;
