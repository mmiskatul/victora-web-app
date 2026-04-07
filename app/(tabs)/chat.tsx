import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/Colors';

const { width } = Dimensions.get('window');

const TABS = ['CHALLENGES', 'COMMUNITY'];

// ── Active Challenge Chats ──
const activeChats = [
  { id: 'c1', name: '30-Day Push-Up Challenge', lastMsg: 'Coach: Day 12 — keep pushing! 💪', time: '2m ago', unread: 3, avatar: '💪' },
  { id: 'c2', name: '7-Day Morning Run', lastMsg: 'You: Done! 5km in 28 mins 🏃', time: '1h ago', unread: 0, avatar: '🏃' },
  { id: 'c3', name: '3-Day Screen-Free Dinner', lastMsg: 'Sarah K.: Amazing dinner tonight!', time: '3h ago', unread: 1, avatar: '🍽️' },
];

// ── Your Active Challenges ──
const activeChallenges = [
  { id: 'a1', title: '30-Day Push-Up Challenge', type: 'Strength', daysLeft: 18, totalDays: 30, progress: 0.4, points: 500, color: '#4F8EF7' },
  { id: 'a2', title: '7-Day Morning Run', type: 'Cardio', daysLeft: 4, totalDays: 7, progress: 0.57, points: 150, color: Colors.primary },
  { id: 'a3', title: '3-Day Screen-Free Dinner', type: 'Family', daysLeft: 1, totalDays: 3, progress: 0.67, points: 75, color: '#A855F7' },
];

// ── Completed Challenges ──
const completedChallenges = [
  { id: 'd1', title: '5-Day Meditation Reset', type: 'Mindfulness', earnedPoints: 100, completedDate: 'Mar 28', color: '#22C55E' },
  { id: 'd2', title: '14-Day Clean Eating', type: 'Nutrition', earnedPoints: 200, completedDate: 'Mar 12', color: '#F59E0B' },
];

// ── Ready to Start ──
const readyToStart = [
  { id: 'r1', title: '21-Day No Sugar Detox', description: 'Eliminate all added sugar for 21 days.', duration: '21 Days', type: 'Nutrition', points: 350, participants: 9, difficulty: 'ADVANCED', difficultyColor: '#EF4444' },
  { id: 'r2', title: '14-Day Clean Eating', description: 'Whole foods only — no processed snacks.', duration: '14 Days', type: 'Nutrition', points: 200, participants: 22, difficulty: 'INTERMEDIATE', difficultyColor: '#F59E0B' },
  { id: 'r3', title: '5-Day Meditation Reset', description: 'Meditate 10 minutes every day.', duration: '5 Days', type: 'Mindfulness', points: 100, participants: 18, difficulty: 'BEGINNER', difficultyColor: '#22C55E' },
];



export default function ChallengesScreen() {
  const [activeTab, setActiveTab] = useState('CHALLENGES');

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Brand Header */}
        <View style={styles.brandHeader}>
          <Text style={styles.brandTitle}>V I C T O R Y</Text>
          <Text style={styles.brandSubtitle}>F I T N E S S</Text>
        </View>

        {/* Page Title Row */}
        {/* <View style={styles.titleRow}>
          <View>
            <Text style={styles.pageTitle}>CHALLENGES</Text>
            <Text style={styles.pageSubtitle}>Compete. Earn. Win.</Text>
          </View>
          <TouchableOpacity style={styles.inviteBtn}>
            <Ionicons name="person-add-outline" size={14} color="#fff" />
            <Text style={styles.inviteBtnText}>Invite</Text>
          </TouchableOpacity>
        </View> */}

        {/* Tabs */}
        <View style={styles.tabRow}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── CHALLENGES TAB ── */}
        {activeTab === 'CHALLENGES' && (
          <View style={styles.section}>

            {/* ─ Active Challenge Chats ─ */}
            <View style={styles.subSectionHeader}>
              <Ionicons name="chatbubbles" size={16} color={Colors.primary} />
              <Text style={styles.subSectionTitle}>Active Challenge Chats</Text>
            </View>
            {activeChats.map((chat) => (
              <TouchableOpacity key={chat.id} style={styles.chatCard} activeOpacity={0.85}>
                <View style={styles.chatAvatarWrap}>
                  <Text style={styles.chatAvatarEmoji}>{chat.avatar}</Text>
                </View>
                <View style={styles.chatContent}>
                  <Text style={styles.chatName}>{chat.name}</Text>
                  <Text style={styles.chatLastMsg} numberOfLines={1}>{chat.lastMsg}</Text>
                </View>
                <View style={styles.chatRight}>
                  <Text style={styles.chatTime}>{chat.time}</Text>
                  {chat.unread > 0 && (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadText}>{chat.unread}</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}

            {/* ─ Your Active Challenges ─ */}
            <View style={[styles.subSectionHeader, { marginTop: 24 }]}>
              <Ionicons name="flash" size={16} color={Colors.primary} />
              <Text style={styles.subSectionTitle}>Your Active Challenges</Text>
            </View>
            {activeChallenges.map((ch) => (
              <View key={ch.id} style={styles.activeCard}>
                <View style={styles.activeCardTop}>
                  <View style={[styles.activeColorDot, { backgroundColor: ch.color }]} />
                  <Text style={styles.activeCardTitle}>{ch.title}</Text>
                  <View style={styles.activePointsBadge}>
                    <Ionicons name="star" size={11} color="#F59E0B" />
                    <Text style={styles.activePointsText}>+{ch.points}</Text>
                  </View>
                </View>
                <View style={styles.activeProgressRow}>
                  <View style={styles.progressBarBg}>
                    <View style={[styles.progressBarFill, { width: `${ch.progress * 100}%` as any, backgroundColor: ch.color }]} />
                  </View>
                  <Text style={styles.progressLabel}>
                    {Math.round(ch.progress * ch.totalDays)}/{ch.totalDays} days
                  </Text>
                </View>
                <View style={styles.activeCardMeta}>
                  <Text style={styles.activeMetaText}>{ch.type}</Text>
                  <Text style={[styles.daysLeftText, { color: ch.daysLeft <= 2 ? '#EF4444' : Colors.textMuted }]}>
                    {ch.daysLeft} days left
                  </Text>
                </View>
              </View>
            ))}

            {/* ─ Completed ─ */}
            <View style={[styles.subSectionHeader, { marginTop: 24 }]}>
              <Ionicons name="checkmark-circle" size={16} color="#22C55E" />
              <Text style={[styles.subSectionTitle, { color: '#22C55E' }]}>Completed</Text>
            </View>
            {completedChallenges.map((ch) => (
              <View key={ch.id} style={styles.completedCard}>
                <View style={[styles.completedIcon, { backgroundColor: `${ch.color}22` }]}>
                  <Ionicons name="trophy" size={20} color={ch.color} />
                </View>
                <View style={styles.completedInfo}>
                  <Text style={styles.completedTitle}>{ch.title}</Text>
                  <Text style={styles.completedMeta}>{ch.type} · {ch.completedDate}</Text>
                </View>
                <View style={styles.completedPts}>
                  <Ionicons name="star" size={12} color="#F59E0B" />
                  <Text style={styles.completedPtsText}>+{ch.earnedPoints} Pts</Text>
                </View>
              </View>
            ))}

            {/* ─ Ready to Start ─ */}
            <View style={[styles.subSectionHeader, { marginTop: 24 }]}>
              <Ionicons name="rocket" size={16} color="#4F8EF7" />
              <Text style={[styles.subSectionTitle, { color: '#4F8EF7' }]}>Ready to Start</Text>
            </View>
            {readyToStart.map((ch) => (
              <View key={ch.id} style={styles.readyCard}>
                <View style={styles.readyCardTop}>
                  <Text style={styles.readyTitle}>{ch.title}</Text>
                  <View style={[styles.difficultyBadge, { backgroundColor: `${ch.difficultyColor}22` }]}>
                    <Text style={[styles.difficultyText, { color: ch.difficultyColor }]}>{ch.difficulty}</Text>
                  </View>
                </View>
                <Text style={styles.readyDesc} numberOfLines={2}>{ch.description}</Text>
                <View style={styles.readyMeta}>
                  <View style={styles.metaItem}>
                    <Ionicons name="time-outline" size={12} color={Colors.textMuted} />
                    <Text style={styles.metaText}>{ch.duration}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="people-outline" size={12} color={Colors.textMuted} />
                    <Text style={styles.metaText}>{ch.participants} joined</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="star" size={12} color="#F59E0B" />
                    <Text style={[styles.metaText, { color: '#F59E0B' }]}>+{ch.points} Pts</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.startBtn} activeOpacity={0.85}>
                  <Text style={styles.startBtnText}>START CHALLENGE</Text>
                  <Ionicons name="arrow-forward" size={14} color="#000" />
                </TouchableOpacity>
              </View>
            ))}

          </View>
        )}


        {/* ── COMMUNITY TAB ── */}
        {activeTab === 'COMMUNITY' && (
          <View style={styles.section}>
            <LinearGradient
              colors={['#4F46E5', '#2D2A8A']}
              style={styles.communityBanner}
            >
              <Ionicons name="people" size={36} color="rgba(255,255,255,0.9)" />
              <Text style={styles.communityBannerCount}>1,270</Text>
              <Text style={styles.communityBannerLabel}>Champions Training Today</Text>
              <TouchableOpacity style={styles.communityInviteBtn}>
                <Text style={styles.communityInviteBtnText}>Invite Friends +100 Pts</Text>
              </TouchableOpacity>
            </LinearGradient>

            {/* Community feed */}
            {[
              { user: 'Sarah K.', action: 'completed the 30-Day Push-Up Challenge', time: '2m ago', pts: '+500 Pts' },
              { user: 'Mike T.', action: 'joined the 7-Day Morning Run', time: '15m ago', pts: '+150 Pts' },
              { user: 'Josy M.', action: 'hit a 28-day streak! 🔥', time: '1h ago', pts: '+100 Pts' },
              { user: 'Alex P.', action: 'completed 100 push-ups today', time: '3h ago', pts: '+50 Pts' },
              { user: 'Priya S.', action: 'joined the 21-Day No Sugar Detox', time: '5h ago', pts: '+350 Pts' },
            ].map((feed, i) => (
              <View key={i} style={styles.feedCard}>
                <View style={styles.feedAvatar}>
                  <Text style={styles.feedAvatarText}>{feed.user[0]}</Text>
                </View>
                <View style={styles.feedContent}>
                  <Text style={styles.feedText}>
                    <Text style={styles.feedUser}>{feed.user} </Text>
                    {feed.action}
                  </Text>
                  <Text style={styles.feedTime}>{feed.time}</Text>
                </View>
                <View style={styles.feedPts}>
                  <Text style={styles.feedPtsText}>{feed.pts}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

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
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: 3,
    fontFamily: 'Inter_700Bold',
  },
  pageSubtitle: {
    fontSize: 13,
    color: Colors.textMuted,
    fontFamily: 'Inter_400Regular',
    marginTop: 2,
  },
  inviteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  inviteBtnText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
  },

  /* Tabs */
  tabRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 20,
    backgroundColor: '#1A1A2E',
    borderRadius: 14,
    padding: 4,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  tabBtnActive: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textMuted,
    letterSpacing: 0.5,
    fontFamily: 'Inter_700Bold',
  },
  tabTextActive: {
    color: '#000',
  },

  /* Shared */
  section: {
    paddingHorizontal: 16,
  },

  /* Sub-section Header */
  subSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  subSectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: 0.5,
    fontFamily: 'Inter_700Bold',
  },

  /* Active Challenge Chats */
  chatCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#13132A',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    gap: 12,
  },
  chatAvatarWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0,240,208,0.1)',
    borderWidth: 1.5,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatAvatarEmoji: {
    fontSize: 22,
  },
  chatContent: {
    flex: 1,
  },
  chatName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
    marginBottom: 3,
  },
  chatLastMsg: {
    color: Colors.textMuted,
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  chatRight: {
    alignItems: 'flex-end',
    gap: 6,
  },
  chatTime: {
    color: Colors.textMuted,
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
  },
  unreadBadge: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  unreadText: {
    color: '#000',
    fontSize: 11,
    fontWeight: '800',
    fontFamily: 'Inter_700Bold',
  },

  /* Your Active Challenges */
  activeCard: {
    backgroundColor: '#13132A',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
  },
  activeCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  activeColorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  activeCardTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
  },
  activePointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(245,158,11,0.12)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  activePointsText: {
    color: '#F59E0B',
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
  },
  activeProgressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  progressBarBg: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressLabel: {
    fontSize: 11,
    color: Colors.textMuted,
    fontFamily: 'Inter_400Regular',
    minWidth: 50,
    textAlign: 'right',
  },
  activeCardMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activeMetaText: {
    fontSize: 12,
    color: Colors.textMuted,
    fontFamily: 'Inter_400Regular',
  },
  daysLeftText: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
  },

  /* Completed */
  completedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#13132A',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(34,197,94,0.2)',
    gap: 12,
  },
  completedIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedInfo: {
    flex: 1,
  },
  completedTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
    marginBottom: 3,
  },
  completedMeta: {
    color: Colors.textMuted,
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  completedPts: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(245,158,11,0.12)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  completedPtsText: {
    color: '#F59E0B',
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
  },

  /* Ready to Start */
  readyCard: {
    backgroundColor: '#13132A',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(79,142,247,0.2)',
  },
  readyCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
    gap: 8,
  },
  readyTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
  },
  readyDesc: {
    color: Colors.textMuted,
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    lineHeight: 19,
    marginBottom: 12,
  },
  readyMeta: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 14,
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: Colors.textMuted,
    fontFamily: 'Inter_400Regular',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'Inter_700Bold',
    letterSpacing: 0.3,
  },
  startBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 12,
  },
  startBtnText: {
    color: '#000',
    fontSize: 13,
    fontWeight: '800',
    fontFamily: 'Inter_700Bold',
    letterSpacing: 0.5,
  },


  /* Community */
  communityBanner: {
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  communityBannerCount: {
    fontSize: 36,
    fontWeight: '800',
    color: '#fff',
    fontFamily: 'Inter_700Bold',
    marginTop: 8,
  },
  communityBannerLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.75)',
    fontFamily: 'Inter_400Regular',
    marginBottom: 16,
  },
  communityInviteBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 14,
  },
  communityInviteBtnText: {
    color: '#3730A3',
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'Inter_700Bold',
  },
  feedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#13132A',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    gap: 12,
  },
  feedAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  feedAvatarText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '800',
    fontFamily: 'Inter_700Bold',
  },
  feedContent: {
    flex: 1,
  },
  feedText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    fontFamily: 'Inter_400Regular',
    lineHeight: 18,
  },
  feedUser: {
    color: '#fff',
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
  },
  feedTime: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 3,
    fontFamily: 'Inter_400Regular',
  },
  feedPts: {
    backgroundColor: 'rgba(245,158,11,0.12)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  feedPtsText: {
    color: '#F59E0B',
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
  },
});
