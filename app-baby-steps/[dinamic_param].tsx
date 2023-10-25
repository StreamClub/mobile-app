import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';

export default function Page() {
  const { dinamic_param } = useLocalSearchParams();

  return <Text>Parametros dinamicos: {dinamic_param}</Text>;
}