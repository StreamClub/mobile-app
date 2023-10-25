import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import * as Font from 'expo-font';

type ButtonParams = {
  buttonText: string
}

export const SecondaryButton = (params: ButtonParams) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        'Proxima-Nova': require('../../assets/fonts/proxima-nova-regular.otf'),
      });
      setFontLoaded(true);
    };
    loadFont();
  }, []);

  return (
    <Button mode="contained" buttonColor='#677486' labelStyle={styles.secondaryButton} onPress={() => console.log('Crear cuenta')}>
      {params.buttonText}
    </Button>
  )
}

const styles = StyleSheet.create(
  {
    secondaryButton: {
      color: "#FFFFFF",
      fontFamily: "Proxima-Nova",
      fontSize: 24
    }
  }
)
