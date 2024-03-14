import React from 'react'
import { Image, View, StyleSheet } from 'react-native';
import { colors } from '../../assets';
import { SeenContentEntry } from '../Types/SeenContentEntry';
import { LinearGradient } from 'expo-linear-gradient';
import { BodyText } from '../BasicComponents/BodyText';
import { EpisodeNumber } from '../Types/EpisodeNumber';
import { Percent } from '../BasicComponents/Percent';
import { CreditsEntry } from '../Types/Credits';

export type CreditsEntryWrapperProps = {
    width: number;
    showPercentText: Boolean;
    percentSize: number;
    marginHorizontal: number;
    bottomLastSeen: number;
    topPercent: number;
    leftPercent: number,
    sizeLastSeenIcons: number;
}

export const CreditsEntryWrapper = (itemObject: CreditsEntry, itemComponent: React.ReactElement, props: any) => {

    return (
        <View>
            {itemComponent}
            <BodyText body={"17/08/24"} size='medium' style={{marginLeft: 10}}/>
        </View>
    )
}

const styles = StyleSheet.create({
});
