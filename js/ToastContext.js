// ToastContext.js

import React, { createContext, useContext } from 'react';
import Toast from 'react-native-toast-message';

// Create a context for toast management
const ToastContext = createContext(null);

// Provider component that wraps the app and provides the toast function
export const ToastProvider = ({ children }) => {
  const showToast = (message) => {
    Toast.show({
      type: 'success',
      position: 'bottom',
      text1: message,
      visibilityTime: 3000,
    });
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <Toast />
    </ToastContext.Provider>
  );
};

// Custom hook to use toast
export const useToast = () => useContext(ToastContext);
