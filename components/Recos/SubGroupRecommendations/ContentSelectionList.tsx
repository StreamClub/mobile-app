import React, { useEffect } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { useSeenContent } from "../../../hooks/useSeenContent";
import { useSession } from "../../../context/ctx";
import { useAppSelector } from "../../../hooks/redux/useAppSelector";
import { BodyText } from "../../BasicComponents/BodyText";
import { SeenContentEntry } from "../../Types/SeenContentEntry";
import { createTuples } from "../../../utils/listManager";
import { colors } from "../../../assets";

export const ContentSelectionList = () => {
  const session = useSession();
  const userId = session?.userId ? session.userId : 0;
  const { loadSeenContent, loadSeenContentPage } = useSeenContent();
  const { seenContent } = useAppSelector((state) => state.seenContent);

  useEffect(() => {
    console.log("[SeenContent] setting userId: ", userId);
    loadSeenContent(userId);
  }, []);

  const tuples = createTuples(seenContent, 20)

  const renderSeenContentRow = (tuple: SeenContentEntry[], index: number) => {
    return(
      <View key={index} style={styles.rowContainer}>
        {tuple.map((entry, index) => <BodyText key={index} body={entry.title} /> )}
      </View>
    )
  }

  return(
    <View style={{margin: 10}} >
      {seenContent.length > 0?
        <FlatList 
          style={styles.container}
          data={tuples}
          renderItem={({item, index}) => renderSeenContentRow(item, index)}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0}
          onEndReached={loadSeenContentPage} /> :
        <BodyText body="No seen content" />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      width: '100%',
      backgroundColor: colors.secondaryWhite
  },
  rowContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
  },
  posterStyle: {
      width: "100%",
      aspectRatio: 2/3,
  }
})
