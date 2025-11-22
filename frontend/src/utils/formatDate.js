export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatTime = (time) => {
  return time;
};

export const isToday = (date) => {
  const today = new Date();
  const checkDate = new Date(date);
  return today.toDateString() === checkDate.toDateString();
};

export const isPast = (date) => {
  return new Date(date) < new Date();
};

export const isFuture = (date) => {
  return new Date(date) > new Date();
};
