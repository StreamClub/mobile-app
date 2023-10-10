import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';

function redirect_examploe() {
  router.replace('/RedirectExampleDinamicParam');
}

export default function Page() {
  return (
    <View>
      <Text>Second page</Text>
      
      <Pressable onPress={redirect_examploe}>
        <Text>Redirect Example</Text>
      </Pressable>
    </View>
  )
}
