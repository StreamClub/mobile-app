import { Dispatch, SetStateAction } from "react";
import { useRemoveFriend, useRemoveFriendRequest, useSendFriendRequest } from "../../apiCalls/friends"

export const useFriendsRequests = (userId: string, setHasFriendRequest: Dispatch<SetStateAction<boolean>>, setAreFriends: Dispatch<SetStateAction<boolean>>) => {
  const { sendRequest, loading: loadingSend } = useSendFriendRequest();
  const { removeRequest, loading: loadingRemove } = useRemoveFriendRequest();
  const { removeFriend: removeFriendCall, loading: loadingRemoveFriend } = useRemoveFriend();
  const loading = loadingRemove && loadingSend && loadingRemoveFriend;

  const onSuccessSendFriendRequest = (response: any) => {
    setHasFriendRequest(true);
  }

  const sendFriendRequest = () => {
    sendRequest(userId, onSuccessSendFriendRequest);
  }

  const onSuccessRemoveFriendRequest = (response: any) => {
    setHasFriendRequest(false);
  }

  const onSuccessRemoveFriend = (response: any) => {
    setAreFriends(false);
  }

  const removeFriendRequest = (requestId: string) => {
    console.log("Por eliminar la request");
    removeRequest(requestId, false, onSuccessRemoveFriendRequest);
  }

  const removeFriend = (userId: string) => {
    removeFriendCall(userId, onSuccessRemoveFriend);
  }

  return {sendFriendRequest, removeFriendRequest, removeFriend, loading};
}