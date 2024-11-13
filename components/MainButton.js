import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

const MainButton = ({ text, bgColor, icon: Icon, onClick }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: bgColor }]}
      onPress={onClick}
    >
      <View style={styles.content}>
        <Text style={styles.text}>{text}</Text>
        {Icon && <Icon style={styles.icon} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "transparent",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: 15,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  icon: {
    marginLeft: 10,
    color: "white",
  },
});

export default MainButton;
