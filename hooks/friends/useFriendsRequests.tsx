import { Dispatch, SetStateAction } from "react";
import { useSendFriendRequest } from "../../apiCalls/friends"

export const useFriendsRequests = (userId: string, setHasFriendRequest: Dispatch<SetStateAction<boolean>>) => {
  const { sendRequest, loading } = useSendFriendRequest();

  const onSuccessSendFriendRequest = (response: any) => {
    console.log(response.data);
    setHasFriendRequest(true);
  }

  const sendFriendRequest = () => {
    sendRequest(userId, onSuccessSendFriendRequest);
  }

  

  return {sendFriendRequest, loading};
}