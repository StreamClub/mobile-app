import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Reco } from '../../components/Types/Reco'

const recosSlice = createSlice({
    name: 'recos',
    initialState: {
        userRecos: [] as Reco[],
        loadingUserRecos: true,

    },
    reducers: {
        setUserRecos(state, action: PayloadAction<Reco[]>) {
            state.userRecos = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loadingUserRecos = action.payload;
        },
    },
})

export const { setUserRecos, setLoading } = recosSlice.actions
export default recosSlice.reducer
