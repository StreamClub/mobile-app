import React, { useEffect, useState } from "react";
import { BodyText } from "../BasicComponents/BodyText";
import { useGetAllTrivias } from "../../apiCalls/trivias";
import { LoadingComponent } from "../BasicComponents/LoadingComponent";
import { View } from "react-native";
import { Trivia, TriviaCard } from "./TriviaCard";
import { ScrollView } from "react-native-gesture-handler";
import { getScreenSize } from "../../utils/screenUtils";

export const TriviasList = () => {
  const {getAllTrivias, loading} = useGetAllTrivias();
  const [trivias, setTrivias] = useState<Array<Trivia>>([]);
  const screenWidth = getScreenSize().width

  useEffect(() => {
    getAllTrivias(onSuccess);
  }, [])

  const onSuccess = (response: any) => {
    console.log(response.data);
    setTrivias(response.data)
  }

  return(
    <ScrollView style={{width: screenWidth}} >
      {loading?
        <LoadingComponent /> :
        trivias.map((trivia, index) => 
          <TriviaCard trivia={trivia} key={index} />
        )
      }
    </ScrollView>
  )
}
