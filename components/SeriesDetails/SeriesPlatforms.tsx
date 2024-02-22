import React from 'react';
import { BodyText } from '../BasicComponents/BodyText';
import { ScrollView, View } from 'react-native';
import { SeeContentButtom } from '../Content/SeeContentButtom';
import { Divider } from 'react-native-paper';
import { colors } from '../../assets';
import { ContentPlaforms } from '../Content/ContentPlatforms';
import { Platform } from '../Types/Platforms';
import { styles } from "./styles/SeriesDetails.styles"

export type PlatformsEntry = {
    platforms: Array<Platform>,
    status: string
}

export const SeriesPlatforms = (params: PlatformsEntry) => {
    return(
        <View style={styles.platforms}>
            {(params.platforms.length >= 1)?
                <>
                    <BodyText body={"Disponible en:"} size="big"/>
                    <View style={{height: 'auto', width: 180, alignItems: 'center'}}>
                        <ContentPlaforms logos={params.platforms.map(platform => platform.logoPath)} />
                    </View>
                </> : 
                <BodyText size='big' color={colors.primaryRed} body='No disponible en ninguna plataforma.' style={{width: 180, margin: 10}} />    
            }
            <Divider style={styles.divider} />
            <BodyText body={'Estado: ' + params.status} size='big' color={colors.primaryBlue} style={{fontWeight: 'bold'}}/>
        </View>
    )
}