import { getSeenContentParams, useGetSeenContent } from "../apiCalls/content";
import { getProfileParams, useGetProfile, useGetWatchlist } from "../apiCalls/profile";
import { useGetMovieRecos } from "../apiCalls/recos";

import { useUserServices } from "../apiCalls/services";
import { CarouselEntry } from "../components/BasicComponents/Types/CarouselParams";
import { ProfileHeaderParams } from "../components/Profile/ProfileHeader";
import { ServiceEntry } from "../components/Types/Services";
import { Reco } from "../components/Types/Reco";
import { ContentType } from "../components/Types/ContentType";
import { SeenContentEntry } from "../components/Types/SeenContentEntry";
import { Dispatch, SetStateAction } from "react";
import { WatchlistEntry } from "../components/Types/Watchlist";
import { useSession } from "../context/ctx";

import { useAppDispatch } from './redux/useAppDispatch';
import { setUserRecos } from '../store/slices/recosSlice';

//todo: remover cuando el backend este listo
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

    const onSuccessGetRecos = (response: any) => {
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
        
        dispatch(setUserRecos(recos))
    }

    const loadRecos = () => {
        getMovieRecos(onSuccessGetRecos);
    }

    return { loadRecos }
}