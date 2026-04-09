import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

const MOODS = ['😡', '😟', '😐', '😊', '🤩'];

export default function JournalScreen() {
  const router = useRouter();
  const [mood, setMood] = useState(3); // Default to happy
  const [entry, setEntry] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ 
        headerShown: true, 
        title: 'JOURNAL',
        headerTransparent: true,
        headerTintColor: '#fff',
        headerTitleStyle: { fontFamily: 'Inter_700Bold', fontSize: 16, letterSpacing: 2 } as any,
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 8 }}>
            <Ionicons name="chevron-back" size={28} color="#fff" />
          </TouchableOpacity>
        ),
      }} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>HOW ARE YOU FEELING TODAY?</Text>
          
          <View style={styles.moodContainer}>
            {MOODS.map((m, i) => (
              <TouchableOpacity 
                key={i} 
                onPress={() => setMood(i)}
                style={[styles.moodBtn, mood === i && styles.moodBtnActive]}
              >
                <Text style={[styles.moodEmoji, mood === i && styles.moodEmojiActive]}>{m}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.inputSection}>
            <TextInput
              style={styles.textInput}
              placeholder="What's on your mind? Write it down or use voice..."
              placeholderTextColor="rgba(255,255,255,0.3)"
              multiline
              value={entry}
              onChangeText={setEntry}
            />
            <TouchableOpacity style={styles.micBtn}>
              <Ionicons name="mic" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.saveBtn} activeOpacity={0.8}>
            <Text style={styles.saveBtnText}>SAVE ENTRY</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.insightBtn} activeOpacity={0.8}>
            <Text style={styles.insightBtnText}>GENERATE INSIGHT</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.historySection}>
          <Text style={styles.historyTitle}>HISTORY (3)</Text>
          <TouchableOpacity 
            style={styles.showHistoryBtn}
            onPress={() => router.push('/journal/history')}
          >
            <Text style={styles.showHistoryText}>SHOW HISTORY</Text>
            <Ionicons name="chevron-down" size={16} color={Colors.accentBlue} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  scrollContent: {
    paddingTop: 100, // For transparent header
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#131313',
    borderRadius: 32,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
  },
  cardTitle: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
    letterSpacing: 2,
    marginBottom: 32,
    textAlign: 'center',
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 40,
  },
  moodBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
  },
  moodBtnActive: {
    opacity: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  moodEmoji: {
    fontSize: 40,
  },
  moodEmojiActive: {
    // Optional: add some effect for active emoji
  },
  inputSection: {
    width: '100%',
    backgroundColor: '#1A1A1A',
    borderRadius: 24,
    minHeight: 280, // Increased size
    padding: 24,
    paddingBottom: 80, // More room for mic button
    marginBottom: 24,
    position: 'relative',
  },
  textInput: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Inter_400Regular',
    textAlignVertical: 'top',
    minHeight: 180, // Ensure text area itself is large
    outlineStyle: 'none' as any,
  },
  micBtn: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: Colors.accentBlue,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.accentBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  saveBtn: {
    width: '100%',
    backgroundColor: Colors.accentBlue,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  saveBtnText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'Inter_700Bold',
    letterSpacing: 2,
  },
  insightBtn: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(6,182,212,0.3)',
    backgroundColor: 'rgba(6,182,212,0.05)',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  insightBtnText: {
    color: Colors.accentBlue,
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'Inter_700Bold',
    letterSpacing: 2,
  },
  historySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    paddingHorizontal: 8,
  },
  historyTitle: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
    letterSpacing: 1.5,
  },
  showHistoryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  showHistoryText: {
    color: Colors.accentBlue,
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
    letterSpacing: 1,
  },
});
