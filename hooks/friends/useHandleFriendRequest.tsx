import { Dispatch, SetStateAction } from "react";
import { useRemoveFriendRequest } from "../../apiCalls/friends";

export const useHandleFriendRequest = (requestId: string, setShowRequest: Dispatch<SetStateAction<boolean>>) => {
  const { removeRequest, loading } = useRemoveFriendRequest();

  const onSuccessSendFriendRequest = (response: any) => {
    setShowRequest(false);
  }

  const acceptFriendRequest = () => {
    removeRequest(requestId, true, onSuccessSendFriendRequest);
  }

  const rejectFriendRequest = () => {
    removeRequest(requestId, false, onSuccessSendFriendRequest);
  }

  return {acceptFriendRequest, rejectFriendRequest, loading};
}