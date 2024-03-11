import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../assets';
import { createTuples } from '../../utils/listManager';
import { TmdbImage, TmdbImageParams, TmdbImageType } from '../BasicComponents/TmdbImage';
import { SeenContentEntry } from '../Types/SeenContentEntry';
import { seenContentEntryWrapper, SeenContentEntryWrapperParams, SeenContentEntryWrapperProps } from './SeenContentEntryWrapper';

const ENTRIES_PER_ROW = 3;
const entryContainerFlex = 1/ENTRIES_PER_ROW
const screenWidth = Dimensions.get('window').width;

export type SeenContentListParams = {
    seenContentList: SeenContentEntry[];
}

const renderSeenContentEntry = (seenContentEntry: SeenContentEntry, index: number) => {
    const tmdbImageParams: TmdbImageParams = {
        resource: seenContentEntry.poster,
        type: TmdbImageType.Cover,
        style: styles.posterStyle,
    }

    const itemComponent = <TmdbImage {...tmdbImageParams}/>

    const width = (screenWidth * entryContainerFlex) - 2;

    const seenContentEntryWrapperParams: SeenContentEntryWrapperParams = {
        itemComponent: itemComponent,
        itemObject: seenContentEntry,
        props: {
            width: width,
            showPercentText: false,
            percentSize: 30,
            marginHorizontal: 0,
            bottomLastSeen: 0,
            leftPercent: 5,
            topPercent: 5,
            sizeLastSeenIcons: 20,
        }
    }

    return(
        <View key={index} style={styles.entryContainer}>
            {/* {seenContentEntryWrapper(itemComponent, entry, width, false, 30)} */}
            {seenContentEntryWrapper(seenContentEntryWrapperParams)}
        </View>
    )
}

const renderSeenContentRow = (tuple: SeenContentEntry[], index: number) => {
    return(
        <View key={index} style={styles.rowContainer}>
            {tuple.map((entry, index) => renderSeenContentEntry(entry, index))}
        </View>
    )
}

export const SeenContentList = (params: SeenContentListParams) => {
    const tuples = createTuples(params.seenContentList, ENTRIES_PER_ROW)
    return(
        <View style={styles.container}>
            {tuples.map((tuple: SeenContentEntry[], index: number) => 
                renderSeenContentRow(tuple, index))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primaryWhite,
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    entryContainer: {
        flex: entryContainerFlex,
        margin: 1,
    },
    posterStyle: {
        width: "100%",
        aspectRatio: 2/3,
    }
})
