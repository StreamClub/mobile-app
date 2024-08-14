import React from 'react'
import { useFocusEffect } from '@react-navigation/native';

export const useOnFocus = (callback: () => void) => {
    useFocusEffect(
        React.useCallback(() => {
            console.log("FOCUS EFFECT")
            callback()
        }, [])
        );
}
