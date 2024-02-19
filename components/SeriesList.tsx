import React, { useState } from 'react'
import { ScrollView, View, Image, StyleSheet, Pressable, ImageSourcePropType, ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-paper';
import { BodyText } from './BasicComponents/BodyText'
import { TitleText } from './BasicComponents/TitleText'
import { colors } from '../assets/styles/colors'
import { WatchlistButton } from './BasicComponents/WatchlistButton';

const MAX_TITLE_LENGHT = 50

export type SeriesEntry = {
    id: string,
    title: string,
    poster: string,
    available: boolean,
    releaseYear: string,
    lastYear: string,
    score: number,
    seen: boolean,
    inWatchlist: boolean,
    status: string
}

export type SeriesListCallbacks = {

    onSeriesPress: (series: SeriesEntry) => void;
    onSeriesSeenPress: (series: SeriesEntry, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => void;
    onWatchlistPress: (series: SeriesEntry, setLoading: React.Dispatch<React.SetStateAction<boolean>>, setWatchlistIcon: React.Dispatch<React.SetStateAction<boolean>>, inWatchlist: boolean) => void;

}

type SeriesListProps = {
    seriesList: SeriesEntry[],
    callbacks: SeriesListCallbacks,
}

export const SeriesList = (params: SeriesListProps) => {
    const seriesList = params.seriesList

    // Callbacks calls
    // ------------------------------------------------------------
    const onSeriesPress = (seriesEntry: SeriesEntry) => {
        params.callbacks.onSeriesPress(seriesEntry)
    }

    const onSeenPress = (seriesEntry: SeriesEntry, loading: boolean, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
        if (loading) return
        params.callbacks.onSeriesSeenPress(seriesEntry, setLoading)
    }


    const onWatchlistPress = (seriesEntry: SeriesEntry, loading: boolean, setLoading: React.Dispatch<React.SetStateAction<boolean>>, setInWatchlist: React.Dispatch<React.SetStateAction<boolean>>, inWatchlist: boolean) => {
        if (loading) return
        params.callbacks.onWatchlistPress(seriesEntry, setLoading, setInWatchlist, inWatchlist);

    }
    // ------------------------------------------------------------


    // Render functions
    // ------------------------------------------------------------
    const renderSeriesEntry = (seriesEntry: SeriesEntry, index: number) => {
        return (
            <View key={index}>
                <View style={styles.seriesEntryContainer}>
                    
                    {renderCoverSection(seriesEntry)}

                    {renderDetailsSection(seriesEntry)}
                </View>
                <View style={{height: 1, backgroundColor: 'black', width: '90%', marginBottom: 10, alignSelf: 'center'}}></View>
            </View>
        )
    }

    const renderCoverSection = (seriesEntry: SeriesEntry) => {
        const coverOutlineStyle = { backgroundColor: seriesEntry.available ? colors.secondaryBlue : 'transparent' }

        return (
            <Pressable
                onPress={() => onSeriesPress(seriesEntry)}
                style={[styles.imageContainer, coverOutlineStyle]}
            >
                {seriesEntry.poster?
                    <Image
                        source={{ uri: "https://image.tmdb.org/t/p/original" + seriesEntry.poster }}
                        style={styles.coverImage}
                        resizeMode="contain"
                    /> :
                    <View style={[styles.coverImage, {backgroundColor: colors.primarySkyBlue, alignItems: 'center', justifyContent: 'center'}]}>
                        <Icon source="image-off-outline" size={70}/>
                    </View>
                }
            </Pressable>
        )
    }

    const renderDetailsSection = (seriesEntry: SeriesEntry) => {
        let seriesTitle = seriesEntry.title
        if (seriesEntry.title.length > MAX_TITLE_LENGHT) {
            seriesTitle = seriesEntry.title.slice(0, MAX_TITLE_LENGHT).trim() + '...'
        }

        const availableText = seriesEntry.available ? "Disponible en tus plataformas" : ""
        const scoreFormatted = seriesEntry.score.toString() + "/10"
        const seenIcon = seriesEntry.seen ? require('../assets/icons/unmarkAsSeen.png') : require('../assets/icons/markAsSeen.png')
        const [inWatchlist, setInWatchlist] = useState(seriesEntry.inWatchlist)

        return (
            <Pressable onPress={() => onSeriesPress(seriesEntry)} style={styles.detailsContainer}>
                {renderTitle(seriesTitle, seriesEntry.releaseYear, seriesEntry.lastYear, seriesEntry.status)}

                {renderSmallText(availableText, seriesEntry.status)}

                {renderBottomSection(seriesEntry, scoreFormatted, seenIcon, setInWatchlist, inWatchlist)}
            </Pressable>
        )
    }

    const renderTitle = (title: string, releaseYear: string, lastYear: string, status: string) => {
        return (
            <View style={{ flex: 0.6, }}>
                <TitleText body={title} size='small' numberOfLines={2}/>
                {(status === 'Finalizada' || status === 'Cancelada')?
                <TitleText body={"(" + (releaseYear? releaseYear : " ? ") + ' - ' + (lastYear? lastYear : " ? ") + ")"} size='small' /> : null}
                {status === 'Serie en emisión'?
                <TitleText body={"(" + (releaseYear? releaseYear : " ? ") + ' - Presente)'} size='small' /> : null}
            </View>
        )
    }

    const renderSmallText = (availableText: string, status: string) => {
        return (
            <View style={{ flex: 0.35 }}>
                <BodyText body={status} size='medium' fontStyle='italic' color={colors.primaryBlue} style={{fontWeight: 'bold'}} />
                <BodyText body={availableText} size='medium' fontStyle='italic' color={colors.secondaryBlue} />
            </View>
        )
    }


    const renderBottomSection = (seriesEntry: SeriesEntry, scoreFormatted: string, seenIcon: ImageSourcePropType, setInWatchlist: React.Dispatch<React.SetStateAction<boolean>>, inWatchlist: boolean) => {
        const [seenLoading, setSeenLoading] = React.useState(false)
        const [watchlistLoading, setWatchlistLoading] = React.useState(false)
        return (
            <View style={{ flex: 0.25, flexDirection: 'row', width: '100%' }}>

                {/* Section that render StreamClub logo */}
                {/* ------------------------------------------------------------ */}
                <Pressable style={styles.logoContainer}>
                    <Image
                        source={require('../assets/images/logo.png')}
                        style={styles.logoStyle}
                    />
                </Pressable>
                {/* ------------------------------------------------------------ */}

                {/* Section that render content score */}
                {/* ------------------------------------------------------------ */}
                <Pressable style={styles.scoreContainer}>
                    <BodyText body={scoreFormatted} size='big' />
                </Pressable>
                {/* ------------------------------------------------------------ */}

                {/* Section that render watchlist and seen buttons */}
                {/* ------------------------------------------------------------ */}
                
                {/* Seen Section */}
                <Pressable 
                    onPress={() => onSeenPress(seriesEntry, seenLoading, setSeenLoading)} 
                    style={styles.iconContainer}
                >
                    {seenLoading ?
                        <ActivityIndicator size="small" animating={true} color={colors.primaryRed} style={{marginRight: 7}}/>
                        :
                        <Image
                            source={seenIcon}
                            style={styles.iconsStyle}
                        />
                    }
                </Pressable>

                {/* Watchlist Section */}
                <Pressable 
                    onPress={() => onWatchlistPress(seriesEntry, watchlistLoading, setWatchlistLoading, setInWatchlist, inWatchlist)} 
                    style={styles.iconContainer}
                >
                    <WatchlistButton inWatchlist={inWatchlist} watchlistLoading={watchlistLoading} iconStyle={styles.iconsStyle} />
                </Pressable>
                {/* ------------------------------------------------------------ */}
            </View>
        )
    }
    // ------------------------------------------------------------

    return (
        <ScrollView
            style={styles.seriesListContainer}
        >
            {seriesList.map(renderSeriesEntry)}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    seriesListContainer: {
        width: '97%',
        marginTop: 10,
    },
    seriesEntryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 220,
        marginBottom: 10,
    },
    imageContainer: {
        flex: 0.35,
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
        borderRadius: 10,
        padding: 6,
    },
    coverImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        margin: 10,
    },
    detailsContainer: {
        flex: 0.65,
        height: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 3,
        marginLeft: 10,
    },
    logoContainer: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoStyle: {
        height: 60,
        aspectRatio: 1
    },
    iconsStyle: {
        height: 35,
        aspectRatio: 495 / 512
    },
    scoreContainer: { 
        flex: 0.4, 
        justifyContent: 'center' 
    },
    iconContainer: { 
        flex: 0.20, 
        justifyContent: 'center', 
        alignItems: 'flex-end' 
    },
})