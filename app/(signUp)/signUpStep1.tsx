import React, { useState } from 'react';
import { SignUpScreen } from '../../screens/SignUpScreen';
import { Snackbar } from 'react-native-paper';
import { router } from 'expo-router';
const config = require('../../config.json');

export default function Page() {
    const [errorMessage, setErrorMessage] = useState('');
    // const [successMessage, setSuccessMessage] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const handleSingUpSubmit = (email: string, password: string) => {
        const createAccountBody = {
            "email": email,
            "password": password
        }
        fetch(config.api.url + "/users/sendVerificationCode", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"email": email})
        })
        .then(response => {
            if (!response.ok){
                const contentType = response.headers.get('content-type');
                if(contentType && contentType.includes('application/json')) {
                    response.json().then(json => {
                        let err = new Error(json["error"] || "F");
                        throw err;
                    })
                    .catch(error => {
                        setShowErrorMessage(true);
                        setShowSuccessMessage(false);
                        setErrorMessage(error.message);
                    })
                }
                else {
                    setShowErrorMessage(true);
                    setShowSuccessMessage(false);
                    setErrorMessage(config.api.defaultErrorMessage);
                }
            } else {
                if(response.status == 201) {
                    //signIn?.token(json["token"])
                    setShowSuccessMessage(true);
                    setShowErrorMessage(false);
                    router.push({ pathname: '/signUpStep2', params: createAccountBody });
                }
            }
        })
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