// Email validation utility
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation utility
export const validatePassword = (password) => {
  return password && password.length >= 6;
};

// Name validation utility
export const validateName = (name) => {
  return name && name.trim().length >= 2;
};

// General validation messages
export const validationMessages = {
  email: {
    required: "Email is required",
    invalid: "Please enter a valid email address",
  },
  password: {
    required: "Password is required",
    minLength: "Password must be at least 6 characters long",
  },
  name: {
    required: "Name is required",
    minLength: "Name must be at least 2 characters long",
  },
};
