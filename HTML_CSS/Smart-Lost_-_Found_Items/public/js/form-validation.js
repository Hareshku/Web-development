// Form validation helper functions

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {boolean} - True if valid
 */
function isValidPassword(password) {
  // At least 6 characters
  return password.length >= 6;
}

/**
 * Validate required fields
 * @param {Object} formData - Form data object
 * @param {Array} requiredFields - Array of required field names
 * @returns {Object} - { isValid, missingFields }
 */
function validateRequiredFields(formData, requiredFields) {
  const missingFields = [];
  
  for (const field of requiredFields) {
    if (!formData[field] || formData[field].trim() === '') {
      missingFields.push(field);
    }
  }
  
  return {
    isValid: missingFields.length === 0,
    missingFields
  };
}

/**
 * Display form error message
 * @param {string} message - Error message to display
 * @param {string} elementId - ID of error element
 */
function showFormError(message, elementId = 'error-message') {
  const errorEl = document.getElementById(elementId);
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');
  }
}

/**
 * Hide form error message
 * @param {string} elementId - ID of error element
 */
function hideFormError(elementId = 'error-message') {
  const errorEl = document.getElementById(elementId);
  if (errorEl) {
    errorEl.textContent = '';
    errorEl.classList.add('hidden');
  }
}

/**
 * Validate registration form
 * @param {Object} formData - Form data object
 * @returns {Object} - { isValid, message }
 */
function validateRegistrationForm(formData) {
  // Check required fields
  const requiredFields = ['username', 'email', 'password'];
  const { isValid, missingFields } = validateRequiredFields(formData, requiredFields);
  
  if (!isValid) {
    return {
      isValid: false,
      message: `Please fill in all required fields: ${missingFields.join(', ')}`
    };
  }
  
  // Validate email
  if (!isValidEmail(formData.email)) {
    return {
      isValid: false,
      message: 'Please enter a valid email address'
    };
  }
  
  // Validate password
  if (!isValidPassword(formData.password)) {
    return {
      isValid: false,
      message: 'Password must be at least 6 characters long'
    };
  }
  
  // Validate password confirmation
  if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
    return {
      isValid: false,
      message: 'Passwords do not match'
    };
  }
  
  return {
    isValid: true,
    message: ''
  };
}

/**
 * Validate login form
 * @param {Object} formData - Form data object
 * @returns {Object} - { isValid, message }
 */
function validateLoginForm(formData) {
  // Check required fields
  const requiredFields = ['email', 'password'];
  const { isValid, missingFields } = validateRequiredFields(formData, requiredFields);
  
  if (!isValid) {
    return {
      isValid: false,
      message: `Please fill in all required fields: ${missingFields.join(', ')}`
    };
  }
  
  // Validate email
  if (!isValidEmail(formData.email)) {
    return {
      isValid: false,
      message: 'Please enter a valid email address'
    };
  }
  
  return {
    isValid: true,
    message: ''
  };
}

/**
 * Validate report form
 * @param {Object} formData - Form data object
 * @returns {Object} - { isValid, message }
 */
function validateReportForm(formData) {
  // Check required fields
  const requiredFields = ['type', 'itemName', 'description', 'category', 'location', 'date'];
  const { isValid, missingFields } = validateRequiredFields(formData, requiredFields);
  
  if (!isValid) {
    return {
      isValid: false,
      message: `Please fill in all required fields: ${missingFields.join(', ')}`
    };
  }
  
  // Validate type
  if (formData.type !== 'lost' && formData.type !== 'found') {
    return {
      isValid: false,
      message: 'Type must be either "lost" or "found"'
    };
  }
  
  return {
    isValid: true,
    message: ''
  };
}
