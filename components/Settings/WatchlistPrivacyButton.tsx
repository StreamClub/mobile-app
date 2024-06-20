import React, { useState } from 'react'
import { PrivacyButtonType } from './PrivacyButtonType'
import { ActivityIndicator, Icon, Switch } from 'react-native-paper'
import { colors } from '../../assets';
import { View } from 'react-native';
import { BodyText } from '../BasicComponents/BodyText';
import { useUpdateWatchlistPrivacy } from '../../apiCalls/privacy';

export const WatchlistPrivacyButton = (params: PrivacyButtonType) => {
  const [isPrivate, setIsPrivate] = useState(params.isPrivate);
  const {updateWatchlistPrivacy, loading} = useUpdateWatchlistPrivacy();

  const onSuccess = (response: any) => {
    setIsPrivate(response.data.isWatchlistPrivate);
  }
  
  const onSwitchPress = () => {
    updateWatchlistPrivacy(!isPrivate, onSuccess);
  }
  
  return(
    <View style={{flexDirection: 'row', margin: 10}} >
      <View>
        <BodyText
          body='Watchlist'
          color={colors.primaryGrey}
          size='big'
          style={{marginRight: 10}} />
      </View>
      <View style={{flexDirection: 'row'}}>
        {loading?
          <ActivityIndicator size="small" animating={true} color={colors.primaryGrey} /> :
          <>
          <Switch 
            value={isPrivate}
            onValueChange={onSwitchPress}
            color={colors.primaryGrey} />
          <Icon 
            source={isPrivate? 'lock' : 'lock-open'}
            color={colors.primaryGrey}
            size={25}
          />
          </>
        }
      </View>
    </View>
  )
}