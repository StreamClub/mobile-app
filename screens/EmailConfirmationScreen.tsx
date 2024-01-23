import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { BodyText } from "../components/BasicComponents/BodyText";
import { TextInput } from "react-native-paper";
import { CustomButton } from "../components/BasicComponents/CustomButton";
import { colors } from "../assets";

type EmailConfirmParams = {
    onSubmit: (validationCode: number) => void;
};

export const EmailConfirmationScreen = (params: EmailConfirmParams) => {
    const [verificationCode, setVerificationCode] = useState("");
    const [loading, setLoading] = useState(false);

    return (
        <View style={styles.signUpScreen}>
            <BodyText
                body="Hemos enviado un código de verificación a tu dirección de correo electrónico.
            Por favor, revisa tu bandeja de entrada, y si no encuentras el correo, verifica la carpeta de spam
            . Utiliza este código aquí para confirmar y validar tu dirección de correo electrónico."
                style={styles.textStyle}
            />
            <View style={styles.inputView}>
                <TextInput
                    style={styles.input}
                    textColor={colors.primaryWhite}
                    activeUnderlineColor={colors.primaryBlack}
                    value={verificationCode}
                    onChangeText={(text) => {
                        setVerificationCode(text);
                    }}
                    maxLength={6}
                    keyboardType="numeric"
                />
                <BodyText body="Ingrese su código aquí" color={colors.primaryBlack} />
            </View>
            <View style={styles.column}>
                <BodyText body="No recibiste tu código?" color={colors.primaryBlack} />
                <BodyText body="Volver a enviar código" color={colors.secondaryBlue} />
            </View>
            <View style={styles.column}>
                <CustomButton
                    buttonText="Confirmar código"
                    onPress={() => {
                        params.onSubmit(Number(verificationCode));
                        setLoading(true);
                    }}
                    buttonSize="big"
                    fontSize="big"
                    type="primary"
                    loading={loading}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    signUpScreen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.secondaryWhite,
    },
    textStyle: {
        width: 314,
        margin: 14,
    },
    input: {
        margin: 14,
        backgroundColor: colors.primaryBlue,
        width: 200,
        textAlign: "center",
    },
    inputView: {
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    column: {
        padding: 20,
    },
});
