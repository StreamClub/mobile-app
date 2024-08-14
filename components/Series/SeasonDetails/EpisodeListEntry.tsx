import React, { useState } from 'react'
import { Pressable, View } from 'react-native'
import { styles } from './styles/SeasonDetails.styles'
import { formatDate } from '../../../utils/dateManager'
import { BodyText } from '../../BasicComponents/BodyText'
import { colors } from '../../../assets'
import { Icon } from 'react-native-paper'
import { EpisodeOverlay } from './EpisodeOverlay'
import { Overlay } from 'react-native-elements'
import { Episode } from '../../../entities/Details/Series/Episode'
import { ContentType } from '../../../entities/ContentType'
import { TmdbImage, TmdbImageType } from '../../BasicComponents/TmdbImage'
import { MoviesSeenSection } from '../../Content/MoviesSeenSection'
import { EpisodeSeenSection } from '../../Content/EpisodeSeenSection'

type EpisodeListEntryParams = {
    episodeSeen: boolean
    episode: Episode
    seasonId: number
    seriesId: number
}

export const EpisodeListEntry = (params: EpisodeListEntryParams) => {
    const [openModal, setOpenModal] = useState(false)
    const episode = params.episode
    const contentType = new ContentType('episode')

    return (
        <Pressable
            onPress={() =>
                params.episode.overview ? setOpenModal(true) : null
            }
            style={styles.episode}
        >
            <View style={styles.episode}>
                <TmdbImage
                    resource={episode.poster}
                    type={TmdbImageType.Cover}
                    style={styles.episodePoster}
                />
                <View
                    style={{
                        flexDirection: 'column',
                        width: 190,
                        marginRight: 5,
                    }}
                >
                    <BodyText
                        body={episode.episodeId + '. ' + episode.name}
                        numberOfLines={2}
                        style={{ fontWeight: 'bold', flex: 1 }}
                        size="medium"
                    />
                    <BodyText
                        body={formatDate(new Date(episode.airDate).toDateString())}
                        color={colors.primaryGrey}
                        style={{ fontWeight: 'bold' }}
                        size="small"
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <Icon source="timer-outline" size={20} />
                        <BodyText
                            body={' ' + episode.runtime + ' min'}
                            size="small"
                        />
                    </View>
                    <View
                        style={{
                            alignSelf: 'flex-end',
                            justifyContent: 'flex-end',
                            flex: 1,
                            margin: 5,
                        }}
                    >
                        {episode.episodeId && 
                            <EpisodeSeenSection
                                seenState={params.episodeSeen? 100 : 0}
                                seriesId={params.seriesId.toString()}
                                seasonId={params.seasonId.toString()}
                                episodeId={episode.episodeId.toString()}
                            />
                        }
                    </View>
                </View>
            </View>
            <Overlay
                isVisible={openModal}
                onBackdropPress={() => setOpenModal(false)}
                overlayStyle={{
                    backgroundColor: colors.primarySkyBlue,
                    margin: 20,
                    borderRadius: 20,
                }}
            >
                <EpisodeOverlay episode={episode} />
            </Overlay>
        </Pressable>
    )
}
