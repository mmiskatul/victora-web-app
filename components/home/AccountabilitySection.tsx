import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

const days = [
  { name: 'MON', active: true },
  { name: 'TUE', active: true },
  { name: 'WED', active: true },
  { name: 'THU', active: true },
  { name: 'FRI', active: true },
  { name: 'SAT', active: false },
  { name: 'SUN', active: false },
];

export default function AccountabilitySection() {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.accountabilityTitle}>Accountability</Text>
        <View style={styles.accountabilityIcons}>
          <Ionicons name="chatbubble-outline" size={24} color={Colors.primary} />
          <Ionicons name="add" size={24} color={Colors.textMuted} style={{ marginLeft: 16 }} />
        </View>
      </View>

      <View style={styles.accountabilityCard}>
        <View style={styles.accountabilityTopRow}>
          <View style={styles.streakWrapper}>
            <View style={styles.streakAddBtn}>
              <Ionicons name="add" size={24} color="#FF4D4D" />
            </View>
            <View style={{ marginLeft: 16 }}>
              <Text style={styles.streakSub}>STREAK</Text>
              <Text style={styles.streakVal}>0 Days</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.atRiskBtn} activeOpacity={0.8}>
            <Text style={styles.atRiskText}>STREAK AT RISK!</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.milestoneContainer}>
          <View style={styles.milestoneTextRow}>
            <Text style={styles.milestoneLabel}>NEXT MILESTONE: 3 DAYS</Text>
            <Text style={styles.milestonePercent}>0%</Text>
          </View>
          <View style={styles.dividerSubtle} />
          <View style={styles.modernProgressBg}>
            <View style={[styles.modernProgressFill, { width: '0%' }]} />
          </View>
        </View>

        <View style={styles.modernDaysRow}>
          {days.map((d, i) => (
            <View key={i} style={styles.modernDayItem}>
              <Text style={[styles.modernDayLabel, d.active && { color: Colors.primary }]}>
                {d.name}
              </Text>
              <View style={[styles.modernDayDot, d.active && styles.modernDayDotActive]} />
            </View>
          ))}
        </View>

        <View style={styles.championsBannerPill}>
          <View style={styles.avatarStack}>
            <View style={[styles.avatarMini, { backgroundColor: '#444' }]} />
            <View style={[styles.avatarMini, { backgroundColor: '#666', marginLeft: -8 }]} />
            <View style={[styles.avatarMini, { backgroundColor: '#888', marginLeft: -8 }]} />
          </View>
          <Text style={styles.championsBannerText}>
            <Text style={{ color: Colors.primary, fontWeight: '700' }}>1,270</Text> CHAMPIONS TRAINING TODAY
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  accountabilityTitle: { fontSize: 24, fontWeight: '800', color: Colors.primary, fontFamily: 'Inter_700Bold' },
  accountabilityIcons: { flexDirection: 'row', alignItems: 'center' },
  accountabilityCard: {
    backgroundColor: '#1E2530',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  accountabilityTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  streakWrapper: { flexDirection: 'row', alignItems: 'center' },
  streakAddBtn: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#2A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 77, 77, 0.2)',
  },
  streakSub: { color: Colors.textMuted, fontSize: 12, fontWeight: '700', letterSpacing: 1 },
  streakVal: { color: '#fff', fontSize: 10, fontWeight: '800', fontFamily: 'Inter_700Bold' },
  atRiskBtn: {
    backgroundColor: '#FF3B30',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: '#FF3B30',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 8,
  },
  atRiskText: { color: '#fff', fontSize: 12, fontWeight: '900', letterSpacing: 1, fontFamily: 'Inter_700Bold' },
  milestoneContainer: { marginBottom: 24 },
  milestoneTextRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  dividerSubtle: { height: 1, backgroundColor: 'rgba(255,255,255,0.06)', marginVertical: 16 },
  milestoneLabel: { color: Colors.textMuted, fontSize: 12, fontWeight: '600', letterSpacing: 0.5 },
  milestonePercent: { color: Colors.primary, fontSize: 14, fontWeight: '700' },
  modernProgressBg: { height: 8, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 4, overflow: 'hidden' },
  modernProgressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  modernDaysRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  modernDayItem: { alignItems: 'center' },
  modernDayLabel: { color: Colors.textMuted, fontSize: 11, fontWeight: '700', marginBottom: 8 },
  modernDayDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: 'rgba(255,255,255,0.1)' },
  modernDayDotActive: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 4,
  },
  championsBannerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 16,
    padding: 12,
    justifyContent: 'center',
  },
  avatarStack: { flexDirection: 'row', marginRight: 12 },
  avatarMini: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: '#151528' },
  championsBannerText: { color: Colors.textSecondary, fontSize: 12, fontWeight: '500' },
});
