import React from 'react'
import { View, StyleSheet } from 'react-native'
import { colors } from '../../assets'
import { Stack } from 'expo-router'
import { CreateGroupScreen } from '../../components/Groups/CreateGroupScreen'

export default function CreateGroup() {

  return(
    <View style={styles.container}>
      <Stack.Screen
        options ={{headerTitle: "Nuevo Grupo"}}
      />
        <CreateGroupScreen />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondaryWhite,
  }
})
