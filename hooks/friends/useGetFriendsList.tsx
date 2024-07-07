import { Dispatch, SetStateAction, useState } from "react";
import { useGetFriendsRequest, useGetUsersFriends } from "../../apiCalls/friends"
import { FriendRequestType } from "../../components/Profile/Friends/FriendRequestButton";
import { FriendType } from "../../components/Profile/Friends/FriendEntry";

export const useGetFriendsRequests = (setFriendsRequests: Dispatch<SetStateAction<FriendRequestType[]>>) => {
  const INITIAL_PAGE = 1;
  const [ nextPage, setNextPage ] = useState(INITIAL_PAGE+1);

  const { getFriendsRequests, loading } = useGetFriendsRequest();

  const onSuccessGetFriendsRequest = (response: any) => {
    setFriendsRequests(response.data.results);
  }

  const onSuccessGetFriendsRequestPage = (response: any) => {
    const newEntries:FriendRequestType[] = response.data.results;
    console.log('[onSuccessGetFriendsRequestPage]', newEntries)
    if (newEntries.length > 0) {
      setFriendsRequests(prevFriendsRequests => [...prevFriendsRequests, ...newEntries]);
      setNextPage(nextPage + 1);
    }
  }

  const getFriendRequest = () => {
    getFriendsRequests(INITIAL_PAGE, onSuccessGetFriendsRequest);
    setNextPage(INITIAL_PAGE + 1);
  }
  const onFriendsRequestsReachedEnd = () => {
    console.log('[onFriendsRequestsReachedEnd]')
    getFriendsRequests(nextPage, onSuccessGetFriendsRequestPage);
  }

  return {getFriendRequest, onFriendsRequestsReachedEnd, loading};
}

export const useGetFriends = (setFriends: Dispatch<SetStateAction<FriendType[]>>) => {
  const INITIAL_PAGE = 1;
  const [ nextPage, setNextPage ] = useState(INITIAL_PAGE+1);

  const { getFriends: getFriendsApiCall, loading } = useGetUsersFriends();

  const onSuccessGetFriends = (response: any) => {
    setFriends(response.data.results);
  }

  const onSuccessGetFriendsRequestPage = (response: any) => {
    const newEntries:FriendType[] = response.data.results;
    if (newEntries.length > 0)
      setFriends(prevFriends => [...prevFriends, ...newEntries]);
      setNextPage(nextPage + 1);
  }

  const getFriends = () => {
    getFriendsApiCall(INITIAL_PAGE, onSuccessGetFriends);
    setNextPage(INITIAL_PAGE + 1);
  }

  const onFriendsReachedEnd = () => {
    console.log('[onFriendsReachedEnd]')
    getFriendsApiCall(nextPage, onSuccessGetFriendsRequestPage);
  }

  return {getFriends, onFriendsReachedEnd, loading};
}
