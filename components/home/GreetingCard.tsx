import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';

const QUOTES = [
  { text: 'WISDOM LISTENS BEFORE IT LEADS.', author: 'Victor Akko' },
  { text: 'YOUR ONLY LIMIT IS YOUR MIND.', author: 'Focus' },
  { text: 'VICTORY BELONGS TO THE MOST PERSEVERING.', author: 'Napoleon' },
  { text: 'STRENGTH DOES NOT COME FROM WINNING.', author: 'Arnold' },
];

export default function GreetingCard() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.greetingSection}>
      <Text style={styles.greetingText}>
        Good morning, <Text style={styles.greetingName}>Admin</Text>
      </Text>
      <View style={styles.quoteBox}>
        <Text style={styles.quoteText}>
          {QUOTES[quoteIndex].text}
        </Text>
        <Text style={styles.quoteAuthor}>- {QUOTES[quoteIndex].author}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  greetingSection: {
    backgroundColor: '#13132A',
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  greetingText: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Inter_400Regular',
    marginBottom: 12,
  },
  greetingName: {
    color: Colors.accentBlue,
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
