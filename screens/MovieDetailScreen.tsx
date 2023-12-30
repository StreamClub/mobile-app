import { Text } from 'react-native';
import React from 'react';
import { TitleText } from '../components/BasicComponents/TitleText';

type Platform = {
    logo: string,
    name: string
}

type MovieDetails = {
    title: string,
    genres: Array<string>,
    poster: string,
    releaseDate: string,
    //platforms: Array<Platform>,
    directors: Array<string>,
    backdrop: string
}

type MovieDetailScreenParams = {
    movie: MovieDetails
}

export const MovieDetailScreen = (params: MovieDetailScreenParams) => {
    return (
        <TitleText body={params.movie.title} size='big'/>
    )
}