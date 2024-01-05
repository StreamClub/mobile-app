import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import * as Font from "expo-font";
import { TextParams } from "./Types/TextParams";
import { colors } from "../../assets";

export const BodyText = (params: TextParams) => {
  const textColor = params.color || colors.primaryBlack;

  const titleSize = {
    big: { fontSize: 16, height: 24 },
    medium: { fontSize: 14, height: 20 },
    small: { fontSize: 12, /*height: 18*/ },
  }[params.size || 'small'];

  return (
    <Text style={[styles.textStyle, titleSize, { color: textColor }, params.style]}>
      {params.body}
    </Text>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: "Roboto",
    fontSize: 16,
    lineHeight: 24,
  },
});
