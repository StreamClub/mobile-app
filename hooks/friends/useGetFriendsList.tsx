import { Dispatch, SetStateAction } from "react";
import { useGetFriendsRequest } from "../../apiCalls/friends"
import { FriendRequestType } from "../../components/Profile/Friends/FriendRequestButton";

export const useGetFriendsRequests = (setFriendsRequests: Dispatch<SetStateAction<FriendRequestType[]>>) => {
  const { getFriendsRequests, loading } = useGetFriendsRequest();

  const onSuccessGetFriendsRequest = (response: any) => {
    setFriendsRequests(response.data.results);
  }

  const getFriendRequest = () => {
    getFriendsRequests(onSuccessGetFriendsRequest);
  }

  return {getFriendRequest, loading};
}