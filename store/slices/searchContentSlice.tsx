import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CATEGORIES, INITIAL_CATEGORY } from '../../constants'

const searchContentSlice = createSlice({
    name: 'searchContent',
    initialState: {
        category: CATEGORIES[INITIAL_CATEGORY],
    },
    reducers: {
        setCategory(state, action: PayloadAction<string>) {
            state.category = action.payload
        },
    },
})

export const { setCategory } = searchContentSlice.actions
export default searchContentSlice.reducer
