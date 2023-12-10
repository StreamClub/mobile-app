import { View, Text, Image } from 'react-native';

export default function Page() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>
                Recover Password Page
            </Text>
            
            <Image source={{uri: 'https://davesamaniego2016.files.wordpress.com/2016/10/cat-catstruction-play-on-words-construction-cats-favim-com-4174852.jpeg'}} style={{width: 300, height: 320}} />
        </View>
    );
}