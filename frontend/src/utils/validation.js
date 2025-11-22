export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateBloodPressure = (bp) => {
  const re = /^\d{2,3}\/\d{2,3}$/;
  return re.test(bp);
};

export const validateHeartRate = (hr) => {
  const rate = parseInt(hr);
  return rate >= 40 && rate <= 200;
};

export const validateWeight = (weight) => {
  const w = parseFloat(weight);
  return w > 0 && w < 500;
};

export const validateHeight = (height) => {
  const h = parseFloat(height);
  return h > 0 && h < 300;
};
