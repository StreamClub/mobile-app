import React from 'react';
import { StyleSheet, ScrollView, Dimensions, Text } from 'react-native';
import { colors } from '../../assets';
import { UserRecos } from './UserRecos';

const screenWidth = Dimensions.get('window').width

export const RecosScreen = () => {
    return (
        <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
            <UserRecos />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: colors.secondaryWhite,
    },
    carousel: {
        width: screenWidth,
    },
    serviceLogo: {
        height: 60,
        aspectRatio: 1,
        borderRadius: 15,
        margin: 10,
        borderWidth: 1,
    },
    linkedText: {
        color: colors.primaryBlue,
        fontWeight: 'bold',
        alignSelf: 'flex-end',
        marginTop: 10,
        marginRight: 8,
        textDecorationLine: 'underline',
    },
    titleText: {
        fontWeight:'bold', 
        marginLeft: 10
    },
});
