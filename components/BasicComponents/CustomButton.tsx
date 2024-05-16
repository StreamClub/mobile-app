import React from "react";
import { StyleSheet } from "react-native";
import { ButtonParams } from "./Types/ButtonParams";
import { colors } from "../../assets";
import { Button } from '@rneui/themed';

export const CustomButton = (params: ButtonParams) => {
    params.fontSize = params.fontSize || 'medium';
    const fontSize = {
        small: { fontSize: 14 },
        medium: { fontSize: 18 },
        big: { fontSize: 24 },
    }[params.fontSize];


    params.buttonSize = params.buttonSize || 'auto';
    const buttonSize = {
        small: { width: 60, height: 40 },
        medium: { width: 150, height: 40 },
        big: { width: 185, height: 50 },

        // In this case, the button will have the size of the text
        auto: { width: 'auto', height: 'auto' },
    }[params.buttonSize];

    params.type = params.type || 'primary';
    const backgroundColor = {
        primary: {backgroundColor: colors.primaryRed},
        secondary: {backgroundColor: colors.primaryGrey},
    }[params.type];
    

    return (
        <Button
            onPress={params.onPress}
            disabled={params.disabled}
            disabledStyle={styles.disabledStyle}
            containerStyle={[buttonSize, backgroundColor, styles.containerStyle, params.style]}
            buttonStyle={styles.buttonStyle}
            titleStyle={[styles.titleStyle, fontSize]}
            icon={{
                name: params.icon,
                type: 'font-awesome',
                size: 15,
                color: 'white',
            }}
            title={params.buttonText}
            loading={params.loading}
        />
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
    },

    buttonStyle: {
        backgroundColor: 'transparent',
        borderRadius: 15,
        width: '100%',
    },

    titleStyle: {
        color: colors.primaryWhite,
        fontFamily: "Roboto",
    },

    disabledStyle: {
        backgroundColor: colors.primaryGrey,
        width: '100%',
    },
});
