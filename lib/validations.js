export function validateInputs(formData) {
    // Check if keywords are provided
    if (!formData.keywords || formData.keywords.trim() === '') {
      return 'Keywords or description is required';
    }
    
    // Validate length constraints
    const { min, max } = formData.length;
    
    if (min < 3) {
      return 'Minimum length must be at least 3 characters';
    }
    
    if (max > 12) {
      return 'Maximum length must be at most 12 characters';
    }
    
    if (min > max) {
      return 'Minimum length cannot be greater than maximum length';
    }
    
    // Validate contain field
    if (formData.contain && formData.contain.length > max) {
      return `"Must contain" text cannot be longer than maximum length (${max})`;
    }
    
    // Validate count
    if (formData.count < 1 || formData.count > 20) {
      return 'Number of domains must be between 1 and 20';
    }
    
    return null; // No errors
  }
  