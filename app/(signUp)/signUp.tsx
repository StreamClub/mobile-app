import React, { useState } from 'react';
import { SignUpScreen } from '../../screens/SignUpScreen';
import { Snackbar } from 'react-native-paper';
import { EmailConfirmationScreen } from '../../screens/EmailConfirmationScreen';
import { BodyText } from '../../components/BasicComponents/BodyText';
const config = require('../../config.json');

export default function Page() {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [createAccountBody, setCreateAccountBody] = useState({email: '', password: ''});

    const handleCreateAccount = (verificationCode: number) => {
        const body = {
            "email": createAccountBody.email,
            "password": createAccountBody.password,
            "verificationCode": verificationCode
        }
        fetch(config.api.url + "/users/register", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        .then(response => {
            if (!response.ok){
                const contentType = response.headers.get('content-type');
                if(contentType && contentType.includes('application/json')) {
                    console.log("Error");
                    response.json().then(json => {
                        console.log(json);
                        let err = new Error(json["error"] || "F");
                        throw err;
                    })
                    .catch(error => {
                        console.log(error.message);
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
                response.json().then(json => {
                    console.log(json);
                    //signIn?.token(json["token"])
                    setShowSuccessMessage(true);
                    setShowErrorMessage(false);
                    setShowEmailConfirmation(true);
                })
            }
        })
    }

    const handleSingUpSubmit = (email: string, password: string) => {
        const createAccountBody = {
            "email": email,
            "password": password
        }
        setCreateAccountBody(createAccountBody);
        console.log("Sing Upd submit");
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
                    setShowEmailConfirmation(true);
                }
            }
        })
    }
    return (
        <>
            {showEmailConfirmation?
                <EmailConfirmationScreen onSubmit={handleCreateAccount} /> :
                <SignUpScreen onNext={handleSingUpSubmit}/>
            }
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