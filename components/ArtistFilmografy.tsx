import React from 'react';
import { Image, Pressable, StyleSheet, View, Text } from 'react-native';
import { colors } from "../assets";
import { BodyText } from './BasicComponents/BodyText';
import { Credits, CastEntry, CrewEntry } from './Types/Credits';
import { PosterWithDetails, PosterWithDetailsParams } from './PosterWithDetails';

export type ArtistFilmografyParams = {
    credits: Credits,
}

const renderRow = (creditsPair: Array<CastEntry> | Array<CrewEntry>, index: number) => {
    const credit1 = creditsPair[0]
    const credit2 = creditsPair?.[1]
    
    const entry1: PosterWithDetailsParams = {
        poster: credit1.poster,
        title: credit1.title,
        description: "descripcion aqui"
    }

    const entry2: PosterWithDetailsParams = {
        poster: credit2.poster,
        title: credit2.title,
        description: "descripcion aqui"
    }
    
    return (
        <View key={index} style={{flexDirection: 'row'}}>
            <PosterWithDetails {...entry1}/>
            <PosterWithDetails {...entry2}/>
        </View>
    )
}

const createTuples = (list: any[]) => {
    var tuples = [];
    for (var i = 0; i < list.length; i += 2) {
        if (i + 1 < list.length) {
            tuples.push([list[i], list[i + 1]]);
        } else {
            tuples.push([list[i]]);
        }
    }
    return tuples;
}

export const ArtistFilmografy = (params: ArtistFilmografyParams) => {
    const castList = params.credits.cast
    const castTuples = createTuples(castList)

    return (
        <View>
            {castTuples.map((tuple, index) => renderRow(tuple, index))}
        </View>    
    )
}

const styles = StyleSheet.create({
    container: {
    },
    poster: {
        width: 150,
        height: 225,
        borderRadius: 10,
        margin: 5,
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