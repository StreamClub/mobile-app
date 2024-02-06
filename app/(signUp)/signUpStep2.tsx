import React, { useState, useEffect } from 'react';
import { Snackbar } from 'react-native-paper';
import { EmailConfirmationScreen } from '../../screens/EmailConfirmationScreen';
import { router, useLocalSearchParams } from 'expo-router';
const config = require('../../config.json');

import { register, RegisterBodyType } from '../../apiCalls/auth'
import { useSession } from '../../context/ctx';


export type signUpStep2ParamsType = {
    email: string;
    password: string;
    birthDate: string;
  };

export default function Page() {
    const [errorMessage, setErrorMessage] = useState('');
    // const [successMessage, setSuccessMessage] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const createAccountBody = useLocalSearchParams<signUpStep2ParamsType>();

    const session = useSession();
    const signIn = session?.signIn

    const onSucesssRegister = (response: any) => {
        setShowSuccessMessage(true);
        setShowErrorMessage(false);

        const { token, refreshToken } = response.data

        signIn?.(token, refreshToken)
        router.replace('/home');
    }

    const onFailureRegister = (error: any) => {
        const errorMessage = error.response?.data?.error?.[0]?.message || config.api.defaultErrorMessage;
        setShowErrorMessage(true);
        setShowSuccessMessage(false);
        setErrorMessage(errorMessage);
    }

    const handleCreateAccount = (verificationCode: number) => {
        const body: RegisterBodyType = {
            "email": createAccountBody.email,
            "password": createAccountBody.password,
            "verificationCode": verificationCode
        }

        register(
            body,
            session,
            onSucesssRegister,
            onFailureRegister
        )
    }

    return (
        <>
            <EmailConfirmationScreen onSubmit={handleCreateAccount} />
            <Snackbar
                visible={showSuccessMessage}
                onDismiss={() => {setShowSuccessMessage(false)}}>
                Success
            </Snackbar>
            <Snackbar
                visible={showErrorMessage}
                onDismiss={() => {setShowErrorMessage(false)}}
                >
                {errorMessage}
            </Snackbar>
        </>
    );
}