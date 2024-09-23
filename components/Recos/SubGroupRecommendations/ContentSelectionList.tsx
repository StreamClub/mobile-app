import React, { useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { useSeenContent } from "../../../hooks/useSeenContent";
import { useAppSelector } from "../../../hooks/redux/useAppSelector";
import { BodyText } from "../../BasicComponents/BodyText";
import { SeenContentEntry } from "../../Types/SeenContentEntry";
import { ContentSelectionRow } from "./ContentSelectionRow";
import { CustomButton } from "../../BasicComponents/CustomButton";
import { colors } from "../../../assets";
import { router } from "expo-router";
import { SubGroupRecommendationsType } from "../../../app/(app)/subGroupRecommendations";

type ContentSelectionListType = {
  selectedCategory: number
}

export const ContentSelectionList = (params: ContentSelectionListType) => {
  const [checked, setChecked] = useState<Array<number>>([]);
  const { loadSeenContentPage } = useSeenContent();
  const selectedCategory = params.selectedCategory;
  const { seenContent } = useAppSelector((state) => state.seenContent);

  const pushSelection = (movieId: number) => {
    if (checked.includes(movieId)) {
      setChecked(checked.filter(item => item !== movieId));
    } else if (checked.length < 3) {
      setChecked([...checked, movieId]);
    }
  }

  const renderSeenContentRow = (movie: SeenContentEntry, index: number) => {
    return(
      <View key={index}>
        <ContentSelectionRow
          movie={movie}
          pushSelection={pushSelection}
          checked={checked} />
        <View style={styles.horizontalLine} />
      </View>
    )
  }

  const onPress = () => {
    const category = (selectedCategory == 0? 'movie' : 'series');
    const params: SubGroupRecommendationsType = {
      selectedContent: checked.join(','),
      category: category
    }
    router.push({pathname: '/subGroupRecommendations', params: params})
  }

  return(
    <>
      <CustomButton
        buttonText="Recibir recomendaciones"
        fontSize="medium"
        onPress={onPress}
        type="primary"
        buttonSize="auto"
        disabled={checked.length == 0}
        style={{alignSelf: 'flex-start', width: "100%", marginTop: 15 }} />
      <View style={{margin: 10}} >
        {checked.length >= 3? 
        <BodyText
          body="Ya seleccionaste el máximos de películas posible."
          color={colors.primaryRed} /> : null }
        <View style={styles.rowContainer}>
          {seenContent.length > 0?
            <FlatList 
              style={styles.container}
              data={seenContent}
              renderItem={({item, index}) => renderSeenContentRow(item, index)}
              keyExtractor={(item, index) => index.toString()}
              onEndReachedThreshold={0}
              onEndReached={loadSeenContentPage} /> :
            <BodyText body="No hay contenido visto" />
          }
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '90%'
  },
  rowContainer: {
    flexDirection: 'column',
    width: '90%'
  },
  horizontalLine: {
    width: "100%",
    alignSelf: 'center',
    height: 1,
    backgroundColor: "black",
    borderRadius: 100,
    marginTop: 4,
    marginBottom: 4
  } 
})
