import React, { useState } from 'react'
import { Snackbar } from 'react-native-paper'
import { EmailConfirmationScreen } from '../../screens/EmailConfirmationScreen'
import { router, useLocalSearchParams } from 'expo-router'
const config = require('../../config.json')

import { RegisterBodyType, useSignUp } from '../../apiCalls/auth'
import { useSession } from '../../context/ctx'

export type signUpStep2ParamsType = {
    email: string
    password: string
    birthDate: string
}

export default function Page() {
    const { register, loading } = useSignUp();
    const createAccountBody = useLocalSearchParams<signUpStep2ParamsType>()

    const session = useSession()
    const signIn = session?.signIn

    const onSucesssRegister = (response: any) => {

        const { token, refreshToken } = response.data

        signIn?.(token, refreshToken)
        router.replace('/home')
    }

    const handleCreateAccount = (verificationCode: number) => {
        const body: RegisterBodyType = {
            email: createAccountBody.email,
            password: createAccountBody.password,
            verificationCode: verificationCode,
        }

        register(body, onSucesssRegister);
    }

    return (
        <EmailConfirmationScreen onSubmit={handleCreateAccount} loading={loading} />
    )
}
