'use client';
import React, { useState } from 'react';
import InputForm from '../components/InputForm';
import GeneratedLinks from '../components/GeneratedLinks';
import { generateMaskedLinks } from '../utils/linkGeneration';

export default function Generator() {
  const [generatedLinks, setGeneratedLinks] = useState([]);

  const handleFormSubmit = async (baseUrl, inputList) => {
    const links = await generateMaskedLinks(baseUrl, inputList);
    setGeneratedLinks(links);
  };

  return (
    <div>
      <InputForm onSubmit={handleFormSubmit} />
      <GeneratedLinks links={generatedLinks} />
    </div>
  );
}
