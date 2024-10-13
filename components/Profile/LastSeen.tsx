import React from "react";
import { CarouselParams } from "../BasicComponents/Types/CarouselParams";
import { colors } from "../../assets";
import {  StyleSheet, View } from 'react-native';
import { TitleText } from "../BasicComponents/TitleText";
import { Carousel } from "../BasicComponents/Carousel";
import { BodyText } from "../BasicComponents/BodyText";
import { router } from "expo-router";
import { SeenContentParams } from "../../app/(app)/seenContent";
import { ContentDetailsParams } from "../../apiCalls/params/content/ContentDetailsParams";
import { SeenContentEntry } from "../Types/SeenContentEntry";
import { getScreenSize } from "../../utils/screenUtils";
import { TmdbImageType } from "../BasicComponents/TmdbImage";
import { seenContentEntryWrapper, SeenContentEntryWrapperProps } from "../SeenContent/SeenContentEntryWrapper";
import { Icon } from "react-native-paper";
import { SeenContent } from "../../app/(tabs)/profile";
import { useSession } from "../../context/ctx";

type LastSeenParams = {
  seenContent: SeenContent,
  userId: string
}

const screenWidth = getScreenSize().width;

export const LastSeen = (params: LastSeenParams) => {
  const session = useSession();
  const userId = (session?.userId ? session.userId : 0).toString();
  
  const onPressMoreSeenContent = () => {
    const routeParams: SeenContentParams = {userId: params.userId};
    router.push({ pathname: '/seenContent', params: routeParams });
  }

  const itemWidth = seenContentStyles.contentPoster.height * seenContentStyles.contentPoster.aspectRatio;

  const itemWrapperProps: SeenContentEntryWrapperProps = {
    width: itemWidth,
    showPercentText: true, 
    percentSize: 50,
    marginHorizontal: 10,
    bottomLastSeen: 9,
    leftPercent: 15,
    topPercent: 15,
    sizeLastSeenIcons: 30,
  }

  const onPressSeenContentEntry = (itemObject: SeenContentEntry) => {
    const contentScreenParams: ContentDetailsParams = {
      id: itemObject.id.toString(),
    }
    //TODO: Refactorizar para usar o bien entities o bien un enum
    const pathname = itemObject.contentType === 'movie' ? '/movie' : '/serie'
    router.push({ pathname: pathname, params: contentScreenParams })
  }

  const seenContentCarouselParams: CarouselParams = {
    items: params.seenContent.results,
    itemStyle: seenContentStyles.contentPoster,
    containerStyle: styles.carousel,
    type: TmdbImageType.Cover,
    itemWrapper: seenContentEntryWrapper,
    itemWrapperProps: itemWrapperProps,
    onItemPressed: onPressSeenContentEntry,
  }

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginRight: 10}}>
        <TitleText body="Últimas visualizaciones" style={styles.titleText} size='medium'/>
        <Icon 
          source={params.seenContent.isPublic? "lock-open-outline" : "lock-outline"}
          size={30} />
      </View>
      {params.seenContent.results.length > 0 ? 
        <>
          <Carousel {...seenContentCarouselParams}/>
          <BodyText 
            body={"Ver más actividad"} 
            size="medium" 
            style={styles.linkedText} 
            onPress={onPressMoreSeenContent}/>
        </> :
        <BodyText 
          size="medium"
          style={{alignSelf: 'center', fontWeight: 'bold'}}
          color={colors.primaryGrey}
          body={(params.seenContent.isPublic || params.userId == userId)? "No hay contenido visto." : "El contenido visto es privado."} />  
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondaryWhite,
  },
  linkedText: {
    color: colors.primaryBlue,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    marginTop: 10,
    marginRight: 8,
    textDecorationLine: 'underline',
  },
  titleText: {
    fontWeight:'bold', 
    marginLeft: 10
  },
  carousel: {
    width: screenWidth,
  },
});

export const seenContentStyles = StyleSheet.create({
  contentPoster: {
    height: (screenWidth/1.7),
    aspectRatio: 2/3,
    borderRadius: 5,
    margin: 0,
    marginHorizontal: 10,
    borderWidth: 1,
  },
});
