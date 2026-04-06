import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

const { width } = Dimensions.get('window');

interface Workout {
  id: string;
  title: string;
  duration: string;
  category: string;
  image: string;
}

const mockWorkouts: Workout[] = [
  {
    id: '1',
    title: 'FULL BODY BLAST',
    duration: '45 MIN',
    category: 'Full Body',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
  },
  {
    id: '2',
    title: 'ABS CORE CRUSHER',
    duration: '20 MIN',
    category: 'Abs',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
  },
  {
    id: '3',
    title: 'HIIT POWER',
    duration: '25 MIN',
    category: 'HIIT',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bd35e5?w=800&q=80',
  },
  {
    id: '4',
    title: 'YOGA FLOW',
    duration: '30 MIN',
    category: 'Yoga',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
  },
  {
    id: '5',
    title: 'STRENGTH BASICS',
    duration: '50 MIN',
    category: 'Strength',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80',
  },
  {
    id: '6',
    title: 'LEG DAY INTENSE',
    duration: '40 MIN',
    category: 'Legs',
    image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=800&q=80',
  },
];

const filters = ['LATEST', 'POPULAR', 'FAVORITES', 'SAVED'];

export default function WorkoutScreen() {
  const [activeFilter, setActiveFilter] = useState('LATEST');

  const filteredWorkouts = activeFilter === 'LATEST' 
    ? mockWorkouts 
    : mockWorkouts.filter(w => w.category.toUpperCase() === activeFilter || activeFilter === 'POPULAR');

  const renderWorkoutItem = ({ item }: { item: Workout }) => (
    <TouchableOpacity style={styles.workoutCard}>
      <View style={styles.thumbnailContainer}>
        <Image source={{ uri: item.image }} style={styles.thumbnail} />
        <View style={styles.playOverlay}>
           <Ionicons name="play" size={20} color="#fff" />
        </View>
      </View>
      
      <View style={styles.workoutInfo}>
        <Text style={styles.workoutTitle}>{item.title}</Text>
        <Text style={styles.workoutSubtitle}>{item.duration} • {item.category}</Text>
      </View>

      <TouchableOpacity style={styles.actionBtn}>
        <Ionicons name="play-circle" size={36} color={Colors.primary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>TRAIN</Text>
        <TouchableOpacity>
          <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              onPress={() => setActiveFilter(filter)}
              style={[
                styles.filterChip,
                activeFilter === filter && styles.filterChipActive,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === filter && styles.filterTextActive,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Workout List */}
      <FlatList
        data={filteredWorkouts}
        keyExtractor={(item) => item.id}
        renderItem={renderWorkoutItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: 2,
    fontFamily: 'Inter_700Bold',
  },
  filtersContainer: {
    paddingLeft: 20,
    marginBottom: 20,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  filterChipActive: {
    backgroundColor: 'rgba(0, 240, 208, 0.15)',
    borderColor: Colors.primary,
  },
  filterText: {
    color: Colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  },
  filterTextActive: {
    color: Colors.primary,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  workoutCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  thumbnailContainer: {
    width: 80,
    height: 80,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  workoutInfo: {
    flex: 1,
    marginLeft: 16,
  },
  workoutTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
    fontFamily: 'Inter_700Bold',
  },
  workoutSubtitle: {
    fontSize: 12,
    color: Colors.textMuted,
    fontFamily: 'Inter_400Regular',
  },
  actionBtn: {
    marginLeft: 12,
  },
});
