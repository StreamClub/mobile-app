import React from 'react';
import { View, StyleSheet } from "react-native";
import { colors } from '../../assets';
import { TitleText } from '../../components/BasicComponents/TitleText';
import { PlatformsBarChart } from '../../components/Statistics/PlatformsBarChart';

export default function Statistics() {

  return (
    <View style={styles.container}>
      <TitleText 
        body='Estadísticas de uso de tus plataformas:' 
        color={colors.primaryBlack}
        style={{marginTop: 10}} />
      <PlatformsBarChart />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.secondaryWhite
  }
})
