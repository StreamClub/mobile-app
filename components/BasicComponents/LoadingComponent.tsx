import React from "react";
import { colors } from "../../assets";
import { ActivityIndicator } from 'react-native-paper';

export const LoadingComponent = () => {
  return (
    <ActivityIndicator size="large" animating={true} color={colors.primaryRed} />
  );
};
