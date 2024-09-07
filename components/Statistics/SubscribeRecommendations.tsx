import React, { useEffect, useState } from "react";
import { TitleText } from "../BasicComponents/TitleText";
import { View } from "react-native";
import { useGetSubscribeRecommendations } from "../../apiCalls/statistics";

export const SubscribeRecommendations = () => {
  const {getSubscribeRecommendations, loading} = useGetSubscribeRecommendations();
  const [recommendations, setRecommendations] = useState([]);

  const onSuccess = (response: any) => {
    console.log(response.data)
  }

  useEffect(() => {
    getSubscribeRecommendations(onSuccess);
  }, [])

  return(
    <View>
      <TitleText
        body="Servicios Recomendados" />
    </View>
  )
}
