import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import * as Font from 'expo-font';
import { TextParams } from './Types/TextParams';

export const TitleText = (params: TextParams) => {
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
    <Text style={styles.textStyle}>
      {params.body}
    </Text>
  )
}

const styles = StyleSheet.create(
  {
    textStyle: {
      color: "#000000",
      fontFamily: "Proxima-Nova",
      fontSize: 24,
      height: 30,
    }
  }
)
