import React from "react";
import { View, Image } from "react-native";
import { StyleSheet } from "react-native";
import { CustomButton } from "../components/BasicComponents/CustomButton";
import { router } from "expo-router";
import { TitleText } from "../components/BasicComponents/TitleText";
import { colors } from "../assets";
import { GoogleSignInButton } from "../components/GoogleSignInButton";
import { ShareContentButton } from "../components/Content/ShareContentButton";

export const InitialScreen = () => {

  return (
    <View style={styles.initialScreen}>
      <Image
        source={require("../assets/images/logoConFondo.png")}
        style={styles.imageStyle}
      />
      <View style={styles.buttonContainer}>
        <TitleText style={styles.titleText} body="Bienvenido a Stream Club" />
      </View>
      {/* [DEMO] comentar */}
      {/* <View style={styles.buttonContainer}>
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
      </View> */}
      {/* [DEMO] comentar */}
      <GoogleSignInButton />
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
  titleText: {
    fontSize: 30, // Tamaño más grande del texto
    textAlign: 'center', // Alineación centrada del texto
  },
  buttonContainer: {
    padding: 15,
  },
  imageStyle: {
    width: 389,
    height: 400,
    marginBottom: 20,
  },
});
