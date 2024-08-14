import React from 'react'
import { View } from 'react-native'
import { styles } from './styles/MovieDetails.style'
import { SeeContentButton } from '../Content/SeeContentButton'
import { BodyText } from '../BasicComponents/BodyText'
import { colors } from '../../assets'
import { Platform } from '../../entities/Details/Platform'

export type SeeMovieButtonParams = {
    platforms: Array<Platform>
}

export const SeeMovieButton = (params: SeeMovieButtonParams) => {
    const { platforms } = params
    return (
        <>
            {platforms.length >= 1 ? (
                <>
                    <View
                        style={{
                            height: 'auto',
                            width: 180,
                            alignItems: 'center',
                        }}
                    >
                        <View style={styles.bottom}>
                            <SeeContentButton platforms={platforms} />
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
        </>
    )
}
