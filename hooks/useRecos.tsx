import { getSeenContentParams, useGetSeenContent } from "../apiCalls/content";
import { getProfileParams, useGetProfile, useGetWatchlist } from "../apiCalls/profile";
import { useGetRecos } from "../apiCalls/recos";

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

export const useRecos = () => {
  const session = useSession()
  const dispatch = useAppDispatch()
  const { getRecos } = useGetRecos();

  const onSuccessGetRecos = (response: any) => {
    const reco: Reco = {
      poster: '/uZGFIGIaQO7rFHeq6DhZbSGOwo3.jpg',
      services: [
        {
          logoPath: '/vbXJBJVv3u3YWt6ml0l0ldDblXT.jpg',
          displayPriority: 29,
          providerId: 569,
          providerName: "DocAlliance Films",
        },
      ],
      genres: ["Acción", "Aventura", "Comedia", "Drama"],
      duration: 90,
      type: ContentType.Movie,
      inWatchlist: false,
    }

    dispatch(setUserRecos([reco]))
  }

  const loadRecos = () => {
    getRecos(onSuccessGetRecos);
  }

  return { loadRecos }
}