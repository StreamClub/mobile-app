import React from 'react';
import { Redirect } from 'expo-router';
import { useSession } from '../context/ctx';
import { useEffect } from 'react';
import { InitialScreen } from '../screens/InitialScreen';

export default function Index() {
    const session = useSession();
    const accessToken = session?.accessToken;
    const refreshToken = session?.refreshToken;
    const processTokens = session?.processTokens;

    useEffect(() => {
        if (accessToken && refreshToken) {
            processTokens?.(accessToken, refreshToken);
        }
    }, [accessToken, processTokens]);

    if (accessToken) {
        return <Redirect href="/home" />;
    } else {
        return (
            <InitialScreen />
        );
    }
}
