import React, { useState } from 'react';
import { View, StyleSheet } from "react-native";
import { colors } from '../../assets';
import { useGetUsersPrivacy } from '../../apiCalls/privacy';
import { WatchlistPrivacyButton } from '../../components/Settings/WatchlistPrivacyButton';
import { LogOutButton } from '../../components/Settings/LogOutButton';
import { TitleText } from '../../components/BasicComponents/TitleText';
import { SeenContentPrivacyButton } from '../../components/Settings/SeenContentPrivacyButton';
import { useOnFocus } from '../../hooks/useOnFocus';
import { LoadingComponent } from '../../components/BasicComponents/LoadingComponent';
import { StatisticsButton } from '../../components/Settings/StatisticsButton';

export default function Services() {
  const {getUsersPrivacy, loading} = useGetUsersPrivacy();
  const [isWatchlistPrivate, setIsWatchlistPrivate] = useState(false);
  const [isSeenContentListPrivate, setIsSeenContentListPrivate] = useState(false);

  const onSuccess = (response: any)=> {
    setIsWatchlistPrivate(response.data.isWatchlistPrivate);
    setIsSeenContentListPrivate(response.data.isSeenContentListPrivate);
  }

  useOnFocus(() => {
    getUsersPrivacy(onSuccess);
  })

  return (
    <View style={styles.container}>
      {loading?
        <LoadingComponent /> :
        <>
          <TitleText body='Configuración:' color={colors.primaryGrey}/>
          <WatchlistPrivacyButton isPrivate={isWatchlistPrivate} />
          <SeenContentPrivacyButton isPrivate={isSeenContentListPrivate} />
          <StatisticsButton />
          <LogOutButton />
        </>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondaryWhite
  }
})
