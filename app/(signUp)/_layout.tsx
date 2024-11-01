import * as React from 'react'
import { Stack } from 'expo-router'
import { SignUpHeader } from '../../components/SignUpHeader'

export const unstable_settings = {
    initialRouteName: 'index',
}

export default function SignUpLayout() {
    return (
        <>
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
        </>
    )
}
