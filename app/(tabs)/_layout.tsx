import React from 'react';
import { Redirect, Stack, router } from 'expo-router';

import { useSession } from '../../context/ctx';
import { colors } from '../../assets';
import { IconButton } from 'react-native-paper';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function AppLayout() {
    const session = useSession()

    const accessToken = session?.accessToken
    const refreshToken = session?.refreshToken
    const isLoading = session?.isLoading

    if (!(accessToken) && !(refreshToken) && !(isLoading)) {
        return <Redirect href="/" />;
    }

    return (
    // <>
    //     <Stack
    //         screenOptions={{
    //             headerStyle: {
    //                 backgroundColor: colors.primaryRed
    //             },
    //             headerTitle: () => router.canGoBack() ? <IconButton 
    //                                     onPress={() => router.back()} 
    //                                     icon="arrow-left" 
    //                                     size={35} 
    //                                     iconColor={colors.primaryWhite}/> : null,
    //             headerTintColor: '#fff',
    //             headerShown: true,
    //             headerBackVisible: false,
    //         }}
    //     />
    // </>
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
        <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'search',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
    </Tabs>
    );
}