import React, { useEffect, useState, useRef } from 'react';
import { Animated } from 'react-native';
import { BodyText } from '../BasicComponents/BodyText';

type ContentFadingTextParams = {
    text: Array<string>,
    size: 'big' | 'medium' | 'small'
}

export const ContentFadingText = (params: ContentFadingTextParams) => {
    const [directorIndex, setDirectorIndex] = useState(0);
    const fadeAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const interval = setInterval(() => {
            Animated.timing(
                fadeAnim,
                {
                    toValue: 0,
                    duration: 400,
                    useNativeDriver: true
                }
            ).start(() => {
                setDirectorIndex(prevIndex => (prevIndex + 1) % params.text.length);
                Animated.timing(
                    fadeAnim,
                    {
                        toValue: 1,
                        duration: 400,
                        useNativeDriver: true
                    }
                ).start();
            });
        }, 4000);
    
        return () => clearInterval(interval);
    }, []);

    return (
        params.text.length > 1?
            <Animated.View style={{opacity: fadeAnim, flex: 1}}>
                <BodyText 
                    body={' ' + params.text[directorIndex]} 
                    size={params.size} 
                    style={{fontWeight: 'bold'}} 
                    numberOfLines={2} />
            </Animated.View> :
            <BodyText 
                body={' ' + params.text[0]} 
                size={params.size} 
                style={{fontWeight: 'bold', flex: 1}}
                numberOfLines={2} />
    )
}
