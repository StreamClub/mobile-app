
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
const fakeGenres = ["Acción", "Aventura", "Comedia", "Drama"]
const fakeDuration = 90
const mockInWatchlist = false

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
                genres: fakeGenres,
                duration: fakeDuration,
                type: ContentType.Movie,
                inWatchlist: mockInWatchlist,
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
                genres: fakeGenres,
                duration: fakeDuration,
                type: ContentType.Series,
                inWatchlist: mockInWatchlist,
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