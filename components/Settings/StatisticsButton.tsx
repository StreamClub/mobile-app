import React from 'react'
import { Icon } from "react-native-paper"
import { Pressable, View } from 'react-native';
import { colors } from '../../assets';
import { BodyText } from '../BasicComponents/BodyText';
import { router } from 'expo-router';

export const StatisticsButton = () => {

  return (
    <Pressable onPress={() => router.push('/statistics')} >
      <View style={{flexDirection: 'row', margin: 10}} >
        <BodyText 
          body='Estadísticas de uso'  
          size='big'
          style={{marginRight: 10}}
          color={colors.primaryGrey} />
        <View style={{alignContent: 'flex-end'}}>
          <Icon 
            source="chart-bar"
            color={colors.primaryGrey}
            size={25} />
        </View>
      </View>
    </Pressable>
  )
}
