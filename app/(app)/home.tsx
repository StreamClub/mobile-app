import { Text, View } from 'react-native';

import { useSession } from '../../context/ctx';

export default function Index() {
    const session = useSession();
    const signOut = session?.signOut
    const username = session?.username
    const email = session?.email

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text> Sesión iniciada </Text>
            <Text> Bienvenido---{username}--{email} </Text>
            <Text
                onPress={() => {
                    signOut?.();
                }}>
                Sign Out
            </Text>
        </View>
    );
}