import React from 'react'
import { SeriesTitle } from './SeriesTitle'
import { SeriesEntry } from '../../../entities/SeriesListEntry'
import { formatTitle } from '../../../utils/formatTitle'
import { ContentState } from '../../Content/contentList/ContentState'

type SeriesBodyProps = {
    serieEntry: SeriesEntry
}

export const SeriesBody = (params: SeriesBodyProps) => {
    const { serieEntry } = params

    return (
        <>
            <SeriesTitle
                title={formatTitle(serieEntry.title)}
                years={{
                    releaseYear: serieEntry.releaseYear,
                    lastYear: serieEntry.lastYear,
                }}
                status={serieEntry.status}
            />

            <ContentState
                status={serieEntry.status}
                available={serieEntry.available}
            />
        </>
    )
}
