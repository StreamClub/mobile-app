import React from 'react'
import { BodyText } from "./BasicComponents/BodyText";
import { View, Image, StyleSheet } from 'react-native';
import { TitleText } from './BasicComponents/TitleText';
import { ScrollView } from 'react-native-gesture-handler';
import { colors } from '../assets';
import { Icon } from 'react-native-paper';

export type Actor = {
    name: string;
    profilePath: string;
    character: string;
}

export type CastListParams = {
    cast: Array<Actor>;
    style: object;
}

export const CastList = (params: CastListParams) => {
    return(
        <View style={[params.style, {}]}>
            <TitleText body="Reparto: " style={{fontWeight: 'bold'}} />
            <ScrollView horizontal>
                {params.cast.map((actor, index) => 
                    <View style={{flexDirection: 'column', width: 110, margin: 5}} key={index}>
                        {actor.profilePath?
                        <Image 
                            source={{ uri: "https://image.tmdb.org/t/p/original" + actor.profilePath }}
                            style={styles.photo} /> :
                        <View style={[styles.photo, {backgroundColor: colors.primarySkyBlue, alignItems: 'center', justifyContent: 'center'}]}>
                            <Icon source="image-off-outline" size={90}/>
                        </View> }
                        <BodyText 
                            body={actor.name} 
                            numberOfLines={2}/>
                        <BodyText 
                            body={actor.character} 
                            numberOfLines={2} 
                            style={{fontWeight: 'bold'}}
                            color={colors.primaryGrey}/>
                    </View>
                    
                )}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    photo: {
        height: 180,
        width: 110,
        borderRadius: 10
    }
})
