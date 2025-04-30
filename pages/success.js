// pages/success.js
import React, { useState } from 'react';

export default function Success() {
  const [lang, setLang] = useState('de');

  const text = {
    de: {
      title: 'Vielen Dank für deine Bestellung!',
      desc: 'Wir bearbeiten dein individuelles Metallwandbild und melden uns bald bei dir.',
      back: 'Zurück zur Startseite'
    },
    en: {
      title: 'Thank you for your order!',
      desc: 'We are processing your custom metal artwork and will contact you shortly.',
      back: 'Back to homepage'
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-beige-100 text-center text-gray-800">
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="absolute top-4 right-4 border px-2 py-1 rounded"
      >
        <option value="de">DE</option>
        <option value="en">EN</option>
      </select>
      <h1 className="text-4xl font-bold mb-4">{text[lang].title}</h1>
      <p className="text-lg mb-8">{text[lang].desc}</p>
      <a href="/" className="text-blue-600 underline">{text[lang].back}</a>
    </div>
  );
}