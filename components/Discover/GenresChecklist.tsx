import React, { Dispatch, SetStateAction } from 'react';
import { BodyText } from '../BasicComponents/BodyText';
import { Checkbox } from 'react-native-paper';
import { colors } from '../../assets';
import { ScrollView, View, StyleSheet } from 'react-native';
import { movie_genres, series_genres } from './genres_list';
import { MOVIES_NAME } from '../../constants';

type GenresChecklistParams = {
  checkedGenres: Array<number>,
  setCheckedGenres: Dispatch<SetStateAction<Array<number>>>,
  selectedCategory: string
}

export const GenresChecklist = (params: GenresChecklistParams) => {

  const markGenreAsChecked = (genre: number) => {
    if (params.checkedGenres.includes(genre)) {
      const newGenres = params.checkedGenres.filter((item) => item !== genre)  
      params.setCheckedGenres(newGenres);
    } else {
      params.setCheckedGenres([...params.checkedGenres, genre]);
    }
  }

  return(
    <View style={{margin: 10}}>
    <BodyText 
      body='Géneros:'
      color={colors.primaryWhite}
      size='big' />
    <ScrollView style={styles.genresScroll}>
      {(params.selectedCategory == MOVIES_NAME? movie_genres : series_genres).map((genre, index) => (
        <View style={styles.checkbox} key={index}>
          <BodyText body={genre.name} />
          <Checkbox
            status={params.checkedGenres.includes(genre.id) ? 'checked' : 'unchecked'}
            onPress={() => markGenreAsChecked(genre.id)}
            color={colors.secondaryBlue} />
        </View>
      ))}
    </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  genresScroll: {
    height: 200, 
    backgroundColor: colors.primaryWhite, 
    margin: 5,
    borderRadius: 5
  },
  checkbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 5,
  }
})
