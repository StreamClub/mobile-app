import React from 'react'
import { BodyText } from '../../BasicComponents/BodyText'
import { View } from 'react-native'
import { Divider } from 'react-native-paper'
import { colors } from '../../../assets'
import { ContentPlaforms } from '../../Content/ContentPlatforms'
import { styles } from './styles/SeriesDetails.styles'
import { Platform } from '../../../entities/Details/Platform'

export type PlatformsEntry = {
    platforms: Array<Platform>
    status: string
}

export const SeriesPlatforms = (params: PlatformsEntry) => {
    return (
        <View style={styles.platforms}>
            {params.platforms.length >= 1 ? (
                <>
                    <BodyText body={'Disponible en:'} size="big" />
                    <View
                        style={{
                            height: 'auto',
                            width: 180,
                            alignItems: 'center',
                        }}
                    >
                        <ContentPlaforms
                            logos={params.platforms.map(
                                (platform) => platform.logoPath
                            )}
                        />
                    </View>
                </>
            ) : (
                <BodyText
                    size="big"
                    color={colors.primaryRed}
                    body="No disponible en ninguna plataforma."
                    style={{ width: 180, margin: 10 }}
                />
            )}
            <Divider style={styles.divider} />
            <BodyText
                body={'Estado: ' + params.status}
                size="big"
                color={colors.primaryBlue}
                style={{ fontWeight: 'bold' }}
            />
        </View>
    )
}
