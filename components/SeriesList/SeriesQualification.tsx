import React from 'react'
import { Image, Pressable } from 'react-native'
import { BodyText } from '../BasicComponents/BodyText'
import { styles } from '../SeriesList/styles/SeriesList.style'

type SeriesQualificationProps = {
    score: string
}

export const SeriesQualification = (params: SeriesQualificationProps) => {
    const { score } = params
    return (
        <>
            <Pressable style={styles.logoContainer}>
                <Image
                    source={require('../../assets/images/logo.png')}
                    style={styles.logoStyle}
                />
            </Pressable>

            <Pressable style={styles.scoreContainer}>
                <BodyText body={score} size="big" />
            </Pressable>
        </>
    )
}
