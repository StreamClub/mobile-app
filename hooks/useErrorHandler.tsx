import { useAppDispatch } from './redux/useAppDispatch';
import { setErrorMessage, setShowError } from '../store/slices/errorResponseSlice';

export const useErrorHandler = () => {
    const dispatch = useAppDispatch();
    
    const setError = (error: any) => {
        if(error.response?.data.error) {
            dispatch(setErrorMessage(error.response.data.error));
        } else {
            dispatch(setErrorMessage("Algo salió mal"));
        }
        dispatch(setShowError(true));
    }

    return { setError }
}
