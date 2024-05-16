import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CATEGORIES, INITIAL_CATEGORY, MOVIES_NAME, SERIES_NAME } from '../../constants'
import { MovieEntry } from '../../entities/MovieListEntry'
import { SeriesEntry } from '../../entities/SeriesListEntry'
import { ArtistEntry } from '../../entities/ArtistListEntry'

const searchContentSlice = createSlice({
    name: 'searchContent',
    initialState: {
        category: CATEGORIES[INITIAL_CATEGORY],
        textSearched: '',
        loading: false,
        results: [] as MovieEntry[] | SeriesEntry[] | ArtistEntry[],
        focusedEntry: {
            id: "",
            seen: false,
            inWatchlist: false,
        }
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
        updateInWatchlistState(
            state,
            action: PayloadAction<{ category: string, inWatchlist: boolean, contentId: string }>
        ) {
            const x = action.payload
            console.log({x})
            if (state.category === action.payload.category) {
                const updatedResults = state.results.map(entry => {
                    if (entry.id === action.payload.contentId) {
                        // Returns the updated entry
                        const updatedEntry = { ...entry, inWatchlist: action.payload.inWatchlist };
                        return updatedEntry;
                    }
                    else {
                        // Returns the original entry
                        return entry;
                    }
                });
                state.results = updatedResults as MovieEntry[] | SeriesEntry[] | ArtistEntry[];
                
                if (state.focusedEntry.id === action.payload.contentId) {
                    state.focusedEntry.inWatchlist = action.payload.inWatchlist
                }
            }
        },
        setFocusedEntry(
            state,
            action: PayloadAction<{ id: string, seen: boolean, inWatchlist: boolean }>
        ) {
            state.focusedEntry = action.payload
        },
    },
})

export const { setCategory, setTextSearched, setLoading, setResults, updateInWatchlistState, setFocusedEntry } =
    searchContentSlice.actions
export default searchContentSlice.reducer
