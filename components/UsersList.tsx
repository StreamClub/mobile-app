import React from "react";
import { UserEntry } from "../entities/UsersListEntry";
import { BodyText } from "./BasicComponents/BodyText";

type UsersListParams = {
  usersList: UserEntry[]
}

export const UsersList = (params: UsersListParams) => {
  const users = params.usersList;

  return(
    <BodyText body={users[0].displayName} />
  )

}