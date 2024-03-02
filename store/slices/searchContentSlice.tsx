import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CATEGORIES, INITIAL_CATEGORY } from '../../constants'
import { MovieEntry } from '../../entities/MovieListEntry'
import { SeriesEntry } from '../../entities/SeriesListEntry'
import { ArtistEntry } from '../../entities/ArtistListEntry'

const searchContentSlice = createSlice({
    name: 'searchContent',
    initialState: {
        category: CATEGORIES[INITIAL_CATEGORY],
        textSearched: '',
        loading: false,
        results: [] as (MovieEntry | SeriesEntry | ArtistEntry)[],
    },
    reducers: {
        setCategory(state, action: PayloadAction<string>) {
            state.category = action.payload
        },
        setTextSearched(state, action: PayloadAction<string>) {
            state.textSearched = action.payload
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload
        },
        setResults(
            state,
            action: PayloadAction<MovieEntry[] | SeriesEntry[] | ArtistEntry[]>
        ) {
            state.results = action.payload
        },
    },
})

export const { setCategory, setTextSearched, setLoading, setResults } =
    searchContentSlice.actions
export default searchContentSlice.reducer
