import React from 'react';
import { StyleSheet, View,Text } from 'react-native';

const GameRules = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Game Rules</Text>
            <Text style={styles.ruleText}>
                Connect Four is a two-player connection game in which the players take turns dropping colored discs from the top into a seven-column,
                six-row vertically suspended grid. 
                The pieces fall straight down, occupying the next available space within the column. 
                The objective of the game is to be the first to form a horizontal, vertical, or diagonal line of four of one's own discs.
            </Text>
            
            <Text style={styles.subtitle}>Computer vs Player Mode</Text>
            <Text style={styles.ruleText}>
                In single-player mode, you'll play against the computer AI. You'll play as red discs, and the computer will play as yellow discs.
                The computer will analyze the board and make strategic moves to either win or block your winning moves. Take your turn by tapping
                the column where you want to drop your disc.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2C3E50',
        marginBottom: 15,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2C3E50',
        marginTop: 20,
        marginBottom: 10,
    },
    ruleText: {
        fontSize: 16,
        color: '#34495E',
        lineHeight: 24,
        marginBottom: 10,
        textAlign: 'justify',
    },
})

export default GameRules;
