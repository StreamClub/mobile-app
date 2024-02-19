import React from 'react'
import { SeriesTitle } from './SeriesTitle'
import { SeriesState } from './SeriesState'
import { SeriesEntry } from '../../entities/SeriesListEntry'
import { toAvailableText } from '../../utils'
import { formatTitle } from '../../utils/formatTitle'
import { ContentListCallbacks } from '../Content/ContentListCallbacks'

type SeriesBodyProps = {
    serieEntry: SeriesEntry
    callbacks: ContentListCallbacks
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

            <SeriesState
                status={serieEntry.status}
                availableText={toAvailableText(serieEntry.available)}
            />
        </>
    )
}
