import React from 'react';
import { Redirect, router } from 'expo-router';
import { useSession } from '../context/ctx';
import { useEffect } from 'react';
import { InitialScreen } from '../screens/InitialScreen';

export default function Index() {
    const session = useSession();
    const accessToken = session?.accessToken;
    const refreshToken = session?.refreshToken;
    const processTokens = session?.processTokens;
    const signIn = session?.signIn;

    useEffect(() => {
        if (accessToken && refreshToken) {
            console.log('[INDEX] accessToken && refreshToken loaded. Redirecting to /home...');

            processTokens?.(accessToken, refreshToken);
        }
    }, [accessToken, refreshToken]);

    if (accessToken && refreshToken) {
        return <Redirect href="/home" />;
    } else {
        return (
            <InitialScreen />
        );
    }
}
