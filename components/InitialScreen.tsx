import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import { StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import { SecondaryButton } from './BasicComponents/SecondaryButton';
import { PrimaryButton } from './BasicComponents/PrimaryButton';
import { router } from 'expo-router';
import { TitleText } from './BasicComponents/TitleText';

export const InitialScreen = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        'Proxima-Nova': require('../assets/fonts/proxima-nova-regular.otf'),
      });
      setFontLoaded(true);
    };
    loadFont();
  }, []);

  if (!fontLoaded) {
    return null; // You can return a loading indicator or any other component while the font is loading
  }

  return (
    <View style={styles.initalScreen}>
      <Image
        source={require('../assets/images/logoConFondo.png')}
        style={styles.imageStyle}
      />
      <View style={styles.buttonContainer}>
        <TitleText body='Bienvenido a Stream Club' />
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton buttonText='Iniciar sesión' onPress={() => router.replace('/signIn')} />
      </View>
      <View style={styles.buttonContainer}>
        <SecondaryButton buttonText='Crear cuenta' onPress={() => router.replace('/signUp')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  initalScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C7D6D9'
  },
  buttonContainer: {
    padding: 10,
  },
  imageStyle: {
    width: 389,
    height: 400,
    marginBottom: 20, // Adjust as needed
  },
});
