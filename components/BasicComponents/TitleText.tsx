import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import * as Font from "expo-font";
import { TextParams } from "./Types/TextParams";
import { colors } from "../../assets";

export const TitleText = (params: TextParams) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        "Proxima-Nova": require("../../assets/fonts/proxima-nova-regular.otf"),
      });
      setFontLoaded(true);
    };
    loadFont();
  }, []);

  if (!fontLoaded) {
    return null;
  }

  const textColor = params.color || colors.primaryBlack;

  const titleSize = {
    big: { fontSize: 30, height: 40 },
    medium: { fontSize: 28, height: 35 },
    small: { fontSize: 24, height: 30 },
  }[params.size || 'small'];

  return (
    <Text style={[styles.textStyle, titleSize, { color: textColor }, params.style]}>
      {params.body}
    </Text>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: "Roboto"
  },
});
