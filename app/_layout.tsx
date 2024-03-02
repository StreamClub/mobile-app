import { Stack } from 'expo-router'
import { SessionProvider } from '../context/ctx'
import * as React from 'react'
import { Provider } from 'react-redux'
import { store } from '../store/store'

export default function RootLayout() {
    return (
        <Provider store={store}>
            <SessionProvider>
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
        </Provider>
    )
}
