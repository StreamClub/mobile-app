import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Card, TextInput } from 'react-native-paper';
import { BodyText } from '../components/BasicComponents/BodyText';
import { PrimaryButton } from '../components/BasicComponents/PrimaryButton';
import { SecondaryButton } from '../components/BasicComponents/SecondaryButton';
import { TextInputMask } from 'react-native-masked-text';
import config from '../config.json';

type SignUpParams = {
  onNext: (email: string, password: string) => void;
}

export const SignUpScreen = (params: SignUpParams) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidBirth, setIsValidBirth] = useState(true);

  const handleEmailChange = (text: string) => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(text));
  };

  const handleConfirmPassword = (text: string) => {
    setConfirmPassword(text);
    setPasswordsMatch(text == password);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };
  
  return(
    <View style={styles.signUpScreen}>
      <BodyText body='Para empezar, necesitamos algunos detalles básicos para crear tu cuenta de forma segura. 
      Por favor, proporciona tu dirección de correo electrónico, elige una contraseña confiable y dinos tu fecha
      de nacimiento' style={styles.textStyle}/>
      <Card style={styles.formCard}>
        <Card.Content>
          <View>
            <TextInput
              label="Email"
              style={styles.input}
              textColor='#FFFFFF'
              activeUnderlineColor="#000000"
              value={email}
              onChangeText={handleEmailChange}
            />
            {!isValidEmail && <BodyText body={config.signUp.invalidEmaiError} color='#C51221' />}
          </View>
          <TextInput
            label="Contraseña"
            style={styles.input}
            textColor='#FFFFFF'
            activeUnderlineColor="#000000"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={(text) => {setPassword(text)}}
            right={
              <TextInput.Icon
                icon="eye"
                onPress={togglePasswordVisibility}
              />
            }
          />
          <View>
            <TextInput
              label="Confirmar contraseña"
              style={styles.input}
              textColor='#FFFFFF'
              activeUnderlineColor="#000000"
              secureTextEntry={!isPasswordVisible}
              value={confirmPassword}
              onChangeText={handleConfirmPassword}
              right={
                <TextInput.Icon
                  icon="eye"
                  onPress={togglePasswordVisibility}
                />
              }
            />
            {!passwordsMatch && <BodyText body={config.signUp.passwordsNotMatch} color='#C51221' />}
          </View>
          <TextInput
            label="Fecha de nacimiento"
            style={styles.input}
            textColor='#FFFFFF'
            activeUnderlineColor="#000000"
            render={(props) =>
              <TextInputMask
                type={'datetime'}
                options={{
                  format: 'DD/MM/YYYY',
                }}
                {...props}
              />
            }
          />
        </Card.Content>
      </Card>
      <View style={styles.buttons}>
        <SecondaryButton buttonText='Cancelar' onPress={() => console.log("Next")} size='medium'/>
        <View style={{ marginHorizontal: 5 }} />
        <PrimaryButton 
          buttonText='Siguiente' 
          onPress={() => params.onNext(email, password)} 
          disabled={!(email && password && isValidEmail && passwordsMatch && isValidBirth)} 
          size='medium'/>
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
    height: 400,
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
