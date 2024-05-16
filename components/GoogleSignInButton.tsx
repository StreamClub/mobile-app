import React from "react";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { Image } from 'react-native'
import { LocalIcon } from "./Types/LocalIcon";
import { Pressable } from "react-native";
import { colors } from "../assets";
import { logIn, logInBody } from "../apiCalls/auth";
import { useSession } from "../context/ctx";
import { router } from "expo-router";

export const GoogleSignInButton = () => {
  GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT,
    forceCodeForRefreshToken: true,
  });
  const session = useSession();
  const signIn = session?.signIn;

  const onSuccessLogIn = (response: any) => {
    const accessToken = response.data.token
    const refreshToken = response.data.refreshToken
    signIn?.(accessToken, refreshToken)
    router.replace('/home');
  }

  const onFailureLogIn = (error: any) => {
    console.log(error);
  }

  const streamClubSignIn = (email: string | null, password: string | null) => {
    if (email != null && password != null) {
      console.log('Iniciando sesión..');
      console.log(email);
      console.log(password);
      const body: logInBody = { email, password }
      logIn(
        body,
        session,
        onSuccessLogIn,
        onFailureLogIn
      );
    } else {
      console.log("ERROR: email or password null");
    }
}

  const onGoogleButtonPress = async () => {
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const user_sign_in = auth().signInWithCredential(googleCredential);
    user_sign_in.then((user) => streamClubSignIn(user.user.email, user.user.uid)).catch((error) => console.log(error))
  }

  return(
    <Pressable onPress={() => onGoogleButtonPress().then(() => {
        console.log('Signed in with Google!');
        /* auth().signOut().then(() => {
          GoogleSignin.revokeAccess();
          console.log("Logged out");
        });  */
      })} >
      <Image
        source={LocalIcon.googleLogo}
        style={{width: 60, height: 60, backgroundColor: colors.primaryWhite, borderRadius: 10}} />
    </Pressable>
  )
}