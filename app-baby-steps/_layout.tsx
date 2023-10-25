import { Slot } from 'expo-router';
import { View, Text } from 'react-native';

// Creacion de fondos comunes para todas las paginas, https://docs.expo.dev/routing/layouts/ 


import { Tabs } from 'expo-router';

export default function Layout() {
  return <Tabs />;
}

// export default function HomeLayout() {
//   return (
//   <View>
//     <Text>asd</Text>
//     <Text>asd</Text>
//     <Text>asd</Text>
//     <Slot />
//   </View>
//   )
// }