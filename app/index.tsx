import React from 'react'
import { Redirect, router } from 'expo-router'
import { useSession } from '../context/ctx'
import { useEffect } from 'react'
import { InitialScreen } from '../screens/InitialScreen'

export default function Index() {
    const session = useSession()
    const accessToken = session?.accessToken
    const refreshToken = session?.refreshToken
    const processTokens = session?.processTokens
    const signIn = session?.signIn

    useEffect(() => {
        if (accessToken && refreshToken) {
            console.log(
                '[INDEX] Tokens found'
            )
            console.log({ accessToken, refreshToken })
            processTokens?.(accessToken, refreshToken)

            console.log("[INDEX] Redirecting to /recos...")
            router.replace('/recos')
        }
    }, [accessToken, refreshToken])

    if (accessToken && refreshToken) {
        return <Redirect href="/recos" />
    } else {
        return <InitialScreen />
    }
}
