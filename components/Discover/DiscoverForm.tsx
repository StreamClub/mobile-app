import React, { Dispatch, SetStateAction, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { colors } from '../../assets'
import { GenresChecklist } from './GenresChecklist';
import { DurationSlider } from './DurationSlider';
import { MyPlatformsButton } from './MyPlatformsButton';
import { CustomButton } from '../BasicComponents/CustomButton';
import { CATEGORIES, INITIAL_CATEGORY } from '../../constants';
import { ContentEntry } from '../../entities/ContentEntry';
import { DiscoverCategories } from './DiscoverCategories';
import { useDiscoverContent } from '../../hooks/search/useDiscoverContent';
import { DiscoverParams } from '../../apiCalls/movies';

type DiscoverFormParams = {
  setResults: Dispatch<SetStateAction<ContentEntry[]>>,
  setSearched: Dispatch<SetStateAction<boolean>>,
  setFilters: Dispatch<SetStateAction<any>>
}

export const DiscoverForm = (params: DiscoverFormParams) => {
  const [inMyPlatforms, setInMyPlatforms] = useState(false);
  const [runtimeLte, setRuntimeLte] = useState(-1);
  const [runtimeGte, setRuntimeGte] = useState(0);
  const [checkedGenres, setCheckedGenres] = useState<Array<number>>([]);
  const [selectedCategory, setSelectedCategory] = useState(INITIAL_CATEGORY);

  const setResults = (serializedData: ContentEntry[]) => {
    params.setResults(serializedData);
  }

  const {discover, loading} = useDiscoverContent(setResults, params.setSearched);

  const onDiscoverPress = () => {
    const filters: DiscoverParams = {
      country: 'AR',
      page: 1,
      genderIds: checkedGenres.toString(),
      ...(runtimeLte !== -1 && { runtimeLte: runtimeLte }),
      runtimeGte: runtimeGte,
      inMyPlatforms: inMyPlatforms
    }
    params.setFilters(filters);
    discover(selectedCategory, filters);
  }

  return(
    <View style={styles.form}>
      <DiscoverCategories
        setSelectedCategory={setSelectedCategory} />
      <GenresChecklist
        checkedGenres={checkedGenres}
        setCheckedGenres={setCheckedGenres}
        selectedCategory={CATEGORIES[selectedCategory]} />
      <DurationSlider
        setRuntimeGte={setRuntimeGte}
        setRuntimeLte={setRuntimeLte}
        category={CATEGORIES[selectedCategory]} />
      <MyPlatformsButton 
        inMyPlatforms={inMyPlatforms} 
        setInMyPlatforms={setInMyPlatforms} />
      <View style={{margin: 10, alignItems: 'flex-end'}}>
        <CustomButton
          buttonText='Descubrir'
          fontSize='small'
          buttonSize='medium'
          type='primary'
          onPress={onDiscoverPress}
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
