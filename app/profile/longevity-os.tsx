import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Pressable,
  useWindowDimensions,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import VictoryHeader from '../../components/VictoryHeader';

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
  { id: 'hbp', label: 'HIGH BLOOD PRESSURE', image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=600&q=80', color: '#F59E0B' },
  { id: 'diabetes', label: 'DIABETES', image: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=600&q=80', color: '#4F8EF7' },
  { id: 'bodyfat', label: 'BODY FAT', image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=600&q=80', color: '#6366F1' },
  { id: 'liver', label: 'HEALTHY LIVER', image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80', color: '#EF4444' },
  { id: 'immunity', label: 'IMMUNITY AND INFECTION', image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?w=600&q=80', color: '#FF6B6B' },
  { id: 'mental', label: 'MENTAL HEALTH AND ANXIETY', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80', color: '#F97316' },
  { id: 'heart', label: 'HEART HEALTH', image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&q=80', color: '#00C9A7' },
  { id: 'respiratory', label: 'RESPIRATORY HEALTH', image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=600&q=80', color: '#10B981' },
  { id: 'skin', label: 'SKIN CONDITIONS', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80', color: '#A855F7' },
  { id: 'recovery', label: 'POST WORKOUT RECOVERY', image: 'https://images.unsplash.com/photo-1541781774459-bb2a1b920155?w=600&q=80', color: '#EC4899' },
];

export default function LongevityOS() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [activeTab, setActiveTab] = useState('overview');

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/profile');
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <ScrollView style={styles.tabContent} contentContainerStyle={styles.tabContentContainer} showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionTitle}>YOUR HEALTH STATUS</Text>

            <TouchableOpacity style={styles.heroCard} activeOpacity={0.9}>
              <Image source={{ uri: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=900&q=80' }} style={styles.heroImage} />
              <View style={styles.heroOverlay} />
              <View style={styles.heroContent}>
                <View style={[styles.heroBadge, { backgroundColor: Colors.accentBlue }]}>
                  <Text style={styles.heroBadgeText}>VICTORY AGE</Text>
                </View>
                <Text style={styles.heroTitle}>Biological Age: N/A</Text>
                <Text style={styles.heroMeta}>Trending 2.4 years younger · Chronological: N/A</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.heroCard, { height: 180 }]} activeOpacity={0.9}>
              <Image source={{ uri: 'https://images.unsplash.com/photo-1541781774459-bb2a1b920155?w=900&q=80' }} style={styles.heroImage} />
              <View style={styles.heroOverlay} />
              <View style={styles.heroContent}>
                <View style={[styles.heroBadge, { backgroundColor: '#10B981' }]}>
                  <Text style={styles.heroBadgeText}>RECOVERY SCORE</Text>
                </View>
                <Text style={[styles.heroTitle, { fontSize: 36, color: '#10B981' }]}>--%</Text>
                <Text style={styles.heroMeta}>HRV: -- ms · Sleep: --%</Text>
              </View>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>QUICK ACTIONS</Text>
            <View style={styles.categoryGrid}>
              {[
                { label: 'Log Bio', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80', color: Colors.accentBlue },
                { label: 'Fasting', image: 'https://images.unsplash.com/photo-1495555961410-b96095ce83be?w=600&q=80', color: Colors.accentGold },
                { label: 'Heal with Food', image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80', color: '#10B981' },
                { label: 'Masterclass', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80', color: Colors.accentBlue },
                { label: 'Circles', image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&q=80', color: '#F472B6' },
              ].map((item, idx) => (
                <TouchableOpacity 
                   key={item.label} 
                   style={[styles.categoryCard, { width: (width - 44) / 2 }, idx === 4 && { width: width - 32 }]} 
                   activeOpacity={0.85}
                >
                  <Image source={{ uri: item.image }} style={styles.categoryImage} />
                  <View style={[styles.categoryOverlay, { backgroundColor: `${item.color}CC` }]} />
                  <View style={styles.categoryContent}>
                    <Text style={styles.categoryName}>{item.label}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionTitle}>DAILY HABITS</Text>
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
          </ScrollView>
        );

      case 'heal':
        return (
          <ScrollView style={styles.tabContent} contentContainerStyle={styles.tabContentContainer} showsVerticalScrollIndicator={false}>
            <TouchableOpacity style={[styles.heroCard, { height: 260, marginTop: 20 }]} activeOpacity={0.9}>
              <Image source={{ uri: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&q=80' }} style={styles.heroImage} />
              <View style={styles.heroOverlay} />
              <View style={styles.heroContent}>
                <View style={[styles.heroBadge, { backgroundColor: Colors.accentBlue }]}>
                  <Text style={styles.heroBadgeText}>AI-POWERED LIBRARY</Text>
                </View>
                <Text style={styles.heroTitle}>Heal with Food</Text>
                <Text style={styles.heroMeta}>"Let food be thy medicine." Explore our research-backed health food library tailored to your health profile.</Text>
                
                <TouchableOpacity style={styles.generateBtnMain}>
                  <Ionicons name="sparkles" size={16} color="#000" />
                  <Text style={styles.generateBtnText}>Generate My Weekly Plan</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>HEALTH FOOD LIBRARY</Text>
            <View style={styles.categoryGrid}>
              {HEAL_CATEGORIES.map((cat, idx) => (
                <TouchableOpacity 
                   key={cat.id} 
                   style={[styles.categoryCard, { width: (width - 44) / 2 }]} 
                   activeOpacity={0.85}
                >
                  <Image source={{ uri: cat.image }} style={styles.categoryImage} />
                  <View style={[styles.categoryOverlay, { backgroundColor: `${cat.color}CC` }]} />
                  <View style={styles.categoryContent}>
                    <Text style={styles.categoryName} numberOfLines={2}>{cat.label}</Text>
                  </View>
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

      case 'wearables':
        return (
          <ScrollView style={styles.tabContent} contentContainerStyle={styles.tabContentContainer} showsVerticalScrollIndicator={false}>
            <Text style={[styles.sectionTitle, { marginTop: 20 }]}>CONNECTED DEVICES</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.popularScroll}>
                {[
                  { name: 'Fitbit', status: 'CONNECT', image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b2?w=600&q=80' },
                  { name: 'Apple Health', status: 'CONNECTED', active: true, image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600&q=80' },
                  { name: 'Google Fit', status: 'CONNECT', image: 'https://images.unsplash.com/photo-1510017803434-a899398421b3?w=600&q=80' },
                  { name: 'Garmin', status: 'CONNECT', image: 'https://images.unsplash.com/photo-1557438159-8664b4c7301c?w=600&q=80' },
                ].map((dev) => (
                  <TouchableOpacity key={dev.name} style={[styles.popularCard, { width: (width - 32) * 0.52 }]} activeOpacity={0.88}>
                    <Image source={{ uri: dev.image }} style={styles.popularImage} />
                    <View style={styles.popularOverlay} />
                    <View style={styles.popularContent}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                         {dev.active && <View style={styles.activeDot} />}
                         <Text style={[styles.popularTitle, dev.active && { color: Colors.primary }]}>{dev.name}</Text>
                      </View>
                      <Text style={styles.popularMeta}>{dev.status}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
            </ScrollView>

            <TouchableOpacity style={styles.syncBtn} activeOpacity={0.9}>
               <Ionicons name="refresh" size={20} color="#000" />
               <Text style={styles.syncBtnText}>SYNC DATA NOW</Text>
            </TouchableOpacity>

            <View style={styles.noDataSection}>
               <Ionicons name="sync" size={40} color="rgba(255,255,255,0.1)" />
               <Text style={styles.noDataText}>No data synced yet. Connect a device and press sync to begin your longevity analysis.</Text>
            </View>
          </ScrollView>
        );

      case 'habits':
        return (
          <ScrollView style={styles.tabContent} contentContainerStyle={styles.tabContentContainer} showsVerticalScrollIndicator={false}>
            <TouchableOpacity style={[styles.heroCard, { height: 180, marginTop: 20 }]} activeOpacity={0.9}>
              <Image source={{ uri: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=900&q=80' }} style={styles.heroImage} />
              <View style={styles.heroOverlay} />
              <View style={styles.heroContent}>
                <View style={[styles.heroBadge, { backgroundColor: '#10B981' }]}>
                  <Text style={styles.heroBadgeText}>7 DAY STREAK</Text>
                </View>
                <Text style={styles.heroTitle}>Longevity Habits</Text>
                <Text style={styles.heroMeta}>Consistency is key. Keep up the good work!</Text>
              </View>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>YOUR HABITS</Text>
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

            <Text style={styles.sectionTitle}>CONSISTENCY</Text>
            <View style={styles.calendarCard}>
              <View style={styles.calendarHeader}>
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, d) => (
                  <Text key={d} style={[styles.calDayHeader, { width: (width - 80) / 7 }]}>{day}</Text>
                ))}
              </View>
              <View style={styles.calGrid}>
                {Array.from({ length: 42 }).map((_, i) => {
                  const dayNum = i - (new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay()) + 1;
                  const isCurrentMonth = dayNum > 0 && dayNum <= (new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate());
                  const isToday = dayNum === new Date().getDate();
                  const isDone = isCurrentMonth && dayNum < new Date().getDate();

                  if (!isCurrentMonth) return <View key={i} style={[styles.calEmpty, { width: (width - 80) / 7, height: (width - 80) / 7 }]} />;

                  return (
                    <View
                      key={i}
                      style={[
                        styles.calDay,
                        { width: (width - 80) / 7, height: (width - 80) / 7 },
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
          <ScrollView style={styles.tabContent} contentContainerStyle={styles.tabContentContainer} showsVerticalScrollIndicator={false}>
            <Text style={[styles.sectionTitle, { marginTop: 20 }]}>MASTERCLASSES</Text>
            <View style={styles.emptyMasterclass}>
              <Ionicons name="book-outline" size={64} color="rgba(255,255,255,0.1)" />
              <Text style={styles.emptyTitle}>No Masterclasses Available</Text>
              <Text style={styles.emptySub}>Check back later for new longevity insights.</Text>
            </View>
          </ScrollView>
        );

      case 'circles':
        return (
          <ScrollView style={styles.tabContent} contentContainerStyle={styles.tabContentContainer} showsVerticalScrollIndicator={false}>
            <Text style={[styles.sectionTitle, { marginTop: 20 }]}>YOUR CIRCLES</Text>
            <View style={styles.emptyVertical}>
              <Text style={styles.emptySub}>You haven't joined any circles yet.</Text>
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
        {/* Header section modernized mimicking workout */}
        <View style={styles.header}>
           <Pressable style={styles.backButton} onPress={handleBack} hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>
              <Ionicons name="chevron-back" size={24} color="#fff" />
           </Pressable>
        </View>

        <Text style={styles.pageTitle}>LONGEVITY OS</Text>

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
                    color={isActive ? Colors.primary : 'rgba(255,255,255,0.4)'}
                  />
                  <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>{tab.label}</Text>
                  {isActive && <View style={styles.activeLine} />}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
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
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
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
  pageTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: 2,
    fontFamily: 'Inter_700Bold',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: 2,
    fontFamily: 'Inter_700Bold',
    paddingHorizontal: 16,
    marginBottom: 14,
    marginTop: 28,
  },
  tabBarContainer: {
    marginBottom: 0,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
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
    bottom: -1,
    width: '100%',
    height: 2,
    backgroundColor: Colors.primary,
  },
  tabContent: {
    flex: 1,
  },
  tabContentContainer: {
    paddingBottom: 60,
  },
  
  /* Hero Styles matching Workout */
  heroCard: {
    marginHorizontal: 16,
    borderRadius: 20,
    overflow: 'hidden',
    height: 240,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  heroContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 18,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primary,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 10,
  },
  heroBadgeText: {
    color: '#000',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    fontFamily: 'Inter_700Bold',
  },
  heroTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
    fontFamily: 'Inter_700Bold',
    marginBottom: 6,
    lineHeight: 28,
  },
  heroMeta: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
  },

  /* Categories Grid from Workout */
  categoryGrid: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    height: 110,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  categoryOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  categoryContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
  },
  categoryName: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '800',
    fontFamily: 'Inter_700Bold',
    marginBottom: 2,
  },

  /* Popular Scroll from Workout */
  popularScroll: {
    paddingHorizontal: 16,
    gap: 12,
  },
  popularCard: {
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  popularImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  popularOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  popularContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
  },
  popularTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
  },
  popularMeta: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
  },

  /* Other Habits UI adapted */
  habitsList: {
    paddingHorizontal: 16,
    gap: 12,
  },
  habitRow: {
    backgroundColor: '#161616',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  activeHabitRow: {
    borderColor: 'rgba(16,185,129,0.3)',
    backgroundColor: 'rgba(16,185,129,0.05)',
  },
  habitIconWrap: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeHabitIconWrap: {
    backgroundColor: 'rgba(16,185,129,0.1)',
  },
  habitTitle: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    marginBottom: 2,
  },
  activeHabitTitle: {
    color: '#10B981',
  },
  habitSub: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 12,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
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
    marginHorizontal: 16,
    backgroundColor: '#161616',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  calDayHeader: {
    color: 'rgba(255,255,255,0.2)',
    fontSize: 10,
    fontFamily: 'Inter_700Bold',
    textAlign: 'center',
  },
  calGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'space-between',
  },
  calDay: {
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.03)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calEmpty: {},
  todayCalDay: {
    borderColor: Colors.primary,
    backgroundColor: 'rgba(0, 240, 208, 0.1)', // Assuming Colors.primary is #00F0D0
    borderWidth: 1,
  },
  todayCalDayText: {
    color: Colors.primary,
  },
  activeCalDay: {
    backgroundColor: 'rgba(16,185,129,0.2)',
  },
  calDayText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    fontFamily: 'Inter_800ExtraBold',
  },
  activeCalDayText: {
    color: '#10B981',
  },
  miniHabitList: {
    paddingHorizontal: 16,
    gap: 10,
  },
  miniHabitRow: {
    backgroundColor: '#161616',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  miniIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
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
  syncBtn: {
    marginHorizontal: 16,
    backgroundColor: Colors.primary,
    borderRadius: 16,
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    marginTop: 28,
  },
  syncBtnText: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'Inter_900Black',
    letterSpacing: 1,
  },
  noDataSection: {
    marginTop: 40,
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  noDataText: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 20,
    fontFamily: 'Inter_500Medium',
  },
  generateBtnMain: {
    marginTop: 12,
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 8,
  },
  generateBtnText: {
    color: '#000',
    fontSize: 13,
    fontWeight: '800',
    fontFamily: 'Inter_700Bold',
  },
  disclaimerBox: {
    marginHorizontal: 16,
    marginTop: 40,
    backgroundColor: 'rgba(245,158,11,0.05)',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    gap: 12,
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
  emptyMasterclass: {
    marginHorizontal: 16,
    backgroundColor: '#161616',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  emptyTitle: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Inter_800ExtraBold',
    marginTop: 20,
    marginBottom: 8,
  },
  emptySub: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
  },
  emptyVertical: {
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

