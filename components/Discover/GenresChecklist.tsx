import React, { useState } from 'react';
import { BodyText } from '../BasicComponents/BodyText';
import { Checkbox } from 'react-native-paper';
import { colors } from '../../assets';
import { ScrollView, View, StyleSheet } from 'react-native';

const genres = [
  {
    "id": 28,
    "name": "Acción"
  },
  {
    "id": 12,
    "name": "Aventura"
  },
  {
    "id": 16,
    "name": "Animación"
  },
  {
    "id": 35,
    "name": "Comedia"
  },
  {
    "id": 80,
    "name": "Crimen"
  },
  {
    "id": 99,
    "name": "Documental"
  },
  {
    "id": 18,
    "name": "Drama"
  },
  {
    "id": 10751,
    "name": "Familia"
  },
  {
    "id": 14,
    "name": "Fantasía"
  },
  {
    "id": 36,
    "name": "Historia"
  },
  {
    "id": 27,
    "name": "Terror"
  },
  {
    "id": 10402,
    "name": "Música"
  },
  {
    "id": 9648,
    "name": "Misterio"
  },
  {
    "id": 10749,
    "name": "Romance"
  },
  {
    "id": 878,
    "name": "Ciencia ficción"
  },
  {
    "id": 10770,
    "name": "Película de TV"
  },
  {
    "id": 53,
    "name": "Suspense"
  },
  {
    "id": 10752,
    "name": "Bélica"
  },
  {
    "id": 37,
    "name": "Western"
  }
]

export const GenresChecklist = () => {
  const [checkedGenres, setCheckedGenres] = useState<Array<number>>([]);

  const markGenreAsChecked = (genre: number) => {
    if (checkedGenres.includes(genre)) {
      const newGenres = checkedGenres.filter((item) => item !== genre)  
      setCheckedGenres(newGenres);
      console.log(checkedGenres);
    } else {
      setCheckedGenres([...checkedGenres, genre]);
      console.log(checkedGenres);
    }
  }

  return(
    <View style={{margin: 10}}>
    <BodyText 
      body='Géneros:'
      color={colors.primaryWhite}
      size='big' />
    <ScrollView style={styles.genresScroll}>
      {genres.map((genre, index) => (
        <View style={styles.checkbox} key={index}>
          <BodyText body={genre.name} />
          <Checkbox
            status={checkedGenres.includes(genre.id) ? 'checked' : 'unchecked'}
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
