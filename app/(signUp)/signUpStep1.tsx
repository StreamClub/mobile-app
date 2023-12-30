import React, { useState } from 'react';
import { SignUpScreen } from '../../screens/SignUpScreen';
import { Snackbar } from 'react-native-paper';
import { router } from 'expo-router';
const config = require('../../config.json');

import { signUp, sendVerificationCodeBody } from '../../apiCalls/auth'
import { signUpStep2ParamsType } from './signUpStep2'

export default function Page() {
    const [errorMessage, setErrorMessage] = useState('');
    // const [successMessage, setSuccessMessage] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    var email = ''
    var password = ''
    var birthDate = ''

    const onSuccessSignUp = (response: any) => {
        setShowSuccessMessage(true);
        setShowErrorMessage(false);
        const data: signUpStep2ParamsType = { email, password, birthDate }
        router.push({ pathname: '/signUpStep2', params: data }); 
    }

    const onFailureSignUp = (error: any) => {
        const errorMessage = error.response?.data?.error?.[0]?.message || config.api.defaultErrorMessage;
        setShowErrorMessage(true);
        setShowSuccessMessage(false);
        setErrorMessage(errorMessage);
    }

    const handleSingUpSubmit = (_email: string, _password: string, _birthDate: string) => {
        const body: sendVerificationCodeBody = { email: _email }
        email = _email
        password = _password
        birthDate = _birthDate
        
        signUp(
            body,
            onSuccessSignUp,
            onFailureSignUp
        )
    }

    return (
        <>
            <SignUpScreen onNext={handleSingUpSubmit}/>
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