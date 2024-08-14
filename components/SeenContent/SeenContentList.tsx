import React from 'react'
import { View, StyleSheet, Dimensions, Pressable, FlatList } from 'react-native';
import { colors } from '../../assets';
import { createTuples } from '../../utils/listManager';
import { TmdbImage, TmdbImageParams, TmdbImageType } from '../BasicComponents/TmdbImage';
import { SeenContentEntry } from '../Types/SeenContentEntry';
import { seenContentEntryWrapper, SeenContentEntryWrapperParams, SeenContentEntryWrapperProps } from './SeenContentEntryWrapper';
import { useAppSelector } from '../../hooks/redux/useAppSelector';
import { useSeenContent } from '../../hooks/useSeenContent';

const ENTRIES_PER_ROW = 3;
const entryContainerFlex = 1/ENTRIES_PER_ROW
const screenWidth = Dimensions.get('window').width;

export type SeenContentListParams = {
    onPressSeenContentEntry: (entry: SeenContentEntry) => void;
}

const renderSeenContentEntry = (seenContentEntry: SeenContentEntry, index: number, params: SeenContentListParams) => {
    const tmdbImageParams: TmdbImageParams = {
        resource: seenContentEntry.poster,
        type: TmdbImageType.Cover,
        altText: seenContentEntry.title,
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
    const onPress = () => params.onPressSeenContentEntry(seenContentEntry)

    return(
        <Pressable key={index} style={styles.entryContainer} onPress={onPress}>
            {seenContentEntryWrapper(seenContentEntryWrapperParams)}
        </Pressable>
    )
}

const renderSeenContentRow = (tuple: SeenContentEntry[], index: number, params: SeenContentListParams) => {
    return(
        <View key={index} style={styles.rowContainer}>
            {tuple.map((entry, index) => renderSeenContentEntry(entry, index, params))}
        </View>
    )
}

export const SeenContentList = (params: SeenContentListParams) => {
    const { seenContent } = useAppSelector((state) => state.seenContent)
    const { loadSeenContentPage } = useSeenContent()

    const tuples = createTuples(seenContent, ENTRIES_PER_ROW)
    return(
        <FlatList 
            style={styles.container}
            data={tuples}
            renderItem={({item, index}) => renderSeenContentRow(item, index, params)}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0}
            onEndReached={loadSeenContentPage}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: colors.secondaryWhite
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
