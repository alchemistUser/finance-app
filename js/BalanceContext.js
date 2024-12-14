// BalanceContext.js

import React, { createContext, useState, useContext, useCallback, useMemo } from 'react';
import { getBalance } from './logics';

// Create the context
const BalanceContext = createContext();

// Create a provider to wrap your app
export const BalanceProvider = ({ children }) => {
  const [balance, setBalance] = useState(0); // Initial balance state

  // Wrap `updateBalance` in `useCallback` to ensure it doesn't recreate unnecessarily
  const updateBalance = useCallback(() => {
    const newBalance = getBalance(); // Assume `getBalance()` fetches the latest balance
    setBalance(newBalance); // Update the balance state
  }, []);

  // Use `useMemo` to avoid re-creating the context value on every render
  const value = useMemo(
    () => ({
      balance,
      updateBalance,
    }),
    [balance, updateBalance] // Recompute only if `balance` or `updateBalance` changes
  );

  return (
    <BalanceContext.Provider value={value}>
      {children}
    </BalanceContext.Provider>
  );
};

// Custom hook to use balance context
export const useBalance = () => useContext(BalanceContext);
