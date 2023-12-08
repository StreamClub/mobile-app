import React from 'react';
import { View, Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { SecondaryButton } from '../components/BasicComponents/SecondaryButton';
import { PrimaryButton } from '../components/BasicComponents/PrimaryButton';
import { router } from 'expo-router';
import { TitleText } from '../components/BasicComponents/TitleText';

export const InitialScreen = () => {
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
        <PrimaryButton buttonText='Iniciar sesión' onPress={() => router.push('/signIn')}  size='big'/>
      </View>
      <View style={styles.buttonContainer}>
        <SecondaryButton buttonText='Crear cuenta' onPress={() => router.push('/signUpStep1')}  size='big'/>
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
    marginBottom: 20,
  },
});
