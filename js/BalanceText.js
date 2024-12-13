import React from 'react';
import { Text } from 'react-native';

export const BalanceText = ({ balance }) => {
  return <Text style={{ fontSize: 47, fontWeight: '900' }}>{balance}</Text>;
};
