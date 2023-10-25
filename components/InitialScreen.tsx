import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Button } from 'react-native-paper';
import * as Font from 'expo-font';
import { SecondaryButton } from './BasicComponents/SecondaryButton';

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

  return(
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Bienvenido a Stream Club</Text>
        <SecondaryButton buttonText="Crear Cuenta"/>
        <Link href="/signIn">Iniciar sesión</Link>
    </View>
  )
}
