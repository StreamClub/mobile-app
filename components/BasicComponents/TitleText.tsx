import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { TextParams } from "./Types/TextParams";
import { colors } from "../../assets";

export const TitleText = (params: TextParams) => {
  const textColor = params.color || colors.primaryBlack;

  const titleSize = {
    big: { fontSize: 30 },
    medium: { fontSize: 28 },
    small: { fontSize: 24 },
  }[params.size || 'small'];

  return (
    <Text style={[styles.textStyle, titleSize, { color: textColor }, params.style]} onLayout={params.onLayout} numberOfLines={params.numberOfLines}>
      {params.body}
    </Text>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: "Roboto"
  },
});
