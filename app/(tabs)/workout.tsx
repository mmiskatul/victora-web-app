import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/Colors';

const { width } = Dimensions.get('window');


interface Workout {
  id: string;
  title: string;
  duration: string;
  category: string;
  image: string;
}

interface Category {
  id: string;
  name: string;
  count: string;
  image: string;
  color: string;
}

const workoutOfTheDay: Workout = {
  id: '0',
  title: '10 Reps Workout with Josy',
  duration: '22 Min.',
  category: 'Ohne Gewichten',
  image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=80',
};

const newAndPopular: Workout[] = [
  {
    id: '1',
    title: '10 Reps Workout with Josy',
    duration: '22 Min.',
    category: 'Ohne Gewichten',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
  },
  {
    id: '2',
    title: '10. Legendary Leg Day',
    duration: '20 Min.',
    category: 'Gewichten',
    image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=600&q=80',
  },
  {
    id: '3',
    title: 'Core Crusher HIIT',
    duration: '18 Min.',
    category: 'HIIT',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bd35e5?w=600&q=80',
  },
  {
    id: '4',
    title: 'Full Body Strength',
    duration: '35 Min.',
    category: 'Strength',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80',
  },
];

const categories: Category[] = [
  {
    id: '1',
    name: 'Intermediate',
    count: '16 Workouts',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80',
    color: '#F59E0B',
  },
  {
    id: '2',
    name: 'Arms',
    count: '12 Workouts',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80',
    color: '#4F8EF7',
  },
  {
    id: '3',
    name: 'Arme',
    count: '10 Workouts',
    image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&q=80',
    color: '#6366F1',
  },
  {
    id: '4',
    name: 'Advanced',
    count: '14 Workouts',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bd35e5?w=600&q=80',
    color: '#EF4444',
  },
  {
    id: '5',
    name: 'Abs',
    count: '18 Workouts',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
    color: '#FF6B6B',
  },
  {
    id: '6',
    name: 'Weight Loss',
    count: '20 Workouts',
    image: 'https://images.unsplash.com/photo-1477519242566-6ae87c31d212?w=600&q=80',
    color: '#F97316',
  },
  {
    id: '7',
    name: 'Aufwärmen',
    count: '8 Workouts',
    image: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=600&q=80',
    color: '#00C9A7',
  },
  {
    id: '8',
    name: 'Endurance',
    count: '11 Workouts',
    image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=600&q=80',
    color: '#10B981',
  },
  {
    id: '9',
    name: 'Bauch',
    count: '9 Workouts',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80',
    color: '#A855F7',
  },
  {
    id: '10',
    name: 'Bauch & Core',
    count: '13 Workouts',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
    color: '#EC4899',
  },
  {
    id: '11',
    name: 'Beginner',
    count: '19 Workouts',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    color: '#22C55E',
  },
  {
    id: '12',
    name: 'Beginner Friendly',
    count: '15 Workouts',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
    color: '#14B8A6',
  },
  {
    id: '13',
    name: 'Beine',
    count: '17 Workouts',
    image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=600&q=80',
    color: '#F59E0B',
  },
  {
    id: '14',
    name: 'Beine & Po',
    count: '14 Workouts',
    image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=600&q=80',
    color: '#A855F7',
  },
  {
    id: '15',
    name: 'Core',
    count: '16 Workouts',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
    color: '#EF4444',
  },
  {
    id: '16',
    name: 'Conditioning',
    count: '10 Workouts',
    image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=600&q=80',
    color: '#F97316',
  },
  {
    id: '17',
    name: 'Chest',
    count: '12 Workouts',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80',
    color: '#6366F1',
  },
  {
    id: '18',
    name: 'Cardio',
    count: '22 Workouts',
    image: 'https://images.unsplash.com/photo-1477519242566-6ae87c31d212?w=600&q=80',
    color: '#FF6B6B',
  },
  {
    id: '19',
    name: 'Brust',
    count: '9 Workouts',
    image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&q=80',
    color: '#4F8EF7',
  },
  {
    id: '20',
    name: 'Bodyweight',
    count: '25 Workouts',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&q=80',
    color: '#00C9A7',
  },
  {
    id: '21',
    name: 'Body Focus',
    count: '11 Workouts',
    image: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=600&q=80',
    color: '#10B981',
  },
  {
    id: '22',
    name: 'Bewegungsqualität',
    count: '7 Workouts',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
    color: '#22C55E',
  },
];

export default function WorkoutScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  // Pair categories into rows for 2-column grid
  const categoryRows: Category[][] = [];
  for (let i = 0; i < categories.length; i += 2) {
    categoryRows.push(categories.slice(i, i + 2));
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Victory Fitness Brand Header */}
        <View style={styles.brandHeader}>
          <Text style={styles.brandTitle}>V I C T O R Y</Text>
          <Text style={styles.brandSubtitle}>F I T N E S S</Text>
        </View>

        {/* Page Title */}
        <Text style={styles.pageTitle}>WORKOUTS</Text>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color={Colors.textMuted} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Workout suchen..."
            placeholderTextColor={Colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <View style={styles.searchActions}>
            <TouchableOpacity style={styles.searchActionBtn}>
              <Ionicons name="refresh-outline" size={20} color={Colors.textMuted} />
            </TouchableOpacity>
            {searchQuery.length > 0 && (
              <TouchableOpacity
                style={styles.searchActionBtn}
                onPress={() => setSearchQuery('')}
              >
                <Ionicons name="close" size={20} color={Colors.textMuted} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Workout of the Day Hero */}
        <TouchableOpacity style={styles.heroCard} activeOpacity={0.9}>
          <Image source={{ uri: workoutOfTheDay.image }} style={styles.heroImage} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.85)']}
            style={styles.heroGradient}
          />
          <View style={styles.heroContent}>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>WORKOUT DES TAGES</Text>
            </View>
            <Text style={styles.heroTitle}>{workoutOfTheDay.title}</Text>
            <Text style={styles.heroMeta}>
              {workoutOfTheDay.duration} · {workoutOfTheDay.category}
            </Text>
          </View>
        </TouchableOpacity>

        {/* New & Popular Section */}
        <Text style={styles.sectionTitle}>NEW &amp; POPULAR</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.popularScroll}
        >
          {newAndPopular.map((workout) => (
            <TouchableOpacity key={workout.id} style={styles.popularCard} activeOpacity={0.88}>
              <Image source={{ uri: workout.image }} style={styles.popularImage} />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.80)']}
                style={styles.popularGradient}
              />
              <View style={styles.popularContent}>
                <Text style={styles.popularTitle} numberOfLines={2}>{workout.title}</Text>
                <Text style={styles.popularMeta}>{workout.duration} · {workout.category}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Categories Section */}
        <Text style={[styles.sectionTitle, { marginTop: 28 }]}>CATEGORIES</Text>
        <View style={styles.categoryGrid}>
          {categoryRows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.categoryRow}>
              {row.map((cat) => (
                <TouchableOpacity key={cat.id} style={styles.categoryCard} activeOpacity={0.85}>
                  <Image source={{ uri: cat.image }} style={styles.categoryImage} />
                  <LinearGradient
                    colors={['transparent', `${cat.color}CC`]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.categoryGradient}
                  />
                  <View style={styles.categoryContent}>
                    <Text style={styles.categoryName}>{cat.name}</Text>
                    <Text style={styles.categoryCount}>{cat.count}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingTop: 56,
    paddingBottom: 40,
  },

  /* Brand Header */
  brandHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  brandTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 8,
    fontFamily: 'Inter_700Bold',
  },
  brandSubtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: 6,
    marginTop: 4,
    fontFamily: 'Inter_600SemiBold',
  },

  /* Page Title */
  pageTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: 3,
    fontFamily: 'Inter_700Bold',
    paddingHorizontal: 16,
    marginBottom: 16,
  },

  /* Search */
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A2E',
    borderRadius: 14,
    marginHorizontal: 16,
    marginBottom: 20,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
  },
  searchActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchActionBtn: {
    padding: 4,
  },

  /* Hero Card */
  heroCard: {
    marginHorizontal: 16,
    borderRadius: 20,
    overflow: 'hidden',
    height: 240,
    marginBottom: 28,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroGradient: {
    ...StyleSheet.absoluteFillObject,
    top: '40%',
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

  /* Section Title */
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: 2,
    fontFamily: 'Inter_700Bold',
    paddingHorizontal: 16,
    marginBottom: 14,
  },

  /* Popular Horizontal Scroll */
  popularScroll: {
    paddingHorizontal: 16,
    gap: 12,
  },
  popularCard: {
    width: (width - 32) * 0.52,
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
  popularGradient: {
    ...StyleSheet.absoluteFillObject,
    top: '30%',
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
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
    marginBottom: 3,
    lineHeight: 18,
  },
  popularMeta: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
  },

  /* Categories Grid */
  categoryGrid: {
    paddingHorizontal: 16,
    gap: 12,
  },
  categoryRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 0,
  },
  categoryCard: {
    flex: 1,
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
  categoryGradient: {
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
  categoryCount: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 10,
    fontFamily: 'Inter_400Regular',
  },
});
