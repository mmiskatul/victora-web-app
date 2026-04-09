import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function VictoryHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.brandTitle}>V I C T O R Y</Text>
      <Text style={styles.brandSubtitle}>F I T N E S S</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 16,
  },
  brandTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 8,
    fontFamily: 'Inter_700Bold',
  },
  brandSubtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: 6,
    marginTop: 4,
    fontFamily: 'Inter_600SemiBold',
  },
});
