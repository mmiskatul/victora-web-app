import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Linking,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

const FAQS = [
  { q: "How do I sync my Apple Health data?", a: "Go to Settings > Data Sync and toggle the Apple Health switch. You will be prompted to grant permissions." },
  { q: "What is Coach Victor?", a: "Coach Victor is your AI-powered companion available 24/7 to provide personalized fitness advice, workout plans, and nutrition tips." },
  { q: "How do I cancel my premium subscription?", a: "Subscriptions are managed via your App Store or Play Store account settings under 'Subscriptions'." },
];

export default function SupportScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ 
        headerShown: true, 
        title: 'HELP & SUPPORT',
        headerTransparent: true,
        headerTintColor: '#fff',
        headerTitleStyle: { fontFamily: 'Inter_700Bold', fontSize: 16, letterSpacing: 2 } as any,
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 8 }}>
            <Ionicons name="chevron-back" size={28} color="#fff" />
          </TouchableOpacity>
        ),
      }} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.contactHeader}>
          <Text style={styles.contactTitle}>HOW CAN WE HELP?</Text>
          <Text style={styles.contactSub}>Our team and AI coach are available to support your victory.</Text>
        </View>

        <View style={styles.contactGrid}>
          <TouchableOpacity 
            style={styles.contactCard} 
            activeOpacity={0.7}
            onPress={() => Linking.openURL('mailto:office@victorakko.com')}
          >
            <View style={[styles.iconBox, { backgroundColor: 'rgba(6,182,212,0.1)' }]}>
              <Ionicons name="mail-outline" size={24} color={Colors.accentBlue} />
            </View>
            <Text style={styles.contactLabel}>Email Us</Text>
            <Text style={styles.contactVal}>office@victorakko.com</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.contactCard} 
            activeOpacity={0.7}
            onPress={() => router.push('/chat')}
          >
            <View style={[styles.iconBox, { backgroundColor: 'rgba(168,85,247,0.1)' }]}>
              <Ionicons name="chatbubbles-outline" size={24} color={Colors.accentPurple} />
            </View>
            <Text style={styles.contactLabel}>AI Support</Text>
            <Text style={styles.contactVal}>Talk to Victor</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>FREQUENTLY ASKED QUESTIONS</Text>
          {FAQS.map((faq, i) => (
            <View key={i} style={styles.faqCard}>
              <Text style={styles.faqQ}>{faq.q}</Text>
              <Text style={styles.faqA}>{faq.a}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.knowledgeBtn}>
          <Text style={styles.knowledgeText}>Visit Knowledge Base</Text>
          <Ionicons name="arrow-forward" size={16} color={Colors.accentBlue} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131313',
  },
  scrollContent: {
    paddingTop: 100,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  contactHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  contactTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
    fontFamily: 'Inter_700Bold',
    letterSpacing: 1,
    marginBottom: 8,
  },
  contactSub: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: 'Inter_400Regular',
  },
  contactGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 40,
  },
  contactCard: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactLabel: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  contactVal: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
    letterSpacing: 1.5,
    marginBottom: 16,
    marginLeft: 4,
  },
  faqCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  faqQ: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
    marginBottom: 8,
  },
  faqA: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 13,
    lineHeight: 18,
    fontFamily: 'Inter_400Regular',
  },
  knowledgeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
  },
  knowledgeText: {
    color: Colors.accentBlue,
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
  },
});
