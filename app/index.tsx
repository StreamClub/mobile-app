import { View, Text, Button } from 'react-native';
import { Link, Redirect, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { router } from 'expo-router';
import { useSession } from '../context/ctx';
import { useEffect } from 'react';

export default function Index() {
    const session = useSession();
    const accessToken = session?.accessToken
    const processAccessToken = session?.processAccessToken


    useEffect(() => {
        if (accessToken) {
            processAccessToken?.(accessToken);
        }
    }, [accessToken, processAccessToken]);

    if (accessToken) {
        return <Redirect href="/home" />;
    } else {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Bienvenido a StreamClub</Text>
                <Link href="/signUp">Crear cuenta</Link>
                <Link href="/signIn">Iniciar sesión</Link>
                {accessToken ? <Text>Sesión iniciada</Text> : <Text>Sesión cerrada</Text>}
            </View>
        );
    }
}