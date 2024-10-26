import React, { useEffect, useState } from "react";
import { TitleText } from "../BasicComponents/TitleText";
import { View, StyleSheet } from "react-native";
import { useGetSubscribeRecommendations } from "../../apiCalls/statistics";
import { ProviderStatsType } from "./types/ProviderStatsType";
import { TmdbImage, TmdbImageType } from "../BasicComponents/TmdbImage";
import { BodyText } from "../BasicComponents/BodyText";

export const SubscribeRecommendations = () => {
  const {getSubscribeRecommendations, loading} = useGetSubscribeRecommendations();
  const [recommendations, setRecommendations] = useState<Array<ProviderStatsType>>([]);

  const onSuccess = (response: any) => {
    setRecommendations(response.data.recommendations);
  }

  useEffect(() => {
    getSubscribeRecommendations(onSuccess);
  }, [])

  return(
    <View>
      {recommendations.length > 0?
        <>
        <TitleText
          body="Servicios Recomendados" />
        {recommendations.map((item, index) => (
          <View style={styles.platformRow} key={index}>
            <TmdbImage
              resource={item.logoPath}
              type={TmdbImageType.Cover}
              style={styles.logo} />
            <BodyText 
              body={item.providerName + ': a tus amigos les encanta este servicio'}
              size='big'
              style={{margin: 10, flex: 1}} />
          </View>
        ))}
        </>
        : null
      }
    </View>
  )
}

const styles = StyleSheet.create({
  logo: {
    borderRadius: 20,
    height: 80,
    width: 80,
    justifyContent: 'center'
  },
  platformRow: {
    flexDirection: 'row',
    margin: 10
  }
});
