import axios from 'axios';
import { AxiosResponse } from 'axios';

axios.defaults.baseURL = 'https://capi-xf6o.onrender.com'
const country = "AR" //Esto hay que cambiarlo

// --------- --------- --------- --------- --------- ---------
export function getMovie(movieId: string, onSuccess: (response: AxiosResponse<any, any>) => void, onFailure: (error: any) => void) {
    axios.get('/movies/' + movieId, {params: {"country": country}}).then(
        (response) => {
            onSuccess(response)
        }, (error) => {
            onFailure(error)
    });
}

