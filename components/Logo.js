import React from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../constants/colors";

const Logo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.circleOne}></View>
      <View style={styles.circleTwo}></View>
      <View style={styles.circleTwo}></View>
      <View style={styles.circleOne}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    width: 70,
  },
  circleOne: {
    width: 30,
    height: 30,
    borderRadius: 100,
    backgroundColor: colors.p1,
    borderWidth: 3,
    borderColor:"Black"
  },
  circleTwo: {
    width: 30,
    height: 30,
    borderRadius: 100,
    backgroundColor: colors.p2,
    borderWidth: 3,
    borderColor:"Black"
  },
});

export default Logo;
