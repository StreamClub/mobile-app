import React from "react";
import { View, Image } from "react-native";
import { StyleSheet } from "react-native";
import { CustomButton } from "../components/BasicComponents/CustomButton";
import { router } from "expo-router";
import { TitleText } from "../components/BasicComponents/TitleText";
import { colors } from "../assets";

export const InitialScreen = () => {
  return (
    <View style={styles.initialScreen}>
      <Image
        source={require("../assets/images/logoConFondo.png")}
        style={styles.imageStyle}
      />
      <View style={styles.buttonContainer}>
        <TitleText body="Bienvenido a Stream Club" />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          buttonText="Iniciar sesión"
          onPress={() => router.push("/signIn")}
          fontSize="big"
          buttonSize="big"
          type="primary"
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          buttonText="Crear cuenta"
          onPress={() => router.push("/signUpStep1")}
          fontSize="big"
          buttonSize="big"
          type="secondary"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  initialScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.secondaryWhite,
  },
  buttonContainer: {
    padding: 10,
  },
  imageStyle: {
    width: 389,
    height: 400,
    marginBottom: 20,
  },
});
