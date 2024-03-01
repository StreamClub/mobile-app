import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Chip } from 'react-native-paper';
import { BodyText } from '../BasicComponents/BodyText';
import { colors } from "../../assets";
import { CastList } from '../CastList';
import { Content, RecommendsList } from '../RecommendsList';
import { SeriesPlatforms } from './SeriesPlatforms';
import { NextEpisode } from './NextEpisode';
import { SeriesDetail } from '../../entities/Details/Series/SeriesDetailEntry';
import { SeasonsList } from './SeasonsList';
import { SeriesInfo } from './SeriesInfo';

type SeriesDetailScreenParams = {
    series: SeriesDetail,
    onRecommendPress: (series: Content) => void;
}

export const SeriesDetailScreen = (params: SeriesDetailScreenParams) => {
    return (
        <ScrollView>
        <View style={styles.container}>
            <SeriesInfo series={params.series} />
            <SeriesPlatforms platforms={params.series.platforms} status={params.series.status} />
            {params.series.nextEpisode? 
                <NextEpisode episode={params.series.nextEpisode} platforms={params.series.platforms}/>
                : null}
            <View style={styles.description}>
                <BodyText body={params.series.overview} />
                <View style={{height: 60}}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                        {params.series.genres.map((genre, index) => 
                            <Chip 
                                key={index} 
                                style={{margin: 10, backgroundColor: 'transparent', borderColor: colors.primaryBlack, height: 40}}
                                mode="outlined"
                                textStyle={{ color: colors.primaryBlack }}>
                                    {genre}
                            </Chip>
                        )}
                    </ScrollView>
                </View>
            </View>
            <SeasonsList seasons={params.series.seasons} platforms={params.series.platforms} />
            <CastList cast={params.series.cast} style={styles.cast} />
            <RecommendsList 
                onRecommendPress={params.onRecommendPress} 
                title='Series similares:'
                contents={params.series.similar} 
                style={styles.recommends} />
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    recommends: {
        marginLeft: 20,
        marginBottom: 20
    },
    cast: {
        marginLeft: 20,
        marginBottom: 20
    },
    container: {
        flex: 1,
    },
    description: {
        margin: 20,
        flex: 1,
        alignItems: 'center'
    },
});
