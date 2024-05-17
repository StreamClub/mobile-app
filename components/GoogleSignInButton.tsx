import React from "react";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { Image } from 'react-native'
import { LocalIcon } from "./Types/LocalIcon";
import { Pressable } from "react-native";
import { colors } from "../assets";
import { useSession } from "../context/ctx";
import { router } from "expo-router";
import { logInBody, useLogIn } from "../apiCalls/auth";
import { useErrorHandler } from "../hooks/useErrorHandler";
import { LoadingComponent } from "./BasicComponents/LoadingComponent";

export const GoogleSignInButton = () => {
  const {logIn, loading} = useLogIn();
  const {setError} = useErrorHandler()
  
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

  const onFailure = (error: any) => {
    setError(error);
    const user = auth().currentUser;
    if (user) {
      auth().signOut().then(() => {
        GoogleSignin.revokeAccess();
      });
    }
  }

  const streamClubSignIn = (email: string | null, password: string | null) => {
    if (email != null && password != null) {
      console.log('Iniciando sesión..');
      console.log(email);
      console.log(password);
      const body: logInBody = { email, password }
      logIn(
        body,
        onSuccessLogIn,
        onFailure
      );
    } else {
      console.log("ERROR: email or password null");
    }
}

  const onGoogleButtonPress = async () => {
    try {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const user_sign_in = auth().signInWithCredential(googleCredential);
      user_sign_in.then((user) => streamClubSignIn(user.user.email, user.user.uid)).catch((error) => console.log(error))
    } catch (err) {
      console.log(err);
    }
  }

  return(
    <Pressable onPress={() => onGoogleButtonPress()} >
      {loading?
        <LoadingComponent /> :
        <Image
          source={LocalIcon.googleLogo}
          style={{width: 60, height: 60, backgroundColor: colors.primaryWhite, borderRadius: 10}} />
      }
    </Pressable>
  )
}
