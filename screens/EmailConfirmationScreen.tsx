import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { BodyText } from '../components/BasicComponents/BodyText';
import { TextInput } from 'react-native-paper';
import { PrimaryButton } from '../components/BasicComponents/PrimaryButton';

type EmailConfirmParams = {
    onSubmit: (validationCode: number) => void;
}

export const EmailConfirmationScreen = (params: EmailConfirmParams) => {
    const [verificationCode, setVerificationCode] = useState('');

    return(
        <View style={styles.signUpScreen}>
            <BodyText body='Hemos enviado un código de verificación a tu dirección de correo electrónico.
            Por favor, revisa tu bandeja de entrada, y si no encuentras el correo, verifica la carpeta de spam
            . Utiliza este código aquí para confirmar y validar tu dirección de correo electrónico.' 
            style={styles.textStyle}/>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.input}
                    textColor='#FFFFFF'
                    activeUnderlineColor="#000000"
                    value={verificationCode}
                    onChangeText={(text) => {setVerificationCode(text)}}
                    maxLength={6}
                    keyboardType="numeric"
                />
                <BodyText body='Ingrese su código aquí' color='#000000' />
            </View>
            <View style={styles.column}>
                <BodyText body='No recibiste tu código?' color='#000000' />
                <BodyText body='Volver a enviar código' color='#4193A6' />
            </View>
            <View style={styles.column}>
                <PrimaryButton 
                    buttonText='Confirmar código' 
                    onPress={() => {params.onSubmit(Number(verificationCode))}} 
                    size='big'/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    signUpScreen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#C7D6D9',
    },
    textStyle: {
        width: 314,
        margin: 14
    },
    input: {
        margin: 14,
        backgroundColor: '#548496',
        width: 200,
        textAlign: "center"
    },
    inputView: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    column: {
        padding: 20
    }
});
