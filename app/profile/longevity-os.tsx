import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import VictoryHeader from '../../components/VictoryHeader';

const { width } = Dimensions.get('window');

const TABS = [
  { id: 'overview', label: 'OVERVIEW', icon: 'pulse-outline' },
  { id: 'wearables', label: 'WEARABLES', icon: 'watch-outline' },
  { id: 'heal', label: 'HEAL', icon: 'restaurant-outline' },
  { id: 'habits', label: 'HABITS', icon: 'checkbox-outline' },
  { id: 'bio', label: 'BIO', icon: 'flask-outline' },
  { id: 'learn', label: 'LEARN', icon: 'book-outline' },
  { id: 'circles', label: 'CIRCLES', icon: 'people-outline' },
];

const HEAL_CATEGORIES = [
  { id: 'hbp', label: 'HIGH BLOOD PRESSURE', icon: 'heart-outline' },
  { id: 'diabetes', label: 'DIABETES', icon: 'water-outline' },
  { id: 'bodyfat', label: 'BODY FAT', icon: 'fitness-outline' },
  { id: 'liver', label: 'HEALTHY LIVER', icon: 'nutrition-outline' },
  { id: 'immunity', label: 'IMMUNITY AND INFECTION', icon: 'shield-checkmark-outline' },
  { id: 'mental', label: 'MENTAL HEALTH AND ANXIETY', icon: 'happy-outline' },
  { id: 'heart', label: 'HEART HEALTH', icon: 'pulse-outline' },
  { id: 'respiratory', label: 'RESPIRATORY HEALTH', icon: 'wind' },
  { id: 'skin', label: 'SKIN CONDITIONS', icon: 'sparkles-outline' },
  { id: 'recovery', label: 'POST WORKOUT RECOVERY', icon: 'flash-outline' },
];

export default function LongevityOS() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'wearables':
        return (
          <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
            <View style={styles.devicesCard}>
              <View style={styles.cardHeader}>
                <View style={styles.cardHeaderIcon}>
                  <Ionicons name="link" size={16} color={Colors.accentBlue} />
                </View>
                <Text style={styles.cardHeaderTitle}>Connected Devices</Text>
              </View>
              <View style={styles.deviceGrid}>
                {[
                  { name: 'Fitbit', status: 'CONNECT', icon: 'watch-outline' },
                  { name: 'Apple HealthKit', status: 'CONNECTED', icon: 'logo-apple', active: true },
                  { name: 'Google Fit', status: 'CONNECT', icon: 'fitness-outline' },
                  { name: 'Garmin', status: 'CONNECT', icon: 'watch-outline' },
                ].map((dev) => (
                  <TouchableOpacity
                    key={dev.name}
                    style={[styles.deviceBox, dev.active && styles.activeDeviceBox]}
                    activeOpacity={0.8}
                  >
                    <View style={styles.deviceIconSection}>
                      <Ionicons
                        name={dev.icon as any}
                        size={32}
                        color={dev.active ? Colors.accentBlue : 'rgba(255,255,255,0.4)'}
                      />
                    </View>
                    <Text style={[styles.deviceName, dev.active && styles.activeDeviceName]}>{dev.name.toUpperCase()}</Text>
                    <View style={styles.statusRow}>
                      {dev.active && <View style={styles.activeDot} />}
                      <Text style={[styles.deviceStatus, dev.active && styles.activeDeviceStatus]}>{dev.status}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
              <TouchableOpacity style={styles.syncBtn} activeOpacity={0.9}>
                <Ionicons name="refresh" size={20} color="#000" />
                <Text style={styles.syncBtnText}>SYNC DATA NOW</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.noDataSection}>
              <View style={styles.noDataIconWrap}>
                <Ionicons name="sync" size={40} color="rgba(255,255,255,0.05)" />
              </View>
              <Text style={styles.noDataText}>No data synced yet. Connect a device and press sync to begin your longevity analysis.</Text>
            </View>
          </ScrollView>
        );
      case 'heal':
        return (
          <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
            <View style={styles.healHero}>
              <View style={styles.heroBadge}>
                <Ionicons name="sparkles" size={12} color={Colors.accentBlue} />
                <Text style={styles.heroBadgeText}>AI-POWERED LIBRARY</Text>
              </View>
              <Text style={styles.heroTitle}>Heal with Food</Text>
              <Text style={styles.heroSub}>"Let food be thy medicine." Explore our research-backed health food library tailored to your health profile.</Text>
            </View>

            <View style={styles.planCard}>
              <View style={styles.planIconWrap}>
                <Ionicons name="flash-outline" size={20} color={Colors.accentBlue} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.planTitle}>Weekly Food as Medicine Plan</Text>
                <Text style={styles.planSub}>Personalized based on your health profile and wearable data.</Text>
              </View>
              <TouchableOpacity style={styles.generateBtn}>
                <Ionicons name="sparkles" size={16} color="#000" />
                <Text style={styles.generateBtnText}>Generate My Weekly Plan</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.sectionDivider} />
            <Text style={styles.sectionLabel}>HEALTH FOOD LIBRARY</Text>

            <View style={styles.categoryGrid}>
              {HEAL_CATEGORIES.map((cat) => (
                <TouchableOpacity key={cat.id} style={styles.categoryBox}>
                  <View style={styles.categoryIconWrap}>
                    <Ionicons name={cat.icon as any} size={20} color={Colors.accentBlue} />
                  </View>
                  <Text style={styles.categoryLabel}>{cat.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.disclaimerBox}>
              <Ionicons name="alert-circle-outline" size={20} color={Colors.accentGold} />
              <Text style={styles.disclaimerText}>
                MEDICAL DISCLAIMER: These are natural food recommendations to support health and are not a replacement for medical advice or prescribed medication.
              </Text>
            </View>
          </ScrollView>
        );
      case 'habits':
        return (
          <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
            <View style={styles.habitsHeader}>
              <Text style={styles.tabTitle}>Longevity Habits</Text>
              <View style={styles.streakBadge}>
                <Ionicons name="trophy-outline" size={14} color="#10B981" />
                <Text style={styles.streakText}>7 Day Streak</Text>
              </View>
            </View>

            <View style={styles.habitsList}>
              {[
                { title: 'Hydration', sub: 'Daily protocol for longevity', icon: 'water-outline', done: true },
                { title: '7h+ Sleep', sub: 'Daily protocol for longevity', icon: 'moon-outline', done: true },
                { title: 'Cold Plunge', sub: 'Daily protocol for longevity', icon: 'flash-outline', done: true },
                { title: 'Breathwork', sub: 'Daily protocol for longevity', icon: 'reorder-two-outline', done: false },
              ].map((h) => (
                <View key={h.title} style={[styles.habitRow, h.done && styles.activeHabitRow]}>
                  <View style={[styles.habitIconWrap, h.done && styles.activeHabitIconWrap]}>
                    <Ionicons name={h.icon as any} size={20} color={h.done ? '#10B981' : 'rgba(255,255,255,0.4)'} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.habitTitle, h.done && styles.activeHabitTitle]}>{h.title}</Text>
                    <Text style={styles.habitSub}>{h.sub}</Text>
                  </View>
                  <View style={[styles.checkCircle, h.done && styles.activeCheckCircle]}>
                    {h.done && <Ionicons name="checkmark" size={16} color="#fff" />}
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.calendarCard}>
              <View style={styles.cardHeader}>
                <Ionicons name="calendar-outline" size={20} color={Colors.accentBlue} />
                <Text style={styles.cardHeaderTitle}>Consistency Calendar</Text>
              </View>
              <View style={styles.calendarHeader}>
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, d) => (
                  <Text key={d} style={styles.calDayHeader}>{day}</Text>
                ))}
              </View>
              <View style={styles.calGrid}>
                {Array.from({ length: 42 }).map((_, i) => {
                  const dayNum = i - (new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay()) + 1;
                  const isCurrentMonth = dayNum > 0 && dayNum <= (new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate());
                  const isToday = dayNum === new Date().getDate();
                  const isDone = isCurrentMonth && dayNum < new Date().getDate();

                  if (!isCurrentMonth) return <View key={i} style={styles.calEmpty} />;

                  return (
                    <View
                      key={i}
                      style={[
                        styles.calDay,
                        isDone && styles.activeCalDay,
                        isToday && styles.todayCalDay
                      ]}
                    >
                      <Text style={[
                        styles.calDayText,
                        isDone && styles.activeCalDayText,
                        isToday && styles.todayCalDayText
                      ]}>
                        {dayNum}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </ScrollView>
        );
      case 'learn':
        return (
          <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
            <Text style={styles.tabTitle}>Longevity Masterclasses</Text>
            <View style={styles.emptyMasterclass}>
              <Ionicons name="book-outline" size={64} color="rgba(255,255,255,0.1)" />
              <Text style={styles.emptyTitle}>No Masterclasses Available</Text>
              <Text style={styles.emptySub}>Check back later for new longevity insights.</Text>
            </View>
          </ScrollView>
        );
      case 'circles':
        return (
          <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
            <View style={styles.habitsHeader}>
              <Text style={styles.tabTitle}>Longevity Circles</Text>
              <TouchableOpacity>
                <Ionicons name="add" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            <Text style={styles.sectionLabel}>YOUR CIRCLES</Text>
            <View style={styles.emptyVertical}>
              <Text style={styles.emptySub}>You haven't joined any circles yet.</Text>
            </View>
            <Text style={styles.sectionLabel}>EXPLORE CIRCLES</Text>
          </ScrollView>
        );
      case 'overview':
        return (
          <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
            {/* Victory Age Card */}
            <View style={styles.victoryAgeCard}>
              <View style={styles.cardInfo}>
                <Text style={styles.vAgeLabel}>Victory Age</Text>
                <Text style={styles.vAgeSub}>Chronological Age: N/A</Text>
                <View style={styles.trendingRow}>
                  <Ionicons name="trending-down" size={16} color={Colors.accentBlue} />
                  <Text style={styles.trendingText}>Trending 2.4 years younger</Text>
                </View>
              </View>
              <View style={styles.bgIconPos}>
                <Ionicons name="pulse-outline" size={120} color="rgba(255,255,255,0.03)" />
              </View>
            </View>

            {/* Recovery Score Card */}
            <View style={styles.recoveryCard}>
              <View style={styles.cardInfo}>
                <Text style={styles.recoveryLabel}>Recovery Score</Text>
                <Text style={styles.recoveryPct}>%</Text>
                <Text style={styles.recoverySub}>Based on HRV & Sleep Quality</Text>
                <View style={styles.recoveryMetrics}>
                  <View style={styles.recItem}>
                    <Ionicons name="heart-outline" size={14} color="#F87171" />
                    <Text style={styles.recValueText}>HRV: -- ms</Text>
                  </View>
                  <View style={styles.recItem}>
                    <Ionicons name="moon-outline" size={14} color="#FBBF24" />
                    <Text style={styles.recValueText}>Sleep: --%</Text>
                  </View>
                </View>
              </View>
              <View style={styles.bgIconPos}>
                <Ionicons name="flash-outline" size={120} color="rgba(255,255,255,0.03)" />
              </View>
            </View>

            {/* Quick Actions Grid */}
            <View style={styles.categoryGrid}>
              {[
                { label: 'Log Bio', icon: 'pulse-outline', color: Colors.accentBlue },
                { label: 'Fasting', icon: 'time-outline', color: Colors.accentGold },
                { label: 'Heal with Food', icon: 'restaurant-outline', color: '#10B981' },
                { label: 'Masterclass', icon: 'book-outline', color: Colors.accentBlue },
                { label: 'Circles', icon: 'people-outline', color: '#F472B6' },
              ].map((item, idx) => (
                <TouchableOpacity key={item.label} style={[styles.actionBox, idx === 4 && { width: '100%' }]}>
                  <Ionicons name={item.icon as any} size={24} color={item.color} />
                  <Text style={styles.actionLabel}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Daily Habits Preview */}
            <View style={styles.dailyHabitsCard}>
              <View style={styles.habitsHeaderRow}>
                <View style={styles.habitsTitleGroup}>
                  <Ionicons name="checkmark-circle-outline" size={20} color="#10B981" />
                  <Text style={styles.habitsTitle}>Daily Longevity Habits</Text>
                </View>
                <TouchableOpacity onPress={() => setActiveTab('habits')}>
                  <Text style={styles.viewAllText}>View All</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.miniHabitList}>
                {[
                  { title: 'Hydration', icon: 'water-outline' },
                  { title: '7h+ Sleep', icon: 'moon-outline' },
                  { title: 'Cold Plunge', icon: 'flash-outline' },
                ].map((h) => (
                  <View key={h.title} style={styles.miniHabitRow}>
                    <View style={styles.miniIconWrap}>
                      <Ionicons name={h.icon as any} size={16} color="rgba(255,255,255,0.4)" />
                    </View>
                    <Text style={styles.miniHabitTitle}>{h.title}</Text>
                    <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        );
      case 'bio':
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <VictoryHeader />
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerLeft}>
            <Text style={styles.osTitle}>Longevity OS</Text>
            <Text style={styles.osSub}>Optimizing for Healthspan</Text>
          </View>
          <View style={styles.heartbeatIcon}>
            <Ionicons name="pulse" size={24} color="rgba(255,255,255,0.2)" />
          </View>
        </View>

        {/* Tab Bar */}
        <View style={styles.tabBarContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabBar}>
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <TouchableOpacity
                  key={tab.id}
                  style={styles.tabItem}
                  onPress={() => setActiveTab(tab.id)}
                >
                  <Ionicons
                    name={tab.icon as any}
                    size={20}
                    color={isActive ? Colors.accentBlue : 'rgba(255,255,255,0.4)'}
                  />
                  <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>{tab.label}</Text>
                  {isActive && <View style={styles.activeLine} />}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <View style={styles.tabDivider} />
        </View>

        {/* Dynamic Content */}
        <View style={{ flex: 1 }}>
          {renderTabContent()}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.03)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  headerLeft: {
    flex: 1,
  },
  osTitle: {
    color: '#fff',
    fontSize: 22,
    fontFamily: 'Inter_800ExtraBold',
    fontWeight: '800',
  },
  osSub: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    marginTop: 1,
  },
  heartbeatIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.03)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarContainer: {
    marginBottom: 16,
  },
  tabBar: {
    paddingHorizontal: 16,
    gap: 8,
  },
  tabItem: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    alignItems: 'center',
    minWidth: 80,
  },
  tabLabel: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 10,
    fontFamily: 'Inter_700Bold',
    marginTop: 6,
    letterSpacing: 0.5,
  },
  activeTabLabel: {
    color: '#fff',
  },
  activeLine: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 2,
    backgroundColor: Colors.accentBlue,
  },
  tabDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  tabContent: {
    flex: 1,
    paddingHorizontal: 24,
  },
  tabTitle: {
    color: '#fff',
    fontSize: 28,
    fontFamily: 'Inter_800ExtraBold',
    fontWeight: '800',
    marginTop: 20,
    marginBottom: 8,
  },
  sectionLabel: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
    letterSpacing: 1,
    marginBottom: 20,
  },
  devicesCard: {
    backgroundColor: '#161616',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    marginTop: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  cardHeaderIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(6,182,212,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardHeaderTitle: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
  },
  deviceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  deviceBox: {
    width: (width - 110) / 2,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  activeDeviceBox: {
    borderColor: 'rgba(6,182,212,0.4)',
    backgroundColor: 'rgba(6,182,212,0.08)',
  },
  deviceIconSection: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: 30,
    marginBottom: 16,
  },
  deviceName: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 10,
    fontFamily: 'Inter_800ExtraBold',
    letterSpacing: 1,
    textAlign: 'center',
  },
  activeDeviceName: {
    color: Colors.accentBlue,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.accentBlue,
  },
  deviceStatus: {
    color: 'rgba(255,255,255,0.2)',
    fontSize: 10,
    fontFamily: 'Inter_700Bold',
    letterSpacing: 0.5,
  },
  activeDeviceStatus: {
    color: '#fff',
  },
  syncBtn: {
    backgroundColor: Colors.accentBlue,
    borderRadius: 18,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    marginTop: 28,
    shadowColor: Colors.accentBlue,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  syncBtnText: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'Inter_900Black',
    letterSpacing: 1.5,
  },
  noDataSection: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
  },
  noDataIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.03)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  noDataText: {
    color: 'rgba(255,255,255,0.2)',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: 'Inter_500Medium',
    maxWidth: 280,
  },
  healHero: {
    backgroundColor: 'rgba(6,182,212,0.1)',
    borderRadius: 24,
    padding: 24,
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'rgba(6,182,212,0.2)',
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  heroBadgeText: {
    color: Colors.accentBlue,
    fontSize: 10,
    fontFamily: 'Inter_800ExtraBold',
    letterSpacing: 1,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 32,
    fontFamily: 'Inter_800ExtraBold',
    marginBottom: 8,
  },
  heroSub: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 15,
    lineHeight: 22,
    fontFamily: 'Inter_400Regular',
  },
  planCard: {
    backgroundColor: '#161616',
    borderRadius: 24,
    padding: 24,
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  planIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(6,182,212,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(6,182,212,0.2)',
  },
  planTitle: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    marginBottom: 4,
  },
  planSub: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 13,
    lineHeight: 18,
  },
  generateBtn: {
    width: '100%',
    height: 54,
    backgroundColor: Colors.accentBlue,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
  },
  generateBtnText: {
    color: '#000',
    fontSize: 15,
    fontFamily: 'Inter_900Black',
  },
  sectionDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginVertical: 40,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 40,
  },
  categoryBox: {
    width: (width - 64) / 2,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 20,
    padding: 20,
    height: 120,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  victoryAgeCard: {
    backgroundColor: '#161616',
    borderRadius: 24,
    padding: 24,
    marginTop: 20,
    marginBottom: 12,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  recoveryCard: {
    backgroundColor: '#161616',
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  cardInfo: {
    flex: 1,
    zIndex: 1,
  },
  bgIconPos: {
    position: 'absolute',
    right: -20,
    top: -10,
    opacity: 0.5,
  },
  vAgeLabel: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  vAgeSub: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    marginTop: 4,
  },
  trendingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
  },
  trendingText: {
    color: Colors.accentBlue,
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  recoveryLabel: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  recoveryPct: {
    color: Colors.accentBlue,
    fontSize: 44,
    fontFamily: 'Inter_800ExtraBold',
    marginVertical: 4,
  },
  recoverySub: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
  },
  recoveryMetrics: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 12,
  },
  recItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  recValueText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
  },
  actionBox: {
    width: (width - 64) / 2,
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    padding: 20,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    gap: 12,
  },
  actionLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
  },
  dailyHabitsCard: {
    backgroundColor: '#161616',
    borderRadius: 24,
    padding: 24,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  habitsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  habitsTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  habitsTitle: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Inter_800ExtraBold',
  },
  viewAllText: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
  },
  miniHabitList: {
    gap: 12,
  },
  miniHabitRow: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  miniIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.03)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  miniHabitTitle: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
    flex: 1,
  },
  categoryIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(6,182,212,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryLabel: {
    color: '#fff',
    fontSize: 11,
    fontFamily: 'Inter_800ExtraBold',
    lineHeight: 14,
    letterSpacing: 0.5,
  },
  disclaimerBox: {
    backgroundColor: 'rgba(245,158,11,0.05)',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    gap: 12,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: 'rgba(245,158,11,0.1)',
  },
  disclaimerText: {
    color: 'rgba(245,158,11,0.7)',
    fontSize: 12,
    lineHeight: 18,
    flex: 1,
    fontFamily: 'Inter_600SemiBold',
  },
  habitsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 24,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16,185,129,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(16,185,129,0.2)',
  },
  streakText: {
    color: '#10B981',
    fontSize: 12,
    fontFamily: 'Inter_800ExtraBold',
  },
  habitsList: {
    gap: 12,
    marginBottom: 40,
  },
  habitRow: {
    backgroundColor: '#161616',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  activeHabitRow: {
    borderColor: 'rgba(16,185,129,0.2)',
    backgroundColor: 'rgba(16,185,129,0.03)',
  },
  habitIconWrap: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeHabitIconWrap: {
    backgroundColor: 'rgba(16,185,129,0.1)',
  },
  habitTitle: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    marginBottom: 2,
  },
  activeHabitTitle: {
    color: '#10B981',
  },
  habitSub: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 13,
  },
  checkCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeCheckCircle: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  calendarCard: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    marginBottom: 40,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  calDayHeader: {
    color: 'rgba(255,255,255,0.2)',
    fontSize: 10,
    fontFamily: 'Inter_700Bold',
    width: (width - 130) / 7,
    textAlign: 'center',
  },
  calGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  calDay: {
    width: (width - 130) / 7,
    height: (width - 130) / 7,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.03)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  calEmpty: {
    width: (width - 130) / 7,
    height: (width - 130) / 7,
  },
  todayCalDay: {
    borderColor: Colors.accentBlue,
    backgroundColor: 'rgba(6,182,212,0.1)',
  },
  todayCalDayText: {
    color: Colors.accentBlue,
  },
  activeCalDay: {
    backgroundColor: 'rgba(16,185,129,0.2)',
  },
  calDayText: {
    color: 'rgba(255,255,255,0.2)',
    fontSize: 12,
    fontFamily: 'Inter_800ExtraBold',
  },
  activeCalDayText: {
    color: '#10B981',
  },
  emptyMasterclass: {
    backgroundColor: '#161616',
    borderRadius: 24,
    padding: 40,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  emptyTitle: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Inter_800ExtraBold',
    marginTop: 20,
    marginBottom: 8,
  },
  emptySub: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  emptyVertical: {
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
