import React, { Dispatch, SetStateAction, useState } from "react";
import { BodyText } from "../BasicComponents/BodyText";
import { View } from "react-native";
import { TitleText } from "../BasicComponents/TitleText";
import { colors } from "../../assets";
import { RadioButton } from "react-native-paper";

export type Question = {
  id: string,
  question: string,
  options: Array<string>,
  correctAnswer: string
}

type TriviaQuestionParams = {
  question: Question,
  questionNumber: number,
  totalQuestions: number,
  pushResponse: (option: string) => void
}

export const TriviaQuestion = (params: TriviaQuestionParams) => {
  const [checked, setChecked] = useState('none');

  const onCheck = (option: string) => {
    setChecked(option);
    params.pushResponse(option);
  }

  return(
    <View style={{backgroundColor: colors.primaryWhite, borderRadius: 10}} >
      <View style={{margin: 10}}>
        <TitleText 
          body={"Pregunta " + (params.questionNumber) + "/" + params.totalQuestions + ":"} />
        <BodyText body={params.question.question} />
        <View>
          {params.question.options.map((option, index) => 
            <View style={{flexDirection: 'row', alignContent: 'center'}} >
              <RadioButton
                value={option}
                status={ checked === option ? 'checked' : 'unchecked' }
                onPress={() => onCheck(option)}
                key={index}
                color={colors.primaryBlue}
                uncheckedColor={colors.primaryBlack} />
              <BodyText
                body={option}
                style={{margin: 5}} />
            </View>
          )}
        </View>
      </View>
    </View>
  )
}
