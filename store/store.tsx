import { configureStore } from '@reduxjs/toolkit'
import searchContentReducer from './slices/searchContentSlice'

export const store = configureStore({
    reducer: {
        searchContent: searchContentReducer,
    },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
