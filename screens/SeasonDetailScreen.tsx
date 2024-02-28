import React from 'react';
import { View, ScrollView } from "react-native";
import { TitleText } from '../components/BasicComponents/TitleText';
import { EpisodeList } from '../components/SeasonDetails/EpisodeList';
import { SeasonDetail } from '../entities/Details/Series/SeasonDetail';
import { Episode } from '../entities/Details/Series/Episode';
import { SeasonInfo } from '../components/SeasonDetails/SeasonInfo';

type SeasonDetailsScreenParams = {
    season: SeasonDetail;
}

export const SeasonDetailScreen = (params: SeasonDetailsScreenParams) => {
    const episodes = params.season.episodes;

    return(
        <ScrollView>
            <SeasonInfo season={params.season} />
            <TitleText body={'Capítulos (' + episodes.length + '):'} style={{marginLeft: 20, marginTop: 20, fontWeight: 'bold'}}/>
            <View style={{alignItems: 'center', marginBottom: 20}}>
                {episodes ? episodes.map(
                    (episode: Episode, index: number) => 
                    <EpisodeList seasonId={params.season.id} seriesId={params.season.seriesId} episode={episode} episodeNumber={index} key={index} />
                ) : null}
            </View>
        </ScrollView>
    );
}
