import React from 'react';
import { View, Image, Pressable, StyleSheet, Dimensions, Text} from 'react-native';
import { colors } from "../assets";
import { BodyText } from './BasicComponents/BodyText';
import { TitleText } from './BasicComponents/TitleText';
import { IconWithText, IconWithTextParams } from './IconWithText';
import { Icon } from 'react-native-paper';
import { formatDate, calculateAge } from './dateFunctions';

const screenWidth = Dimensions.get('window').width;

export type ArtistBasicInfoParams = {
    name: string,
    poster: string,
    birthDate: string,
    birthPlace: string,
    deathDate: string,
    style?: any,
}

export const ArtistBasicInfo = (params: ArtistBasicInfoParams) => {
    const birthDateParams: IconWithTextParams = {
        icon: require('../assets/icons/birth.png'),
        text: formatDate(params.birthDate),
        style: {marginBottom: 15}
    }
    const deathDateParams: IconWithTextParams = {
        icon: require('../assets/icons/death.png'),
        text: formatDate(params.deathDate),
        style: {marginBottom: 15}
    }
    const birthPlaceParams: IconWithTextParams = {
        icon: require('../assets/icons/location.png'),
        text: params.birthPlace,
    }

    return (
        <View style={[{flexDirection: 'row'}, params.style]}>
            <View style={{flex: 0.5, alignItems: 'center' }}>
                <TitleText body={params.name} size='big' style={{width:screenWidth/2, paddingLeft: 20, marginBottom: 20 }}/>
                <View style={{paddingTop: 20, flex:1}}>
                    {params.birthDate && <IconWithText {...birthDateParams}/>}
                    {params.deathDate && <IconWithText {...deathDateParams}/>}
                    {params.birthPlace && <IconWithText {...birthPlaceParams}/>}
                </View>
            </View>
            <View style={styles.imageContainer}>
                {params.poster?
                    <Image
                        source={{ uri: "https://image.tmdb.org/t/p/original" + params.poster }}
                        style={styles.image}
                        resizeMode="contain"
                    /> :
                    <View style={[styles.image, {backgroundColor: colors.primarySkyBlue, alignItems: 'center', justifyContent: 'center'}]}>
                        <Icon source="account" size={70}/>
                    </View>
                }
            
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderColor: colors.primaryGrey,
        borderWidth: 1,
    },
    imageContainer: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        borderRadius: 10,
        padding: 6,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        margin: 10,
    },
    description: {
        width: 150,
        color: colors.primaryGrey,
    },
})