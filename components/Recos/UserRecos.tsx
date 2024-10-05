import React, { useEffect } from 'react'
import { StyleSheet, ScrollView, View, Text, Image, Pressable } from 'react-native'
import { useAppSelector } from '../../hooks/redux/useAppSelector'
import { UserReco } from './UserReco'
import { LocalIcon } from '../Types/LocalIcon'
import { LoadingComponent } from '../BasicComponents/LoadingComponent'
import { useRecos } from '../../hooks/useRecos'

const hasIndex = (list: any[], index: number) => {
    return index >= 0 && index < list.length;
};

export const UserRecos = () => {
    const { loadRecos } = useRecos();

    useEffect(() => {
        loadRecos()
    }, [])

    const { userRecos, loadingUserRecos, loadingUserMovieRecos, loadingUserSeriesRecos } = useAppSelector((state) => state.recos)
    const [actualIndex, setActualIndex] = React.useState(0)

    const renderRecoByIndex = (index: number) => {
        if (hasIndex(userRecos, index)) {
            return <UserReco reco={userRecos[index]} index={index} />
        } else {
            return <Text> No tenemos recomendaciones por el momento </Text>
        }
    }

    const onChangeIndex = (newIndex: number) => {
        if (hasIndex(userRecos, newIndex)) {
            setActualIndex(newIndex)
        }
    }

    const rightArrow = () => {
        return (
            <Pressable
                style={{ position: "absolute", right: 0, width: 40, height: 450, zIndex: 2, alignItems: "flex-end", justifyContent: "center" }}
                onPress={() => onChangeIndex(actualIndex + 1)}
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
                style={{ position: "absolute", left: 0, width: 40, height: 450, zIndex: 2, alignItems: "flex-start", justifyContent: "center" }}
                onPress={() => onChangeIndex(actualIndex - 1)}
            >
                <Image
                    source={LocalIcon.left}
                    style={{ width: 30, height: 30 }}
                />
            </Pressable>
        )
    }

    return (
        <View style={{ position: "relative" }}>
            {loadingUserMovieRecos || loadingUserSeriesRecos ?
                <LoadingComponent />
                :
                <>
                    {renderRecoByIndex(actualIndex)}
                    {hasIndex(userRecos, actualIndex + 1) && rightArrow()}
                    {hasIndex(userRecos, actualIndex - 1) && leftArrow()}
                </>
            }
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
