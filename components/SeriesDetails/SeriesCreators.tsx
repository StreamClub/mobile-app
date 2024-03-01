import React from 'react';
import { View } from 'react-native';
import { ContentFadingText } from '../Content/ContentFadingText';
import { BodyText } from '../BasicComponents/BodyText';

type SeriesCreatorsParams = {
    creators: Array<string>
}

export const SeriesCreators = (params: SeriesCreatorsParams) => {
    return (
        <View style={{flexDirection: 'row'}}>
            <BodyText body={'Creador: '} size='medium' style={{fontWeight: 'bold'}} />
            <ContentFadingText text={params.creators} size='medium' />
        </View>
    )
}
