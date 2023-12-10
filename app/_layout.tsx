import { Stack } from 'expo-router';
import { SessionProvider } from '../context/ctx';
import * as React from 'react';

export default function RootLayout() {
    return (
        <SessionProvider>
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
    );
}