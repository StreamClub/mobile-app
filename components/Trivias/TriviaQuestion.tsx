import React, { useState } from "react";
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
  totalQuestions: number
}

export const TriviaQuestion = (params: TriviaQuestionParams) => {
  const [checked, setChecked] = useState('none');

  return(
    <View style={{backgroundColor: colors.primaryWhite, borderRadius: 10}} >
      <View style={{margin: 10}}>
        <TitleText 
          body={"Pregunta " + (params.questionNumber) + "/" + params.totalQuestions + ":"} />
        <BodyText body={params.question.question} />
        <View>
          {params.question.options.map((question, index) => 
            <View style={{flexDirection: 'row', alignContent: 'center'}} >
              <RadioButton
                value={question}
                status={ checked === question ? 'checked' : 'unchecked' }
                onPress={() => setChecked(question)}
                key={index}
                color={colors.primaryBlue}
                uncheckedColor={colors.primaryBlack} />
              <BodyText
                body={question}
                style={{margin: 5}} />
            </View>
          )}
        </View>
      </View>
    </View>
  )
}
