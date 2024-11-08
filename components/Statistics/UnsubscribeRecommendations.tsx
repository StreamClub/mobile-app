import React from "react";
import { TitleText } from "../BasicComponents/TitleText";
import { colors } from "../../assets";
import { View, StyleSheet } from "react-native";
import { ProviderStatsType } from "./types/ProviderStatsType";
import { BodyText } from "../BasicComponents/BodyText";
import { TmdbImage, TmdbImageType } from "../BasicComponents/TmdbImage";

type UnsubscribeRecommendationsType = {
  recommendations: Array<ProviderStatsType>,
  totalViewed: number
}

const roundToFive = (value:number) => {
  const rounded = Math.round(value / 5) * 5;
  return rounded === 0 ? 5 : rounded;
};

export const UnsubscribeRecommendations = (params: UnsubscribeRecommendationsType) => {
  return(
    <View>
      {params.recommendations.length > 0?
        <>
        <TitleText 
          body='Recomendamos dar de baja:' 
          color={colors.primaryBlack}
          style={{marginTop: 10}} />
        <BodyText
          body="En los últimos 6 meses, ha habido servicios que has usado poco. 
          Para optimizar tus gastos  te recomendamos considerar darte de baja de estos servicios:"
          size="big"
          color={colors.primaryBlack} />
        {params.recommendations.map((item, index) => (
          <View style={styles.platformRow} key={index}>
            <TmdbImage
              resource={item.logoPath}
              type={TmdbImageType.Cover}
              style={styles.logo} />
            <BodyText 
              body={item.providerName + ': solo el ' 
                + roundToFive((item.timeWatched / params.totalViewed) * 100)
                + '% de tu contenido visto proviene de este servicio.'}
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
