import React from 'react'
import { styles } from './styles/SeriesDetails.styles'
import { View } from 'react-native'
import { BodyText } from '../../BasicComponents/BodyText'
import { colors } from '../../../assets'
import { SeeContentButtom } from '../../Content/SeeContentButtom'
import { TmdbImage, TmdbImageType } from '../../BasicComponents/TmdbImage'
import { Episode } from '../../../entities/Details/Series/Episode'
import { Platform } from '../../../entities/Details/Platform'

type NextEpisodeEntry = {
    episode: Episode
    platforms: Platform[]
}

export const NextEpisode = (params: NextEpisodeEntry) => {
    const formatter = new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
    return (
        <View style={styles.nextEpisode}>
            <TmdbImage
                resource={params.episode.poster}
                type={TmdbImageType.Cover}
                style={styles.episodePhoto}
            />
            <View style={{ flexDirection: 'column', width: 180 }}>
                <BodyText
                    body="Próximo capitulo: "
                    style={{ fontWeight: 'bold' }}
                    size="medium"
                />
                <BodyText
                    body={params.episode.name}
                    size="medium"
                    numberOfLines={1}
                />
                <BodyText
                    body={formatter.format(params.episode.airDate)}
                    color={colors.primaryGrey}
                    style={{ fontWeight: 'bold' }}
                />
                {params.platforms.length > 0 ? (
                    <View
                        style={{
                            alignSelf: 'flex-end',
                            justifyContent: 'flex-end',
                            flex: 1,
                            margin: 10,
                        }}
                    >
                        <SeeContentButtom platforms={params.platforms} />
                    </View>
                ) : null}
            </View>
        </View>
    )
}
