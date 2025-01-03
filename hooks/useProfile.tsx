import { getSeenContentParams, useGetSeenContent } from "../apiCalls/content";
import { getProfileParams, useGetProfile } from "../apiCalls/profile";
import { useUserServices } from "../apiCalls/services";
import { CarouselEntry } from "../components/BasicComponents/Types/CarouselParams";
import { ProfileHeaderParams } from "../components/Profile/ProfileHeader";
import { ServiceEntry } from "../components/Types/Services";
import { SeenContentEntry } from "../components/Types/SeenContentEntry";
import { Dispatch, SetStateAction } from "react";
import { useSession } from "../context/ctx";
import { SeenContent } from "../app/(tabs)/profile";

const INITIAL_PAGE = 1;

export const useProfile = (setUserServices: Dispatch<SetStateAction<CarouselEntry[]>>, 
  setSeenContent: Dispatch<SetStateAction<SeenContent>>,
  setProfileHeader: Dispatch<SetStateAction<ProfileHeaderParams>>, otherUserId?: number) => {
  
  const session = useSession()
  const sessionUserId = session?.userId? session?.userId : 0;
  const userId = otherUserId? otherUserId : sessionUserId;
  const {getUserServices, loading: loadingUserServices} = useUserServices(userId);
  const {getProfile, loading: loadingProfileHeader} = useGetProfile();
  const {getSeenContent, loading: loadingSeenContent} = useGetSeenContent();
  const loadingParams = loadingProfileHeader || loadingUserServices || loadingSeenContent;

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
    setSeenContent({isPublic: response.data.isPublic, results: _carousel})
  }

  const getAll = () => {
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