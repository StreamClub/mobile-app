import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Card, TextInput } from "react-native-paper";
import { BodyText } from "../components/BasicComponents/BodyText";
import { CustomButton } from "../components/BasicComponents/CustomButton";
import { TextInputMask } from "react-native-masked-text";
import config from "../config.json";
import { colors } from "../assets";
import { router } from "expo-router";

type SignUpParams = {
    onNext: (email: string, password: string, birthDate: string) => void;
    loading: boolean;
};

export const SignUpScreen = (params: SignUpParams) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidBirth, setIsValidBirth] = useState(true);
    const [birthDate, setbirthDate] = useState("");

    const handleEmailChange = (text: string) => {
        setEmail(text);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValidEmail(emailRegex.test(text));
    };

    const handleConfirmPassword = (text: string) => {
        setConfirmPassword(text);
        setPasswordsMatch(text == password);
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev);
    };

    return (
        <View style={styles.signUpScreen}>
            <BodyText
                body="Para empezar, necesitamos algunos detalles básicos para crear tu cuenta de forma segura.
      Por favor, proporciona tu dirección de correo electrónico, elige una contraseña confiable y dinos tu fecha
      de nacimiento"
                style={styles.textStyle}
            />
            <Card style={styles.formCard}>
                <Card.Content>
                    <View>
                        <TextInput
                            label="Email"
                            style={styles.input}
                            textColor={colors.primaryWhite}
                            activeUnderlineColor={colors.primaryBlack}
                            value={email}
                            onChangeText={handleEmailChange}
                            autoCapitalize='none'
                            autoCorrect={false}
                            textContentType='emailAddress'
                            keyboardType='email-address'
                        />
                        {!isValidEmail && (
                            <BodyText
                                body={config.signUp.invalidEmaiError}
                                color={colors.primaryRed}
                            />
                        )}
                    </View>
                    <TextInput
                        label="Contraseña"
                        autoCorrect={false}
                        autoCapitalize='none'
                        style={styles.input}
                        textColor={colors.primaryWhite}
                        activeUnderlineColor={colors.primaryBlack}
                        secureTextEntry={!isPasswordVisible}
                        value={password}
                        onChangeText={(text) => {
                            setPassword(text);
                        }}
                        right={
                            <TextInput.Icon icon="eye" onPress={togglePasswordVisibility} />
                        }
                    />
                    <View>
                        <TextInput
                            label="Confirmar contraseña"
                            autoCorrect={false}
                            autoCapitalize='none'
                            style={styles.input}
                            textColor={colors.primaryWhite}
                            activeUnderlineColor={colors.primaryBlack}
                            secureTextEntry={!isPasswordVisible}
                            value={confirmPassword}
                            onChangeText={handleConfirmPassword}
                            right={
                                <TextInput.Icon icon="eye" onPress={togglePasswordVisibility} />
                            }
                        />
                        {!passwordsMatch && (
                            <BodyText
                                body={config.signUp.passwordsNotMatch}
                                color={colors.primaryRed}
                            />
                        )}
                    </View>
                    <TextInput
                        label="Fecha de nacimiento"
                        style={styles.input}
                        textColor={colors.primaryWhite}
                        activeUnderlineColor={colors.primaryBlack}
                        render={(props) => (
                            <TextInputMask
                                type={"datetime"}
                                options={{
                                    format: "DD/MM/YYYY",
                                }}
                                {...props}
                            />
                        )}
                        onChangeText={(date) => {
                            setbirthDate(date);
                        }}
                    />
                </Card.Content>
            </Card>
            <View style={styles.buttons}>
                <CustomButton
                    buttonText="Cancelar"
                    onPress={() => router.push({ pathname: '/', params: {} })}
                    fontSize="medium"
                    buttonSize="medium"
                    type='secondary'
                />
                <View style={{ marginHorizontal: 5 }} />
                <CustomButton
                    buttonText="Siguiente"
                    onPress={() => {
                        params.onNext(email, password, birthDate);
                    }}
                    disabled={
                        !(
                            email &&
                            password &&
                            isValidEmail &&
                            passwordsMatch &&
                            isValidBirth
                        )
                    }
                    fontSize="medium"
                    buttonSize="medium"
                    type='primary'
                    loading={params.loading}
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
    formCard: {
        height: 400,
        width: 314,
        backgroundColor: colors.primarySkyBlue,
    },
    input: {
        margin: 14,
        backgroundColor: colors.primaryBlue,
    },
    textStyle: {
        width: 314,
        margin: 14,
    },
    buttons: {
        flexDirection: "row",
        margin: 10,
    },
});
