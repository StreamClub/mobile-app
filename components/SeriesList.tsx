import React from 'react'
import { ScrollView, View, Image, StyleSheet, Pressable, ImageSourcePropType, ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-paper';
import { BodyText } from './BasicComponents/BodyText'
import { TitleText } from './BasicComponents/TitleText'
import { colors } from '../assets/styles/colors'

const MAX_TITLE_LENGHT = 50

export type SerieEntry = {
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
    onSeriePress: (serie: SerieEntry) => void;
    onSerieSeenPress: (serie: SerieEntry, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => void;
    onSerieWatchlistPress: (serie: SerieEntry, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => void;
}

type SeriesListProps = {
    seriesList: SerieEntry[],
    callbacks: SeriesListCallbacks,
}

export const SeriesList = (params: SeriesListProps) => {
    const seriesList = params.seriesList

    // Callbacks calls
    // ------------------------------------------------------------
    const onSeriePress = (serieEntry: SerieEntry) => {
        params.callbacks.onSeriePress(serieEntry)
    }

    const onSeenPress = (serieEntry: SerieEntry, loading: boolean, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
        if (loading) return
        params.callbacks.onSerieSeenPress(serieEntry, setLoading)
    }

    const onWatchlistPress = (serieEntry: SerieEntry, loading: boolean, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
        if (loading) return
        params.callbacks.onSerieWatchlistPress(serieEntry, setLoading)
    }
    // ------------------------------------------------------------


    // Render functions
    // ------------------------------------------------------------
    const renderSerieEntry = (serieEntry: SerieEntry, index: number) => {
        return (
            <View key={index}>
                <View style={styles.serieEntryContainer}>
                    
                    {renderCoverSection(serieEntry)}

                    {renderDetailsSection(serieEntry)}
                </View>
                <View style={{height: 1, backgroundColor: 'black', width: '90%', marginBottom: 10, alignSelf: 'center'}}></View>
            </View>
        )
    }

    const renderCoverSection = (serieEntry: SerieEntry) => {
        const coverOutlineStyle = { backgroundColor: serieEntry.available ? colors.secondaryBlue : 'transparent' }

        return (
            <Pressable
                onPress={() => onSeriePress(serieEntry)}
                style={[styles.imageContainer, coverOutlineStyle]}
            >
                {serieEntry.poster?
                    <Image
                        source={{ uri: "https://image.tmdb.org/t/p/original" + serieEntry.poster }}
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

    const renderDetailsSection = (serieEntry: SerieEntry) => {
        let serieTitle = serieEntry.title
        if (serieEntry.title.length > MAX_TITLE_LENGHT) {
            serieTitle = serieEntry.title.slice(0, MAX_TITLE_LENGHT).trim() + '...'
        }

        const availableText = serieEntry.available ? "Disponible en tus plataformas" : ""
        const scoreFormatted = serieEntry.score.toString() + "/10"
        const seenIcon = serieEntry.seen ? require('../assets/icons/unmarkAsSeen.png') : require('../assets/icons/markAsSeen.png')
        const watchlistIcon = serieEntry.inWatchlist ? require('../assets/icons/removeFromWatchlist.png') : require('../assets/icons/addToWatchlist.png')

        return (
            <Pressable onPress={() => onSeriePress(serieEntry)} style={styles.detailsContainer}>
                {renderTitle(serieTitle, serieEntry.releaseYear, serieEntry.lastYear, serieEntry.status)}

                {renderSmallText(availableText, serieEntry.status)}

                {renderBottomSection(serieEntry, scoreFormatted, seenIcon, watchlistIcon)}
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

    const renderBottomSection = (serieEntry: SerieEntry, scoreFormatted: string, seenIcon: ImageSourcePropType, watchlistIcon: ImageSourcePropType) => {
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
                    onPress={() => onSeenPress(serieEntry, seenLoading, setSeenLoading)} 
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
                    onPress={() => onWatchlistPress(serieEntry, watchlistLoading, setWatchlistLoading)} 
                    style={styles.iconContainer}
                >
                    {watchlistLoading ?
                        <ActivityIndicator size="small" animating={true} color={colors.primaryRed} style={{marginRight: 7}}/>
                        :
                        <Image
                            source={watchlistIcon}
                            style={styles.iconsStyle}
                        />
                    }
                </Pressable>
                {/* ------------------------------------------------------------ */}
            </View>
        )
    }
    // ------------------------------------------------------------

    return (
        <ScrollView
            style={styles.serieListContainer}
        >
            {seriesList.map(renderSerieEntry)}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    serieListContainer: {
        width: '97%',
        marginTop: 10,
    },
    serieEntryContainer: {
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