import React from 'react';
import { View, Text } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { colors } from '../../assets';
import { BodyText } from './BodyText';
export type PercentParams = {
    style: any;
    percent: number;
    size: number;
    showText: Boolean;
}

export const Percent = (params: PercentParams) => {
    let percent = Math.floor(params.percent);
    if (percent === 0 && params.percent > 0) {
        percent = 1;
    }
    const percentText = params.showText? percent + "%" : "";
    const seenText = params.showText? "visto" : "";

    return (
    <View style={params.style}>
    <AnimatedCircularProgress
        width={6}
        fill={params.percent}
        tintColor={colors.secondarySkyBlue}
        onAnimationComplete={() => console.log('onAnimationComplete')}
        backgroundColor={colors.secondaryWhite}
        size={params.size}
        rotation={0}
        style={{
                backgroundColor: colors.primaryGrey,
                borderRadius: 50
            }}
        padding={3}
    > 
        {
            (fill) => (
                <View style={{alignItems: 'center'}}>
                    <BodyText body={percentText} size='small' style={{margin:0, lineHeight: 15}}/>
                    <BodyText body={seenText} size='small' style={{margin:0, lineHeight: 15}}/>
                </View>
            )
        }
    </AnimatedCircularProgress>
    </View>
    )
}