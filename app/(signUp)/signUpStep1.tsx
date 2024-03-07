import React from 'react'
import { SignUpScreen } from '../../screens/SignUpScreen'
import { router } from 'expo-router'

import { sendVerificationCodeBody, useSignUp } from '../../apiCalls/auth'
import { signUpStep2ParamsType } from './signUpStep2'

export default function Page() {
    const {sendVerification} = useSignUp();

    var email = ''
    var password = ''
    var birthDate = ''

    const onSuccessSignUp = (response: any) => {
        //setShowSuccessMessage(true)
        //setShowErrorMessage(false)
        const data: signUpStep2ParamsType = { email, password, birthDate }
        router.push({ pathname: '/signUpStep2', params: data })
    }

    /* const onFailureSignUp = (error: any) => {
        const errorMessage =
            error.response?.data?.error?.[0]?.message ||
            config.api.defaultErrorMessage
        setShowErrorMessage(true)
        setShowSuccessMessage(false)
        setErrorMessage(errorMessage)
    } */

    const handleSingUpSubmit = (
        _email: string,
        _password: string,
        _birthDate: string
    ) => {
        const body: sendVerificationCodeBody = { email: _email }
        email = _email
        password = _password
        birthDate = _birthDate

        sendVerification(body, onSuccessSignUp);
    }

    return (
        <SignUpScreen onNext={handleSingUpSubmit} />
    )
}
