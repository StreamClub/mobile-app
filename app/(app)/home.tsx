import { Text, View } from 'react-native';
import React from 'react';
import { useSession } from '../../context/ctx';
import { router, Stack } from 'expo-router';

export default function Index() {
    const session = useSession();
    const signOut = session?.signOut
    const userId = session?.userId
    const email = session?.email
    const accessToken = session?.accessToken
    const refreshToken = session?.refreshToken

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text> Sesión iniciada </Text>
            <Text> Bienvenido </Text>

            <Text> userId: {userId} </Text>
            <Text> email: {email} </Text>
            <Text> AccessToken: {accessToken} </Text>
            <Text> RefreshToken: {refreshToken} </Text>
            
            

            <Text
                style={{ marginVertical: 10, textDecorationLine: 'underline', color: 'blue'}}
                onPress={() => {
                    console.log(refreshToken)
                    router.push('/search');
                    
                }}>
                Ventana de Busqueda
            </Text>

            <Text
                style={{ marginVertical: 10, textDecorationLine: 'underline', color: 'blue'}}
                onPress={() => {
                    router.push('/profile');
                    
                }}>
                Perfil
            </Text>

            <Text
                style={{ marginVertical: 20, textDecorationLine: 'underline', color: 'blue'}}
                onPress={() => {
                    signOut?.();
                }}>
                Sign Out
            </Text>

        </View>
    );
}