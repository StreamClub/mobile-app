import { router } from 'expo-router'
import { ContentDetailsParams } from '../apiCalls/params/content/ContentDetailsParams'
import { ContentEntry } from '../entities/ContentListEntry'
import { ContentType } from '../entities/ContentType'

export const useContentEntryPressed = (
    content: ContentEntry,
    contentType: ContentType
) => {
    const onPress = () => {
        console.log(content.title + ' pressed')

        const params: ContentDetailsParams = {
            id: content.id,
        }
        contentType.isMovie()
            ? router.push({ pathname: '/movie', params })
            : router.push({ pathname: '/serie', params })
    }
    return { onPress }
}
