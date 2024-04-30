import React, { useState } from 'react'
import { TextInput, View } from 'react-native'
import { CustomButton } from '../../BasicComponents/CustomButton';
import { TitleText } from '../../BasicComponents/TitleText';
import { colors } from '../../../assets';
import { IconButton } from 'react-native-paper';
import { styles } from './styles/Review.styles';
import { AxiosResponse } from 'axios';

export type UpdateReviewEntry = {
    onPress: (liked: boolean, review: string, onSuccess: (response: AxiosResponse<any, any>) => void) => void,
    loading: boolean,
    onSuccess: (response: AxiosResponse<any, any>) => void,
    myReviewText?: string,
    myLike?: boolean
}

export const UpdateReviewOverlay = (params: UpdateReviewEntry) => {
    const [review, setReview] = useState(params.myReviewText? params.myReviewText : '');
    const [liked, setLiked] = useState(params.myLike? params.myLike : false);
    const [likeSet, setLikeSet] = useState((params.myLike != null)? true : false);

    return (
        <View style={styles.container}>
            <TitleText body='Escribe tu review:' size='small' />
            <TextInput
                style={styles.textInput}
                value={review}
                onChangeText={text => setReview(text)}
                multiline={true}
                autoCapitalize='sentences'
                maxLength={200}
            />
            <View style={styles.iconButtonsContainer}>
                <IconButton
                    icon="thumb-up"
                    iconColor={(likeSet && liked) ? colors.secondaryBlue : colors.primaryGrey}
                    size={40}
                    onPress={() => {
                        setLiked(true);
                        setLikeSet(true);
                    }}
                />
                <IconButton
                    icon="thumb-down"
                    iconColor={(!likeSet || liked)? colors.primaryGrey : colors.secondaryRed}
                    size={40}
                    onPress={() => {
                        setLiked(false);
                        setLikeSet(true);
                    }}
                />
            </View>
            <CustomButton 
                buttonText='Actualizar review' 
                type='primary'
                onPress={() => params.onPress(liked, review, params.onSuccess)}
                fontSize='small' 
                style={{ margin: 5 }}
                disabled={!likeSet} 
                loading={params.loading} />
        </View>
    )
}
