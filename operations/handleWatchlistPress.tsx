import { addMovieToWatchlist, removeMovieFromWatchlist } from "../apiCalls/movies";
import { useSession } from "../context/ctx";

export const handleMovieWatchlistPress = (movieId: string, 
        setLoading: React.Dispatch<React.SetStateAction<boolean>>, 
        setInWatchlist: React.Dispatch<React.SetStateAction<boolean>>,
        inWatchlist: boolean,
        session: ReturnType<typeof useSession>) => {
    const onSuccessAdd = (response: any) => {
        console.log('Agrego a watchlist');
        setInWatchlist(true);
        setLoading(false);
    }
    
    const onSuccessRemove = (response: any) => {
        console.log('Borro de watchlist');
        setInWatchlist(false);
        setLoading(false);
    }
   
    const onFailure = (error: any) => {
        console.log(error);
        setLoading(false);
    }
    
    if (!inWatchlist) {
        addMovieToWatchlist(session, movieId, onSuccessAdd, onFailure);
    } else {
        removeMovieFromWatchlist(session, movieId, onSuccessRemove, onFailure);
    }
    setLoading(true);
}