import React from "react";
import { View } from "react-native";
import { colors } from "../../assets";
import { TitleText } from "../BasicComponents/TitleText";
import { BodyText } from "../BasicComponents/BodyText";

type TriviaResultsParams = {
  responses: Array<string>,
  correctAnswers: Array<string>
}

export const TriviaResults = (params: TriviaResultsParams) => {

  const calculateScore = () => {
    let score = 0;
    for (let i = 0; i < params.responses.length; i++) {
      if (params.correctAnswers[i] == params.responses[i]) {
        score += 1;
      }
    }
    return score;
  }

  const score = calculateScore();
  console.log(params);

  return (
    <View style={{backgroundColor: colors.primaryWhite, borderRadius: 10}} >
        <View style={{margin: 10}}>
          <TitleText 
            body={"Puntaje " + score + "/" + params.responses.length + ":"} />
          <View>
            {params.responses.map((response, index) => 
              <View style={{flexDirection: 'row', alignContent: 'center'}} key={index} >
                <BodyText
                  body={"Pregunta " + (index + 1) + ": " + response}
                  style={{margin: 5}}
                  color={response == params.correctAnswers[index]? colors.primaryBlue : colors.primaryRed} />
              </View>
            )}
          </View>
        </View>
      </View>
  )  
}
