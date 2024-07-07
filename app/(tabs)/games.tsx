import React from "react"
import { View, StyleSheet } from 'react-native'
import { colors } from "../../assets"
import { TitleText } from "../../components/BasicComponents/TitleText"
import { TriviasList } from "../../components/Trivias/TriviasList"

export default function Games() {
  return(
    <View style={styles.container} >
      <TitleText 
        body="Elije una Trivia para jugar"
        size="small"
        style={{ margin: 30 }}
        color={colors.primaryBlue} />
      <View>
        <TriviasList />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: colors.secondaryWhite
  },
})
