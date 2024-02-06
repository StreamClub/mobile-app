import axios from 'axios';
import { AxiosResponse } from 'axios';
import { publicCall, Params } from './generic';
import { useSession } from '../context/ctx';

axios.defaults.baseURL = 'https://papi-4lms.onrender.com'


// --------- --------- --------- --------- --------- ---------
export type logInBody = {
    email: string,
    password: string
}

export function logIn(body: logInBody, session: ReturnType<typeof useSession>, onSuccess: (response: AxiosResponse<any, any>) => void, onFailure: (error: any) => void) {

    const params: Params = { data: body }
    const endpoint = '/auth/login'

    publicCall('POST', session, endpoint, params, onSuccess, onFailure)
}


// --------- --------- --------- --------- --------- ---------
export type sendVerificationCodeBody = {
    email: string
}

export function signUp(body: sendVerificationCodeBody, session: ReturnType<typeof useSession>, onSuccess: (response: AxiosResponse<any, any>) => void, onFailure: (error: any) => void) {
    // axios.post('/auth/sendVerificationCode', body).then(
    //     (response) => {
    //         onSuccess(response)
    //     }, (error) => {
    //         onFailure(error)
    // });
    const params: Params = { data: body }
    const endpoint = '/auth/sendVerificationCode'

    publicCall('POST', session, endpoint, params, onSuccess, onFailure)
}


// --------- --------- --------- --------- --------- ---------
export type RegisterBodyType = {
    email: string,
    password: string,
    verificationCode: number
}

export function register(body: RegisterBodyType, session: ReturnType<typeof useSession>, onSuccess: (response: AxiosResponse<any, any>) => void, onFailure: (error: any) => void) {
    axios.post('/auth/register', body).then(
        (response) => {
            onSuccess(response)
        }, (error) => {
            onFailure(error)
    });

    // const params: Params = { data: body }
    // const endpoint = '/auth/register'

    // publicCall('POST', session, endpoint, params, onSuccess, onFailure)
}

// --------- --------- --------- --------- --------- ---------