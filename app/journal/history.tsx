import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useFocusEffect, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { ErrorPopupModal } from '../../components/ErrorPopupModal';
import { apiRequest } from '../../lib/api';
import { formatAppError } from '../../lib/error';

type JournalEntry = {
  id: string;
  user_id: string;
  mood: string;
  content: string;
  created_at: string;
  updated_at: string;
};

const MOOD_EMOJI: Record<string, string> = {
  ANGRY: '😡',
  ANXIOUS: '😟',
  NEUTRAL: '😐',
  GOOD: '😊',
  VICTORIOUS: '🤩',
};

function formatEntryDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return 'UNKNOWN DATE';
  }

  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).toUpperCase();
}

function formatEntryTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function JournalHistoryScreen() {
  const router = useRouter();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorDialog, setErrorDialog] = useState<{ title: string; message: string } | null>(null);

  const loadEntries = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiRequest<{ entries: JournalEntry[] }>('/journal/entries');
      setEntries(response.entries);
    } catch (error) {
      setEntries([]);
      setErrorDialog(formatAppError(error, 'Unable to load journal history right now.'));
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void loadEntries();
    }, [loadEntries])
  );

  const renderItem = ({ item }: { item: JournalEntry }) => {
    const moodEmoji = MOOD_EMOJI[item.mood] ?? '📝';

    return (
      <TouchableOpacity style={styles.entryCard} activeOpacity={0.7}>
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.dateText}>{formatEntryDate(item.created_at)}</Text>
            <Text style={styles.timeText}>{formatEntryTime(item.created_at)}</Text>
          </View>
          <Text style={styles.moodEmoji}>{moodEmoji}</Text>
        </View>
        <Text style={styles.entryText} numberOfLines={3}>
          {item.content}
        </Text>
        <View style={styles.cardFooter}>
          <Text style={styles.viewMoreText}>{item.mood}</Text>
          <Ionicons name="chevron-forward" size={14} color={Colors.accentBlue} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ErrorPopupModal
        visible={Boolean(errorDialog)}
        title={errorDialog?.title ?? 'Error'}
        message={errorDialog?.message ?? ''}
        onClose={() => setErrorDialog(null)}
      />
      <Stack.Screen
        options={{
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
        }}
      />

      {loading ? (
        <View style={styles.loadingWrap}>
          <ActivityIndicator size="large" color={Colors.accentBlue} />
          <Text style={styles.loadingText}>Loading saved journal entries...</Text>
        </View>
      ) : (
        <FlatList
          data={entries}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={<View style={{ height: 100 }} />}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="document-text-outline" size={34} color="rgba(255,255,255,0.25)" />
              <Text style={styles.emptyTitle}>No journal entries yet</Text>
              <Text style={styles.emptyText}>Secure a journal entry to see it here.</Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131313',
  },
  loadingWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 24,
  },
  loadingText: {
    color: Colors.textMuted,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    flexGrow: 1,
  },
  emptyState: {
    flex: 1,
    minHeight: 280,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#1A1A1A',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    paddingHorizontal: 24,
  },
  emptyTitle: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
  },
  emptyText: {
    color: Colors.textMuted,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
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

