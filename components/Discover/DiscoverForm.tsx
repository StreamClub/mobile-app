import React, { Dispatch, SetStateAction, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { colors } from '../../assets'
import { GenresChecklist } from './GenresChecklist';
import { DurationSlider } from './DurationSlider';
import { MyPlatformsButton } from './MyPlatformsButton';
import { CustomButton } from '../BasicComponents/CustomButton';
import { DiscoverMovieParams, useDiscoverMovie } from '../../apiCalls/movies';
import { useDataToSerieEntryList } from '../../hooks/search/useSeriesEntryList';
import { serializeSearchResults } from '../../utils/serializeSearchResults';
import { MOVIES_NAME } from '../../constants';
import { ContentEntry } from '../../entities/ContentEntry';

type DiscoverFormParams = {
  setResults: Dispatch<SetStateAction<ContentEntry[]>>,
  setSearched: Dispatch<SetStateAction<boolean>>
}

export const DiscoverForm = (params: DiscoverFormParams) => {
  const [inMyPlatforms, setInMyPlatforms] = useState(false);
  const [duration, setDuration] = useState([0, 200]);
  const [checkedGenres, setCheckedGenres] = useState<Array<number>>([]);
  const {discoverMovie, loading} = useDiscoverMovie();
  const { toMovieListEntries } = useDataToSerieEntryList();

  const onSuccess = (response: any) => {
    console.log('Busqueda exitosa: ');
    console.log(response.data);
    const parsedResponse = toMovieListEntries(response.data)
    const serializedData = serializeSearchResults(parsedResponse, MOVIES_NAME);
    params.setResults(serializedData);
    params.setSearched(true);
  }

  const discover = () => {
    const filters: DiscoverMovieParams = {
      country: 'AR',
      page: 1,
      genderIds: checkedGenres.toString(),
      runtimeLte: duration[1],
      runtimeGte: duration[0],
      inMyPlatforms: inMyPlatforms
    }
    discoverMovie(filters, onSuccess);
  }

  return(
    <View style={styles.form}>
      <GenresChecklist
        checkedGenres={checkedGenres}
        setCheckedGenres={setCheckedGenres} />
      <DurationSlider
        duration={duration}
        setDuration={setDuration} />
      <MyPlatformsButton 
        inMyPlatforms={inMyPlatforms} 
        setInMyPlatforms={setInMyPlatforms} />
      <View style={{margin: 10, alignItems: 'flex-end'}}>
        <CustomButton
          buttonText='Descubrir'
          fontSize='small'
          buttonSize='medium'
          type='primary'
          onPress={discover}
          loading={loading} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  form: {
      backgroundColor: colors.primaryBlue,
      width: 300,
      borderRadius: 10
  },
})
