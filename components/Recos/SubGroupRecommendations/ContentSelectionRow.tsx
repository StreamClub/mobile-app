import React from "react";
import { SeenContentEntry } from "../../Types/SeenContentEntry";
import { View, StyleSheet } from "react-native";
import { TmdbImage, TmdbImageType } from "../../BasicComponents/TmdbImage";
import { BodyText } from "../../BasicComponents/BodyText";
import { Checkbox } from "react-native-paper";
import { colors } from "../../../assets";

type ContentSelectionRowType = {
  movie: SeenContentEntry,
  pushSelection: (movieId: number) => void,
  checked: Array<number>
}

export const ContentSelectionRow = (params: ContentSelectionRowType) => {
  const movie =  params.movie;
  
  return(
    <View style={styles.row}>
      <View style={{flexDirection: 'row', flex: 0.7}}>
        <TmdbImage
          resource={movie.poster}
          type={TmdbImageType.Cover}
          style={styles.posterStyle} />
        <BodyText 
          body={movie.title}
          size="big"
          style={{flex: 1, margin: 5}} />
      </View>
      <View style={{flex: 0.4}}>
        <Checkbox
          status={params.checked.includes(movie.id) ? 'checked' : 'unchecked'}
          onPress={() =>
            params.pushSelection(movie.id)}
          color={colors.primaryBlue}
          disabled={((params.checked.length >= 3) && (!params.checked.includes(movie.id)))} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  posterStyle: {
    width: 100,
    aspectRatio: 2/3,
  },
  row: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    margin: 5, 
    width: '90%',
    alignItems: 'center'
  }
})
