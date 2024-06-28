import React, { Dispatch, SetStateAction, useState } from 'react';
import {StyleSheet, View} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { colors } from '../../assets';
import { BodyText } from '../BasicComponents/BodyText';

type DurationSliderParams = {
  duration: number[],
  setDuration: (values: number[]) => void
}

export const DurationSlider = (params: DurationSliderParams) => {



  return(
    <View style={{margin: 10}}>
      <BodyText 
        body='Duración:'
        color={colors.primaryWhite}
        size='big' />
      <MultiSlider
        values={params.duration}
        onValuesChange={params.setDuration}
        min={0}
        max={200}
        step={1}
        allowOverlap={false}
        snapped
        containerStyle={styles.slider}
        trackStyle={styles.sliderTrack}
        selectedStyle={styles.sliderSelected}
        markerStyle={styles.marker} />
      <View style={styles.durationsContainer}>
        <BodyText 
          body={params.duration[0].toString() + ' min'}
          color={colors.primaryWhite} />
        <BodyText 
          body={params.duration[1].toString() + ' min'}
          color={colors.primaryWhite} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  durationsContainer: {
    justifyContent: 'space-between', 
    flexDirection: 'row', 
    marginLeft: 20,
    marginRight: 20
  },
  slider: {
    marginTop: 10,
    marginBottom: 10,
    flex: 1,
  },
  sliderTrack: {
    height: 8,
    borderRadius: 5,
    backgroundColor: colors.primarySkyBlue,
  },
  sliderSelected: {
    backgroundColor: colors.secondaryBlue,
  },
  marker: {
    backgroundColor: colors.primaryWhite,
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.secondaryBlue,
  }
})
