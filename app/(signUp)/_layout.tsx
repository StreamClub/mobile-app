import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { Stack } from 'expo-router';
import { SessionProvider } from '../../context/ctx';
import { StyleSheet } from 'react-native';

export default function SignUpLayout() {
    return(
        <SessionProvider>
            <Appbar.Header style={styles.header}>
                <Appbar.BackAction onPress={() => {}} />
                <Appbar.Content title="Sumate a Stream Club" />
            </Appbar.Header>
            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#f4511e',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerShown: false,
                }}
            />
        </SessionProvider>
    )
}

const styles = StyleSheet.create({
    header: {
      backgroundColor: '#C51221',
      fontFamily: 'Arial, sans-serif',
    },
});