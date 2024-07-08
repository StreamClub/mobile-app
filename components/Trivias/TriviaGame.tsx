import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useGetTrivia } from "../../apiCalls/trivias";
import { TmdbImage, TmdbImageType } from "../BasicComponents/TmdbImage";
import { TitleText } from "../BasicComponents/TitleText";
import { colors } from "../../assets";
import { LoadingComponent } from "../BasicComponents/LoadingComponent";
import { Question, TriviaQuestion } from "./TriviaQuestion";
import { CustomButton } from "../BasicComponents/CustomButton";

type TriviaGameParams = {
  contentType: string,
  contentId: number
}

type TriviaGame = {
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
  const [index, setIndex] = useState(0);

  useEffect(() => {
    getTrivia(params.contentType, params.contentId.toString(), onSuccess);
  }, [])

  const onSuccess = (response: any) => {
    console.log(response.data);
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
          {triviaGame.questions.length > 0?
            <TriviaQuestion 
              question={triviaGame.questions[index]}
              questionNumber={index + 1}
              totalQuestions={triviaGame.questions.length} /> :
            null
          }
          <CustomButton 
            buttonText="Siguiente"
            type="primary"
            fontSize="small"
            buttonSize="medium"
            onPress={() => setIndex(index + 1)} />
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

