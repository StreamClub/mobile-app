import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from "react-native";
import { colors } from '../../assets';
import { LogOutButton } from '../../components/LogOutButton';
import { useGetUsersPrivacy } from '../../apiCalls/privacy';
import { WatchlistPrivacyButton } from '../../components/Settings/WatchlistPrivacyButton';

export default function Services() {
  const {getUsersPrivacy, loading} = useGetUsersPrivacy();
  const [isWatchlistPrivate, setIsWatchlistPrivate] = useState(false);
  const [isSeenContentListPrivate, setIsSeenContentListPrivate] = useState(false);

  const onSuccess = (response: any)=> {
    console.log(response.data);
    setIsWatchlistPrivate(response.data.isWatchlistPrivate);
    setIsSeenContentListPrivate(response.data.isSeenContentListPrivate);
  }

  useEffect(() => {
    getUsersPrivacy(onSuccess);
  }, [])

  return (
    <View style={styles.container}>
      <View style={{margin: 20}} >
        <WatchlistPrivacyButton isPrivate={isWatchlistPrivate} />
        <LogOutButton />
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: 'black',
          width: '60%',
          marginBottom: 10,
          alignSelf: 'center',
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.secondaryWhite
  }
})
