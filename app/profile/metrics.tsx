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

export default function BodyMetricsScreen() {
  const router = useRouter();
  const [age, setAge] = useState('28');
  const [height, setHeight] = useState('175');
  const [weight, setWeight] = useState('72');
  const [gender, setGender] = useState('Male');

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ 
        headerShown: true, 
        title: 'BODY METRICS',
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
        <View style={styles.infoCard}>
          <Ionicons name="information-circle-outline" size={20} color={Colors.accentBlue} />
          <Text style={styles.infoText}>
            Keep your metrics updated to get the most accurate nutrition and workout recommendations.
          </Text>
        </View>

        <View style={styles.grid}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>AGE</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
              />
              <Text style={styles.unit}>yrs</Text>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>GENDER</Text>
            <TouchableOpacity style={styles.inputWrapper} activeOpacity={0.7}>
              <Text style={styles.input}>{gender}</Text>
              <Ionicons name="chevron-down" size={16} color="rgba(255,255,255,0.4)" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>HEIGHT</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={height}
                onChangeText={setHeight}
                keyboardType="numeric"
              />
              <Text style={styles.unit}>cm</Text>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>WEIGHT</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
              />
              <Text style={styles.unit}>kg</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.saveBtn} activeOpacity={0.8}>
          <Text style={styles.saveBtnText}>UPDATE METRICS</Text>
        </TouchableOpacity>
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
    paddingTop: 100,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(6,182,212,0.06)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(6,182,212,0.15)',
    gap: 12,
  },
  infoText: {
    flex: 1,
    color: 'rgba(255,255,255,0.6)',
    fontSize: 13,
    lineHeight: 18,
    fontFamily: 'Inter_400Regular',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  inputGroup: {
    width: '47%',
    marginBottom: 24,
  },
  label: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
    letterSpacing: 1,
    marginBottom: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#131313',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    outlineStyle: 'none' as any,
  },
  unit: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 14,
    marginLeft: 4,
  },
  saveBtn: {
    backgroundColor: Colors.accentBlue,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  saveBtnText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'Inter_700Bold',
    letterSpacing: 2,
  },
});
