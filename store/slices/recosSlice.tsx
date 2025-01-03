import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Reco } from '../../components/Types/Reco'
import { ContentType } from '../../components/Types/ContentType';
import { shuffleTwoLists } from '../../utils/shuffleLists';

const recosSlice = createSlice({
    name: 'recos',
    initialState: {
        userRecos: [] as Reco[],
        loadingUserMovieRecos: true,
        loadingUserSeriesRecos: true,
        userMovieRecos: [] as Reco[],
        userSeriesRecos: [] as Reco[],
    },
    reducers: {
        updateUserMovieRecos(state, action: PayloadAction<Reco[]>) {
            state.userMovieRecos = action.payload;
            state.userRecos = shuffleTwoLists(state.userMovieRecos, state.userSeriesRecos);

        },
        updateUserSeriesRecos(state, action: PayloadAction<Reco[]>) {
            state.userSeriesRecos = action.payload;
            state.userRecos = shuffleTwoLists(state.userMovieRecos, state.userSeriesRecos);
        },

        changeOnWatchlistState(
            state,
            action: PayloadAction<{ type: ContentType, id: number, inWatchlist: boolean }>
        ) {
            state.userRecos = getUpdatedRecos(state.userRecos, action);

            if (action.payload.type === ContentType.Movie) {
                state.userMovieRecos = getUpdatedRecos(state.userMovieRecos, action);
            } else {
                state.userSeriesRecos = getUpdatedRecos(state.userSeriesRecos, action);
            }
        },

        setLoadingUserMovieRecos(state, action: PayloadAction<boolean>) {
            state.loadingUserMovieRecos = action.payload;
        },
        setLoadingUserSeriesRecos(state, action: PayloadAction<boolean>) {
            state.loadingUserSeriesRecos = action.payload;
        },
    },
})

export const { updateUserMovieRecos, updateUserSeriesRecos, setLoadingUserMovieRecos, setLoadingUserSeriesRecos, changeOnWatchlistState } = recosSlice.actions
export default recosSlice.reducer

const getUpdatedRecos = (recos: Reco[], action: PayloadAction<{ type: ContentType, id: number, inWatchlist: boolean }>) => {
    return recos.map(entry => {
        if (entry.id === action.payload.id && entry.type === action.payload.type) {
            // Returns the updated entry
            const updatedEntry = { ...entry, inWatchlist: action.payload.inWatchlist };
            return updatedEntry;
        }
        else {
            // Returns the original entry
            return entry;
        }
    })
}
    