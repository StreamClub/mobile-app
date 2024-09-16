import React from 'react';
import { StyleSheet, Dimensions, View, FlatList } from 'react-native';
import { colors } from '../../assets';
import { UserRecos } from './UserRecos';
import { Groups } from './Groups';
import { ContentSeenByFriends } from '../ContentSeenByFriends/ContentSeenByFriends';

const screenWidth = Dimensions.get('window').width

export const RecosScreen = () => {
    return (
        <FlatList
            style={styles.container}
            ListHeaderComponent={
                <>
                <UserRecos />
                <ContentSeenByFriends />
                </>
            }
            ListFooterComponent={
                <Groups />
            }
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
});
