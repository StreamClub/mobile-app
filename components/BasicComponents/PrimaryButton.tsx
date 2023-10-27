import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import * as Font from 'expo-font';
import { ButtonParams } from './Types/ButtonParams';

export const PrimaryButton = (params: ButtonParams) => {
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

  if(!fontLoaded) {
    return null;
  }

  return (
    <Button mode="contained" buttonColor='#C51221' labelStyle={styles.secondaryButton} onPress={params.onPress}>
      {params.buttonText}
    </Button>
  )
}

const styles = StyleSheet.create(
  {
    secondaryButton: {
      color: "#FFFFFF",
      fontFamily: "Proxima-Nova",
      fontSize: 24,
      width: 185,
      height: 30,
      textAlign: 'center',
      textAlignVertical: 'center',
    }
  }
)
