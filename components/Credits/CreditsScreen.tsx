import React, { useState } from 'react'
import { StyleSheet, ScrollView, View } from 'react-native';
import { colors } from '../../assets';
import { TmdbImageType } from '../BasicComponents/TmdbImage';
import { ListEntry, List, ListParams } from '../BasicComponents/List';
import { CreditsEntry } from '../Types/Credits';
import { CreditsEntryWrapper, CreditsEntryWrapperProps } from './CreditsEntryWrapper';
import { ButtonGroup } from '@rneui/themed'

const ENTRIES_PER_ROW = 3
const TEXT_SIZE = "medium"
const CAST_NAME = 'Elenco'
const CREW_NAME = 'Reparto'
const CATEGORIES = [CAST_NAME, CREW_NAME]
const INITIAL_CATEGORY = 0

export type CreditsScreenParams = {
    crew: ListEntry[],
    cast: ListEntry[],
    onPressCreditsEntry: (creditEntry: CreditsEntry) => void,
}

export const CreditsScreen = (params: CreditsScreenParams) => {
    const creditsEntryWrapperProps: CreditsEntryWrapperProps = {
        textSize: TEXT_SIZE,
    }
    const [selectedIndex, setSelectedIndex] = useState(INITIAL_CATEGORY)

    const renderButtonGroup = () => {
        return (
            <ButtonGroup
                buttons={CATEGORIES}
                selectedIndex={selectedIndex}
                onPress={setSelectedIndex}
                containerStyle={{
                    backgroundColor: 'transparent',
                    borderColor: 'black',
                    borderRadius: 20,
                }}
                buttonContainerStyle={{
                    borderColor: 'black',
                }}
                selectedButtonStyle={{
                    backgroundColor: colors.primaryRed,
                }}
                textStyle={{
                    color: 'black',
                    fontSize: 14,
                }}
            />
        )
    }

    const castListParams: ListParams = {
        list: params.cast,
        listEntryStyle: styles.poster,
        type: TmdbImageType.Person,
        listEntryWrapper: CreditsEntryWrapper,
        listEntryWrapperProps: creditsEntryWrapperProps,
        onPressListEntry: params.onPressCreditsEntry,
        entriesPerRow: ENTRIES_PER_ROW,
    }
    const crewListParams: ListParams = {
        list: params.crew,
        listEntryStyle: styles.poster,
        type: TmdbImageType.Person,
        listEntryWrapper: CreditsEntryWrapper,
        listEntryWrapperProps: creditsEntryWrapperProps,
        onPressListEntry: params.onPressCreditsEntry,
        entriesPerRow: ENTRIES_PER_ROW,
    }

    return (
        <View style={styles.container}>
            <View style={{flex: 0.1, alignItems: 'center', justifyContent: 'center'}}>
                {renderButtonGroup()}
            </View>
            
            <ScrollView style={{flex: 0.9}}>
                {selectedIndex == 0?
                    <List {...castListParams}/>
                    :
                    <List {...crewListParams}/>
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: colors.secondaryWhite,
    },
    poster: {
        width: "100%",
        aspectRatio: 2/3,
    },
});
