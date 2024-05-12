import React from "react";
import { View, Image, Button } from "react-native";
import { StyleSheet } from "react-native";
import { CustomButton } from "../components/BasicComponents/CustomButton";
import { router } from "expo-router";
import { TitleText } from "../components/BasicComponents/TitleText";
import { colors } from "../assets";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

export const InitialScreen = () => {
  
  GoogleSignin.configure({
    webClientId: '440697278069-9umno9778vb2nvjs89qjf64oqsbl1vkf.apps.googleusercontent.com',
  });

  const onGoogleButtonPress = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    //return auth().signInWithCredential(googleCredential);
    const user_sign_in = auth().signInWithCredential(googleCredential);
    user_sign_in.then((user) => console.log(user)).catch((error) => console.log(error))
  }

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
      <Button
        title="Sign-In with Google"
        onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
      />
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
