import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-paper';
import { ContentFadingText } from '../Content/ContentFadingText';

type MovieDirectorsParams = {
    directors: Array<string>,
    titleTextHeight: number
}

export const MovieDirectors = (params: MovieDirectorsParams) => {
    const directors = params.directors[0]? params.directors : ['sin datos'];
    return (
        <View style={{flexDirection: 'row'}}>
            <Icon source="movie-open-outline" size={20} />
            <ContentFadingText text={directors} size='big' />
        </View>
    )
}
