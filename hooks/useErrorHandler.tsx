import { useAppDispatch } from './redux/useAppDispatch';
import { setErrorMessage, setShowError } from '../store/slices/errorResponseSlice';

export const useErrorHandler = () => {
    const dispatch = useAppDispatch();
    
    const setError = (error: any) => {
        dispatch(setErrorMessage(error.response.data.error));
        dispatch(setShowError(true));
    }

    return { setError }
}
