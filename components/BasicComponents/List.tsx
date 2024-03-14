import React from 'react'
import { View, StyleSheet, Dimensions, Pressable } from 'react-native';
import { colors } from '../../assets';
import { createTuples } from '../../utils/listManager';
import { TmdbImage, TmdbImageParams, TmdbImageType } from '../BasicComponents/TmdbImage';

const ENTRIES_PER_ROW = 3;
const entryContainerFlex = 1/ENTRIES_PER_ROW
const screenWidth = Dimensions.get('window').width;

export type ListEntry = {
    tmdbResource: string;
    itemObject: Object;
};

export type ListEntryWrapperParams = {
    itemObject: any;
    itemComponent: React.JSX.Element;
    props: any;
}

export type ListParams = {
    list: ListEntry[];
    type: TmdbImageType;
    listEntryStyle: Object;
    // entriesPerRow?: number;
    // listWidth?: number;
    onPressListEntry: (itemObject: any) => void;
    listEntryWrapper?: (itemObject: any, itemComponent:React.JSX.Element, params: any) => React.ReactNode;
    listEntryWrapperProps?: any;
}

const renderEntry = (entry: ListEntry, index: number, params: ListParams) => {
    const tmdbImageParams: TmdbImageParams = {
        resource: entry.tmdbResource,
        type: params.type,
        style: params.listEntryStyle,
    }

    const itemComponent = <TmdbImage {...tmdbImageParams}/>

    const width = (screenWidth * entryContainerFlex) - 2;

    const onPress = () => params.onPressListEntry(entry.itemObject)

    const listEntryWrapperParams: ListEntryWrapperParams = {
        itemObject: entry.itemObject,
        itemComponent: itemComponent,
        props: params.listEntryWrapperProps,
    }

    return(
        <Pressable key={index} style={styles.entryContainer} onPress={onPress}>
            {params.listEntryWrapper?
                params.listEntryWrapper(entry.itemObject, itemComponent, params.listEntryWrapperProps)
                :
                itemComponent
            }
        </Pressable>
    )
}

const renderRow = (tuple: ListEntry[], index: number, params: ListParams) => {
    return(
        <View key={index} style={styles.rowContainer}>
            {tuple.map((entry, index) => renderEntry(entry, index, params))}
        </View>
    )
}

export const List = (params: ListParams) => {
    const tuples = createTuples(params.list, ENTRIES_PER_ROW)
    return(
        <View style={styles.container}>
            {tuples.map((tuple: ListEntry[], index: number) => 
                renderRow(tuple, index, params))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
