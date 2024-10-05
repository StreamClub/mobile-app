
import { useGetMovieRecos, useGetSeriesRecos } from "../apiCalls/recos";
import { Reco } from "../components/Types/Reco";
import { ContentType } from "../components/Types/ContentType";
import { useSession } from "../context/ctx";
import { useAppDispatch } from './redux/useAppDispatch';
import { setLoadingUserMovieRecos, setLoadingUserSeriesRecos, updateUserMovieRecos, updateUserSeriesRecos } from '../store/slices/recosSlice';

export const useRecos = () => {
    const session = useSession()
    const dispatch = useAppDispatch()
    const { getMovieRecos } = useGetMovieRecos();
    const { getSeriesRecos } = useGetSeriesRecos();

    const onSuccessGetMovieRecos = (response: any) => {
        const rawRecos = response.data
        const recos = [] as Reco[]

        rawRecos.forEach((rawReco: any) => {
            const reco: Reco = {
                id: rawReco.id,
                title: rawReco.title,
                poster: rawReco.poster,
                releaseDate: rawReco.releaseDate,
                genres: rawReco.genres,
                duration: rawReco.duration,
                type: ContentType.Movie,
                inWatchlist: rawReco.inWatchlist,
            }
            recos.push(reco)
        })
        
        dispatch(updateUserMovieRecos(recos))
        dispatch(setLoadingUserMovieRecos(false))
    }

    const onSuccessGetSeriesRecos = (response: any) => {
        const rawRecos = response.data
        const recos = [] as Reco[]

        rawRecos.forEach((rawReco: any) => {
            const reco: Reco = {
                id: rawReco.id,
                title: rawReco.title,
                poster: rawReco.poster,
                releaseDate: rawReco.releaseDate,
                genres: rawReco.genres,
                duration: rawReco.duration,
                type: ContentType.Series,
                inWatchlist: rawReco.inWatchlist,
            }
            recos.push(reco)
        })
        
        dispatch(updateUserSeriesRecos(recos))
        dispatch(setLoadingUserSeriesRecos(false))
    }

    const loadRecos = () => {
        console.log("[loadRecos]")
        dispatch(setLoadingUserMovieRecos(true))
        dispatch(setLoadingUserSeriesRecos(true))
        getMovieRecos(onSuccessGetMovieRecos)
        getSeriesRecos(onSuccessGetSeriesRecos)
    }

    return { loadRecos }
}