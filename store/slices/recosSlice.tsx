import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Reco } from '../../components/Types/Reco'

const recosSlice = createSlice({
    name: 'recos',
    initialState: {
        userRecos: [] as Reco[],
        loadingUserRecos: true,
        userMovieRecos: [] as Reco[],
        userSeriesRecos: [] as Reco[],
    },
    reducers: {
        updateUserMovieRecos(state, action: PayloadAction<Reco[]>) {
            state.userMovieRecos = action.payload;
            state.userRecos = state.userSeriesRecos.concat(action.payload);
        },
        updateUserSeriesRecos(state, action: PayloadAction<Reco[]>) {
            state.userSeriesRecos = action.payload;
            state.userRecos = state.userMovieRecos.concat(action.payload);
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loadingUserRecos = action.payload;
        },
    },
})

export const { updateUserMovieRecos, updateUserSeriesRecos, setLoading } = recosSlice.actions
export default recosSlice.reducer
