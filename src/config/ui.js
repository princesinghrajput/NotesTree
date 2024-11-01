export const TOAST_CONFIG = {
  position: "bottom-right",
  options: {
    duration: 3000,
    style: {
      background: '#363636',
      color: '#fff',
      borderRadius: '8px',
    },
    success: {
      iconTheme: { 
        primary: '#10B981', 
        secondary: '#fff' 
      },
    },
    error: {
      iconTheme: { 
        primary: '#EF4444', 
        secondary: '#fff' 
      },
    },
  }
};

export const SPLITTER_CONFIG = {
  defaultPosition: 30,
  minSize: "20%",
  maxSize: "80%",
  size: "4px"
}; 