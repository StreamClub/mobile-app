import React from 'react';
import { View } from 'react-native';
import { ContentFadingText } from '../Content/ContentFadingText';
import { BodyText } from '../BasicComponents/BodyText';

type SeriesCreatorsParams = {
    creators: Array<string>
}

export const SeriesCreators = (params: SeriesCreatorsParams) => {
    const creators = params.creators[0]? params.creators : ['sin datos'];
    return (
        <View style={{flexDirection: 'row'}}>
            <BodyText body={'Creador:'} size='medium' style={{fontWeight: 'bold'}} />
            <ContentFadingText text={creators} size='medium' />
        </View>
    )
}
