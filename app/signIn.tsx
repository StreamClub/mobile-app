import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import { Input } from 'react-native-elements'
import { Icon } from 'react-native-elements'
import { useState, createRef } from 'react'
import { router } from 'expo-router'
import { useSession } from '../context/ctx'
import { CustomButton } from '../components/BasicComponents/CustomButton'
import React from 'react'

import { logInBody, useLogIn } from '../apiCalls/auth'

export default function Page() {
    const [secureTextEntry, setSecureTextEntry] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {logIn, loading} = useLogIn();

    const session = useSession()
    const signIn = session?.signIn

    const onSuccessLogIn = (response: any) => {
        const accessToken = response.data.token
        const refreshToken = response.data.refreshToken
        signIn?.(accessToken, refreshToken)
    }

    const onPressSignIn = () => {
        console.log('Iniciando sesión..')
        const body: logInBody = { email, password }
        logIn(body, onSuccessLogIn)
    }

    const onPressOpenEye = () => {
        setSecureTextEntry(false)
    }

    const onPressCloseEye = () => {
        setSecureTextEntry(true)
    }

    const emailIsValid = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const signInDisabled = () => {
        return (
            email.length === 0 || password.length === 0 || !emailIsValid(email)
        )
    }

    const getPasswordIcon = () => {
        const iconName = secureTextEntry ? 'eye' : 'eye-slash'
        const iconHandler = secureTextEntry ? onPressOpenEye : onPressCloseEye
        return (
            <Icon
                name={iconName}
                type="font-awesome"
                color="black"
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
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="emailAddress"
                keyboardType="email-address"
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
                autoCapitalize="none"
                autoCorrect={false}
            />
        )
    }

    const renderSignInButton = () => {
        return (
            <CustomButton
                buttonText="Iniciar sesión"
                disabled={signInDisabled()}
                onPress={onPressSignIn}
                fontSize="medium"
                buttonSize="medium"
                type="primary"
                style={{ marginVertical: 10 }}
                loading={loading}
            />
        )
    }

    const onPressForgotPassword = () => {
        router.push('/recoverAccount')
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
})
