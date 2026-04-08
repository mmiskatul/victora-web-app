import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

const MOODS = [
  { id: 'm1', emoji: '😤' },
  { id: 'm2', emoji: '😟' },
  { id: 'm3', emoji: '😐' },
  { id: 'm4', emoji: '😊' },
  { id: 'm5', emoji: '😄' },
];

const PROFILE_TABS = ['JOURNAL', 'WORKOUT', 'NUTRITION'];

const HISTORY_ENTRIES = [
  { date: 'Mon, Apr 7', mood: '😊', note: 'Had a great workout today. Feeling energized.' },
  { date: 'Sun, Apr 6', mood: '😐', note: 'Skipped the gym. Ate okay overall.' },
  { date: 'Sat, Apr 5', mood: '😄', note: 'Best run in weeks! Feeling unstoppable.' },
];

export default function ProfileScreen() {
  const [profileTab, setProfileTab] = useState('JOURNAL');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [journalNote, setJournalNote] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  const pts = 105;
  const nextRankPts = 500;
  const progressFraction = pts / nextRankPts;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* ── Profile Header ── */}
        <View style={styles.headerCard}>
          {/* Avatar */}
          <View style={styles.avatarWrapper}>
            <LinearGradient colors={['#06B6D4', '#0EA5E9']} style={styles.avatarGrad}>
              <Text style={styles.avatarLetter}>A</Text>
            </LinearGradient>
            <TouchableOpacity style={styles.avatarCameraBtn}>
              <Ionicons name="image-outline" size={14} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Info */}
          <View style={styles.headerInfo}>
            <View style={styles.headerNameRow}>
              <Text style={styles.headerName}>ADMIN</Text>
              <TouchableOpacity style={styles.editBtn}>
                <Ionicons name="pencil-outline" size={16} color="rgba(255,255,255,0.5)" />
              </TouchableOpacity>
            </View>
            <View style={styles.headerBadgeRow}>
              <Text style={styles.rankLabel}>RECRUIT</Text>
              <View style={styles.ptsBadge}>
                <Text style={styles.ptsBadgeText}>{pts} PTS</Text>
              </View>
            </View>

            {/* Rank Progress */}
            <View style={styles.rankRow}>
              <Text style={styles.rankText}>RECRUIT</Text>
              <Text style={styles.rankText}>WARRIOR</Text>
            </View>
            <View style={styles.rankBarBg}>
              <LinearGradient
                colors={['#06B6D4', '#0EA5E9']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.rankBarFill, { width: `${progressFraction * 100}%` as any }]}
              />
            </View>
            <Text style={styles.nextRankText}>{nextRankPts - pts} Pts Next Rank</Text>
          </View>
        </View>

        {/* ── Stats ── */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>AGE / GENDER</Text>
            <Text style={styles.statValue}>N/A / -</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>HEIGHT / WEIGHT</Text>
            <Text style={styles.statValue}>- / -</Text>
          </View>
        </View>

        {/* ── Inner Circle ── */}
        <View style={styles.innerCircleRow}>
          <View style={styles.innerCircleDot} />
          <Text style={styles.innerCircleText}>INNER CIRCLE SUBSCRIPTION</Text>
        </View>

        {/* ── Language ── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>LANGUAGE</Text>
          <TouchableOpacity style={styles.langSelector} activeOpacity={0.8}>
            <Text style={styles.langText}>us English</Text>
            <Ionicons name="chevron-down" size={18} color="rgba(255,255,255,0.5)" />
          </TouchableOpacity>
        </View>

        {/* ── Profile Tabs ── */}
        <View style={styles.profileTabRow}>
          {PROFILE_TABS.map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.profileTabBtn, profileTab === t && styles.profileTabBtnActive]}
              onPress={() => setProfileTab(t)}
            >
              <Text style={[styles.profileTabText, profileTab === t && styles.profileTabTextActive]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Journal Tab Content ── */}
        {profileTab === 'JOURNAL' && (
          <View style={styles.journalSection}>
            {/* Mood */}
            <Text style={styles.moodTitle}>HOW ARE YOU FEELING TODAY?</Text>
            <View style={styles.moodRow}>
              {MOODS.map((m) => (
                <TouchableOpacity
                  key={m.id}
                  style={[styles.moodBtn, selectedMood === m.id && styles.moodBtnActive]}
                  onPress={() => setSelectedMood(m.id)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.moodEmoji}>{m.emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Note Input */}
            <View style={styles.noteCard}>
              <TextInput
                style={styles.noteInput}
                placeholder="What's on your mind today? Or use the mic..."
                placeholderTextColor="rgba(255,255,255,0.3)"
                multiline
                value={journalNote}
                onChangeText={setJournalNote}
              />
              <TouchableOpacity style={styles.micBtn} activeOpacity={0.85}>
                <LinearGradient colors={['#06B6D4', '#0EA5E9']} style={styles.micBtnGrad}>
                  <Ionicons name="mic" size={18} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Buttons */}
            <TouchableOpacity style={styles.saveEntryBtn} activeOpacity={0.7}>
              <Text style={styles.saveEntryText}>SAVE ENTRY</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.generateInsightBtn} activeOpacity={0.85}>
              <Text style={styles.generateInsightText}>GENERATE INSIGHT</Text>
            </TouchableOpacity>

            {/* History */}
            <TouchableOpacity
              style={styles.historyHeader}
              onPress={() => setShowHistory(!showHistory)}
              activeOpacity={0.75}
            >
              <Text style={styles.historyTitle}>HISTORY ({HISTORY_ENTRIES.length})</Text>
              <View style={styles.historyShowRow}>
                <Text style={styles.historyShowText}>SHOW HISTORY</Text>
                <Ionicons name={showHistory ? 'chevron-up' : 'chevron-down'} size={14} color="rgba(255,255,255,0.5)" />
              </View>
            </TouchableOpacity>

            {showHistory && (
              <View style={styles.historyList}>
                {HISTORY_ENTRIES.map((entry, i) => (
                  <View key={i} style={styles.historyEntry}>
                    <Text style={styles.historyMood}>{entry.mood}</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.historyDate}>{entry.date}</Text>
                      <Text style={styles.historyNote}>{entry.note}</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        {/* ── Coach Cards ── */}
        <View style={styles.coachSection}>
          {/* Coach Victor */}
          <View style={styles.coachCard}>
            <LinearGradient colors={['#06B6D4', '#0EA5E9']} style={styles.coachIcon}>
              <Ionicons name="add" size={28} color="#fff" />
            </LinearGradient>
            <View style={{ flex: 1 }}>
              <Text style={styles.coachName}>COACH VICTOR</Text>
              <Text style={styles.coachSub}>READY FOR YOU</Text>
            </View>
            <TouchableOpacity style={styles.coachAddBtn}>
              <Ionicons name="add" size={18} color="rgba(255,255,255,0.7)" />
            </TouchableOpacity>
          </View>

          {/* Longevity OS */}
          <View style={styles.coachCard}>
            <LinearGradient colors={['#A855F7', '#EC4899']} style={styles.coachIcon}>
              <Ionicons name="pulse" size={22} color="#fff" />
            </LinearGradient>
            <View style={{ flex: 1 }}>
              <Text style={styles.coachName}>LONGEVITY OS</Text>
              <Text style={[styles.coachSub, { color: '#A855F7' }]}>OPTIMIZING FOR YOU</Text>
            </View>
            <TouchableOpacity style={styles.coachAddBtn}>
              <Ionicons name="add" size={18} color="rgba(255,255,255,0.7)" />
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Administration ── */}
        <View style={styles.adminSection}>
          <Text style={styles.adminLabel}>ADMINISTRATION</Text>
          <TouchableOpacity style={styles.adminPanelBtn} activeOpacity={0.85}>
            <Text style={styles.adminPanelText}>ADMIN PANEL</Text>
          </TouchableOpacity>
        </View>

        {/* ── Log Out ── */}
        <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.7}>
          <Ionicons name="log-out-outline" size={18} color="rgba(255,255,255,0.5)" />
          <Text style={styles.logoutText}>LOG OUT</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingBottom: 30 },

  /* Header */
  headerCard: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 18,
    paddingTop: 56,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  avatarWrapper: { position: 'relative', width: 72, height: 72 },
  avatarGrad: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(6,182,212,0.4)',
  },
  avatarLetter: { fontSize: 28, fontWeight: '800', color: '#fff', fontFamily: 'Inter_700Bold' },
  avatarCameraBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#1E1E38',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },

  headerInfo: { flex: 1 },
  headerNameRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  headerName: { fontSize: 22, fontWeight: '800', color: '#fff', fontFamily: 'Inter_700Bold', letterSpacing: 1 },
  editBtn: { padding: 4 },
  headerBadgeRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  rankLabel: { fontSize: 12, color: '#06B6D4', fontWeight: '700', fontFamily: 'Inter_700Bold', letterSpacing: 0.5 },
  ptsBadge: { backgroundColor: '#F59E0B', borderRadius: 6, paddingHorizontal: 7, paddingVertical: 2 },
  ptsBadgeText: { fontSize: 11, fontWeight: '800', color: '#000', fontFamily: 'Inter_700Bold' },

  rankRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  rankText: { fontSize: 10, color: Colors.textMuted, fontFamily: 'Inter_400Regular', letterSpacing: 0.5 },
  rankBarBg: { height: 5, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden', marginBottom: 4 },
  rankBarFill: { height: '100%', borderRadius: 3 },
  nextRankText: { fontSize: 11, color: Colors.textMuted, fontFamily: 'Inter_400Regular', textAlign: 'right' },

  /* Stats */
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 14,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#13132A',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
  },
  statLabel: { fontSize: 10, color: Colors.textMuted, letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 6, fontFamily: 'Inter_400Regular' },
  statValue: { fontSize: 18, fontWeight: '800', color: '#fff', fontFamily: 'Inter_700Bold' },

  /* Inner Circle */
  innerCircleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
  },
  innerCircleDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#06B6D4' },
  innerCircleText: { fontSize: 13, fontWeight: '700', color: '#fff', fontFamily: 'Inter_700Bold', letterSpacing: 0.4 },

  /* Language */
  section: { paddingHorizontal: 18, paddingBottom: 16, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)', paddingTop: 16 },
  sectionLabel: { fontSize: 10, color: Colors.textMuted, letterSpacing: 0.8, fontFamily: 'Inter_400Regular', marginBottom: 8, textTransform: 'uppercase' },
  langSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#13132A',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 13,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  langText: { color: '#fff', fontSize: 14, fontFamily: 'Inter_400Regular' },

  /* Profile Tabs */
  profileTabRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  profileTabBtn: { flex: 1, paddingVertical: 14, alignItems: 'center' },
  profileTabBtnActive: { borderBottomWidth: 2, borderBottomColor: '#06B6D4' },
  profileTabText: { fontSize: 12, fontWeight: '700', color: Colors.textMuted, fontFamily: 'Inter_700Bold', letterSpacing: 0.5 },
  profileTabTextActive: { color: '#06B6D4' },

  /* Journal */
  journalSection: { paddingHorizontal: 18, paddingTop: 24, borderTopWidth: 0 },
  moodTitle: { fontSize: 12, color: Colors.textMuted, fontFamily: 'Inter_400Regular', letterSpacing: 0.8, textAlign: 'center', marginBottom: 16, textTransform: 'uppercase' },
  moodRow: { flexDirection: 'row', justifyContent: 'center', gap: 12, marginBottom: 20 },
  moodBtn: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' },
  moodBtnActive: { backgroundColor: 'rgba(6,182,212,0.15)', borderWidth: 1.5, borderColor: '#06B6D4' },
  moodEmoji: { fontSize: 30 },

  noteCard: {
    backgroundColor: '#13132A',
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  noteInput: { flex: 1, color: '#fff', fontSize: 14, fontFamily: 'Inter_400Regular', lineHeight: 22, minHeight: 80 },
  micBtn: { marginTop: 4 },
  micBtnGrad: { width: 38, height: 38, borderRadius: 19, justifyContent: 'center', alignItems: 'center' },

  saveEntryBtn: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 10,
  },
  saveEntryText: { color: Colors.textMuted, fontSize: 13, fontWeight: '700', fontFamily: 'Inter_700Bold', letterSpacing: 1 },

  generateInsightBtn: {
    borderWidth: 1.5,
    borderColor: '#06B6D4',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: 'rgba(6,182,212,0.07)',
  },
  generateInsightText: { color: '#06B6D4', fontSize: 13, fontWeight: '700', fontFamily: 'Inter_700Bold', letterSpacing: 1 },

  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
    marginBottom: 12,
  },
  historyTitle: { fontSize: 12, color: Colors.textMuted, fontFamily: 'Inter_700Bold', letterSpacing: 0.5 },
  historyShowRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  historyShowText: { fontSize: 11, color: Colors.textMuted, fontFamily: 'Inter_400Regular', letterSpacing: 0.5 },
  historyList: { gap: 10, marginBottom: 20 },
  historyEntry: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#13132A',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    alignItems: 'flex-start',
  },
  historyMood: { fontSize: 22 },
  historyDate: { fontSize: 11, color: Colors.textMuted, fontFamily: 'Inter_400Regular', marginBottom: 4 },
  historyNote: { fontSize: 13, color: '#fff', fontFamily: 'Inter_400Regular', lineHeight: 18 },

  /* Coach */
  coachSection: { paddingHorizontal: 18, marginTop: 10, gap: 10 },
  coachCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: '#13132A',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
  },
  coachIcon: { width: 50, height: 50, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  coachName: { fontSize: 15, fontWeight: '800', color: '#fff', fontFamily: 'Inter_700Bold', letterSpacing: 0.5 },
  coachSub: { fontSize: 11, color: '#06B6D4', fontFamily: 'Inter_700Bold', letterSpacing: 0.3, marginTop: 2 },
  coachAddBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },

  /* Admin */
  adminSection: {
    paddingHorizontal: 18,
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
  },
  adminLabel: { fontSize: 10, color: Colors.textMuted, letterSpacing: 0.8, fontFamily: 'Inter_400Regular', textTransform: 'uppercase', marginBottom: 12 },
  adminPanelBtn: {
    backgroundColor: '#0D2D2D',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#06B6D4',
  },
  adminPanelText: { color: '#06B6D4', fontSize: 14, fontWeight: '700', fontFamily: 'Inter_700Bold', letterSpacing: 1 },

  /* Logout */
  logoutBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
  },
  logoutText: { color: 'rgba(255,255,255,0.45)', fontSize: 14, fontFamily: 'Inter_400Regular', letterSpacing: 0.5 },
});
