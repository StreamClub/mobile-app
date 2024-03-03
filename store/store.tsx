import { configureStore } from '@reduxjs/toolkit'
import searchContentReducer from './slices/searchContentSlice'
import errorResponseReducer from './slices/errorResponseSlice'

export const store = configureStore({
    reducer: {
        searchContent: searchContentReducer,
        errorResponse: errorResponseReducer
    },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
