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
    const [createAccountBody, setCreateAccountBody] = useState({email: '', password: '', validationCode: ''});

    const handleCreateAccount = (validationCode: string) => {
        createAccountBody.validationCode = validationCode;
        console.log(createAccountBody);
    }

    const handleSingUpSubmit = (email: string, password: string) => {
        const body = {
            "email": email,
            "password": password,
            "validationCode": ''
        }
        setCreateAccountBody(body);
        setShowEmailConfirmation(true)
        // fetch(config.api.url + "/users/register", {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(body)
        // })
        // .then(response => {
        //     if (!response.ok){
        //         const contentType = response.headers.get('content-type');
        //         if(contentType && contentType.includes('application/json')) {
        //             response.json().then(json => {
        //                 let err = new Error(json["error"] || "F");
        //                 throw err;
        //             })
        //             .catch(error => {
        //                 setShowErrorMessage(true);
        //                 setShowSuccessMessage(false);
        //                 setErrorMessage(error.message);
        //             })
        //         }
        //         else {
        //             setShowErrorMessage(true);
        //             setShowSuccessMessage(false);
        //             setErrorMessage(config.api.defaultErrorMessage);
        //         }
        //     } else {
        //         response.json().then(json => {
        //             console.log(json)
        //             //signIn?.token(json["token"])
        //             setShowSuccessMessage(true);
        //             setShowErrorMessage(false);
        //         })
        //     }
        // })
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