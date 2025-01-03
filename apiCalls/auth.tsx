import { AxiosResponse } from 'axios';
import { Params, usePublicCall } from './generic';

// --------- --------- --------- --------- --------- ---------
export type logInBody = {
    email: string,
    password: string
}

export const useLogIn = () => {
    const {loading, publicCall} = usePublicCall();

    const logIn = (body: logInBody, onSuccess: (response: AxiosResponse<any, any>) => void,
    onFailure?: (error: any) => void) => {
        const params: Params = { data: body }
        const endpoint = '/auth/login'
        publicCall('POST', endpoint, params, onSuccess, onFailure);
    }

    return {logIn, loading};
}

export const useGoogleLogIn = () => {
    const {loading, publicCall} = usePublicCall();

    const googleLogIn = (body: logInBody, onSuccess: (response: AxiosResponse<any, any>) => void,
    onFailure: (error: any) => void) => {
        const params: Params = { data: body }
        const endpoint = '/auth/login/google'
        publicCall('POST', endpoint, params, onSuccess, onFailure);
    }
    
    return {googleLogIn, loading};
}

// --------- --------- --------- --------- --------- ---------
export type sendVerificationCodeBody = {
    email: string
}

export type RegisterBodyType = {
    email: string,
    password: string,
    verificationCode: number
}


export const useSignUp = () => {
    const {loading, publicCall} = usePublicCall()
    const sendVerification = (body: sendVerificationCodeBody,
        onSuccess: (response: AxiosResponse<any, any>) => void) => {
        const params: Params = { data: body }
        const endpoint = '/auth/sendVerificationCode'
        publicCall('POST', endpoint, params, onSuccess);
    }
    const register = (body: RegisterBodyType,
        onSuccess: (response: AxiosResponse<any, any>) => void) => {
        const params: Params = { data: body }
        const endpoint = '/auth/register'
        publicCall('POST', endpoint, params, onSuccess);
    }

    return {sendVerification, register, loading};
}
