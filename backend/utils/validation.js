// Email validation utility
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation utility
const validatePassword = (password) => {
  return password && password.length >= 6;
};

// Name validation utility
const validateName = (name) => {
  return name && name.trim().length >= 2;
};

// Validate registration data
const validateRegistration = (data) => {
  const errors = [];

  if (!data.name || !validateName(data.name)) {
    errors.push("Name must be at least 2 characters long");
  }

  if (!data.email) {
    errors.push("Email is required");
  } else if (!validateEmail(data.email)) {
    errors.push("Invalid email format");
  }

  if (!data.password) {
    errors.push("Password is required");
  } else if (!validatePassword(data.password)) {
    errors.push("Password must be at least 6 characters long");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Validate login data
const validateLogin = (data) => {
  const errors = [];

  if (!data.email) {
    errors.push("Email is required");
  } else if (!validateEmail(data.email)) {
    errors.push("Invalid email format");
  }

  if (!data.password) {
    errors.push("Password is required");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

module.exports = {
  validateEmail,
  validatePassword,
  validateName,
  validateRegistration,
  validateLogin,
};
