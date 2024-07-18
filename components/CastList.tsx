import React from 'react'
import { BodyText } from "./BasicComponents/BodyText";
import { View, StyleSheet, Pressable } from 'react-native';
import { TitleText } from './BasicComponents/TitleText';
import { ScrollView } from 'react-native-gesture-handler';
import { colors } from '../assets';
import { TmdbImage, TmdbImageType } from './BasicComponents/TmdbImage';
import { ArtistDetailsParams } from '../apiCalls/params/content/ArtistDetailParams';
import { router } from 'expo-router';

export type Actor = {
    id: number,
    name: string;
    profilePath: string;
    character: string;
}

export type CastListParams = {
    cast: Array<Actor>;
    style: object;
}

export const CastList = (params: CastListParams) => {

    const onPress = (actor: Actor) => {
        const newParams: ArtistDetailsParams = {
            id: actor.id.toString(),
        }
        router.replace({ pathname: '/artist', params: newParams })
    }

    return(
        <View style={[params.style, {}]}>
            <TitleText body="Reparto: " style={{fontWeight: 'bold'}} />
            <ScrollView horizontal>
                {params.cast.map((actor, index) => 
                    <Pressable onPress={() => onPress(actor)} key={index}>
                        <View style={{flexDirection: 'column', width: 110, margin: 5}}>
                            <TmdbImage
                                resource={actor.profilePath}
                                type={TmdbImageType.Person}
                                style={styles.photo} />
                            <BodyText 
                                body={actor.name} 
                                numberOfLines={2}/>
                            <BodyText 
                                body={actor.character} 
                                numberOfLines={2} 
                                style={{fontWeight: 'bold'}}
                                color={colors.primaryGrey}/>
                        </View>
                    </Pressable>
                    
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
