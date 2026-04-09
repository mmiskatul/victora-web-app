import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

const MOCK_HISTORY = [
  {
    id: '1',
    date: 'Today',
    time: '2:15 PM',
    mood: '🤩',
    text: "Started the Beginner Leg Foundation today. Feeling strong and motivated! Bodyweight squats were deep and the glute bridges really burned.",
  },
  {
    id: '2',
    date: 'Yesterday',
    time: '8:45 AM',
    mood: '😊',
    text: "Morning meditation was peaceful. Planning to push harder on my nutrition goals this week. 1.6g protein per kg is the target.",
  },
  {
    id: '3',
    date: 'April 8, 2026',
    time: '6:30 PM',
    mood: '😐',
    text: "Long day at work but managed to get a quick stretch in. Not quite at peak energy but staying consistent with my routine.",
  },
];

export default function JournalHistoryScreen() {
  const router = useRouter();

  const renderItem = ({ item }: { item: typeof MOCK_HISTORY[0] }) => (
    <TouchableOpacity style={styles.entryCard} activeOpacity={0.7}>
      <View style={styles.cardHeader}>
        <View style={styles.dateBadge}>
          <Text style={styles.dateText}>{item.date.toUpperCase()}</Text>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
        <Text style={styles.moodEmoji}>{item.mood}</Text>
      </View>
      <Text style={styles.entryText} numberOfLines={3}>
        {item.text}
      </Text>
      <View style={styles.cardFooter}>
        <Text style={styles.viewMoreText}>View Details</Text>
        <Ionicons name="chevron-forward" size={14} color={Colors.accentBlue} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ 
        headerShown: true, 
        title: 'JOURNAL HISTORY',
        headerTransparent: true,
        headerTintColor: '#fff',
        headerTitleStyle: { fontFamily: 'Inter_700Bold', fontSize: 16, letterSpacing: 2 } as any,
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 8 }}>
            <Ionicons name="chevron-back" size={28} color="#fff" />
          </TouchableOpacity>
        ),
      }} />

      <FlatList
        data={MOCK_HISTORY}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={<View style={{ height: 100 }} />} // Spacing for transparent header
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131313',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  entryCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  dateBadge: {
    // Styling for date container
  },
  dateText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'Inter_700Bold',
    letterSpacing: 1,
  },
  timeText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    marginTop: 2,
  },
  moodEmoji: {
    fontSize: 32,
  },
  entryText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 15,
    lineHeight: 22,
    fontFamily: 'Inter_400Regular',
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.04)',
    paddingTop: 12,
  },
  viewMoreText: {
    color: Colors.accentBlue,
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
    marginRight: 4,
  },
});
