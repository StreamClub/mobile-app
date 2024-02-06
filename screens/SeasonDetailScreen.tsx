import React, { useState } from 'react';
import { View, StyleSheet, Image, ScrollView, LayoutChangeEvent } from "react-native";
import { Icon, Divider, Chip } from 'react-native-paper';
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
    const [titleTextHeight, setTitleTextHeight] = useState(0);
    const [writtenText, setWrittenText] = useState(0);
    
    const handleTitleTextLayout = (event: LayoutChangeEvent) => {
        setTitleTextHeight(event.nativeEvent.layout.height);
        console.log(event.nativeEvent.layout.width);
    };

    return(
        <ScrollView>
            <View style={styles.details}>
                <View style={styles.posterView}>
                    {params.season.poster?
                        <Image 
                            source={{ uri: "https://image.tmdb.org/t/p/original" + params.season.poster }}
                            style={styles.poster}
                        /> :
                        <View style={styles.poster}>
                            <Icon source="image-off-outline" size={90}/>
                        </View>
                    }
                </View>
                <View style={styles.info}>
                    <BodyText body={params.season.name} style={{fontWeight: 'bold'}} 
                    size='big' onLayout={handleTitleTextLayout}/>
                    <BodyText body={params.season.overview} size='small' style={{height: (255 - titleTextHeight)}}/>
                </View>
            </View>
            <BodyText body={params.season.overview} size='small' style={{flex: 1, marginLeft: 20, marginRight: 20}}/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    poster: {
        height: 255,
        width: 170,
        borderColor: colors.primaryBlack,
        borderWidth: 1,
        marginRight: 5,
        marginLeft: 20,
        marginTop: 20
    },
    posterView: {
        alignSelf: 'flex-start',
        flexShrink: 0,
    },
    details: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    info: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 20
    }
})