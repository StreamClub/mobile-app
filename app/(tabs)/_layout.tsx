import React from 'react';
import { Redirect, Stack, router } from 'expo-router';
import { Image } from 'react-native';
import { useSession } from '../../context/ctx';
import { colors } from '../../assets';
import { IconButton } from 'react-native-paper';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { LocalIcon } from '../../components/Types/LocalIcon';
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
        <Tabs screenOptions={{
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerShown: true,
            tabBarActiveTintColor: 'black'
        }}
        >
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Perfil',
                    tabBarIcon: () =>
                        <Image
                            source={LocalIcon.account}
                            style={{
                                aspectRatio: 1,
                                height: 20,
                            }}
                        />,
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: 'Buscar',
                    tabBarIcon: () =>
                        <Image
                            source={LocalIcon.search}
                            style={{
                                aspectRatio: 469 / 512,
                                height: 20,
                            }}
                        />,
                }}
            />
            <Tabs.Screen
                name="(app)"
                options={{
                    href: null,
                }}
            />
            <Tabs.Screen
                name="home"
                options={{
                    href: null,
                }}
            />
        </Tabs>
    );
}