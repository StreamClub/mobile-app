import React from 'react';
import { View, StyleSheet } from "react-native";
import { colors } from "../assets";
import { BodyText } from '../components/BasicComponents/BodyText';

type SeasonDetails = {
    airDate: Date;
    name: string;
    overview: string;
    poster: string;
    episodes: Array<String>;
};

type SeasonDetailsScreenParams = {
    season: SeasonDetails;
}

export const SeasonDetailScreen = (params: SeasonDetailsScreenParams) => {
    return(
        <BodyText body={params.season.name} />
    );
}