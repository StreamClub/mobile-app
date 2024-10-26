import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TitleText } from '../../BasicComponents/TitleText';
import { CustomButton } from '../../BasicComponents/CustomButton';
import { router } from 'expo-router';

export const SubgroupRecommendationsButton = () => {
    return (
        <>
            <View style={{
                flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 10, marginTop: 10
            }}>
                <TitleText body="Algo similar a esto" style={styles.titleText} size='medium' />
            </View>
            <View style={styles.horizontalLine} />
            <CustomButton
                buttonText='Seleccionar contenido'
                fontSize='small'
                type='primary'
                onPress={() => router.push('/contentSelect')}
                buttonSize='medium'
                style={{ marginVertical: 5, alignSelf: 'center', width: 200 }}
            />
        </>
    )
}

const styles = StyleSheet.create({
    titleText: {
        fontWeight: 'bold',
        marginLeft: 0
    },
    horizontalLine: {
        width: "100%",
        alignSelf: 'center',
        height: 1,
        backgroundColor: "black",
        borderRadius: 100,
        marginTop: 4,
        marginBottom: 4
    }
});
