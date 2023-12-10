import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import * as Font from "expo-font";
import { ButtonParams } from "./Types/ButtonParams";
import { colors } from "../../assets";

export const PrimaryButton = (params: ButtonParams) => {
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

  const buttonSize = {
    small: { width: 185, height: 30, fontSize: 24 },
    medium: { width: 100, height: 20, fontSize: 16 },
    big: { width: 185, height: 30, fontSize: 24 },
  }[params.size] || { width: 100, height: 20, fontSize: 16 };

  return (
    <Button
      mode="contained"
      buttonColor="#C51221"
      labelStyle={[styles.secondaryButton, buttonSize]}
      onPress={params.onPress}
      disabled={params.disabled || false}
    >
      {params.buttonText}
    </Button>
  );
};

const styles = StyleSheet.create({
  secondaryButton: {
    color: colors.primaryWhite,
    fontFamily: "Proxima-Nova",
    textAlign: "center",
    textAlignVertical: "center",
  },
});
