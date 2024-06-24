import React from 'react'
import { View, StyleSheet } from 'react-native'
import { colors } from '../../assets'
import { GenresChecklist } from './GenresChecklist';
import { DurationSlider } from './DurationSlider';

export const DiscoverForm = () => {

  return(
    <View style={styles.form}>
      <GenresChecklist />
      <DurationSlider />
    </View>
  )
}

const styles = StyleSheet.create({
  form: {
      backgroundColor: colors.primaryBlue,
      height: 500,
      width: 300,
      borderRadius: 10
  },
})
