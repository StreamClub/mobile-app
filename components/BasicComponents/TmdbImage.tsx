import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { BodyText } from './BodyText';
import { colors } from '../../assets/styles/colors';
import config from '../../config.json';
import { Icon } from 'react-native-paper'

const defaultIconSize = 70
const max_length = 70

export enum TmdbImageType {
    Cover = "image-off-outline",
    Person = "account",
}


export type TmdbImageParams = {
    resource: string,
    type: TmdbImageType,
    style: object
    iconSize?: number
    altText?: string
}

export const TmdbImage = (params: TmdbImageParams) => {
    const iconSize = params.iconSize || defaultIconSize
    const iconName = params.type

    const altText = params.altText

    return (
        <>
            {params.resource ?
                <Image
                    source={{ uri: config.tmdbBaseUrl + params.resource }}
                    style={params.style}
                />
                :
                <View
                    style={[
                        params.style,
                        {
                            backgroundColor: colors.primarySkyBlue,
                            alignItems: 'center',
                            justifyContent: 'center',
                        },
                    ]}
                >
                    {altText ?
                        <BodyText body={altText} size="big" max_length={max_length} style={{ textAlign: "center" }} />
                        :
                        <Icon source={iconName} size={iconSize} />
                    }
                </View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "100%"
    },
    iconStyle: {
        width: 25,
        aspectRatio: 487 / 512,
    }
})
