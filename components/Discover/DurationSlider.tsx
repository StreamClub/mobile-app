import React, { Dispatch, SetStateAction, useState } from 'react';
import {StyleSheet, View} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { colors } from '../../assets';
import { BodyText } from '../BasicComponents/BodyText';
import { MOVIES_NAME, SERIES_NAME } from '../../constants';

type DurationSliderParams = {
  setRuntimeLte: Dispatch<SetStateAction<number>>,
  setRuntimeGte: Dispatch<SetStateAction<number>>,
  category: string
}

export const DurationSlider = (params: DurationSliderParams) => {
  const MAX_DURATION_SERIES = 100;
  const MAX_DURATION_MOVIES = 200;
  const [durationMovies, setDurationMovies] = useState([0,MAX_DURATION_MOVIES]);
  const [durationSeries, setDurationSeries] = useState([0,MAX_DURATION_SERIES]);

  const onMoviesValuesChange = (value: number[]) => {
    setDurationMovies(value);
    if(durationMovies[1] == MAX_DURATION_MOVIES) {
      params.setRuntimeLte(-1);
    } else {
      params.setRuntimeLte(durationMovies[1]);
    }
    params.setRuntimeGte(durationMovies[0]);
  }

  const onSeriesValuesChange = (value: number[]) => {
    setDurationSeries(value);
    if(durationSeries[1] == MAX_DURATION_SERIES) {
      params.setRuntimeLte(-1);
    } else {
      params.setRuntimeLte(durationSeries[1]);
    }
    params.setRuntimeGte(durationSeries[0]);
  }

  const maxDuration = params.category == MOVIES_NAME? durationMovies[1] : durationSeries[1];
  const minDuration = params.category == MOVIES_NAME? durationMovies[0] : durationSeries[0];

  return(
    <View style={{margin: 10}}>
      <BodyText 
        body='Duración:'
        color={colors.primaryWhite}
        size='big' />
      <MultiSlider
        values={params.category == MOVIES_NAME? durationMovies : durationSeries}
        onValuesChange={params.category == MOVIES_NAME? onMoviesValuesChange : onSeriesValuesChange}
        min={0}
        max={params.category == MOVIES_NAME ? MAX_DURATION_MOVIES : MAX_DURATION_SERIES}
        step={1}
        allowOverlap={false}
        snapped
        containerStyle={styles.slider}
        trackStyle={styles.sliderTrack}
        selectedStyle={styles.sliderSelected}
        markerStyle={styles.marker} />
      <View style={styles.durationsContainer}>
        <BodyText 
          body={minDuration.toString() + ' min'}
          color={colors.primaryWhite} />
        <BodyText 
          body={maxDuration.toString() + ' min'}
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
