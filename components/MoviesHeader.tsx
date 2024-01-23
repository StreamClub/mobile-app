import React from "react";
import { Appbar } from "react-native-paper";
import { StyleSheet } from "react-native";
import { router } from "expo-router";
import { colors } from "../assets";

export const MoviesHeader = () => {
  return (
    <Appbar.Header style={styles.header}>
      <Appbar.BackAction onPress={() => router.back()} />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primaryRed,
    height: 60,
  }
});
