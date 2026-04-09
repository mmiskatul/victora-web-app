import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

const { width } = Dimensions.get('window');

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const SAMPLE_WORKOUTS = [
  {
    id: '1',
    title: '10 Reps Workout with Josy',
    duration: '22 Min.',
    category: 'Full Body',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
  },
  {
    id: '2',
    title: 'Legendary Leg Day',
    duration: '20 Min.',
    category: 'Lower Body',
    image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=600&q=80',
  },
  {
    id: '3',
    title: 'Core Crusher HIIT',
    duration: '18 Min.',
    category: 'HIIT',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bd35e5?w=600&q=80',
  },
];

export default function VideoPlanResult() {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState('Mon');

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ 
        headerShown: true, 
        title: '7-DAY VIDEO PLAN',
        headerTransparent: true,
        headerTintColor: '#fff',
        headerTitleStyle: { fontFamily: 'Inter_700Bold', fontSize: 16, letterSpacing: 2 } as any,
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.push('/workoutplan')} style={{ marginLeft: 8 }}>
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>
        ),
      }} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Day Selector */}
        <View style={styles.daySelector}>
          {DAYS.map((day) => (
            <TouchableOpacity
              key={day}
              onPress={() => setSelectedDay(day)}
              style={[styles.dayBtn, selectedDay === day && styles.dayBtnActive]}
            >
              <Text style={[styles.dayText, selectedDay === day && styles.dayTextActive]}>{day}</Text>
              {selectedDay === day && <View style={styles.activeDot} />}
            </TouchableOpacity>
          ))}
        </View>

        {/* Daily Insight */}
        <View style={styles.insightCard}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>45</Text>
            <Text style={styles.statLabel}>MINUTES</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>VIDEOS</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>🔥</Text>
            <Text style={styles.statLabel}>INTENSITY</Text>
          </View>
        </View>

        {/* Video List */}
        <Text style={styles.sectionTitle}>TODAY'S WORKOUTS</Text>
        <View style={styles.videoList}>
          {SAMPLE_WORKOUTS.map((workout) => (
            <TouchableOpacity key={workout.id} style={styles.videoCard} activeOpacity={0.9}>
              <Image source={{ uri: workout.image }} style={styles.videoImage} />
              <View style={styles.playOverlay}>
                <Ionicons name="play" size={24} color="#000" />
              </View>
              <View style={styles.videoInfo}>
                <View>
                  <Text style={styles.videoTitle}>{workout.title}</Text>
                  <Text style={styles.videoMeta}>{workout.category} • {workout.duration}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.3)" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.startBtn} activeOpacity={0.8}>
          <Text style={styles.startBtnText}>START DAY 1</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  scrollContent: {
    paddingTop: 110,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  daySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    backgroundColor: '#161616',
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  dayBtn: {
    width: 44,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
  },
  dayBtnActive: {
    backgroundColor: 'rgba(6,182,212,0.1)',
  },
  dayText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
  },
  dayTextActive: {
    color: Colors.accentBlue,
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.accentBlue,
    marginTop: 4,
  },
  insightCard: {
    flexDirection: 'row',
    backgroundColor: '#161616',
    borderRadius: 24,
    padding: 24,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
    fontFamily: 'Inter_800ExtraBold',
    marginBottom: 4,
  },
  statLabel: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
    letterSpacing: 1,
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  sectionTitle: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
    letterSpacing: 2,
    marginBottom: 20,
  },
  videoList: {
    gap: 16,
    marginBottom: 40,
  },
  videoCard: {
    backgroundColor: '#161616',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  videoImage: {
    width: '100%',
    height: 180,
    opacity: 0.7,
  },
  playOverlay: {
    position: 'absolute',
    top: 65,
    alignSelf: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.accentBlue,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.accentBlue,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  videoInfo: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  videoTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
    marginBottom: 4,
  },
  videoMeta: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
  },
  startBtn: {
    backgroundColor: Colors.accentBlue,
    height: 60,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startBtnText: {
    color: '#000',
    fontSize: 15,
    fontWeight: '800',
    fontFamily: 'Inter_800ExtraBold',
    letterSpacing: 2,
  },
});
