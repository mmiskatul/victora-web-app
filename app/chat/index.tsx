import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

interface Message {
  id: string;
  text: string;
  sender: 'coach' | 'user';
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    text: "Hi Admin! I'm Coach Victor. How can I help you with your fitness journey today?",
    sender: 'coach',
  },
  {
    id: '2',
    text: "how can I do some leg workout",
    sender: 'user',
  },
  {
    id: '3',
    text: "Hello Admin! It's great to see you focusing on your lower body—it's the foundation of your overall strength and metabolic health.\n\nSince you are at the beginner level, we will focus on mastering form with bodyweight movements. Here is a simple, effective circuit you can do anywhere:\n\n### **The Beginner Leg Foundation**\nPerform these exercises back-to-back, rest for 60 seconds, and repeat for **3 rounds**:\n\n1. **Bodyweight Squats (12 reps):** Keep your chest up and act as if you are sitting back into an invisible chair. Ensure your knees don't cave inward.\n2. **Reverse Lunges (8 reps per leg):** Step backward and lower your back knee toward the floor. Stepping backward is often easier on the knees for beginners than stepping forward.\n3. **Glute Bridges (15 reps):** Lie on your back with knees bent and feet flat. Lift your hips toward the ceiling, squeezing your glutes at the top.\n4. **Calf Raises (15 reps):** Stand tall and rise onto the balls of your feet, then slowly lower back down.\n\n### **Coach Victor's Pro-Tips:**\n* **Form over Speed:** Don't rush. Feel the muscles working.\n* **Nutrition:** To help those leg muscles recover and grow, remember to aim for approximately **1.6 grams of protein per kilogram of your bodyweight** daily.\n* **Mindset:** Your first session might feel tough, but consistency is where the magic happens. Just show up.\n\nDo you have any equipment like dumbbells, or are we sticking to bodyweight for now?",
    sender: 'coach',
  },
];

export default function ChatScreen() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        sender: 'user',
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isCoach = item.sender === 'coach';
    return (
      <View
        style={[
          styles.messageContainer,
          isCoach ? styles.coachContainer : styles.userContainer,
        ]}
      >
        <View
          style={[
            styles.bubble,
            isCoach ? styles.coachBubble : styles.userBubble,
          ]}
        >
          <Text style={[styles.messageText, isCoach ? styles.coachText : styles.userText]}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerIcon}>
          <Ionicons name="add" size={24} color="#fff" style={{ transform: [{ rotate: '45deg' }] }} />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarOuter}>
              <View style={styles.avatarInner}>
                <Ionicons name="add" size={16} color="#fff" />
              </View>
            </View>
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>COACH VICTOR</Text>
            <View style={styles.statusRow}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>ONLINE & READY</Text>
            </View>
          </View>
        </View>

        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />

        {/* Input Bar */}
        <View style={styles.inputBar}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Ask me anything..."
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
            <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  headerIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    marginRight: 10,
  },
  avatarOuter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.accentBlue,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.accentBlue,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 5,
  },
  avatarInner: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTextContainer: {
    alignItems: 'flex-start',
  },
  headerTitle: {
    color: Colors.accentBlue,
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#4ade80',
    marginRight: 4,
  },
  statusText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 10,
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  messageContainer: {
    marginBottom: 16,
    maxWidth: '85%',
  },
  coachContainer: {
    alignSelf: 'flex-start',
  },
  userContainer: {
    alignSelf: 'flex-end',
  },
  bubble: {
    padding: 14,
    borderRadius: 16,
  },
  coachBubble: {
    backgroundColor: '#1E2530',
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: Colors.accentBlue,
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
    fontFamily: 'Inter_400Regular',
  },
  coachText: {
    color: '#D1D5DB',
  },
  userText: {
    color: '#000',
  },
  inputBar: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E2530',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 15,
    maxHeight: 120,
    paddingTop: 8,
    paddingBottom: 8,
    fontFamily: 'Inter_400Regular',
    outlineStyle: 'none' as any,
  },
  sendButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});
