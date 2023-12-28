import { Text, View, StyleSheet, Image} from 'react-native';
import React from 'react';
import { useSession } from '../../context/ctx';
import { colors } from "../../assets";

export default function Index() {
    const session = useSession();
    const accessToken = session?.accessToken

    return (
        <View style={styles.container}>
            <Text> Movie </Text>

            <Image 
                source={require('../../assets/images/under_catstruction.jpeg')}
                style={{
                    aspectRatio: 453/505, 
                    height: 300,
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.secondaryWhite,
    },
});