import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

const { width } = Dimensions.get('window');

export default function JournalScreen() {
  const [entry, setEntry] = useState('');
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  
  const emojis = ['😡', '😟', '😐', '😊', '🤩'];
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.dateText}>{today}</Text>
          <Text style={styles.title}>Daily Reflection</Text>
        </View>

        <LinearGradient
          colors={['rgba(0, 240, 208, 0.1)', 'rgba(0, 186, 255, 0.05)']}
          style={styles.promptCard}
        >
          <Ionicons name="sparkles" size={20} color={Colors.primary} style={styles.promptIcon} />
          <Text style={styles.promptText}>
            What is one thing you will do for your well-being tomorrow?
          </Text>
        </LinearGradient>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Start writing your thoughts..."
            placeholderTextColor={Colors.textMuted}
            multiline
            value={entry}
            onChangeText={setEntry}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.moodSection}>
          <Text style={styles.sectionTitle}>How are you feeling?</Text>
          <View style={styles.moodRow}>
            {emojis.map((emoji, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.moodBtn,
                  selectedMood === index && styles.moodBtnActive,
                ]}
                onPress={() => setSelectedMood(index)}
              >
                <Text style={styles.moodText}>{emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.saveBtn} activeOpacity={0.8}>
          <LinearGradient
            colors={['#00F0D0', '#00BAFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.saveBtnGradient}
          >
            <Text style={styles.saveBtnText}>Save Entry</Text>
            <Ionicons name="checkmark" size={22} color="#000" style={{ marginLeft: 8 }} />
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.historySection}>
          <View style={styles.historyHeader}>
            <Text style={styles.sectionTitle}>Recent Entries</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.emptyHistory}>
            <View style={styles.emptyIconCircle}>
              <Ionicons name="book-outline" size={32} color={Colors.textMuted} />
            </View>
            <Text style={styles.emptyHistoryText}>No entries yet</Text>
            <Text style={styles.emptyHistorySubtext}>Your journey starts with a single word.</Text>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  dateText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
    fontFamily: 'Inter_600SemiBold',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    fontFamily: 'Inter_700Bold',
  },
  promptCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(0, 240, 208, 0.2)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  promptIcon: {
    marginRight: 12,
  },
  promptText: {
    color: Colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
    flex: 1,
    fontFamily: 'Inter_400Regular',
  },
  inputContainer: {
    backgroundColor: '#151528',
    borderRadius: 20,
    padding: 20,
    minHeight: 200,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  textInput: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
    height: '100%',
    fontFamily: 'Inter_400Regular',
  },
  moodSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 16,
    fontFamily: 'Inter_700Bold',
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moodBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  moodBtnActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  moodText: {
    fontSize: 28,
  },
  saveBtn: {
    marginBottom: 40,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
  },
  saveBtnGradient: {
    borderRadius: 16,
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveBtnText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
  },
  historySection: {
    marginTop: 8,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  emptyHistory: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 24,
    padding: 40,
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  emptyIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyHistoryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    fontFamily: 'Inter_600SemiBold',
  },
  emptyHistorySubtext: {
    color: Colors.textMuted,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Inter_400Regular',
  },
});
