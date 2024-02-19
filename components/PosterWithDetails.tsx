import React from 'react';
import { Image, Pressable, StyleSheet, Dimensions } from 'react-native';
import { colors } from "../assets";
import { BodyText } from './BasicComponents/BodyText';
import { TitleText } from './BasicComponents/TitleText';

const screenWidth = Dimensions.get('window').width;

export type PosterWithDetailsParams = {
    poster: string,
    title: string,
    description: string,
}

export const PosterWithDetails = (params: PosterWithDetailsParams) => {
    return (
        <Pressable style={styles.container}>
            <Image 
                source={{ uri: "https://image.tmdb.org/t/p/original" + params.poster }} 
                style={styles.poster}
            />
            <BodyText body={params.title} size='big' style={styles.title} numberOfLines={2}/>
            <BodyText body={params.description} size='medium' color={colors.primaryGrey} style={styles.description} numberOfLines={2}/>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        
    },
    poster: {
        width: screenWidth/2.2,
        aspectRatio: 150/225,
        borderRadius: 10,
        margin: 5,
        alignSelf: 'center',
    },
    title: {
        width: 150,
        color: colors.primaryGrey,
        fontWeight: 'bold',
    },
    description: {
        width: 150,
        color: colors.primaryGrey,
    },
})