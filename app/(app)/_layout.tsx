import React from 'react';
import { Stack, router, Redirect } from 'expo-router';
import { useSession } from '../../context/ctx';
import { colors } from '../../assets';
import { IconButton } from 'react-native-paper';

export default function AppLayout() {
    const session = useSession()

    const accessToken = session?.accessToken
    const refreshToken = session?.refreshToken
    const isLoading = session?.isLoading

    if (!(accessToken) && !(refreshToken) && !(isLoading)) {
        return <Redirect href="/" />;
    }

    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.primaryRed
                },
                headerTitle: () => router.canGoBack() ? <IconButton 
                                        onPress={() => router.back()} 
                                        icon="arrow-left" 
                                        size={35} 
                                        iconColor={colors.primaryWhite}/> : null,
                headerTintColor: '#fff',
                headerShown: true,
                headerBackVisible: false,
            }}
        />
    );
}