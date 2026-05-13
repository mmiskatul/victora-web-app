import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '../../../constants/Colors';
import { apiRequest, getValidAuthTokens } from '../../../lib/api';
import { ErrorPopupModal } from '../../../components/ErrorPopupModal';
import { formatAppError } from '../../../lib/error';

type ChallengeReaction = {
  emoji: string;
  count: number;
  viewer_reacted: boolean;
};

type ChallengeChatMessage = {
  id: string;
  challenge_id: string;
  author_id: string;
  author_name: string;
  author_role: string;
  author_profile_image: string;
  message_type: string;
  content: string;
  image_url: string;
  reply_to_message_id: string | null;
  progress_payload: { completed_day?: number; total_days?: number; membership_status?: string } | null;
  created_at: string;
  updated_at: string;
  can_delete: boolean;
  can_edit: boolean;
  is_edited: boolean;
  is_deleted: boolean;
  reactions: ChallengeReaction[];
};

type ChallengeChatThread = {
  challenge_id: string;
  title: string;
  description: string;
  category: string;
  duration_days: number;
  points: number;
  difficulty: string;
  status: string;
  thumbnail: string;
  participant_count: number;
  viewer_membership_status: string;
  viewer_progress_days_completed: number;
  unread_count: number;
  messages: ChallengeChatMessage[];
};

type ChallengeChatEvent = {
  event: 'message_created' | 'message_updated' | 'message_deleted' | 'reaction_toggled';
  challenge_id: string;
  message?: ChallengeChatMessage | null;
  message_id?: string | null;
};

const QUICK_REACTIONS = ['🔥', '💪', '👏'];

declare const process: {
  env?: Record<string, string | undefined>;
};

const RAW_API_URL = process.env?.EXPO_PUBLIC_API_URL ?? 'https://victory-fitness-backend.vercel.app';

function resolveApiUrl(url: string): string {
  if (Platform.OS !== 'android') {
    return url;
  }

  if (url.includes('://127.0.0.1') || url.includes('://localhost')) {
    return url.replace('://127.0.0.1', '://10.0.2.2').replace('://localhost', '://10.0.2.2');
  }

  return url;
}

function buildChallengeChatSocketUrl(challengeId: string, token: string) {
  const apiUrl = resolveApiUrl(RAW_API_URL).replace(/^http/, 'ws').replace(/\/$/, '');
  return `${apiUrl}/ws/challenges/${encodeURIComponent(challengeId)}/chat?token=${encodeURIComponent(token)}`;
}

function formatMessageTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '';
  }
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

function mergeMessage(current: ChallengeChatMessage[], next: ChallengeChatMessage) {
  const existingIndex = current.findIndex((item) => item.id === next.id);
  if (existingIndex === -1) {
    return [...current, next].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  }

  const updated = [...current];
  updated[existingIndex] = next;
  return updated;
}

function ThreadPreview({
  item,
  repliedMessage,
}: {
  item: ChallengeChatMessage;
  repliedMessage?: ChallengeChatMessage | undefined;
}) {
  if (!item.reply_to_message_id || !repliedMessage) {
    return null;
  }

  return (
    <View style={styles.replyPreview}>
      <Text style={styles.replyPreviewAuthor}>{repliedMessage.author_name}</Text>
      <Text style={styles.replyPreviewText} numberOfLines={1}>
        {repliedMessage.is_deleted ? 'Message deleted' : repliedMessage.content || (repliedMessage.image_url ? 'Image' : '')}
      </Text>
    </View>
  );
}

function MessageBubble({
  item,
  repliedMessage,
  onReply,
  onEdit,
  onDelete,
  onReact,
}: {
  item: ChallengeChatMessage;
  repliedMessage?: ChallengeChatMessage;
  onReply: (item: ChallengeChatMessage) => void;
  onEdit: (item: ChallengeChatMessage) => void;
  onDelete: (item: ChallengeChatMessage) => void;
  onReact: (item: ChallengeChatMessage, emoji: string) => void;
}) {
  const isCoach = item.author_role === 'coach' || item.author_id === 'coach_bot';
  const isSystem = item.message_type === 'system_event' || item.author_id === 'system';
  const isProgress = item.message_type === 'progress_update';

  if (isSystem) {
    return (
      <View style={styles.systemRow}>
        <Text style={styles.systemText}>{item.content}</Text>
      </View>
    );
  }

  return (
    <View style={styles.messageRow}>
      {item.author_profile_image ? (
        <Image source={{ uri: item.author_profile_image }} style={styles.avatar} />
      ) : (
        <View style={[styles.avatar, isCoach ? styles.avatarCoach : styles.avatarUser]}>
          <Text style={styles.avatarText}>{(item.author_name || 'U')[0]}</Text>
        </View>
      )}
      <View style={styles.messageContent}>
        <View style={styles.messageMetaRow}>
          <Text style={styles.authorName}>{item.author_name}</Text>
          {isCoach ? <Text style={styles.coachBadge}>COACH</Text> : null}
          {isProgress ? <Text style={styles.progressBadge}>PROGRESS</Text> : null}
          {item.is_edited ? <Text style={styles.editedBadge}>EDITED</Text> : null}
          {item.is_deleted ? <Text style={styles.deletedBadge}>DELETED</Text> : null}
          <Text style={styles.messageTime}>{formatMessageTime(item.created_at)}</Text>
        </View>
        <View style={[styles.bubble, isCoach ? styles.coachBubble : styles.userBubble, isProgress && styles.progressBubble]}>
          <ThreadPreview item={item} repliedMessage={repliedMessage} />
          {item.is_deleted ? (
            <Text style={styles.deletedText}>Message deleted</Text>
          ) : (
            <>
              {item.content ? <Text style={styles.messageText}>{item.content}</Text> : null}
              {item.image_url ? <Image source={{ uri: item.image_url }} style={styles.messageImage} /> : null}
            </>
          )}
        </View>
        <View style={styles.reactionsWrap}>
          {item.reactions.map((reaction) => (
            <TouchableOpacity
              key={`${item.id}-${reaction.emoji}`}
              onPress={() => onReact(item, reaction.emoji)}
              style={[styles.reactionChip, reaction.viewer_reacted && styles.reactionChipActive]}
            >
              <Text style={styles.reactionChipText}>{reaction.emoji} {reaction.count}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.messageActionsRow}>
          {QUICK_REACTIONS.map((emoji) => (
            <TouchableOpacity key={`${item.id}-${emoji}`} onPress={() => onReact(item, emoji)} style={styles.iconAction}>
              <Text style={styles.quickReactionText}>{emoji}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={() => onReply(item)} style={styles.iconAction}>
            <Ionicons name="return-up-back-outline" size={14} color={Colors.textMuted} />
          </TouchableOpacity>
          {item.can_edit && !item.is_deleted ? (
            <TouchableOpacity onPress={() => onEdit(item)} style={styles.iconAction}>
              <Ionicons name="pencil-outline" size={14} color={Colors.textMuted} />
            </TouchableOpacity>
          ) : null}
          {item.can_delete && !item.is_deleted ? (
            <TouchableOpacity onPress={() => onDelete(item)} style={styles.iconAction}>
              <Ionicons name="trash-outline" size={14} color="#FCA5A5" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </View>
  );
}

export default function ChallengeChatScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ challengeId?: string }>();
  const challengeId = Array.isArray(params.challengeId) ? params.challengeId[0] : params.challengeId;
  const socketRef = useRef<WebSocket | null>(null);

  const [thread, setThread] = useState<ChallengeChatThread | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [sending, setSending] = useState(false);
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [replyingTo, setReplyingTo] = useState<ChallengeChatMessage | null>(null);
  const [editingMessage, setEditingMessage] = useState<ChallengeChatMessage | null>(null);
  const [errorDialog, setErrorDialog] = useState<{ title: string; message: string } | null>(null);

  const messagesById = useMemo(() => {
    const map = new Map<string, ChallengeChatMessage>();
    for (const message of thread?.messages || []) {
      map.set(message.id, message);
    }
    return map;
  }, [thread?.messages]);

  const loadThread = useCallback(async (showLoader = false) => {
    if (!challengeId) {
      return;
    }

    if (showLoader) {
      setLoading(true);
    } else {
      setRefreshing(true);
    }

    try {
      const response = await apiRequest<ChallengeChatThread>(`/challenges/${encodeURIComponent(challengeId)}/chat`);
      setThread(response);
    } catch (error) {
      setErrorDialog(formatAppError(error, 'Failed to load challenge chat.'));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [challengeId]);

  useEffect(() => {
    void loadThread(true);
  }, [loadThread]);

  useEffect(() => {
    let closed = false;

    const connectSocket = async () => {
      if (!challengeId) {
        return;
      }

      const tokens = await getValidAuthTokens();
      if (!tokens?.access_token || closed) {
        return;
      }

      const socket = new WebSocket(buildChallengeChatSocketUrl(challengeId, tokens.access_token));
      socketRef.current = socket;

      socket.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data) as ChallengeChatEvent;
          if (!payload?.event) {
            return;
          }

          setThread((current) => {
            if (!current) {
              return current;
            }

            if (payload.event === 'message_created' || payload.event === 'message_updated' || payload.event === 'reaction_toggled') {
              if (!payload.message) {
                return current;
              }
              return {
                ...current,
                messages: mergeMessage(current.messages, payload.message),
              };
            }

            if (payload.event === 'message_deleted' && payload.message) {
              return {
                ...current,
                messages: mergeMessage(current.messages, payload.message),
              };
            }

            return current;
          });
        } catch {
          return;
        }
      };

      socket.onclose = () => {
        socketRef.current = null;
      };
    };

    void connectSocket();

    return () => {
      closed = true;
      socketRef.current?.close();
      socketRef.current = null;
    };
  }, [challengeId]);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission needed', 'Please allow photo library access to add an image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled && result.assets?.[0]) {
      setSelectedImage(result.assets[0]);
    }
  };

  const resetComposer = () => {
    setInputText('');
    setSelectedImage(null);
    setReplyingTo(null);
    setEditingMessage(null);
  };

  const sendMessage = async () => {
    if (!challengeId) {
      return;
    }

    const content = inputText.trim();
    if (!content && !selectedImage?.base64) {
      return;
    }

    setSending(true);
    try {
      if (editingMessage) {
        await apiRequest(`/challenges/${encodeURIComponent(challengeId)}/chat/messages/${encodeURIComponent(editingMessage.id)}`, {
          method: 'PATCH',
          body: { content },
        });
      } else {
        await apiRequest(`/challenges/${encodeURIComponent(challengeId)}/chat/messages`, {
          method: 'POST',
          body: {
            content,
            image_base64: selectedImage?.base64 ?? undefined,
            mime_type: selectedImage?.mimeType ?? 'image/jpeg',
            file_name: selectedImage?.fileName ?? null,
            reply_to_message_id: replyingTo?.id ?? undefined,
          },
        });
      }

      resetComposer();
    } catch (error) {
      setErrorDialog(formatAppError(error, editingMessage ? 'Failed to update message.' : 'Failed to send message.'));
    } finally {
      setSending(false);
    }
  };

  const shareProgress = async () => {
    if (!challengeId || !thread || sending) {
      return;
    }

    setSending(true);
    try {
      await apiRequest(`/challenges/${encodeURIComponent(challengeId)}/progress`, {
        method: 'POST',
        body: {
          completed_day: Math.min(thread.viewer_progress_days_completed + 1, thread.duration_days),
          note: `Completed day ${Math.min(thread.viewer_progress_days_completed + 1, thread.duration_days)}.`,
        },
      });
    } catch (error) {
      setErrorDialog(formatAppError(error, 'Failed to share progress.'));
    } finally {
      setSending(false);
    }
  };

  const handleDelete = (item: ChallengeChatMessage) => {
    if (!challengeId) {
      return;
    }
    Alert.alert('Delete message', 'Delete this message?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await apiRequest(`/challenges/${encodeURIComponent(challengeId)}/chat/messages/${encodeURIComponent(item.id)}`, {
              method: 'DELETE',
            });
          } catch (error) {
            setErrorDialog(formatAppError(error, 'Failed to delete message.'));
          }
        },
      },
    ]);
  };

  const handleReact = async (item: ChallengeChatMessage, emoji: string) => {
    if (!challengeId) {
      return;
    }
    try {
      await apiRequest(`/challenges/${encodeURIComponent(challengeId)}/chat/messages/${encodeURIComponent(item.id)}/reactions/toggle`, {
        method: 'POST',
        body: { emoji },
      });
    } catch (error) {
      setErrorDialog(formatAppError(error, 'Failed to update reaction.'));
    }
  };

  const nextDayLabel = useMemo(() => {
    if (!thread) {
      return 'Share progress';
    }
    return thread.viewer_progress_days_completed >= thread.duration_days
      ? 'Challenge completed'
      : `Mark day ${thread.viewer_progress_days_completed + 1} done`;
  }, [thread]);

  if (loading && !thread) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.centered}>
          <ActivityIndicator color={Colors.primary} size="large" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <Stack.Screen options={{ headerShown: false }} />
      <ErrorPopupModal
        visible={Boolean(errorDialog)}
        title={errorDialog?.title ?? 'Error'}
        message={errorDialog?.message ?? ''}
        onClose={() => setErrorDialog(null)}
      />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerIcon}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerBody}>
          <Text style={styles.headerTitle}>{thread?.title || 'Challenge Chat'}</Text>
          <Text style={styles.headerMeta}>
            {thread?.participant_count || 0} members · {thread?.category || 'Challenge'}
          </Text>
        </View>
        <TouchableOpacity onPress={() => void loadThread(false)} style={styles.headerIcon}>
          {refreshing ? <ActivityIndicator color={Colors.primary} size="small" /> : <Ionicons name="refresh" size={20} color="#fff" />}
        </TouchableOpacity>
      </View>

      {thread ? (
        <View style={styles.heroCard}>
          <Text style={styles.heroDescription}>{thread.description}</Text>
          <View style={styles.heroMetaRow}>
            <Text style={styles.heroMeta}>{thread.difficulty}</Text>
            <Text style={styles.heroMeta}>{thread.viewer_progress_days_completed}/{thread.duration_days} days</Text>
            <Text style={styles.heroMeta}>+{thread.points} pts</Text>
          </View>
        </View>
      ) : null}

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex}>
        <FlatList
          data={thread?.messages || []}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MessageBubble
              item={item}
              repliedMessage={item.reply_to_message_id ? messagesById.get(item.reply_to_message_id) : undefined}
              onReply={setReplyingTo}
              onEdit={(message) => {
                setEditingMessage(message);
                setReplyingTo(null);
                setInputText(message.content);
              }}
              onDelete={handleDelete}
              onReact={handleReact}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />

        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.progressButton, (!thread || thread.viewer_progress_days_completed >= thread.duration_days || sending) && styles.buttonDisabled]}
            onPress={shareProgress}
            disabled={!thread || thread.viewer_progress_days_completed >= thread.duration_days || sending}
          >
            <Ionicons name="checkmark-circle" size={16} color="#001311" />
            <Text style={styles.progressButtonText}>{nextDayLabel}</Text>
          </TouchableOpacity>
        </View>

        {replyingTo || editingMessage ? (
          <View style={styles.composerBanner}>
            <View style={styles.composerBannerTextWrap}>
              <Text style={styles.composerBannerTitle}>{editingMessage ? 'Editing message' : `Replying to ${replyingTo?.author_name}`}</Text>
              <Text style={styles.composerBannerText} numberOfLines={1}>
                {editingMessage?.content || replyingTo?.content || (replyingTo?.image_url ? 'Image' : '')}
              </Text>
            </View>
            <TouchableOpacity onPress={() => { setReplyingTo(null); setEditingMessage(null); }} style={styles.composerBannerClose}>
              <Ionicons name="close" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        ) : null}

        {selectedImage?.uri ? (
          <View style={styles.previewWrap}>
            <Image source={{ uri: selectedImage.uri }} style={styles.previewImage} />
            <TouchableOpacity onPress={() => setSelectedImage(null)} style={styles.previewRemove}>
              <Ionicons name="close-circle" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        ) : null}

        <View style={styles.inputBar}>
          <TouchableOpacity onPress={pickImage} style={styles.attachButton} disabled={sending || Boolean(editingMessage)}>
            <Ionicons name="image-outline" size={20} color={Colors.primary} />
          </TouchableOpacity>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder='Share progress or type "@Coach ..."'
              placeholderTextColor="rgba(255,255,255,0.38)"
              value={inputText}
              onChangeText={setInputText}
              multiline
              editable={!sending}
            />
          </View>
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton} disabled={sending}>
            {sending ? <ActivityIndicator color="#001311" size="small" /> : <Ionicons name={editingMessage ? 'checkmark' : 'arrow-up'} size={18} color="#001311" />}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#070B14' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  flex: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  headerIcon: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  headerBody: { flex: 1 },
  headerTitle: { color: '#fff', fontSize: 18, fontFamily: 'Inter_700Bold' },
  headerMeta: { color: Colors.textMuted, fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 2 },
  heroCard: {
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
    backgroundColor: '#0F172A',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  heroDescription: { color: Colors.textSecondary, fontSize: 13, lineHeight: 20, fontFamily: 'Inter_400Regular' },
  heroMetaRow: { flexDirection: 'row', gap: 10, marginTop: 10, flexWrap: 'wrap' },
  heroMeta: {
    color: Colors.primary,
    fontSize: 11,
    fontFamily: 'Inter_700Bold',
    backgroundColor: 'rgba(0,240,208,0.1)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  listContent: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 16, gap: 12 },
  systemRow: { alignItems: 'center', marginVertical: 6 },
  systemText: {
    color: Colors.textMuted,
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    backgroundColor: 'rgba(255,255,255,0.04)',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
  },
  messageRow: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  avatar: { width: 34, height: 34, borderRadius: 17, justifyContent: 'center', alignItems: 'center' },
  avatarCoach: { backgroundColor: 'rgba(6,182,212,0.18)' },
  avatarUser: { backgroundColor: 'rgba(168,85,247,0.18)' },
  avatarText: { color: '#fff', fontSize: 13, fontFamily: 'Inter_700Bold' },
  messageContent: { flex: 1 },
  messageMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' },
  authorName: { color: '#fff', fontSize: 12, fontFamily: 'Inter_700Bold' },
  coachBadge: {
    color: Colors.accentBlue,
    fontSize: 10,
    fontFamily: 'Inter_700Bold',
    backgroundColor: 'rgba(6,182,212,0.12)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 999,
  },
  progressBadge: {
    color: Colors.accentGold,
    fontSize: 10,
    fontFamily: 'Inter_700Bold',
    backgroundColor: 'rgba(245,158,11,0.12)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 999,
  },
  editedBadge: {
    color: Colors.textMuted,
    fontSize: 10,
    fontFamily: 'Inter_700Bold',
  },
  deletedBadge: {
    color: '#FCA5A5',
    fontSize: 10,
    fontFamily: 'Inter_700Bold',
  },
  messageTime: { color: Colors.textMuted, fontSize: 11, fontFamily: 'Inter_400Regular' },
  bubble: {
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
  },
  coachBubble: { backgroundColor: '#0B1D2A', borderColor: 'rgba(6,182,212,0.25)' },
  userBubble: { backgroundColor: '#151A2D', borderColor: 'rgba(255,255,255,0.06)' },
  progressBubble: { backgroundColor: '#21170A', borderColor: 'rgba(245,158,11,0.22)' },
  messageText: { color: '#fff', fontSize: 14, lineHeight: 20, fontFamily: 'Inter_400Regular' },
  messageImage: { width: 220, height: 180, borderRadius: 12, marginTop: 10, backgroundColor: '#111827' },
  deletedText: { color: Colors.textMuted, fontSize: 13, fontFamily: 'Inter_400Regular', fontStyle: 'italic' },
  replyPreview: {
    borderLeftWidth: 2,
    borderLeftColor: Colors.primary,
    paddingLeft: 8,
    marginBottom: 8,
  },
  replyPreviewAuthor: { color: Colors.primary, fontSize: 11, fontFamily: 'Inter_700Bold' },
  replyPreviewText: { color: Colors.textMuted, fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 2 },
  reactionsWrap: { flexDirection: 'row', gap: 6, flexWrap: 'wrap', marginTop: 6 },
  reactionChip: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  reactionChipActive: { borderColor: 'rgba(0,240,208,0.35)', backgroundColor: 'rgba(0,240,208,0.08)' },
  reactionChipText: { color: '#fff', fontSize: 11, fontFamily: 'Inter_400Regular' },
  messageActionsRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 6, flexWrap: 'wrap' },
  iconAction: { paddingVertical: 4, paddingRight: 2 },
  quickReactionText: { fontSize: 15 },
  actionsRow: { paddingHorizontal: 16, paddingBottom: 10 },
  progressButton: {
    minHeight: 42,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonDisabled: { opacity: 0.5 },
  progressButtonText: { color: '#001311', fontSize: 13, fontFamily: 'Inter_700Bold' },
  composerBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  composerBannerTextWrap: { flex: 1 },
  composerBannerTitle: { color: Colors.primary, fontSize: 12, fontFamily: 'Inter_700Bold' },
  composerBannerText: { color: Colors.textMuted, fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 2 },
  composerBannerClose: { marginLeft: 10 },
  previewWrap: {
    marginHorizontal: 16,
    marginBottom: 8,
    position: 'relative',
    borderRadius: 14,
    overflow: 'hidden',
  },
  previewImage: { width: '100%', height: 160, backgroundColor: '#111827' },
  previewRemove: { position: 'absolute', top: 8, right: 8 },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 18 : 14,
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
    backgroundColor: '#070B14',
  },
  attachButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,240,208,0.08)',
  },
  inputWrapper: {
    flex: 1,
    borderRadius: 18,
    backgroundColor: '#121A2A',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    paddingHorizontal: 14,
    paddingVertical: 10,
    maxHeight: 120,
  },
  input: { color: '#fff', fontSize: 14, fontFamily: 'Inter_400Regular' },
  sendButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
});
