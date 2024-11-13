import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { colors } from "../constants/colors";

const SecondaryButton = ({ text, onClick }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onClick}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "auto",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.btn,
    borderRadius: 20,
    padding: 15,
  },

  text: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SecondaryButton;
