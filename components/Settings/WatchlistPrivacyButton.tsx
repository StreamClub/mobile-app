import React, { useState } from 'react'
import { PrivacyButtonType } from './PrivacyButtonType'
import { Icon, Switch } from 'react-native-paper'
import { colors } from '../../assets';
import { View } from 'react-native';
import { BodyText } from '../BasicComponents/BodyText';

export const WatchlistPrivacyButton = (params: PrivacyButtonType) => {
  const [isPrivate, setIsPrivate] = useState(params.isPrivate);
  
  const onSwitchPress = () => {
    setIsPrivate(!isPrivate);
  }
  
  return(
    <>
    <View style={{flexDirection: 'row'}} >
      <BodyText
        body='Watchlist'
        color={colors.primaryGrey}
        size='big' />
      <Switch 
        value={isPrivate}
        onValueChange={onSwitchPress}
        color={colors.primaryGrey} />
      <Icon 
        source={isPrivate? 'lock' : 'lock-open'}
        color={colors.primaryGrey}
        size={20}
      />
    </View>
    <View
      style={{
        height: 1,
        backgroundColor: 'black',
        width: '60%',
        marginBottom: 10,
        alignSelf: 'center',
      }} />
    </>
  )
}