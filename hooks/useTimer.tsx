import { useRef } from 'react'
import { DELAY_SEARCH } from '../constants'

export const useTimer = (
    setShowLoading: (loading: boolean) => void,
    actionCallback: (text: string) => void
) => {
    const searchTimerRef = useRef<NodeJS.Timeout | null>(null)

    const cancelTimer = () => {
        if (searchTimerRef.current) {
            clearTimeout(searchTimerRef.current)
        }
    }

    const startNewTimer = (text: string) => {
        setShowLoading(true)
        searchTimerRef.current = setTimeout(() => {
            console.log('[Timer]')
            actionCallback(text)
        }, DELAY_SEARCH)
    }

    return { cancelTimer, startNewTimer }
}
