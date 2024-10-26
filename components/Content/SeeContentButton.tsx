import React, { useState } from 'react'
import { CustomButton } from '../BasicComponents/CustomButton'
import { Linking, View, Image, Pressable, StyleSheet } from 'react-native'
import { Overlay } from 'react-native-elements'
import { colors } from '../../assets'
import { BodyText } from '../BasicComponents/BodyText'
import { Icon } from 'react-native-paper'
import { TitleText } from '../BasicComponents/TitleText'
import { Platform } from '../../entities/Details/Platform'

type SeeContentButtonEntry = {
    platforms: Platform[]
    text?: string
}

export const SeeContentButton = (params: SeeContentButtonEntry) => {
    const [openPlatforms, setOpenPlatforms] = useState(false);

    const handleRedirect = (link: string) => {
        setOpenPlatforms(true);
        if (typeof link === 'string') {
            Linking.openURL(link).catch((err) =>
                console.error('An error occurred', err)
            );
        }
    };

    return (
        <>
            <CustomButton
                buttonText={params.text ? params.text : 'Ver ahora'}
                buttonSize="medium"
                fontSize="medium"
                type="primary"
                onPress={handleRedirect}
                icon="play"
            />
            <Overlay
                isVisible={openPlatforms}
                onBackdropPress={() => setOpenPlatforms(false)}
                overlayStyle={styles.overlay}
            >
                <TitleText body={'Ver en:'} style={styles.titleText} size="small" />
                {params.platforms.map((platform, index) => (
                    <Pressable onPress={() => handleRedirect(platform.link)} key={index}>
                        <View style={styles.platformRedirectContainer}>
                            <Image
                                source={{
                                    uri: 'https://image.tmdb.org/t/p/original' + platform.logoPath,
                                }}
                                style={styles.platformImage}
                            />
                            <View style={styles.platformInfo}>
                                <BodyText body={platform.providerName} numberOfLines={1} />
                            </View>
                            <View style={styles.iconContainer}>
                                <Icon source="play" size={40} color={colors.primaryRed} />
                            </View>
                        </View>
                    </Pressable>
                ))}
            </Overlay>
        </>
    );
};

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: colors.primarySkyBlue,
        margin: 20,
        borderRadius: 20,
        width: 280,
        padding: 15, // Añadir padding interno para más espacio
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5, // Para sombras en Android
    },
    titleText: {
        marginBottom: 15,
        textAlign: 'center', // Centrar el título
    },
    platformRedirectContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    platformImage: {
        width: 50,
        height: 50,
        borderRadius: 10, // Redondear las imágenes
        marginRight: 10,
    },
    platformInfo: {
        flexDirection: 'column',
        flex: 1,
        marginRight: 10, // Añadir espacio entre el texto y el icono
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});