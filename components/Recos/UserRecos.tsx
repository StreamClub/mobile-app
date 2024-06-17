import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { useAppSelector } from '../../hooks/redux/useAppSelector'
import { UserReco } from './UserReco'

export const UserRecos = () => {
    const { userRecos } = useAppSelector((state) => state.recos)

    // actualIndex = 0

    return (
        <ScrollView>
            {userRecos.map((reco, index) => (
                <UserReco reco={reco} index={index} key={index} />
            ))}
            {/* <FlatList
                ref={flatListRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                data={userRecos}
                renderItem={({ item, index }) => <UserReco reco={item} index={index} />}
                keyExtractor={(item, index) => index.toString()}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            /> */}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    contentContainerStyle: {
        alignItems: 'flex-start',
    },
    poster: {
        width: "80%",
        aspectRatio: 791/1186,
        borderRadius: 15,
        margin: 10,
    },
    title: {
        alignSelf: 'center',
        flex: 0.5,
    },
})
