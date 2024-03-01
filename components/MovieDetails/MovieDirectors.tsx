import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-paper';
import { ContentFadingText } from '../Content/ContentFadingText';
import { styles } from './styles/MovieDetails.style';

type MovieDirectorsParams = {
    directors: Array<string>,
    titleTextHeight: number
}

export const MovieDirectors = (params: MovieDirectorsParams) => {
    const backgroundSize = 170 + (params.titleTextHeight/30 - 2)*30
    return (
        <View style={[styles.director, {top: backgroundSize - 80}]}>
            <Icon source="movie-open-outline" size={20} />
            <ContentFadingText text={params.directors} size='big' />
        </View>
    )
}
