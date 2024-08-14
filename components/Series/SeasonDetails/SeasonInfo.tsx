import React, { useState } from 'react'
import { SeasonDetail } from '../../../entities/Details/Series/SeasonDetail'
import { LayoutChangeEvent, Pressable, View } from 'react-native'
import { styles } from './styles/SeasonDetails.styles'
import { BodyText } from '../../BasicComponents/BodyText'
import { colors } from '../../../assets'
import { Overlay } from 'react-native-elements'
import { TmdbImage, TmdbImageType } from '../../BasicComponents/TmdbImage'

type SeasonInfoParams = {
    season: SeasonDetail
}

export const SeasonInfo = (params: SeasonInfoParams) => {
    const [titleTextHeight, setTitleTextHeight] = useState(0)
    const [openOverview, setOpenOverview] = useState(false)
    const season = params.season
    const handleTitleTextLayout = (event: LayoutChangeEvent) => {
        setTitleTextHeight(event.nativeEvent.layout.height)
    }

    return (
        <View style={styles.details}>
            <View style={styles.posterView}>
                <TmdbImage
                    resource={season.poster}
                    type={TmdbImageType.Cover}
                    style={styles.poster}
                />
            </View>
            <View style={[styles.info, { height: 255 - titleTextHeight }]}>
                <BodyText
                    body={season.name}
                    style={{ fontWeight: 'bold' }}
                    size="big"
                    onLayout={handleTitleTextLayout}
                />
                <Pressable
                    onPress={() => setOpenOverview(true)}
                    style={{ flex: 1, height: 255 - titleTextHeight }}
                >
                    <BodyText
                        body={season.overview}
                        size="small"
                        style={{ flex: 1 }}
                    />
                    {season.overview.length > 10 && (
                        <BodyText
                            body="Ver más"
                            size="small"
                            color={colors.primaryBlue}
                            style={{
                                alignSelf: 'flex-end',
                                marginRight: 20,
                                fontWeight: 'bold',
                            }}
                        />
                    )}
                </Pressable>
            </View>
            <Overlay
                isVisible={openOverview && season.overview.length > 10}
                onBackdropPress={() => setOpenOverview(false)}
                overlayStyle={{
                    backgroundColor: colors.primarySkyBlue,
                    margin: 20,
                    borderRadius: 20,
                }}
            >
                <BodyText body={season.overview} />
            </Overlay>
        </View>
    )
}
