import { View, Text } from 'react-native';
import {Link } from 'expo-router'

export default function Page() {
  return (
    <View>
      {/* Por defecto, el hijo de Link será un Text, pero puede cambiarse: https://docs.expo.dev/routing/navigating-pages/ */}
      <Link href="/2doPage">Second Page Link</Link>

      <Link 
        href={{
          pathname: "/[dinamic_param]",
          params: { dinamic_param: 'Soy un parametro dinamico' }
        }}
      >
        Ruta dinamica
      </Link>
      
      
      <Link href="/Hello_ExampleRedirectFromFile">Redirect Example</Link>
  </View>
  )
}