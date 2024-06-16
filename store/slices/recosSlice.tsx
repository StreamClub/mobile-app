import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Reco } from '../../components/Types/Reco'

const recosSlice = createSlice({
    name: 'recos',
    initialState: {
        userRecos: [] as Reco[], //TODO definir tipo
        loading: true,
    },
    reducers: {
        setUserRecos(state, action: PayloadAction<Reco[]>) {
            state.userRecos = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
    },
})

export const { setUserRecos, setLoading } = recosSlice.actions
export default recosSlice.reducer
