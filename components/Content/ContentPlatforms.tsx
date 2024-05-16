import { ScrollView, Image } from 'react-native'
import { styles } from './styles/Content.styles'
import React from 'react'

type ContentPlatformsEntry = {
    logos: Array<string>
}

export const ContentPlatforms = (params: ContentPlatformsEntry) => {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {params.logos.map((logo, index) => (
                <Image
                    source={{
                        uri: 'https://image.tmdb.org/t/p/original' + logo,
                    }}
                    style={styles.platformImage}
                    key={index}
                />
            ))}
        </ScrollView>
    )
}
