import React from 'react';
import { View, StyleSheet } from "react-native";
import { colors } from '../../assets';
import { LogOutButton } from '../../components/LogOutButton';

export default function Services() {

  return (
    <View style={styles.container}>
      <View style={{margin: 20}} >
        <LogOutButton />
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: 'black',
          width: '60%',
          marginBottom: 10,
          alignSelf: 'center',
        }}
      />
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
