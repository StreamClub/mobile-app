import React, { useEffect } from 'react';
import { View, StyleSheet } from "react-native";
import { colors } from '../../assets';
import { TitleText } from '../../components/BasicComponents/TitleText';
import { useLocalSearchParams } from 'expo-router'
import { useSimilarMovies } from '../../apiCalls/movies';

export type SubGroupRecommendationsType = {
  selectedContent: string
}

export default function SubGroupRecommendations() {
  const params = useLocalSearchParams<SubGroupRecommendationsType>();
  const {similarMovies, loading} = useSimilarMovies();

  const onSuccess = (response: any) => {
    console.log(response.data);
  }

  useEffect(() => {
    console.log("About to get movies");
    console.log(params.selectedContent);
    similarMovies(params.selectedContent, onSuccess);
  }, []);

  return (
    <View style={styles.container}>
      <TitleText 
        body='Algo similar a esto' 
        color={colors.primaryBlack}
        style={{margin: 10}} />
      <View style={styles.horizontalLine} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: colors.secondaryWhite
  },
  horizontalLine: {
    width: "95%",
    alignSelf: 'center',
    height: 1,
    backgroundColor: "black",
    borderRadius: 100,
    margin: 5
  }
})
