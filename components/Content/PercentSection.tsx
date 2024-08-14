import React from 'react'
import { Image, Pressable, ActivityIndicator } from 'react-native'
import { colors } from '../../assets'
import { styles } from '../Series/SeriesList/styles/SeriesList.style'

import { ContentType } from '../../entities/ContentType'
import { LocalIcon } from '../Types/LocalIcon'
import { Percent } from '../BasicComponents/Percent'

type PercentSectionProps = {
    seenPercent: number
    onPress: (onPressParams: any) => void
    loading: boolean
    seasonId?: string
}

export const PercentSection = (params: PercentSectionProps) => {
    const { seenPercent, onPress, loading, seasonId} = params
    

    return (
        <>
            <Pressable onPress={() => onPress({seasonId})}>
                {loading ? (
                    <ActivityIndicator
                        size="small"
                        animating={true}
                        color={colors.primaryBlue}
                        style={{ marginRight: 7 }}
                    />
                ) : (
                    // <Image
                    //     source={
                    //         seen ? LocalIcon.markAsUnseen : LocalIcon.markAsSeen
                    //     }
                    //     style={styles.iconsStyle}
                    // />
                    <Percent
                        style={{}}
                        size= {35}
                        showText= {false}
                        percent= {seenPercent}
                    />
                )}
            </Pressable>
        </>
    )
}
