import { getSeenContentParams, useGetSeenContent } from "../apiCalls/content";
import { getProfileParams, useGetProfile, useGetWatchlist } from "../apiCalls/profile";
import { useUserServices } from "../apiCalls/services";
import { CarouselEntry } from "../components/BasicComponents/Types/CarouselParams";
import { ProfileHeaderParams } from "../components/Profile/ProfileHeader";
import { ServiceEntry } from "../components/Types/Services";
import { SeenContentEntry } from "../components/Types/SeenContentEntry";
import { Dispatch, SetStateAction } from "react";
import { WatchlistEntry } from "../components/Types/Watchlist";
import { useSession } from "../context/ctx";

export const useProfile = (setWatchlist: Dispatch<SetStateAction<WatchlistEntry[]>>,
  setUserServices: Dispatch<SetStateAction<CarouselEntry[]>>, setSeenContent: Dispatch<SetStateAction<CarouselEntry[]>>,
  setProfileHeader: Dispatch<SetStateAction<ProfileHeaderParams>>, otherUserId?: number) => {
  
  const session = useSession()
  const sessionUserId = session?.userId? session?.userId : 0;
  const userId = otherUserId? otherUserId : sessionUserId;
  const {getWatchlist, loading: loadingWatchlist} = useGetWatchlist(userId);
  const {getUserServices, loading: loadingUserServices} = useUserServices(userId);
  const {getProfile, loading: loadingProfileHeader} = useGetProfile();
  const {getSeenContent, loading: loadingSeenContent} = useGetSeenContent();
  const loadingParams = loadingWatchlist || loadingProfileHeader || loadingUserServices || loadingSeenContent;

  const onSuccessGetWatchlist = (response: any) => {
    const watchlist:WatchlistEntry[] = response.data.results
    setWatchlist(watchlist)
  }

  const onSuccessGetProfile = (response: any) => {
    response.data.editable = otherUserId? false : true;
    let profileHeader: ProfileHeaderParams = response.data;
    setProfileHeader(profileHeader)
  }

  const onSuccessGetUserServices = (response: any) => {
    const _userServices: ServiceEntry[] = response.data.results
    const _carousel: CarouselEntry[] = []

    _userServices.forEach((service: ServiceEntry) => {
      _carousel.push({
        itemData: service,
        tmdbResource: service.logoPath,
      })
    })
    setUserServices(_carousel)
  }

  const onSuccessGetSeenContent = (response: any) => {
    const _seenContent: SeenContentEntry[] = response.data.results
    const _carousel: CarouselEntry[] = []

    _seenContent.forEach((contentData: SeenContentEntry) => {
      _carousel.push({
        itemData: contentData,
        tmdbResource: contentData.poster,
      })
    })
    setSeenContent(_carousel)
  }

  const getAll = () => {
    getWatchlist(onSuccessGetWatchlist);

    const profileParams: getProfileParams = {
      userId: userId? userId : 0,
    };
    getProfile(profileParams, onSuccessGetProfile);
    getUserServices(onSuccessGetUserServices);

    const seenContentParams: getSeenContentParams = {
      userId: userId ? userId : 0,
      page: 1,
      pageSize: 10,
    };
    getSeenContent(seenContentParams, onSuccessGetSeenContent);
  } 

  return {loadingParams, getAll}
}