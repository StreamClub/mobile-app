import { View, Text, Button } from 'react-native';
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';

export default function Page() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>
                Bienvenido a StreamClub
            </Text>
            <Link href="/signUp">Crear cuenta</Link>
            <Link href="/signIn">Iniciar sesión</Link>
        </View>
    );
}