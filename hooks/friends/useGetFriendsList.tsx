import { Dispatch, SetStateAction } from "react";
import { useGetFriendsRequest, useGetUsersFriends } from "../../apiCalls/friends"
import { FriendRequestType } from "../../components/Profile/Friends/FriendRequestButton";
import { FriendType } from "../../components/Profile/Friends/FriendEntry";

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

export const useGetFriends = (setFriends: Dispatch<SetStateAction<FriendType[]>>) => {
  const { getFriends: getFriendsApiCall, loading } = useGetUsersFriends();

  const onSuccessGetFriends = (response: any) => {
    setFriends(response.data.results);
  }

  const getFriends = () => {
    getFriendsApiCall(onSuccessGetFriends);
  }

  return {getFriends, loading};
}
