'use client';

import { useState } from 'react';
import DomainList from './DomainList';
import { validateInputs } from '../../lib/validations';

export default function DomainGenerator() {
  const [formData, setFormData] = useState({
    keywords: '',
    length: { min: 3, max: 12 },
    contain: '',
    count: 5
  });
  
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'minLength' || name === 'maxLength') {
      setFormData({
        ...formData,
        length: {
          ...formData.length,
          [name === 'minLength' ? 'min' : 'max']: parseInt(value) || 0
        }
      });
    } else if (name === 'count') {
      setFormData({
        ...formData,
        [name]: parseInt(value) || 5
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate inputs
    const validationError = validateInputs(formData);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setError(null);
    setLoading(true);
    
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate domain names');
      }
      
      const data = await response.json();
      setDomains(data.domains);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 mb-1">
              Keywords or Description*
            </label>
            <input
              id="keywords"
              name="keywords"
              type="text"
              value={formData.keywords}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., tech, blog, AI, coding"
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              Words that describe your website or business
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="minLength" className="block text-sm font-medium text-gray-700 mb-1">
                Min Length
              </label>
              <input
                id="minLength"
                name="minLength"
                type="number"
                min="3"
                max="12"
                value={formData.length.min}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="maxLength" className="block text-sm font-medium text-gray-700 mb-1">
                Max Length
              </label>
              <input
                id="maxLength"
                name="maxLength"
                type="number"
                min="3"
                max="12"
                value={formData.length.max}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="contain" className="block text-sm font-medium text-gray-700 mb-1">
              Must Contain (Optional)
            </label>
            <input
              id="contain"
              name="contain"
              type="text"
              value={formData.contain}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., hub, net, code"
            />
            <p className="mt-1 text-xs text-gray-500">
              Specific word/letters you want in the domain
            </p>
          </div>
          
          <div className="mb-6">
            <label htmlFor="count" className="block text-sm font-medium text-gray-700 mb-1">
              Number of Domains
            </label>
            <select
              id="count"
              name="count"
              value={formData.count}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="5">5 domains</option>
              <option value="10">10 domains</option>
              <option value="15">15 domains</option>
              <option value="20">20 domains</option>
            </select>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${
              loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Generating...' : 'Generate Domain Names'}
          </button>
        </form>
      </div>
      
      {domains.length > 0 && <DomainList domains={domains} />}
    </div>
  );
}