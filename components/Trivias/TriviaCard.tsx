import React from "react";
import { StyleSheet, View } from 'react-native'
import { colors } from "../../assets";
import { BodyText } from "../BasicComponents/BodyText";
import { TitleText } from "../BasicComponents/TitleText";
import { TmdbImage, TmdbImageType } from "../BasicComponents/TmdbImage";
import { ScrollView } from "react-native-gesture-handler";
import { CustomButton } from "../BasicComponents/CustomButton";
import { Overlay } from "react-native-elements";

export type Trivia = {
  id: string,
  contentId: number,
  contentType: string,
  poster: string,
  title: string
}

type TriviaCardParams = {
  trivia: Trivia
}

export const TriviaCard = (params: TriviaCardParams) => {
  const trivia = params.trivia;

  return(
    <View style={styles.card} >
      <TmdbImage
        resource={trivia.poster}
        type={TmdbImageType.Cover}
        style={styles.triviaPoster} />
      <View style={{flex: 1}}>
        <TitleText 
          body={trivia.title}
          style={{margin: 10}} />
        <View style={styles.buttonContainer}>
          <CustomButton 
            buttonText="Jugar"
            type="primary"
            fontSize="small"
            buttonSize="medium"
            onPress={() => console.log("Jugando")} />
        </View>
      </View>
    </View>
  )
}

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primaryBlue,
    margin: 10,
    borderRadius: 20,
    flexDirection: 'row'
  },
  triviaPoster: {
    width: 100,
    height: 150,
    margin: 10,
    borderRadius: 10
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    flex: 1,
    margin: 10
  }
})
