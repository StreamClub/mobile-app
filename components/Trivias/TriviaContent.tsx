import React, { Dispatch, SetStateAction, useState } from "react";
import { View } from "react-native";
import { TriviaQuestion } from "./TriviaQuestion";
import { CustomButton } from "../BasicComponents/CustomButton";
import { TriviaGame } from "./TriviaGame";
import { TriviaResults } from "./TriviaResults";

type TriviaContentParams = {
  triviaGame: TriviaGame,
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

export const TriviaContent = (params: TriviaContentParams) => {
  const [index, setIndex] = useState(0);
  const [responses, setResponses] = useState<Array<string>>([]);
  const triviaGame = params.triviaGame;

  const pushResponse = (option: string) => {
    const newResponses = [...responses];
    newResponses[index] = option;
    setResponses(newResponses);
  }

  return(
    <View>
      {triviaGame.questions.length > 0 
      && index < triviaGame.questions.length?
        <View key={index}>
          <TriviaQuestion 
            question={triviaGame.questions[index]}
            questionNumber={index + 1}
            totalQuestions={triviaGame.questions.length}
            pushResponse={pushResponse} />
          <CustomButton 
            buttonText="Siguiente"
            type="primary"
            fontSize="small"
            buttonSize="medium"
            disabled={responses[index] == null}
            onPress={() => setIndex(index + 1)}
            style={{margin: 10, alignSelf: 'flex-end'}} />
        </View> :
        <View key={index}>
          <TriviaResults
            responses={responses}
            correctAnswers={triviaGame.questions.map(question => question.correctAnswer)} />
          <CustomButton 
            buttonText="Volver al listado"
            type="primary"
            fontSize="small"
            buttonSize="medium"
            onPress={() => params.setOpenModal(false)}
            style={{margin: 10, alignSelf: 'flex-end'}} />
        </View>
      }
      
    </View>
  )
}
