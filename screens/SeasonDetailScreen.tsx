import React from 'react'
import { View, ScrollView } from 'react-native'
import { TitleText } from '../components/BasicComponents/TitleText'
import { SeasonDetail } from '../entities/Details/Series/SeasonDetail'
import { Episode } from '../entities/Details/Series/Episode'
import { Platform } from '../entities/Details/Platform'
import { SeeContentButtom } from '../components/Content/SeeContentButtom'
import { SeasonInfo } from '../components/Series/SeasonDetails/SeasonInfo'
import { EpisodeList } from '../components/Series/SeasonDetails/EpisodeList'

type SeasonDetailsScreenParams = {
    season: SeasonDetail
    platforms: Platform[]
}

export const SeasonDetailScreen = (params: SeasonDetailsScreenParams) => {
    const episodes = params.season.episodes

    return (
        <ScrollView>
            <SeasonInfo season={params.season} />
            {params.platforms.length > 0 ? (
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 20,
                    }}
                >
                    <SeeContentButtom
                        platforms={params.platforms}
                        text="Ver serie"
                    />
                </View>
            ) : null}
            <TitleText
                body={'Capítulos (' + episodes.length + '):'}
                style={{ marginLeft: 20, marginTop: 20, fontWeight: 'bold' }}
            />
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
                {episodes
                    ? episodes.map((episode: Episode, index: number) => (
                          <EpisodeList
                              seasonId={params.season.id}
                              seriesId={params.season.seriesId}
                              episode={episode}
                              episodeNumber={index}
                              key={index}
                          />
                      ))
                    : null}
            </View>
        </ScrollView>
    )
}
