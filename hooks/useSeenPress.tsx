import { useState } from 'react'
import { ContentEntry } from '../entities/ContentListEntry'

export const useSeenPress = (content: ContentEntry) => {
    const [loading, setLoading] = useState(false)

    const onPress = () => {
        console.log(content.title + ' seen pressed')
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }

    return { loading, onPress }
}
