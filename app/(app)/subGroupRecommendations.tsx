import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from "react-native";
import { colors } from '../../assets';
import { TitleText } from '../../components/BasicComponents/TitleText';
import { useLocalSearchParams } from 'expo-router'
import { useSimilarMovies } from '../../apiCalls/movies';
import { ContentList } from '../../components/Content/ContentList';
import { ContentEntry } from '../../entities/ContentEntry';
import { MOVIES_NAME, SERIES_NAME } from '../../constants';
import { serializeSearchResults } from '../../utils/serializeSearchResults';
import { useDataToSerieEntryList } from '../../hooks/search/useSeriesEntryList';
import { LoadingComponent } from '../../components/BasicComponents/LoadingComponent';
import { BodyText } from '../../components/BasicComponents/BodyText';
import { useAppSelector } from '../../hooks/redux/useAppSelector';
import { useSimilarSeries } from '../../apiCalls/series';

export type SubGroupRecommendationsType = {
  selectedContent: string,
  category: 'movie' | 'series'
}

export default function SubGroupRecommendations() {
  const params = useLocalSearchParams<SubGroupRecommendationsType>();
  const {similarMovies, loading: loadingMovies} = useSimilarMovies();
  const {similarSeries, loading: loadingSeries} = useSimilarSeries();
  const [contentList, setContentList] = useState<Array<ContentEntry>>([]);
  const { toMovieListEntries, toSeriesListEntries } = useDataToSerieEntryList();

  const onMovieSuccess = (response: any) => {
    console.log('Busqueda exitosa pelicula: ');
    const parsedResponse = toMovieListEntries(response.data);
    const serializedData = serializeSearchResults(parsedResponse, MOVIES_NAME);
    setContentList(serializedData);
  }

  const onSeriesSuccess = (response: any) => {
    console.log('Busqueda exitosa serie: ');
    const parsedResponse = toSeriesListEntries(response.data);
    const serializedData = serializeSearchResults(parsedResponse, SERIES_NAME);
    setContentList(serializedData);
  }

  useEffect(() => {
    if (params.category == 'movie') {
      similarMovies(params.selectedContent, onMovieSuccess);
    } else {
      similarSeries(params.selectedContent, onSeriesSuccess);
    }
  }, []);

  return (
    <View style={styles.container}>
      <TitleText 
        body='Contenido similar:' 
        color={colors.primaryBlack}
        style={{margin: 10}} />
      <View style={styles.horizontalLine} />
      {(loadingSeries || loadingMovies)?
        <View style={{alignSelf: 'center', justifyContent: 'center'}}>
          <LoadingComponent />
        </View> :
        contentList.length > 0?
          <ContentList 
            searchNextPage={() => console.log("End of page")}
            contentEntry={contentList} /> :
          <View style={{margin: 10}} >
            <BodyText
              body="Lamentablemente no encontramos recomendaciones para tu selección."
              size="big"
              color={colors.primaryBlue} />
          </View>
      }
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

