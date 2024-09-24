import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from "react-native";
import { colors } from '../../assets';
import { TitleText } from '../../components/BasicComponents/TitleText';
import { BodyText } from '../../components/BasicComponents/BodyText';
import { ContentSelectionList } from '../../components/Recos/SubGroupRecommendations/ContentSelectionList';
import { INITIAL_CATEGORY } from '../../constants';
import { SubgroupRecommendationsCategories } from '../../components/Recos/SubGroupRecommendations/SubgroupRecommendationsCategories';
import { useSeenContent } from '../../hooks/useSeenContent';
import { useAppDispatch } from '../../hooks/redux/useAppDispatch';
import { useSession } from '../../context/ctx';
import { setUserId } from '../../store/slices/seenContentSlice';
import { LoadingComponent } from '../../components/BasicComponents/LoadingComponent';
import { setCategory } from '../../store/slices/searchContentSlice';
import { useAppSelector } from '../../hooks/redux/useAppSelector';

export default function ContentSelect() {
  const { loadSeenContent, loading } = useSeenContent();
  const { category } = useAppSelector((state) => state.searchContent);
  const dispatch = useAppDispatch();
  const session = useSession();
  const userId = session?.userId ? session.userId : 0;
  const [selectedCategory, setSelectedCategory] = useState(category);

  const getSeenContent = (index: number) => {
    if (index == 0) {
      loadSeenContent(userId, undefined, 'movie');
    } else {
      loadSeenContent(userId, undefined, 'series');
    }
  }
  
  useEffect(() => {
    console.log("[SeenContent] setting userId: ", userId);
    dispatch(setUserId(userId));
    getSeenContent(category);
  }, []);

  const onPress = (value: number) => {
    console.log("Index: ", value);
    setSelectedCategory(value);
    getSeenContent(value);
    dispatch(setCategory(value));
  }

  return (
    <View style={styles.container}>
      <TitleText 
        body='Algo similar a esto' 
        color={colors.primaryBlack}
        style={{margin: 10}} />
      <View style={styles.horizontalLine} />
      <SubgroupRecommendationsCategories
        selectedIndex={selectedCategory}
        onPress={onPress} />
      <BodyText
        body='Selecciona hasta 3 películas o series que hayas visto y recibe recomendaciones personalizadas de contenido similar. Te sugeriremos títulos que coincidan con tus gustos y preferencias basados en tus elecciones. ¡Descubre nuevas historias que podrían encantarte!'
        color={colors.primaryBlack}
        style={{margin: 15}} />
      {loading?
        <View style={{alignSelf: 'center'}}>
          <LoadingComponent />
        </View> :
        <ContentSelectionList
          selectedCategory={selectedCategory} />
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
