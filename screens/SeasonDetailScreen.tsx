import React from 'react'
import { View, ScrollView, FlatList } from 'react-native'
import { TitleText } from '../components/BasicComponents/TitleText'
import { SeasonDetail } from '../entities/Details/Series/SeasonDetail'
import { Episode } from '../entities/Details/Series/Episode'
import { Platform } from '../entities/Details/Platform'
import { SeeContentButton } from '../components/Content/SeeContentButton'
import { SeasonInfo } from '../components/Series/SeasonDetails/SeasonInfo'
import { EpisodeList } from '../components/Series/SeasonDetails/EpisodeList'

type SeasonDetailsScreenParams = {
    season: SeasonDetail
    platforms: Platform[]
}

export const SeasonDetailScreen = (params: SeasonDetailsScreenParams) => {
    const episodes = params.season.episodes

    return (
        <FlatList
            data={episodes}
            ListHeaderComponent={renderHeader(params, episodes)}
            renderItem={({ item, index }) => (
                <View style={{ alignItems: 'center'}} >
                <EpisodeList
                    seasonId={params.season.id}
                    seriesId={params.season.seriesId}
                    episode={item}
                    key={index} 
                /></View>
            )}
            keyExtractor={(item, index) => index.toString()}
            initialNumToRender={2}
            windowSize={6}
        />
    )
}

const renderHeader = (params: SeasonDetailsScreenParams, episodes: Episode[]) => {
    return <>
        <SeasonInfo season={params.season} />
        {params.platforms.length > 0 &&
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                }}
            >
                <SeeContentButton
                    platforms={params.platforms}
                    text="Ver serie" />
            </View>}
        <TitleText
            body={'Capítulos (' + episodes.length + '):'}
            style={{ marginLeft: 20, marginTop: 20, fontWeight: 'bold' }} />
    </>
}

