import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CATEGORIES, INITIAL_CATEGORY, MOVIES_NAME, SERIES_NAME } from '../../constants'
import { MovieEntry } from '../../entities/MovieListEntry'
import { SeriesEntry } from '../../entities/SeriesListEntry'
import { ArtistEntry } from '../../entities/ArtistListEntry'
import { UserEntry } from '../../entities/UsersListEntry'

const searchContentSlice = createSlice({
    name: 'searchContent',
    initialState: {
        category: INITIAL_CATEGORY,
        textSearched: '',
        loading: false,
        results: [] as MovieEntry[] | SeriesEntry[] | ArtistEntry[] | UserEntry[],
        focusedEntry: {
            id: "",
            seen: false,
            inWatchlist: false,
            type: MOVIES_NAME
        },
        nextPage: 2,
    },
    reducers: {
        setCategory(state, action: PayloadAction<number>) {
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
            action: PayloadAction<MovieEntry[] | SeriesEntry[] | ArtistEntry[] | UserEntry[] >
        ) {
            console.log("Setting results.. " + JSON.stringify(action.payload))
            state.results = action.payload
        },
        addResults(
            state,
            action: PayloadAction<MovieEntry[] | SeriesEntry[] | ArtistEntry[] | UserEntry[] >
        ) {
            state.results = state.results.concat(action.payload)
        },
        updateInWatchlistState(
            state,
            action: PayloadAction<{ category: string, inWatchlist: boolean, contentId: string }>
        ) {
            const PAYLOAD = action.payload
            console.log({ PAYLOAD })
            console.log(state.category)
            console.log(state.results)
            if (CATEGORIES[state.category] === action.payload.category) {
                console.log("Updating results..", CATEGORIES[state.category] === action.payload.category)
                const updatedResults = state.results.map(entry => {
                    if (entry.id == action.payload.contentId) {
                        // Returns the updated entry
                        console.log("Updating entry..")
                        const updatedEntry = { ...entry, inWatchlist: action.payload.inWatchlist };
                        return updatedEntry;
                    }
                    else {
                        // Returns the original entry
                        return entry;
                    }
                });
                state.results = updatedResults as MovieEntry[] | SeriesEntry[] | ArtistEntry[];
            }

            if (state.focusedEntry.id === action.payload.contentId && state.focusedEntry.type === action.payload.category) {
                state.focusedEntry.inWatchlist = action.payload.inWatchlist
            }
        },
        
        setFocusedEntry(
            state,
            action: PayloadAction<{ id: string, seen: boolean, inWatchlist: boolean, type: string }>
        ) {
            state.focusedEntry = action.payload
        },
        
        setNextPage(state, action: PayloadAction<number>) {
            state.nextPage = action.payload
        },
    },
})

export const { setCategory, setTextSearched, setLoading, setResults, updateInWatchlistState, setFocusedEntry, setNextPage, addResults } =
    searchContentSlice.actions
export default searchContentSlice.reducer
