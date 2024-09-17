import React, { useEffect, useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { useSeenContent } from "../../../hooks/useSeenContent";
import { useSession } from "../../../context/ctx";
import { useAppSelector } from "../../../hooks/redux/useAppSelector";
import { BodyText } from "../../BasicComponents/BodyText";
import { SeenContentEntry } from "../../Types/SeenContentEntry";
import { TmdbImage, TmdbImageType } from "../../BasicComponents/TmdbImage";
import { Checkbox } from "react-native-paper";
import { useAppDispatch } from "../../../hooks/redux/useAppDispatch";
import { setUserId } from "../../../store/slices/seenContentSlice";
import { colors } from "../../../assets";

export const ContentSelectionList = () => {
  const dispatch = useAppDispatch();
  const session = useSession();
  const userId = session?.userId ? session.userId : 0;
  const [checked, setChecked] = useState<Array<number>>([]);
  const { loadSeenContent, loadSeenContentPage } = useSeenContent();
  const { seenContent } = useAppSelector((state) => state.seenContent);

  useEffect(() => {
    console.log("[SeenContent] setting userId: ", userId);
    dispatch(setUserId(userId));
    loadSeenContent(userId);
  }, []);

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
        <View style={styles.row}>
          <View style={{flexDirection: 'row', flex: 0.7}}>
            <TmdbImage
              resource={movie.poster}
              type={TmdbImageType.Cover}
              style={styles.posterStyle} />
            <BodyText 
              key={index} 
              body={movie.title}
              size="big"
              style={{flex: 1, margin: 5}} />
          </View>
          <View style={{flex: 0.4}}>
            <Checkbox
              status={checked.includes(movie.id) ? 'checked' : 'unchecked'}
              onPress={() =>
                pushSelection(movie.id)}
              color={colors.primaryBlue} />
          </View>
        </View>
        <View style={styles.horizontalLine} />
      </View>
    )
  }

  return(
    <View style={{margin: 10}} >
      <View style={styles.rowContainer}>
        {seenContent.length > 0?
          <FlatList 
            style={styles.container}
            data={seenContent}
            renderItem={({item, index}) => renderSeenContentRow(item, index)}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0}
            onEndReached={loadSeenContentPage} /> :
          <BodyText body="No seen content" />
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '90%'
  },
  rowContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '90%'
  },
  posterStyle: {
    width: 100,
    aspectRatio: 2/3,
  },
  row: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    margin: 5, 
    width: '90%',
    alignItems: 'center'
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
