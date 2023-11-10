import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Card, Text, TextInput } from 'react-native-paper';
import { BodyText } from '../components/BasicComponents/BodyText';
import { PrimaryButton } from '../components/BasicComponents/PrimaryButton';
import { SecondaryButton } from '../components/BasicComponents/SecondaryButton';

export const SignUpScreen = () => {
  return(
    <View style={styles.signUpScreen}>
      <BodyText body='Para empezar, necesitamos algunos detalles básicos para crear tu cuenta de forma segura. 
      Por favor, proporciona tu dirección de correo electrónico, elige una contraseña confiable y dinos tu fecha
      de nacimiento' style={styles.textStyle}/>
      <Card style={styles.formCard}>
        <Card.Content>
          <TextInput
            label="Email"
            style={styles.input}
            textColor='#FFFFFF'
            activeUnderlineColor="#000000"
          />
          <TextInput
            label="Email"
            style={styles.input}
            textColor='#FFFFFF'
            activeUnderlineColor="#000000"
          />
          <TextInput
            label="Email"
            style={styles.input}
            textColor='#FFFFFF'
            activeUnderlineColor="#000000"
          />
          <TextInput
            label="Email"
            style={styles.input}
            textColor='#FFFFFF'
            activeUnderlineColor="#000000"
          />
        </Card.Content>
      </Card>
      <View style={styles.buttons}>
        <SecondaryButton buttonText='Cancelar' onPress={() => console.log("Next")} size='medium'/>
        <View style={{ marginHorizontal: 5 }} />
        <PrimaryButton buttonText='Siguiente' onPress={() => console.log("Cancel")} size='medium'/>
      </View>
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
  formCard: {
    height: 366,
    width: 314,
    backgroundColor: '#84B5C0'
  },
  input: {
    margin: 14,
    backgroundColor: '#548496',
  },
  textStyle: {
    width: 314,
    margin: 14
  },
  buttons: {
    flexDirection: 'row',
    margin: 10,
  }
});
