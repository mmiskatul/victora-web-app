import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

const pts = 105;
const nextRankPts = 500;
const progressFraction = pts / nextRankPts;

const STATS = [
  { label: 'Workouts', value: '12', icon: '🏋️' },
  { label: 'Streak', value: '0d', icon: '🔥' },
  { label: 'Points', value: '105', icon: '⚡' },
  { label: 'Rank', value: 'Recruit', icon: '🎖️' },
];

const MENU_SECTIONS = [
  {
    title: 'Account',
    items: [
      { icon: 'person-outline', label: 'Edit Profile', tint: '#4F8EF7' },
      { icon: 'lock-closed-outline', label: 'Privacy & Security', tint: '#A855F7' },
      // { icon: 'notifications-outline', label: 'Notifications', tint: '#F59E0B' },
      { icon: 'language-outline', label: 'Language', tint: '#22C55E', value: 'English' },
      { icon: 'help-circle-outline', label: 'Help & Support', tint: '#8B5CF6' },
    ],
  },
  {
    title: 'Fitness',
    items: [
      { icon: 'barbell-outline', label: 'Workout', tint: '#06B6D4' },
      { icon: 'restaurant-outline', label: 'Nutrition', tint: '#F97316' },
      { icon: 'body-outline', label: 'Journal', tint: '#EC4899' },
    ],
  }
];

export default function ProfileScreen() {
  const [notificationsOn, setNotificationsOn] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* ── Brand Header ── */}
        <View style={styles.brandHeader}>
          <Text style={styles.brandTitle}>V I C T O R Y</Text>
          <Text style={styles.brandSub}>F I T N E S S</Text>
        </View>

        {/* ── Hero Profile Card ── */}
        <LinearGradient
          colors={['#1A1A3E', '#0D0D20']}
          style={styles.heroCard}
        >
          {/* Avatar */}
          <View style={styles.avatarWrap}>
            <LinearGradient colors={['#06B6D4', '#0EA5E9']} style={styles.avatarGrad}>
              <Text style={styles.avatarLetter}>A</Text>
            </LinearGradient>
            <View style={styles.rankRingOuter}>
              <LinearGradient
                colors={['#06B6D4', '#A855F7']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.rankRingGrad}
              />
            </View>
            <TouchableOpacity style={styles.cameraBtn}>
              <Ionicons name="camera-outline" size={13} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Name & Badge */}
          <Text style={styles.heroName}>Admin</Text>
          <View style={styles.heroBadgeRow}>
            <View style={styles.rankBadge}>
              <Text style={styles.rankBadgeText}>🎖️ RECRUIT</Text>
            </View>
            <View style={styles.ptsBadge}>
              <Text style={styles.ptsBadgeText}>⚡ {pts} PTS</Text>
            </View>
          </View>

          {/* Rank Progress */}
          <View style={styles.rankProgressWrap}>
            <View style={styles.rankProgressLabels}>
              <Text style={styles.rankProgressLabel}>RECRUIT</Text>
              <Text style={styles.rankProgressLabel}>{nextRankPts - pts} pts to WARRIOR</Text>
            </View>
            <View style={styles.rankBarBg}>
              <LinearGradient
                colors={['#06B6D4', '#A855F7']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.rankBarFill, { width: `${progressFraction * 100}%` as any }]}
              />
            </View>
          </View>

          {/* Inner Circle Pill */}
          {/* <View style={styles.innerCirclePill}>
            <View style={styles.innerDot} />
            <Text style={styles.innerCircleText}>INNER CIRCLE SUBSCRIPTION</Text>
          </View> */}
        </LinearGradient>

        {/* ── Stats Grid ── */}
        <View style={styles.statsGrid}>
          {STATS.map((s) => (
            <View key={s.label} style={styles.statCell}>
              <Text style={styles.statEmoji}>{s.icon}</Text>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* ── Body Metrics ── */}
        <View style={styles.metricsCard}>
          <Text style={styles.metricsTitle}>BODY METRICS</Text>
          <View style={styles.metricsRow}>
            {[
              { label: 'Age', value: '--', unit: 'yrs' },
              { label: 'Height', value: '--', unit: 'cm' },
              { label: 'Weight', value: '--', unit: 'kg' },
              { label: 'Gender', value: '--', unit: '' },
            ].map((m) => (
              <View key={m.label} style={styles.metricItem}>
                <Text style={styles.metricValue}>{m.value}<Text style={styles.metricUnit}>{m.unit}</Text></Text>
                <Text style={styles.metricLabel}>{m.label}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.updateMetricsBtn} activeOpacity={0.8}>
            <Text style={styles.updateMetricsText}>Update Metrics</Text>
            <Ionicons name="chevron-forward" size={15} color="#06B6D4" />
          </TouchableOpacity>
        </View>

        {/* ── Preferences Toggles ── */}
        {/* <View style={styles.togglesCard}>
          <Text style={styles.sectionTitle}>PREFERENCES</Text>
          <View style={styles.toggleRow}>
            <View style={styles.toggleLeft}>
              <View style={[styles.toggleIcon, { backgroundColor: 'rgba(245,158,11,0.15)' }]}>
                <Ionicons name="notifications-outline" size={18} color="#F59E0B" />
              </View>
              <Text style={styles.toggleLabel}>Push Notifications</Text>
            </View>
            <Switch
              value={notificationsOn}
              onValueChange={setNotificationsOn}
              trackColor={{ false: '#1E1E38', true: '#06B6D4' }}
              thumbColor="#fff"
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.toggleRow}>
            <View style={styles.toggleLeft}>
              <View style={[styles.toggleIcon, { backgroundColor: 'rgba(168,85,247,0.15)' }]}>
                <Ionicons name="moon-outline" size={18} color="#A855F7" />
              </View>
              <Text style={styles.toggleLabel}>Dark Mode</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#1E1E38', true: '#A855F7' }}
              thumbColor="#fff"
            />
          </View>
        </View> */}

        {/* ── Coach Cards ── */}
        <View style={styles.coachSection}>
          <Text style={styles.sectionTitle}>MY COACHES</Text>
          <View style={styles.coachCard}>
            <LinearGradient colors={['#06B6D4', '#0EA5E9']} style={styles.coachIconWrap}>
              <Ionicons name="add" size={26} color="#fff" />
            </LinearGradient>
            <View style={{ flex: 1 }}>
              <Text style={styles.coachName}>COACH VICTOR</Text>
              <Text style={styles.coachStatus}>🟢 Ready for you</Text>
            </View>
            <TouchableOpacity style={styles.coachArrow}>
              <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.4)" />
            </TouchableOpacity>
          </View>
          <View style={styles.coachCard}>
            <LinearGradient colors={['#A855F7', '#EC4899']} style={styles.coachIconWrap}>
              <Ionicons name="pulse" size={22} color="#fff" />
            </LinearGradient>
            <View style={{ flex: 1 }}>
              <Text style={styles.coachName}>LONGEVITY OS</Text>
              <Text style={[styles.coachStatus, { color: '#A855F7' }]}>⚡ Optimizing for you</Text>
            </View>
            <TouchableOpacity style={styles.coachArrow}>
              <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.4)" />
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Menu Sections ── */}
        {MENU_SECTIONS.map((section) => (
          <View key={section.title} style={styles.menuSection}>
            <Text style={styles.sectionTitle}>{section.title.toUpperCase()}</Text>
            <View style={styles.menuCard}>
              {section.items.map((item, i) => (
                <View key={item.label}>
                  <TouchableOpacity style={styles.menuRow} activeOpacity={0.7}>
                    <View style={[styles.menuIconWrap, { backgroundColor: `${item.tint}20` }]}>
                      <Ionicons name={item.icon as any} size={18} color={item.tint} />
                    </View>
                    <Text style={styles.menuLabel}>{item.label}</Text>
                    <View style={styles.menuRight}>
                      {item.value && <Text style={styles.menuValue}>{item.value}</Text>}
                      <Ionicons name="chevron-forward" size={16} color="rgba(255,255,255,0.25)" />
                    </View>
                  </TouchableOpacity>
                  {i < section.items.length - 1 && <View style={styles.divider} />}
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* ── Administration ── */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>ADMINISTRATION</Text>
          <TouchableOpacity style={styles.adminBtn} activeOpacity={0.85}>
            <LinearGradient
              colors={['rgba(6,182,212,0.15)', 'rgba(6,182,212,0.05)']}
              style={styles.adminBtnGrad}
            >
              <Ionicons name="shield-checkmark-outline" size={20} color="#06B6D4" />
              <Text style={styles.adminBtnText}>ADMIN PANEL</Text>
              <Ionicons name="chevron-forward" size={16} color="#06B6D4" style={{ marginLeft: 'auto' }} />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* ── Log Out ── */}
        <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.7}>
          <Ionicons name="log-out-outline" size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Victory Fitness v1.0.0</Text>
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingBottom: 30 },

  /* Brand Header */
  brandHeader: { alignItems: 'center', paddingTop: 52, paddingBottom: 16 },
  brandTitle: { fontSize: 24, fontWeight: '700', color: '#fff', letterSpacing: 8, fontFamily: 'Inter_700Bold' },
  brandSub: { fontSize: 12, fontWeight: '600', color: '#fff', letterSpacing: 6, marginTop: 4, fontFamily: 'Inter_600SemiBold' },

  /* Hero Card */
  heroCard: {
    marginHorizontal: 16,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(6,182,212,0.15)',
    marginBottom: 16,
  },
  avatarWrap: { position: 'relative', width: 88, height: 88, marginBottom: 16 },
  avatarGrad: {
    width: 88,
    height: 88,
    borderRadius: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarLetter: { fontSize: 36, fontWeight: '800', color: '#fff', fontFamily: 'Inter_700Bold' },
  rankRingOuter: {
    position: 'absolute',
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    borderRadius: 50,
    padding: 3,
    overflow: 'hidden',
  },
  rankRingGrad: {
    flex: 1,
    borderRadius: 50,
    opacity: 0.5,
  },
  cameraBtn: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#1E1E38',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(6,182,212,0.4)',
  },
  heroName: { fontSize: 26, fontWeight: '800', color: '#fff', fontFamily: 'Inter_700Bold', letterSpacing: 1, marginBottom: 10 },
  heroBadgeRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  rankBadge: { backgroundColor: 'rgba(6,182,212,0.15)', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5, borderWidth: 1, borderColor: 'rgba(6,182,212,0.3)' },
  rankBadgeText: { color: '#06B6D4', fontSize: 12, fontWeight: '700', fontFamily: 'Inter_700Bold', letterSpacing: 0.5 },
  ptsBadge: { backgroundColor: 'rgba(245,158,11,0.15)', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5, borderWidth: 1, borderColor: 'rgba(245,158,11,0.3)' },
  ptsBadgeText: { color: '#F59E0B', fontSize: 12, fontWeight: '700', fontFamily: 'Inter_700Bold', letterSpacing: 0.5 },

  rankProgressWrap: { width: '100%', marginBottom: 16 },
  rankProgressLabels: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  rankProgressLabel: { fontSize: 10, color: Colors.textMuted, fontFamily: 'Inter_400Regular', letterSpacing: 0.5 },
  rankBarBg: { height: 6, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 4, overflow: 'hidden' },
  rankBarFill: { height: '100%', borderRadius: 4 },

  innerCirclePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(6,182,212,0.08)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: 'rgba(6,182,212,0.2)',
  },
  innerDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#06B6D4' },
  innerCircleText: { fontSize: 11, fontWeight: '700', color: '#06B6D4', fontFamily: 'Inter_700Bold', letterSpacing: 0.5 },

  /* Stats */
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 16,
  },
  statCell: {
    flex: 1,
    backgroundColor: '#13132A',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    gap: 4,
  },
  statEmoji: { fontSize: 20, marginBottom: 2 },
  statValue: { fontSize: 16, fontWeight: '800', color: '#fff', fontFamily: 'Inter_700Bold' },
  statLabel: { fontSize: 9, color: Colors.textMuted, fontFamily: 'Inter_400Regular', letterSpacing: 0.4, textTransform: 'uppercase' },

  /* Body Metrics */
  metricsCard: {
    marginHorizontal: 16,
    backgroundColor: '#13132A',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    marginBottom: 16,
  },
  metricsTitle: { fontSize: 11, color: Colors.textMuted, fontFamily: 'Inter_700Bold', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 16 },
  metricsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  metricItem: { alignItems: 'center', flex: 1 },
  metricValue: { fontSize: 22, fontWeight: '800', color: '#fff', fontFamily: 'Inter_700Bold' },
  metricUnit: { fontSize: 11, color: Colors.textMuted },
  metricLabel: { fontSize: 10, color: Colors.textMuted, fontFamily: 'Inter_400Regular', marginTop: 4, textTransform: 'uppercase', letterSpacing: 0.4 },
  updateMetricsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
  },
  updateMetricsText: { color: '#06B6D4', fontSize: 13, fontWeight: '700', fontFamily: 'Inter_700Bold' },

  /* Toggles */
  togglesCard: {
    marginHorizontal: 16,
    backgroundColor: '#13132A',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    marginBottom: 16,
  },
  toggleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 4 },
  toggleLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  toggleIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  toggleLabel: { fontSize: 14, color: '#fff', fontFamily: 'Inter_400Regular' },

  /* Coach */
  coachSection: { marginHorizontal: 16, marginBottom: 16 },
  coachCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: '#13132A',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    marginBottom: 10,
  },
  coachIconWrap: { width: 50, height: 50, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  coachName: { fontSize: 14, fontWeight: '800', color: '#fff', fontFamily: 'Inter_700Bold', letterSpacing: 0.5 },
  coachStatus: { fontSize: 11, color: '#06B6D4', fontFamily: 'Inter_400Regular', marginTop: 3 },
  coachArrow: { padding: 4 },

  /* Menu */
  menuSection: { marginHorizontal: 16, marginBottom: 16 },
  menuCard: {
    backgroundColor: '#13132A',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    overflow: 'hidden',
  },
  menuRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 14 },
  menuIconWrap: { width: 34, height: 34, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  menuLabel: { flex: 1, fontSize: 14, color: '#fff', fontFamily: 'Inter_400Regular' },
  menuRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  menuValue: { fontSize: 13, color: Colors.textMuted, fontFamily: 'Inter_400Regular' },

  /* Section Title */
  sectionTitle: { fontSize: 11, color: Colors.textMuted, fontFamily: 'Inter_700Bold', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 10 },

  /* Divider */
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.05)', marginHorizontal: 16 },

  /* Admin */
  adminBtn: { borderRadius: 14, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(6,182,212,0.3)' },
  adminBtnGrad: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 16 },
  adminBtnText: { color: '#06B6D4', fontSize: 14, fontWeight: '700', fontFamily: 'Inter_700Bold', letterSpacing: 1 },

  /* Logout */
  logoutBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 16,
    marginTop: 8,
    paddingVertical: 16,
    backgroundColor: 'rgba(239,68,68,0.08)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.2)',
  },
  logoutText: { color: '#EF4444', fontSize: 15, fontWeight: '700', fontFamily: 'Inter_700Bold' },

  versionText: { textAlign: 'center', color: Colors.textMuted, fontSize: 11, fontFamily: 'Inter_400Regular', marginTop: 16, letterSpacing: 0.4 },
});
