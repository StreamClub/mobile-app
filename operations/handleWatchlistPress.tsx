import { ImageSourcePropType } from "react-native";
import { addMovieToWatchlist, removeMovieFromWatchlist } from "../apiCalls/movies";
import { MovieEntry } from "../components/MovieList";
import { useSession } from "../context/ctx";

export const handleWatchlistPress = (movie: MovieEntry, 
        setLoading: React.Dispatch<React.SetStateAction<boolean>>, 
        setWatchlistIcon: React.Dispatch<React.SetStateAction<boolean>>,
        inWatchlist: boolean,
        session: ReturnType<typeof useSession>) => {
    const onSuccessAdd = (response: any) => {
        console.log('Agrego a watchlist');
        setWatchlistIcon(true);
        setLoading(false);
    }
    
    const onSuccessRemove = (response: any) => {
        console.log('Borro de watchlist');
        setWatchlistIcon(false);
        setLoading(false);
    }
   
    const onFailure = (error: any) => {
        console.log(error);
        setLoading(false);
    }
    
    if (!inWatchlist) {
        addMovieToWatchlist(session, movie.id, onSuccessAdd, onFailure);
    } else {
        removeMovieFromWatchlist(session, movie.id, onSuccessRemove, onFailure);
    }
    setLoading(true);
}