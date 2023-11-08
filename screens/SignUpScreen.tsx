import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { TitleText } from '../components/BasicComponents/TitleText';

export const SignUpScreen = () => {
  return(
    <View style={styles.signUpScreen}>
      <TitleText body='Sign In' />
    </View>
  )
}

const styles = StyleSheet.create({
  signUpScreen: {
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
