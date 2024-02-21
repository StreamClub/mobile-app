import { View } from 'react-native'
import { TitleText } from '../BasicComponents/TitleText'
import React from 'react'

type MovieTitleProps = {
    title: string
    year: string
}

export const MovieTitle = (params: MovieTitleProps) => {
    const { title, year } = params

    return (
        <View style={{ flex: 0.6 }}>
            <TitleText body={title} size="small" numberOfLines={2} />
            <TitleText body={'(' + (year ? year : ' ? ') + ')'} size="small" />
        </View>
    )
}
