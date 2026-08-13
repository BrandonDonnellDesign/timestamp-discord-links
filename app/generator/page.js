'use client';
import React, { useState } from 'react';
import InputForm from '../components/InputForm';
import { generateMaskedLinks } from '../utils/linkGeneration';

export default function Generator() {
  const handleFormSubmit = async (baseUrl, inputList, platform) => {
    try {
      const links = await generateMaskedLinks(baseUrl, inputList, platform);
      return links;
    } catch (error) {
      console.error('Error in handleFormSubmit:', error);
      return [];
    }
  };

  return (
    <div className="section-shell py-12 sm:py-20">
      <InputForm onSubmit={handleFormSubmit} />
    </div>
  );
}
