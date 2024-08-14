import React, { useState } from 'react'
import { Pressable, StyleSheet, View, Dimensions, FlatList } from 'react-native'
import { colors } from '../../assets'
import { Credits, CastEntry, CrewEntry, CreditsEntry } from '../Types/Credits'
import {
    PosterWithDetails,
    PosterWithDetailsParams,
} from '../PosterWithDetails'
import { createTuples } from '../../utils/listManager'
import { TitleText } from '../BasicComponents/TitleText'
import { Icon } from 'react-native-paper'

export type ArtistFilmografyParams = {
    credits: Credits
    onPressCreditsEntry: (entry: CreditsEntry) => void
}

const screenWidth = Dimensions.get('window').width

const getDescription = (credit: CastEntry | CrewEntry) => {
    return 'character' in credit ? credit.character : credit.job
}

const renderRow = (
    creditsPair: Array<CastEntry> | Array<CrewEntry>,
    index: number,
    params: ArtistFilmografyParams
) => {
    const credit1 = creditsPair[0]
    const description1 = getDescription(credit1)
    const entry1: PosterWithDetailsParams = {
        poster: credit1.poster,
        title: credit1.title,
        description: description1,
        onPressCreditsEntry: params.onPressCreditsEntry,
        creditsEntry: credit1
    }

    let entry2: PosterWithDetailsParams = {
        poster: '',
        title: '',
        description: '',
        onPressCreditsEntry: params.onPressCreditsEntry,
        creditsEntry: { id: 0, title: '', poster: '', mediaType: '' }
    }
    if (creditsPair.length > 1) {
        const credit2 = creditsPair[1]
        const description2 = getDescription(credit2)
        entry2 = {
            poster: credit2.poster,
            title: credit2.title,
            description: description2,
            onPressCreditsEntry: params.onPressCreditsEntry,
            creditsEntry: credit2
        }
    }
    const entry2NotEmpty = entry2.poster || entry2.title || entry2.description

    return (
        <View key={index} style={{ flexDirection: 'row' }}>
            <PosterWithDetails {...entry1} />
            {entry2NotEmpty && <PosterWithDetails {...entry2} />}
        </View>
    )
}

export const ArtistFilmografy = (params: ArtistFilmografyParams) => {
    const [showCastSection, setShowCastSection] = useState(false)
    const [showCrewSection, setShowCrewSection] = useState(false)

    const castList = params.credits.cast
    const castTuples = createTuples(castList)

    const crewList = params.credits.crew
    const crewTuples = createTuples(crewList)

    const castTitleSymbol = showCastSection ? 'chevron-down' : 'chevron-right'
    const crewTitleSymbol = showCrewSection ? 'chevron-down' : 'chevron-right'

    const castSectionTitle = 'Actuaciones (' + castList.length + ')'
    const crewSectionTitle = 'Participaciones (' + crewList.length + ')'

    return (
        <View style={styles.container}>
            <Pressable
                style={[styles.sectionTitle, { width: screenWidth }]}
                onPress={() => setShowCastSection(!showCastSection)}
            >
                <Icon source={castTitleSymbol} size={30} />
                <TitleText body={castSectionTitle} size="medium" />
            </Pressable>
            {showCastSection &&
                <FlatList
                    data={castTuples}
                    renderItem={({ item, index }) => renderRow(item, index, params)}
                    keyExtractor={(item, index) => index.toString()}
                    initialNumToRender={2}
                    windowSize={6}
                />
            }

            <Pressable
                style={[styles.sectionTitle, { width: screenWidth }]}
                onPress={() => setShowCrewSection(!showCrewSection)}
            >
                <Icon source={crewTitleSymbol} size={30} />
                <TitleText body={crewSectionTitle} size="medium" />
            </Pressable>
            {showCrewSection &&
                <FlatList
                    data={crewTuples}
                    renderItem={({ item, index }) => renderRow(item, index, params)}
                    keyExtractor={(item, index) => index.toString()}
                    initialNumToRender={2}
                    windowSize={6}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    sectionTitle: {
        flexDirection: 'row',
        paddingLeft: 10,
        alignItems: 'flex-end',
    },
    title: {
        width: 150,
        color: colors.primaryGrey,
        fontWeight: 'bold',
    },
    description: {
        width: 150,
        color: colors.primaryGrey,
    },
})
