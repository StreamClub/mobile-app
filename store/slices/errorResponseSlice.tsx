import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const errorResponseSlice = createSlice({
    name: 'errorResponse',
    initialState: {
        errorMessage: '',
        showError: false
    },
    reducers: {
        setErrorMessage(state, action: PayloadAction<string>) {
            state.errorMessage = action.payload;
        },
        setShowError(state, action: PayloadAction<boolean>) {
            state.showError = action.payload;
        }
    },
})

export const { setErrorMessage, setShowError } = errorResponseSlice.actions
export default errorResponseSlice.reducer
