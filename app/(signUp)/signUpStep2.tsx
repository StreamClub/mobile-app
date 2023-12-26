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
            onSucesssRegister,
            onFailureRegister
        )
    }

    // const _handleCreateAccount = (verificationCode: number) => {
    //     const body = {
    //         "email": createAccountBody.email,
    //         "password": createAccountBody.password,
    //         "verificationCode": verificationCode
    //     }
    //     fetch(config.api.url + "/users/register", {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(body)
    //     })
    //     .then(response => {
    //         if (!response.ok){
    //             const contentType = response.headers.get('content-type');
    //             if(contentType && contentType.includes('application/json')) {
    //                 response.json().then(json => {
    //                     console.log(json);
    //                     let err = new Error(json["error"] || "F");
    //                     throw err;
    //                 })
    //                 .catch(error => {
    //                     console.log(error.message);
    //                     setShowErrorMessage(true);
    //                     setShowSuccessMessage(false);
    //                     setErrorMessage(error.message);
    //                 })
    //             }
    //             else {
    //                 setShowErrorMessage(true);
    //                 setShowSuccessMessage(false);
    //                 setErrorMessage(config.api.defaultErrorMessage);
    //             }
    //         } else {
    //             response.json().then(json => {
    //                 console.log(json);
    //                 //signIn?.token(json["token"])
    //                 setShowSuccessMessage(true);
    //                 setShowErrorMessage(false);
    //                 router.push('/home')
    //             })
    //         }
    //     })
    // }

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