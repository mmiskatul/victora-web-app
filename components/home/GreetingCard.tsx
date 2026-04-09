import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function GreetingCard() {
  return (
    <View style={styles.greetingSection}>
      <Text style={styles.greetingText}>
        Good morning, <Text style={styles.greetingName}>Admin</Text>
      </Text>
      <View style={styles.quoteBox}>
        <Text style={styles.quoteText}>
          WISDOM LISTENS <Text style={{ color: Colors.textSecondary }}>BEFORE IT LEADS.</Text>
        </Text>
        <Text style={styles.quoteAuthor}>- Victor Akko</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  greetingSection: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
  },
  greetingText: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Inter_400Regular',
    marginBottom: 12,
  },
  greetingName: {
    color: Colors.primary,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
  },
  quoteBox: {
    marginTop: 8,
  },
  quoteText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    lineHeight: 32,
    fontFamily: 'Inter_700Bold',
    textTransform: 'uppercase',
  },
  quoteAuthor: {
    fontSize: 14,
    color: Colors.textMuted,
    marginTop: 12,
    textAlign: 'right',
    fontFamily: 'Inter_400Regular',
  },
});
