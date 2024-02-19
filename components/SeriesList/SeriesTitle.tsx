import { View } from 'react-native'
import { TitleText } from '../BasicComponents/TitleText'
import React from 'react'

type SeriesTitleProps = {
    title: string
    years: {
        releaseYear: string
        lastYear: string
    }
    status: string
}

export const SeriesTitle = (params: SeriesTitleProps) => {
    const { title, status } = params
    const { releaseYear, lastYear } = params.years
    return (
        <View style={{ flex: 0.6 }}>
            <TitleText body={title} size="small" numberOfLines={2} />
            {status === 'Finalizada' || status === 'Cancelada' ? (
                <TitleText
                    body={
                        '(' +
                        (releaseYear ? releaseYear : ' ? ') +
                        ' - ' +
                        (lastYear ? lastYear : ' ? ') +
                        ')'
                    }
                    size="small"
                />
            ) : null}
            {status === 'Serie en emisión' ? (
                <TitleText
                    body={
                        '(' +
                        (releaseYear ? releaseYear : ' ? ') +
                        ' - Presente)'
                    }
                    size="small"
                />
            ) : null}
        </View>
    )
}
