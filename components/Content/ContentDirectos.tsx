import React, { useEffect, useState, useRef } from 'react';
import { View, Animated } from 'react-native';
import { Icon } from 'react-native-paper';
import { BodyText } from '../BasicComponents/BodyText';
import { styles } from './styles/Content.styles';

type ContentDirectorsParams = {
    directors: Array<string>,
    titleTextHeight: number
}

export const ContentDirectors = (params: ContentDirectorsParams) => {
    const [directorIndex, setDirectorIndex] = useState(0);
    const fadeAnim = useRef(new Animated.Value(1)).current; // Initial value for opacity: 1

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
                setDirectorIndex(prevIndex => (prevIndex + 1) % params.directors.length);
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

    const backgroundSize = 170 + (params.titleTextHeight/30 - 2)*30

    return (
        <View style={[styles.director, {top: backgroundSize - 80}]}>
            <Icon source="movie-open-outline" size={20} />
            {params.directors.length > 1?
                <Animated.View style={{opacity: fadeAnim}}>
                    <BodyText body={' ' + params.directors[directorIndex]} size='big' style={{fontWeight: 'bold'}} />
                </Animated.View> :
                <BodyText body={' ' + params.directors[0]} size='big' style={{fontWeight: 'bold'}} />
            }
        </View>
    )
}
