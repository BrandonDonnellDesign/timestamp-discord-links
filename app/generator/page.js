'use client';
import React, { useState } from 'react';
import InputForm from '../components/InputForm';
import { generateMaskedLinks } from '../utils/linkGeneration';

export default function Generator() {
  const handleFormSubmit = async (baseUrl, inputList) => {
    console.log('Handling form submit with:', { baseUrl, inputList });
    try {
      const links = await generateMaskedLinks(baseUrl, inputList);
      console.log('Generated links:', links);
      return links;
    } catch (error) {
      console.error('Error in handleFormSubmit:', error);
      return [];
    }
  };

  return (
    <div className='rounded-lg bg-zinc-800 p-10 container-2xl'>
      <InputForm onSubmit={handleFormSubmit} />
    </div>
  );
}
