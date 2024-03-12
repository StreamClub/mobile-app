import React from 'react'
import { View, Image } from 'react-native';
import { LocalIcon } from '../Types/LocalIcon';

type SeenContentEntryFooterParams = {
    size: number;
}

export const SeenContentEntryFooter = (params: SeenContentEntryFooterParams) => {
    const size = params.size
    
    return(
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
                source={LocalIcon.popcorn}
                style={{
                    width: size,
                    aspectRatio: 1240 / 1598,
                    marginLeft: 11,
                }} />
            <View style={{ flexGrow: 1 }}></View>
            <Image
                source={LocalIcon.review}
                style={{
                    width: size,
                    aspectRatio: 555 / 513,
                    marginRight: 11,
                }} />
        </View>
    )
}
