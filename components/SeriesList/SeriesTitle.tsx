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

    const hasSeriesEnded = (status: string) => {
        return status === 'Finalizada' || status === 'Cancelada'
    }

    const isSeriesOngoing = (status: string) => {
        return status === 'Serie en emisión'
    }

    return (
        <View style={{ flex: 0.6 }}>
            <TitleText body={title} size="small" numberOfLines={2} />
            {hasSeriesEnded(status) ? (
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
            {isSeriesOngoing(status) ? (
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
