import React from 'react';
import { View, StyleSheet } from "react-native";
import { colors } from '../../assets';
import { TitleText } from '../../components/BasicComponents/TitleText';
import { PlatformsStatistics } from '../../components/Statistics/PlatformsStatistics';
import { ScrollView } from 'react-native-gesture-handler';

export default function Statistics() {

  return (
    <ScrollView style={{backgroundColor: colors.secondaryWhite}}>
      <View style={styles.container}>
        <TitleText 
          body='Estadísticas de uso de tus plataformas:' 
          color={colors.primaryBlack}
          style={{marginTop: 10}} />
        <PlatformsStatistics />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
})
