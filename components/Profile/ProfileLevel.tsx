import React from 'react';
import { BodyText } from '../BasicComponents/BodyText';
import { View } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { colors } from '../../assets';

export type ProfileLevelParams = {
  name: string,
  points: number,
  nextLevelThreshold: number
}

export const ProfileLevel = (params: ProfileLevelParams) => {
  return(
    <View>
      <BodyText body={params.name} size='big' style={{margin: 10}} />
      <ProgressBar progress={params.points/params.nextLevelThreshold} color={colors.primaryBlue} />
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <BodyText body={params.points + '/' + params.nextLevelThreshold} />
      </View>
    </View>
  )
}