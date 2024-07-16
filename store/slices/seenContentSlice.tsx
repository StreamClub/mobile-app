import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { SeenContentEntry } from '../../components/Types/SeenContentEntry';

const recosSlice = createSlice({
    name: 'seenContent',
    initialState: {
        seenContent: [] as SeenContentEntry[],
        loadingFirstPage: true,
        nextPage: 2,
        userId: 0,
    },
    reducers: {
        updateSeenContent(state, action: PayloadAction<{page: number, seenContent: SeenContentEntry[]}>) {
            if (action.payload.page === 1) {
                state.seenContent = action.payload.seenContent;
            } else {
                state.seenContent = state.seenContent.concat(action.payload.seenContent);
            }
        },

        setLoadingFirstPage(state, action: PayloadAction<boolean>) {
            state.loadingFirstPage = action.payload;
        },

        setNextPage(state, action: PayloadAction<number>) {
            state.nextPage = action.payload;
        },

        setUserId(state, action: PayloadAction<number>) {
            state.userId = action.payload;
        },
    },
})

export const { updateSeenContent, setLoadingFirstPage, setNextPage, setUserId } = recosSlice.actions
export default recosSlice.reducer
    