import React, { Dispatch, SetStateAction, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { colors } from '../../assets'
import { GenresChecklist } from './GenresChecklist';
import { DurationSlider } from './DurationSlider';
import { MyPlatformsButton } from './MyPlatformsButton';
import { CustomButton } from '../BasicComponents/CustomButton';
import { CATEGORIES, INITIAL_CATEGORY, MOVIES_NAME } from '../../constants';
import { ContentEntry } from '../../entities/ContentEntry';
import { DiscoverCategories } from './DiscoverCategories';
import { useDiscoverContent } from '../../hooks/search/useDiscoverContent';

type DiscoverFormParams = {
  setResults: Dispatch<SetStateAction<ContentEntry[]>>,
  setSearched: Dispatch<SetStateAction<boolean>>
}

export const DiscoverForm = (params: DiscoverFormParams) => {
  const [inMyPlatforms, setInMyPlatforms] = useState(false);
  const [runtimeLte, setRuntimeLte] = useState(-1);
  const [runtimeGte, setRuntimeGte] = useState(0);
  const [checkedGenres, setCheckedGenres] = useState<Array<number>>([]);
  const [selectedCategory, setSelectedCategory] = useState(INITIAL_CATEGORY);
  const {discover, loading} = useDiscoverContent(params.setResults, params.setSearched);

  const onDiscoverPress = () => {
    discover(selectedCategory,checkedGenres,runtimeLte,runtimeGte,inMyPlatforms);
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
