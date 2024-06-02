import React from "react";
import { UserEntry } from "../../entities/UsersListEntry";
import { ScrollView, View } from "react-native";
import { UsersListEntry } from "./UsersListEntry";

type UsersListParams = {
  usersList: UserEntry[]
}

export const UsersList = (params: UsersListParams) => {
  const users = params.usersList;

  return(
    <ScrollView style={{margin: 10, width: '100%'}} >
      {users.map((user, index) => (
        <View key={index}>
          <UsersListEntry user={user} />
          <View
            style={{
                height: 1,
                backgroundColor: 'black',
                width: '90%',
                marginBottom: 10,
                alignSelf: 'center',
            }}
          ></View>  
        </View>
      )
      )}
    </ScrollView>
  )

}