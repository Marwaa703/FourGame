import React, { useEffect, useRef } from "react";
import { Modal, View, Text, StyleSheet, Animated } from "react-native";
import { colors } from "../constants/colors";
import SecondaryButton from "./SecondaryButton";

const GameOverModal = ({ visible, winner, resetGame }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }).start();
    } else {
      scaleAnim.setValue(0);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.modalOverlay}>
        <Animated.View
          style={[
            styles.modalContent,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Text style={styles.title}>Game Over!</Text>

          <Text style={styles.winner}>
            {winner === "draw" ? "It's a Draw!" : `${winner} Wins!`}
          </Text>

          <SecondaryButton
            text="Play Again"
            onClick={resetGame}
          />
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: colors.text,
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    minWidth: "80%",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 20,
  },
  winner: {
    fontSize: 24,
    color: colors.secondary,
    marginBottom: 30,
  },
});

export default GameOverModal;
