import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useGetTrivia } from "../../apiCalls/trivias";
import { TmdbImage, TmdbImageType } from "../BasicComponents/TmdbImage";
import { TitleText } from "../BasicComponents/TitleText";
import { colors } from "../../assets";
import { LoadingComponent } from "../BasicComponents/LoadingComponent";
import { Question } from "./TriviaQuestion";
import { TriviaContent } from "./TriviaContent";

type TriviaGameParams = {
  contentType: string,
  contentId: number,
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

export type TriviaGame = {
  id: string,
  contentId: number,
  contentType: string,
  poster: string,
  title: string,
  questions: Array<Question>
}

const emptyTriviaGame: TriviaGame = {
  id: '',
  contentId: 0,
  contentType: '',
  poster: '',
  title: '',
  questions: []
}

export const TriviaGame = (params: TriviaGameParams) => {
  const {getTrivia, loading} = useGetTrivia();
  const [triviaGame, setTriviaGame] = useState<TriviaGame>(emptyTriviaGame);

  useEffect(() => {
    getTrivia(params.contentType, params.contentId.toString(), onSuccess);
  }, [])

  const onSuccess = (response: any) => {
    setTriviaGame(response.data);
  }
  
  return(
    <View>
      {loading?
        <LoadingComponent /> :
        <View>
          <View style={{flexDirection: 'row'}} >
            <TmdbImage
              resource={triviaGame.poster}
              type={TmdbImageType.Cover}
              style={styles.triviaPoster} />
            <TitleText 
              body={triviaGame.title}
              style={{margin: 10}} />
          </View>
          <TriviaContent 
            triviaGame={triviaGame}
            setOpenModal={params.setOpenModal} />
        </View>
      }
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
