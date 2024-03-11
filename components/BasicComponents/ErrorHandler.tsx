import React from 'react'
import { Snackbar } from "react-native-paper"
import { useAppSelector } from '../../hooks/redux/useAppSelector'
import { useAppDispatch } from '../../hooks/redux/useAppDispatch'
import { setShowError } from '../../store/slices/errorResponseSlice'
import { colors } from '../../assets'
import { BodyText } from './BodyText'

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
                label: 'CERRAR',
                onPress: onDismissSnackBar,
                textColor: colors.primaryWhite
            }}
            style={{backgroundColor: colors.primaryRed}}>
            <BodyText body={errorMessage} size='big' color={colors.primaryWhite} />
        </Snackbar>
    )
}