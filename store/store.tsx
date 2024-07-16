import { configureStore } from '@reduxjs/toolkit'
import searchContentReducer from './slices/searchContentSlice'
import errorResponseReducer from './slices/errorResponseSlice'
import recosReducer from './slices/recosSlice'
import seenContentReducer from './slices/seenContentSlice'

export const store = configureStore({
    reducer: {
        searchContent: searchContentReducer,
        errorResponse: errorResponseReducer,
        recos: recosReducer,
        seenContent: seenContentReducer
    },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
