import axios from 'axios';
import { AxiosResponse } from 'axios';

axios.defaults.baseURL = 'https://uapi.onrender.com'

export type logInBody = {
    email: string,
    password: string
}

export function logIn(body: logInBody, onSuccess: (response: AxiosResponse<any, any>) => void, onFailure: (error: any) => void) {
    axios.post('/auth/login', body
    ).then((response) => {
        onSuccess(response)
    }, (error) => {
        onFailure(error)
    });
}

