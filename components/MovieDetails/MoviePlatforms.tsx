import React from 'react'
import { BodyText } from '../BasicComponents/BodyText'
import { View } from 'react-native'
import { SeeContentButtom } from '../Content/SeeContentButtom'
import { Divider } from 'react-native-paper'
import { styles } from './styles/MovieDetails.style'
import { colors } from '../../assets'
import { ContentPlaforms } from '../Content/ContentPlatforms'
import { Platform } from '../../entities/Details/Platform'

export type PlatformsEntry = {
    platforms: Array<Platform>
}

export const MoviePlatforms = (params: PlatformsEntry) => {
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
                        <Divider style={styles.divider} />
                        <View style={styles.buttom}>
                            <SeeContentButtom platforms={params.platforms} />
                        </View>
                    </View>
                </>
            ) : (
                <BodyText
                    size="big"
                    color={colors.primaryRed}
                    body="No disponible en ninguna plataforma."
                    style={{ width: 160, margin: 10 }}
                />
            )}
        </View>
    )
}
