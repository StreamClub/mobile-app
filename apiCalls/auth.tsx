import { AxiosResponse } from 'axios';
import { publicCall, Params, usePublicCall } from './generic';
import { useSession } from '../context/ctx';


// --------- --------- --------- --------- --------- ---------
export type logInBody = {
    email: string,
    password: string
}

export const useLogIn = () => {
    const {loading, publicCall} = usePublicCall();

    const logIn = (body: logInBody, onSuccess: (response: AxiosResponse<any, any>) => void) => {
        const params: Params = { data: body }
        const endpoint = '/auth/login'
        publicCall('POST', endpoint, params, onSuccess);
    }
    return {logIn, loading};
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
