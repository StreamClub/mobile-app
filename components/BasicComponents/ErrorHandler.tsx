import React from 'react'
import { Snackbar } from "react-native-paper"
import { useAppSelector } from '../../hooks/redux/useAppSelector'
import { useAppDispatch } from '../../hooks/redux/useAppDispatch'
import { setShowError } from '../../store/slices/errorResponseSlice'

export const ErrorHandler = () => {
    const { errorMessage, showError } = useAppSelector(
        (state) => state.errorResponse
    )
    const dispatch = useAppDispatch();
    const onDismissSnackBar = () => {
        dispatch(setShowError(false));
    }
    return (
        <Snackbar
            visible={showError}
            onDismiss={onDismissSnackBar}
            action={{
            label: 'X',
            }}>
            {errorMessage}
        </Snackbar>
    )
}