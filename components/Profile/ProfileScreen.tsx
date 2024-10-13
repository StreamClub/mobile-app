import React, { useCallback, useState } from 'react';
import { StyleSheet, Dimensions, FlatList, RefreshControl } from 'react-native';
import { Watchlist } from '../Watchlist';
import { ProfileHeader, ProfileHeaderParams } from './ProfileHeader';
import { colors } from '../../assets';
import { Carousel } from '../BasicComponents/Carousel';
import { CarouselEntry, CarouselParams } from '../BasicComponents/Types/CarouselParams';
import { TmdbImageType } from '../BasicComponents/TmdbImage';
import { TitleText } from '../BasicComponents/TitleText';
import { BodyText } from '../BasicComponents/BodyText';
import { router } from 'expo-router';
import { LastSeen } from './LastSeen';
import { SeenContent } from '../../app/(tabs)/profile';

const screenWidth = Dimensions.get('window').width

export type ProfileScreenParams = {
  editable?: boolean;
  profileHeader: ProfileHeaderParams;
  userServices: CarouselEntry[];
  seenContent: SeenContent;
  getAll: () => void;
}

export const ProfileScreen = (params: ProfileScreenParams) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    params.getAll()
    setRefreshing(false);
  }, []);

  const editable = (params.editable != null) ? params.editable : true;

  const userServicesCarouselParams: CarouselParams = {
    items: params.userServices,
    itemStyle: styles.serviceLogo,
    containerStyle: styles.carousel,
    type: TmdbImageType.Cover,
  }

  const onPressManageServices = () => {
    router.push('/services')
  }

  const renderProfileContent = () => {
    return (
      <>
        <ProfileHeader {...params.profileHeader} />

        <TitleText body="Mis plataformas" style={styles.titleText} size='medium' />
        <Carousel {...userServicesCarouselParams} />
        {editable ?
          <BodyText body={"Gestionar plataformas"} size="medium" style={styles.linkedText} onPress={onPressManageServices} /> :
          null
        }
        <LastSeen seenContent={params.seenContent} userId={params.profileHeader.id.toString()} />
      </>
    )
  }

  return (

    <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListHeaderComponent={renderProfileContent()}
      ListFooterComponent={<Watchlist userId={params.profileHeader.id} />}
      data={[]}
      renderItem={() => null}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.secondaryWhite,
  },
  carousel: {
    width: screenWidth,
  },
  serviceLogo: {
    height: 60,
    aspectRatio: 1,
    borderRadius: 15,
    margin: 10,
    borderWidth: 1,
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
    fontWeight: 'bold',
    marginLeft: 10
  },
});