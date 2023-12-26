import axios from 'axios';
import { AxiosResponse } from 'axios';

axios.defaults.baseURL = 'https://uapi.onrender.com'

export type logInBody = {
    email: string,
    password: string
}

export function logIn(body: logInBody, onSuccess: (response: AxiosResponse<any, any>) => void, onFailure: (error: any) => void) {
    axios.post('/auth/login', body).then(
        (response) => {
            onSuccess(response)
        }, (error) => {
            onFailure(error)
    });
}

export type sendVerificationCodeBody = {
    email: string
}

export function signUp(body: sendVerificationCodeBody, onSuccess: (response: AxiosResponse<any, any>) => void, onFailure: (error: any) => void) {
    axios.post('/auth/sendVerificationCode', body).then(
        (response) => {
            onSuccess(response)
        }, (error) => {
            onFailure(error)
    });
}

// fetch(config.api.url + "/users/sendVerificationCode", {
//     method: 'POST',
//     headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({"email": email})
