import React, {useState} from 'react';
import { CustomButton } from '../BasicComponents/CustomButton';
import { Linking, View, Image, Pressable } from 'react-native';
import { Overlay } from 'react-native-elements';
import { colors } from '../../assets';
import { BodyText } from '../BasicComponents/BodyText';
import { Platform } from '../MovieDetails/MoviePlatforms';
import { styles } from './styles/Content.styles';
import { Icon } from 'react-native-paper';

type SeeContentButtomEntry = {
    platforms: Array<Platform>
}

export const SeeContentButtom = (params: SeeContentButtomEntry) => {
    const [openPlatforms, setOpenPlatforms] = useState(false);
    const handleRedirect = (link: string) => {
        setOpenPlatforms(true);
        if(typeof link === 'string' ){
            Linking.openURL(link).catch(err => console.error('An error occurred', err));
        }
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
                overlayStyle={{backgroundColor: colors.primarySkyBlue, margin: 20, borderRadius: 20, width: 280}}>
                {params.platforms.map((platform, index) => (
                    <Pressable onPress={() => handleRedirect(platform.link)} key={index} >
                        <View style={styles.platformRedirectContainer}>
                            <Image 
                                source={{ uri: "https://image.tmdb.org/t/p/original" + platform.logoPath }} 
                                style={styles.platformImage} />
                            <View style={{flexDirection: 'column', flex: 1}}>
                                <BodyText body={"Ver en:" } style={{fontWeight: 'bold'}}/>
                                <BodyText body={platform.providerName} numberOfLines={1}/>
                            </View>
                            <View style={{ justifyContent: 'flex-end'}}>
                                <Icon source="play" size={40} color={colors.primaryBlue}/>
                            </View>
                        </View>
                    </Pressable>
                ))}
            </Overlay>
        </>
    )
}