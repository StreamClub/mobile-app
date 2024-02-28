import { ExternalIds } from '../components/Types/ExternalId'
import { LocalIcon } from '../components/Types/LocalIcon'
import { IconCollectionEntry } from '../components/Types/IconCollection'
import config from '../config.json';

export const getMediaFromExternalId = (externalIds: ExternalIds): IconCollectionEntry[] => {
    const medias: IconCollectionEntry[] = []
    if (externalIds.instagramId) {
        const link = config.instragramBaseUrl + externalIds.instagramId
        medias.push({ 
            icon: LocalIcon.instagram, 
            link: link 
        })
    }
    if (externalIds.twitterId) {
        const link = config.twitterBaseUrl + externalIds.twitterId
        medias.push({ 
            icon: LocalIcon.twitter, 
            link: link
        })
    }
    return medias
}