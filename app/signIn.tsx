import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import { Link } from 'expo-router'
import { Input } from 'react-native-elements'
import { Icon, Button } from 'react-native-elements'
import { useState, createRef } from 'react'
import { router } from 'expo-router';
import { useSession } from '../context/ctx';

import axios from 'axios'
import React from 'react'

import { logIn, logInBody } from '../apiCalls/auth'

export default function Page() {
    const [secureTextEntry, setSecureTextEntry] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const session = useSession();
    const signIn = session?.signIn

    axios.defaults.baseURL = 'https://uapi.onrender.com'

    const onSuccessLogIn = (response: any) => {
        const accessToken = response.data.token
        const refreshToken = response.data.refreshToken
        signIn?.(accessToken, refreshToken)
        router.replace('/home');
    }
    
    const onFailureLogIn = (error: any) => {
        console.log(error);
    }

    const onPressSignIn = () => {
        console.log('Iniciando sesión..')
        const body: logInBody = { email, password }
        logIn(
            body,
            onSuccessLogIn,
            onFailureLogIn
        )
    }

    const onPressOpenEye = () => {
        setSecureTextEntry(false)
    }

    const onPressCloseEye = () => {
        setSecureTextEntry(true)
    }

    const emailIsValid = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const signInDisabled = () => {
        return email.length === 0 || password.length === 0 || !emailIsValid(email)
    }

    const getPasswordIcon = () => {
        const iconName = secureTextEntry ? 'eye' : 'eye-slash'
        const iconHandler = secureTextEntry ? onPressOpenEye : onPressCloseEye
        return (
            <Icon
                name={iconName}
                type='font-awesome'
                color='black'
                onPress={() => iconHandler()}
            />
        )
    }

    const urlInput = createRef<TextInput>()

    const onEndEditingEmail = () => {
        urlInput.current?.focus()
    }

    const renderEmailInput = () => {
        return (
            <Input
                placeholder="ejemplo@dominio.com"
                leftIcon={{ type: 'Entypo', name: 'mail' }}
                containerStyle={styles.inputContainer}
                onChangeText={setEmail}
                onEndEditing={onEndEditingEmail}
            />
        )
    }

    const renderPasswordInput = () => {
        return (
            <Input
                ref={urlInput}
                placeholder="Contraseña"
                leftIcon={{ type: 'Entypo', name: 'lock' }}
                rightIcon={getPasswordIcon()}
                onChangeText={setPassword}
                secureTextEntry={secureTextEntry}
                containerStyle={styles.inputContainer}
            />
        )
    }

    const renderSignInButton = () => {
        return <Button
            title="Iniciar sesión"
            disabled={signInDisabled()}
            loading={false}
            buttonStyle={styles.buttonStyle}
            titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
            containerStyle={{
                marginHorizontal: 50,
                height: 50,
                width: 200,
                marginVertical: 10,
            }}
            onPress={onPressSignIn} />
    }

    const onPressForgotPassword = () => {
        router.push('/recoverAccount');
    }


    const renderForgotPasswordText = () => {
        return (
            <Pressable onPress={onPressForgotPassword}>
            <Text style={{ color: 'blue' }}>¿Olvidaste tu contraseña?</Text>
            </Pressable>
        )
    }

    // const renderErrorMessage() {

    // }

    return (
        <View style={styles.container}>

            {renderEmailInput()}
            {renderPasswordInput()}
            {renderSignInButton()}
            {renderForgotPasswordText()}

            {/* {signInFailed && renderErrorMessage()} */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#C7D6D9',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    inputContainer: {
        height: 40,
        width: '80%',
        marginVertical: 20,
    },
    buttonStyle: {
        backgroundColor: '#F4511E',
        borderRadius: 20,
    },
});
