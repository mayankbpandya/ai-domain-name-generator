'use client';

import { useState } from 'react';

export default function DomainList({ domains }) {
  const [favorites, setFavorites] = useState([]);
  const [copySuccess, setCopySuccess] = useState('');
  
  const toggleFavorite = (domain) => {
    if (favorites.includes(domain)) {
      setFavorites(favorites.filter(d => d !== domain));
    } else {
      setFavorites([...favorites, domain]);
    }
  };
  
  const copyToClipboard = async (domain) => {
    try {
      await navigator.clipboard.writeText(domain);
      setCopySuccess(domain);
      setTimeout(() => setCopySuccess(''), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Generated Domain Names</h2>
      <div className="space-y-2">
        {domains.map((domain, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:bg-gray-50"
          >
            <span className="font-medium">{domain}</span>
            <div className="flex space-x-2">
              <button
                onClick={() => toggleFavorite(domain)}
                className="p-2 text-gray-500 hover:text-yellow-500 transition-colors"
                title={favorites.includes(domain) ? "Remove from favorites" : "Add to favorites"}
              >
                {favorites.includes(domain) ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                )}
              </button>
              <button
                onClick={() => copyToClipboard(domain)}
                className="p-2 text-gray-500 hover:text-blue-500 transition-colors"
                title="Copy to clipboard"
              >
                {copySuccess === domain ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {favorites.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Favorite Domains</h3>
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <ul className="list-disc list-inside space-y-1">
              {favorites.map((domain, index) => (
                <li key={index} className="text-gray-800">{domain}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}