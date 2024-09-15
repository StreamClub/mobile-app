import React from 'react';
import { View, StyleSheet } from "react-native";
import { colors } from '../../assets';
import { TitleText } from '../../components/BasicComponents/TitleText';
import { BodyText } from '../../components/BasicComponents/BodyText';
import { ContentSelectionList } from '../../components/Recos/SubGroupRecommendations/ContentSelectionList';

export default function ContentSelect() {

  return (
    <View style={styles.container}>
      <TitleText 
        body='Algo similar a esto' 
        color={colors.primaryBlack}
        style={{margin: 10}} />
      <View style={styles.horizontalLine} />
      <BodyText
        body='Selecciona hasta 3 películas o series que hayas visto y recibe recomendaciones personalizadas de contenido similar. Te sugeriremos títulos que coincidan con tus gustos y preferencias basados en tus elecciones. ¡Descubre nuevas historias que podrían encantarte!'
        color={colors.primaryBlack}
        style={{margin: 15}} />
      <ContentSelectionList />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: colors.secondaryWhite
  },
  horizontalLine: {
    width: "95%",
    alignSelf: 'center',
    height: 1,
    backgroundColor: "black",
    borderRadius: 100,
    margin: 5
  }
})
