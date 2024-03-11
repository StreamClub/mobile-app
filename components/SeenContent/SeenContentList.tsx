import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../assets';
import { createTuples } from '../../utils/listManager';
import { TmdbImage, TmdbImageParams, TmdbImageType } from '../BasicComponents/TmdbImage';
import { SeenContentEntry } from '../Types/SeenContentEntry';
import { renderItemContainer } from './SeenContentEntryContainer';

const ENTRIES_PER_ROW = 3;
const entryContainerFlex = 1/ENTRIES_PER_ROW
const screenWidth = Dimensions.get('window').width;

export type SeenContentListParams = {
    seenContentList: SeenContentEntry[];
}

const renderSeenContentEntry = (entry: SeenContentEntry, index: number) => {
    const params: TmdbImageParams = {
        resource: entry.poster,
        type: TmdbImageType.Cover,
        style: styles.posterStyle,
    }

    const itemComponent = <TmdbImage {...params}/>

    const width = (screenWidth / ENTRIES_PER_ROW) - 2

    return(
        <View key={index} style={styles.entryContainer}>
            {renderItemContainer(itemComponent, entry, width, false, 30)}
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
