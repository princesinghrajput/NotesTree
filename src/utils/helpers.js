export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const formatDate = (date) => {
  return new Date(date).toLocaleString();
};

export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
}; 