import { ImageSourcePropType } from "react-native";
import { addMovieToWatchlist, removeMovieFromWatchlist } from "../apiCalls/movies";
import { MovieEntry } from "../components/MovieList";
import { useSession } from "../context/ctx";

export const handleWatchlistPress = (movie: MovieEntry, 
        setLoading: React.Dispatch<React.SetStateAction<boolean>>, 
        setWatchlistIcon: React.Dispatch<React.SetStateAction<ImageSourcePropType>>,
        session: ReturnType<typeof useSession>) => {
    const onSuccessAdd = (response: any) => {
        console.log('Agrego a watchlist');
        setWatchlistIcon(require('../assets/icons/removeFromWatchlist.png'));
        setLoading(false);
    }
    
    const onSuccessRemove = (response: any) => {
        console.log('Borro de watchlist');
        setWatchlistIcon(require('../assets/icons/addToWatchlist.png'));
        setLoading(false);
    }
   
    const onFailure = (error: any) => {
        console.log(error);
        setLoading(false);
    }
    
    if (!movie.inWatchlist) {
        addMovieToWatchlist(session, movie.id, onSuccessAdd, onFailure);
    } else {
        removeMovieFromWatchlist(session, movie.id, onSuccessRemove, onFailure);
    }
    setLoading(true);
}