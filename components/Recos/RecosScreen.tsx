import React, { useCallback, useState } from 'react';
import { StyleSheet, FlatList, RefreshControl } from 'react-native';
import { colors } from '../../assets';
import { UserRecos } from './UserRecos';
import { Groups } from './Groups';
import { SubgroupRecommendationsButton } from './SubGroupRecommendations/SubgroupRecommendationsButton';
import { ContentSeenByFriends } from '../ContentSeenByFriends/ContentSeenByFriends';

export const RecosScreen = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setRefreshKey((prevKey) => prevKey + 1);
        setRefreshing(false);
      }, []);

      return (
        <FlatList
            key={refreshKey}
            style={styles.container}
            ListHeaderComponent={
                <>
                <UserRecos />
                <SubgroupRecommendationsButton />
                <ContentSeenByFriends />
                </>
            }
            ListFooterComponent={
                <>
                    <Groups />
                </>
            }
            data={[]}
            renderItem={() => null}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: colors.secondaryWhite,
    },
});
