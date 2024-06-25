
import { useGetMovieRecos, useGetSeriesRecos } from "../apiCalls/recos";
import { ServiceEntry } from "../components/Types/Services";
import { Reco } from "../components/Types/Reco";
import { ContentType } from "../components/Types/ContentType";
import { useSession } from "../context/ctx";
import { useAppDispatch } from './redux/useAppDispatch';
import { updateUserMovieRecos, updateUserSeriesRecos } from '../store/slices/recosSlice';

//todo: remover fakes cuando el backend este listo
const fakeServices = [{
    logoPath: '/vbXJBJVv3u3YWt6ml0l0ldDblXT.jpg',
    displayPriority: 29,
    providerId: 569,
    providerName: "DocAlliance Films",
}] as ServiceEntry[]

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
                services: fakeServices,
                genres: rawReco.genres,
                duration: rawReco.duration,
                type: ContentType.Movie,
                inWatchlist: rawReco.inWatchlist,
            }
            recos.push(reco)
        })
        
        dispatch(updateUserMovieRecos(recos))
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
                services: fakeServices,
                genres: rawReco.genres,
                duration: rawReco.duration,
                type: ContentType.Series,
                inWatchlist: rawReco.inWatchlist,
            }
            recos.push(reco)
        })
        
        dispatch(updateUserSeriesRecos(recos))
    }

    const loadRecos = () => {
        getMovieRecos(onSuccessGetMovieRecos);
        getSeriesRecos(onSuccessGetSeriesRecos)
    }

    return { loadRecos }
}