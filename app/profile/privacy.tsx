import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

export default function PrivacyScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ 
        headerShown: true, 
        title: 'PRIVACY POLICY',
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
        <View style={styles.textSection}>
          <Text style={styles.lastUpdated}>Last Updated: April 9, 2026</Text>
          
          <Text style={styles.heading}>1. INTRODUCTION</Text>
          <Text style={styles.bodyText}>
            Welcome to Victory Fitness. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us.
          </Text>

          <Text style={styles.heading}>2. INFORMATION WE COLLECT</Text>
          <Text style={styles.bodyText}>
            We collect personal information that you voluntarily provide to us when you register on the App, express an interest in obtaining information about us or our products and Services, when you participate in activities on the App or otherwise when you contact us.
          </Text>
          <Text style={styles.bodyText}>
            The personal information that we collect depends on the context of your interactions with us and the App, the choices you make and the products and features you use. The personal information we collect may include the following:
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>• Name and Contact Data.</Text>
            <Text style={styles.bulletItem}>• Credentials (Passwords, etc).</Text>
            <Text style={styles.bulletItem}>• Health and Fitness Data (Height, weight, activity levels).</Text>
          </View>

          <Text style={styles.heading}>3. HOW WE USE YOUR INFORMATION</Text>
          <Text style={styles.bodyText}>
            We use personal information collected via our App for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
          </Text>

          <Text style={styles.heading}>4. DATA SECURITY</Text>
          <Text style={styles.bodyText}>
            We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
          </Text>

          <Text style={styles.heading}>5. YOUR PRIVACY RIGHTS</Text>
          <Text style={styles.bodyText}>
            In some regions (like the EEA and UK), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data portability.
          </Text>

          <Text style={styles.heading}>6. CONTACT US</Text>
          <Text style={styles.bodyText}>
            If you have questions or comments about this notice, you may email us at office@victorakko.com.
          </Text>
        </View>

        <View style={{ height: 40 }} />
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
  textSection: {
    paddingBottom: 20,
  },
  lastUpdated: {
    color: Colors.accentBlue,
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 24,
    letterSpacing: 0.5,
  },
  heading: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'Inter_700Bold',
    letterSpacing: 1.5,
    marginTop: 32,
    marginBottom: 12,
  },
  bodyText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: 'Inter_400Regular',
    marginBottom: 16,
  },
  bulletList: {
    paddingLeft: 12,
    marginBottom: 16,
  },
  bulletItem: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    lineHeight: 24,
    fontFamily: 'Inter_400Regular',
  },
});
