import React, {useState} from 'react';
import { CustomButton } from '../BasicComponents/CustomButton';
import { Linking, View } from 'react-native';
import { Overlay } from 'react-native-elements';
import { colors } from '../../assets';
import { openURL } from 'expo-linking';
import { BodyText } from '../BasicComponents/BodyText';
import { Platform } from '../MovieDetails/MoviePlatforms';

type SeeContentButtomEntry = {
    platforms: Array<Platform>
}

export const SeeContentButtom = (params: SeeContentButtomEntry) => {
    const [openPlatforms, setOpenPlatforms] = useState(false);
    const handleRedirect = () => {
        //const url = params.contentLinks;
        setOpenPlatforms(true);
        //Linking.openURL(url).catch(err => console.error('An error occurred', err));
    };

    return(
        <>
            <CustomButton 
                buttonText="Ver ahora" 
                buttonSize='medium'
                fontSize='medium'
                type='primary' 
                onPress={handleRedirect} 
                icon="play"/>
            <Overlay 
                isVisible={openPlatforms} 
                onBackdropPress={() => setOpenPlatforms(false)} 
                overlayStyle={{backgroundColor: colors.primarySkyBlue, margin: 20, borderRadius: 20}}>
                {params.platforms.map((platform, index) => (
                    <View key={index}>
                        <BodyText body={platform.providerName} />
                    </View>
                ))}
            </Overlay>
        </>
    )
}