import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CATEGORIES, INITIAL_CATEGORY, MOVIES_NAME, SERIES_NAME } from '../../constants'
import { MovieEntry } from '../../entities/MovieListEntry'
import { SeriesEntry } from '../../entities/SeriesListEntry'
import { ArtistEntry } from '../../entities/ArtistListEntry'
import { UserEntry } from '../../entities/UsersListEntry'
import { SeasonDetail } from '../../entities/Details/Series/SeasonDetail'
import { Episode } from '../../entities/Details/Series/Episode'

const searchContentSlice = createSlice({
    name: 'searchContent',
    initialState: {
        category: INITIAL_CATEGORY,
        textSearched: '',
        loading: false,
        results: [] as MovieEntry[] | SeriesEntry[] | ArtistEntry[] | UserEntry[],
        focusedEntry: {
            id: "",
            seen: 0 as number,
            inWatchlist: false,
            type: MOVIES_NAME,
        },
        nextPage: 2,
        focusedSeason: {
            seriesId: 0,
            seasonId: 0,
            seen: false,
            episodes: [] as { episodeId: number, seen: boolean }[],
        } 
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
        
        updateSeenState(
            state,
            action: PayloadAction<{ category: string, seen: number, contentId: string }>
        ) {
            if (CATEGORIES[state.category] === action.payload.category) {
                console.log("Updating results..", CATEGORIES[state.category] === action.payload.category)
                const updatedResults = state.results.map(entry => {
                    if (entry.id == action.payload.contentId) {
                        // Returns the updated entry
                        console.log("Updating entry..")
                        const updatedEntry = { ...entry, seen: action.payload.seen };
                        return updatedEntry;
                    }
                    else {
                        // Returns the original entry
                        return entry;
                    }
                });
                state.results = updatedResults as MovieEntry[] | SeriesEntry[] | ArtistEntry[];
            }


            console.log("[updateSeenState] Updating seen state..")
            if (state.focusedEntry.id === action.payload.contentId && state.focusedEntry.type === action.payload.category) {
                console.log("[updateSeenState] Updating focused entry..")
                console.log("[updateSeenState] Focused entry id: ", state.focusedEntry.id)
                console.log("[updateSeenState] Action payload id: ", action.payload.contentId)
                console.log("[updateSeenState] Focused entry type: ", state.focusedEntry.type)
                console.log("[updateSeenState] Action payload type: ", action.payload.category)

                console.log({ action })
                console.log({ state })
                state.focusedEntry.seen = action.payload.seen as number
            }

            
        },

        setFocusedEntry(
            state,
            action: PayloadAction<{ id: string, seen: boolean | number, inWatchlist: boolean, type: string }>
        ) {
            state.focusedEntry.id = action.payload.id
            state.focusedEntry.seen = action.payload.seen as number
            state.focusedEntry.inWatchlist = action.payload.inWatchlist
            state.focusedEntry.type = action.payload.type
        },

        setFocusedSeason(
            state,
            action: PayloadAction<{
                seriesId: number,
                seasonId: number,
                seen: boolean,
                episodes: { episodeId: number, seen: boolean }[]
             }>
        ) {
            console.log("Setting focused season..")
            console.log(action.payload)
            state.focusedSeason = action.payload

        },

        updateEpisodeSeenState(
            state,
            action: PayloadAction<{ episodeId: number, seen: boolean }>
        ) {
            if (state.focusedSeason) {
                const updatedEpisodes = state.focusedSeason.episodes.map(episode => {
                    if (episode.episodeId == action.payload.episodeId) {
                        const updatedEpisode = { ...episode, seen: action.payload.seen };
                        return updatedEpisode;
                    }
                    else {
                        return episode;
                    }
                });
                state.focusedSeason.episodes = updatedEpisodes;
            }
            
            //if all episodes are seen, set the season to seen
            let allEpisodesSeen = true;
            state.focusedSeason?.episodes.forEach(episode => {
                if (episode.seen == false) {
                    allEpisodesSeen = false;
                }
            });
            if (state.focusedSeason) {
                if (allEpisodesSeen) {
                    state.focusedSeason.seen = true; 
                } else {
                    state.focusedSeason.seen = false;
                }
            }

        },

        updateSeasonSeenState(
            state,
            action: PayloadAction<{ seen: boolean }>
        ) {
            if (state.focusedSeason) {
                state.focusedSeason.seen = action.payload.seen;
            }

            // if the season is set to seen, set all episodes to seen
            if (action.payload.seen) {
                state.focusedSeason.episodes.forEach(episode => {
                    episode.seen = true;
                });
            } 
            // if the season is set to unseen, set all episodes to unseen
            else {
                state.focusedSeason.episodes.forEach(episode => {
                    episode.seen = false;
                });
            }
        },
        
        setNextPage(state, action: PayloadAction<number>) {
            state.nextPage = action.payload
        },
    },
})

export const { 
    setCategory, 
    setTextSearched, 
    setLoading, 
    setResults, 
    updateSeenState, 
    updateInWatchlistState, 
    setFocusedEntry, 
    setNextPage, 
    addResults,
    setFocusedSeason,
    updateEpisodeSeenState,
    updateSeasonSeenState
} =
    searchContentSlice.actions
export default searchContentSlice.reducer
