import React from 'react'
import { StyleSheet, ScrollView, View, Text, Image, Pressable } from 'react-native'
import { useAppSelector } from '../../hooks/redux/useAppSelector'
import { UserReco } from './UserReco'
import { LocalIcon } from '../Types/LocalIcon'

const hasIndex = (list: any[], index: number) => {
    return index >= 0 && index < list.length;
};





export const UserRecos = () => {
    const { userRecos } = useAppSelector((state) => state.recos)
    const [actualIndex, setActualIndex] = React.useState(0)

    const renderRecoByIndex = (index: number) => {
        if (hasIndex(userRecos, index)) {
            return <UserReco reco={userRecos[index]} index={index} />
        } else {
            return <Text> TODO, contemplar casos para limites de la lista </Text>
        }
    }

    const rightArrow = () => {
        return (
            <Pressable
                style={{ position: "absolute", right: 0, width: 100, height: 450, zIndex: 2, alignItems: "flex-end", justifyContent: "center"}}
                onPress={() => setActualIndex(actualIndex + 1)}
            >
                <Image
                    source={LocalIcon.right}
                    style={{ width: 30, height: 30 }}
                />
            </Pressable>
        )
    }
    
    const leftArrow = () => {
        return (
            <Pressable
                style={{ position: "absolute", left: 0, width: 100, height: 450, zIndex: 2, alignItems: "flex-start", justifyContent: "center"}}
                onPress={() => setActualIndex(actualIndex - 1)}
            >
                <Image
                    source={LocalIcon.left}
                    style={{ width: 30, height: 30 }}
                />
            </Pressable>
        )
    }

    return (
        <View style={{position: "relative"}}>
            {renderRecoByIndex(actualIndex)}
            {rightArrow()}
            {leftArrow()}
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
        </View>
    )
}

const styles = StyleSheet.create({
    contentContainerStyle: {
        alignItems: 'flex-start',
    },
    poster: {
        width: "80%",
        aspectRatio: 791 / 1186,
        borderRadius: 15,
        margin: 10,
    },
    title: {
        alignSelf: 'center',
        flex: 0.5,
    },
})
