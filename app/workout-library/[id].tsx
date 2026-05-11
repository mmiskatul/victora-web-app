import React, { useMemo } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import { Colors } from '../../constants/Colors';

const DEFAULT_THUMBNAIL =
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=300&auto=format&fit=crop';

export default function WorkoutPlayerScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    id?: string;
    title?: string;
    vimeoId?: string;
    tag?: string;
    thumbnail?: string;
  }>();

  const title = typeof params.title === 'string' ? params.title : 'Workout';
  const vimeoId = typeof params.vimeoId === 'string' ? params.vimeoId : '';
  const tag = typeof params.tag === 'string' ? params.tag : 'Workout';
  const thumbnail = typeof params.thumbnail === 'string' ? params.thumbnail : DEFAULT_THUMBNAIL;

  const embedUrl = useMemo(() => {
    if (!vimeoId) {
      return '';
    }

    return `https://player.vimeo.com/video/${encodeURIComponent(vimeoId)}?autoplay=1&title=0&byline=0&portrait=0`;
  }, [vimeoId]);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerCopy}>
          <Text style={styles.headerEyebrow}>{tag.toUpperCase()}</Text>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {title}
          </Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      {embedUrl ? (
        <View style={styles.playerWrap}>
          <WebView
            source={{ uri: embedUrl }}
            style={styles.webview}
            javaScriptEnabled
            domStorageEnabled
            mediaPlaybackRequiresUserAction={false}
            allowsInlineMediaPlayback
            startInLoadingState
            renderLoading={() => (
              <View style={styles.loadingWrap}>
                <ActivityIndicator size="large" color={Colors.primary} />
                <Text style={styles.loadingText}>Loading workout video...</Text>
              </View>
            )}
          />
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Image source={{ uri: thumbnail }} style={styles.emptyImage} />
          <Text style={styles.emptyTitle}>Video unavailable</Text>
          <Text style={styles.emptyText}>
            This workout does not have a valid Vimeo video yet.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050816',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 14,
    gap: 12,
  },
  headerButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerSpacer: {
    width: 42,
    height: 42,
  },
  headerCopy: {
    flex: 1,
  },
  headerEyebrow: {
    color: Colors.primary,
    fontSize: 11,
    letterSpacing: 1.6,
    fontFamily: 'Inter_700Bold',
    marginBottom: 4,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
  },
  playerWrap: {
    flex: 1,
    overflow: 'hidden',
    marginHorizontal: 12,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: '#0E1326',
  },
  webview: {
    flex: 1,
    backgroundColor: '#0E1326',
  },
  loadingWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0E1326',
    gap: 12,
  },
  loadingText: {
    color: Colors.textMuted,
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  emptyState: {
    flex: 1,
    marginHorizontal: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: '#0E1326',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyImage: {
    width: 160,
    height: 160,
    borderRadius: 18,
    marginBottom: 20,
  },
  emptyTitle: {
    color: '#fff',
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
    marginBottom: 8,
  },
  emptyText: {
    color: Colors.textMuted,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    fontFamily: 'Inter_400Regular',
  },
});
