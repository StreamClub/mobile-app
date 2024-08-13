import React from 'react'
import { View, ScrollView, FlatList } from 'react-native'
import { TitleText } from '../components/BasicComponents/TitleText'
import { SeasonDetail } from '../entities/Details/Series/SeasonDetail'
import { Episode } from '../entities/Details/Series/Episode'
import { Platform } from '../entities/Details/Platform'
import { SeeContentButton } from '../components/Content/SeeContentButton'
import { SeasonInfo } from '../components/Series/SeasonDetails/SeasonInfo'
import { EpisodeListEntry } from '../components/Series/SeasonDetails/EpisodeListEntry'
import { useAppSelector } from '../hooks/redux/useAppSelector'

type SeasonDetailsScreenParams = {
    season?: SeasonDetail
    platforms: Platform[]
}

export const SeasonDetailScreen = (params: SeasonDetailsScreenParams) => {
    const { focusedSeason } = useAppSelector((state) => state.searchContent)
    if (!focusedSeason) {
        return null
    }

    const episodes = focusedSeason.episodes
    const { season } = params

    if (!season) {
        return null
    }
    
    return (
        <FlatList
            data={season.episodes}
            ListHeaderComponent={renderHeader(params, season, season.episodes)}
            renderItem={({ item, index }) => (
                <View style={{ alignItems: 'center'}} >
                <EpisodeListEntry
                    episodeSeen = {focusedSeason.episodes[index].seen}
                    seasonId={season.id}
                    seriesId={season.seriesId}
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

const renderHeader = (params: SeasonDetailsScreenParams, season: SeasonDetail, episodes: Episode[]) => {
    return <>
        <SeasonInfo season={season} />
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

