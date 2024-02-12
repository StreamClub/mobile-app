import React from 'react';
import { Redirect, Stack } from 'expo-router';
import { Text } from 'react-native';

import { useSession } from '../../context/ctx';
import { MoviesHeader } from '../../components/MoviesHeader';

export default function AppLayout() {


    const session = useSession()

    const accessToken = session?.accessToken
    const refreshToken = session?.refreshToken
    const isLoading = session?.isLoading

    if (!(accessToken) && !(refreshToken) && !(isLoading)) {
        return <Redirect href="/" />;
    }

    return (
    <>
        <MoviesHeader />
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
    </>);
}