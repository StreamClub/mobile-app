import * as React from 'react';
import { Stack } from 'expo-router';
import { SessionProvider } from '../../context/ctx';
import { SignUpHeader } from '../../components/SignUpHeader';

export const unstable_settings = {
    initialRouteName: 'index',
  };

export default function SignUpLayout() {
    return(
        <SessionProvider>
            <SignUpHeader />
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
    )
}
