import { MAX_TITLE_LENGTH } from "../constants"


export const formatTitle = (title: string) => {
    if (title.length > MAX_TITLE_LENGTH) {
        return title.slice(0, MAX_TITLE_LENGTH).trim() + '...'
    }
    return title
}