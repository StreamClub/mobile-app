import React from 'react';
import { Stack, Redirect, useSegments } from 'expo-router';
import { useSession } from '../../context/ctx';
import { colors } from '../../assets';
import { screenHeadersMap } from '../../utils/screenHeadersMap';

export default function AppLayout() {
    const session = useSession()

    const accessToken = session?.accessToken
    const refreshToken = session?.refreshToken
    const isLoading = session?.isLoading
    const segments = useSegments();

    if (!(accessToken) && !(refreshToken) && !(isLoading)) {
        return <Redirect href="/" />;
    }
    const routeName = screenHeadersMap[segments[segments.length - 1]?.toString()] || "";

    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.primaryRed
                },
                headerTitle: routeName,
                headerTintColor: '#fff',
                headerShown: true,
                headerBackVisible: false,
            }}
        />
    );
}