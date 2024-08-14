import React, { useState } from 'react'
import { PrivacyButtonType } from './PrivacyButtonType'
import { ActivityIndicator, Icon, Switch } from 'react-native-paper'
import { colors } from '../../assets';
import { View } from 'react-native';
import { BodyText } from '../BasicComponents/BodyText';
import { useUpdateSeenContentPrivacy } from '../../apiCalls/privacy';

export const SeenContentPrivacyButton = (params: PrivacyButtonType) => {
  const [isPrivate, setIsPrivate] = useState(params.isPrivate);
  const {updateSeenContentPrivacy, loading} = useUpdateSeenContentPrivacy();

  const onSuccess = (response: any) => {
    console.log("Exito")
    setIsPrivate(response.data.isSeenContentListPrivate);
  }
  
  const onSwitchPress = () => {
    updateSeenContentPrivacy(!isPrivate, onSuccess);
  }
  
  return(
    <View style={{flexDirection: 'row', margin: 10}} >
      <View>
        <BodyText
          body='Contenido visto'
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