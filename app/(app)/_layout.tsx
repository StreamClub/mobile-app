import React from 'react';
import { Link, Redirect, Stack } from 'expo-router';
import { Text, View } from 'react-native';

import { useSession } from '../../context/ctx';

export default function AppLayout() {

    const accessToken = useSession()?.accessToken
    const isLoading = useSession()?.isLoading

    // Loading Screen
    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (!accessToken) {
        return <Redirect href="/" />;
    }

    return <Stack
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
    />;
}