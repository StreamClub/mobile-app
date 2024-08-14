import React from 'react'
import { View, StyleSheet, Dimensions, Pressable, FlatList} from 'react-native';
import { colors } from '../../assets';
import { createTuples } from '../../utils/listManager';
import { TmdbImage, TmdbImageParams, TmdbImageType } from '../BasicComponents/TmdbImage';


const screenWidth = Dimensions.get('window').width;

export type ListEntry = {
    tmdbResource: string;
    altText?: string;
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
    entriesPerRow: number;
    containerWidth?: number;
    onPressListEntry: (itemObject: any) => void;
    listEntryWrapper?: (itemObject: any, itemComponent:React.JSX.Element, params: any) => React.ReactNode;
    listEntryWrapperProps?: any;
    onReachedEnd?: () => void;
}

const renderEntry = (entry: ListEntry, index: number, params: ListParams) => {
    const tmdbImageParams: TmdbImageParams = {
        resource: entry.tmdbResource,
        type: params.type,
        style: params.listEntryStyle,
        altText: entry.altText,
    }

    const itemComponent = <TmdbImage {...tmdbImageParams}/>
    const entryContainerFlex = 1/params.entriesPerRow
    const width = (screenWidth * entryContainerFlex) - 2;

    const onPress = () => params.onPressListEntry(entry.itemObject)

    const st = {
        flex: entryContainerFlex,
        margin: 1,
    }

    return(
        <Pressable key={index} style={st} onPress={onPress}>
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
    const tuples = createTuples(params.list, params.entriesPerRow)
    const width = params.containerWidth? params.containerWidth : screenWidth;
    return(
        <View style={[styles.container, {width: width}]}>
            <FlatList
                data={tuples}
                renderItem={({ item, index }) => renderRow(item, index, params)}
                keyExtractor={(item, index) => index.toString()}
                initialNumToRender={8}
                windowSize={6}
                onEndReached={params.onReachedEnd}
                onEndReachedThreshold={0.3}
            />
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
    
    posterStyle: {
        width: "100%",
        aspectRatio: 2/3,
    }
})
