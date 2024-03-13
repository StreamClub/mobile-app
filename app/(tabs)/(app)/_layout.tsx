import React from 'react';
import { Stack, router } from 'expo-router';

import { colors } from '../../../assets';
import { IconButton } from 'react-native-paper';

export default function AppLayout() {
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