import React from 'react'
import { Image } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { colors } from '../../assets'
import { LocalIcon } from '../Types/LocalIcon'

type WatchlistButtonParams = {
    watchlistLoading: boolean
    inWatchlist: boolean
    iconStyle: object
}

export const WatchlistButton = (params: WatchlistButtonParams) => {
    return params.watchlistLoading ? (
        <ActivityIndicator
            size="small"
            animating={true}
            color={colors.primaryBlue}
            style={{ marginRight: 7 }}
        />
    ) : (
        <Image
            source={
                params.inWatchlist
                    ? LocalIcon.removeFromWatchlist
                    : LocalIcon.addToWatchlist
            }
            style={params.iconStyle}
        />
    )
}
