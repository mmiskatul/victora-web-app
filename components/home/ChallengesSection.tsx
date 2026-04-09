import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

const { width } = Dimensions.get('window');

type ChallengeCardProps = {
  title: string;
  points: string;
  description: string;
  participants: number;
};

function ChallengeCard({ title, points, description, participants }: ChallengeCardProps) {
  return (
    <View style={styles.challengeCard}>
      <View style={styles.challengeCardHeader}>
        <Text style={styles.challengeCardTitle}>{title}</Text>
        <View style={styles.pointsBadge}>
          <Text style={styles.pointsText}>+{points} Pts.</Text>
        </View>
      </View>

      <View style={styles.activeStatusRow}>
        <View style={styles.activeDot} />
        <Text style={styles.activeText}>ACTIVE</Text>
      </View>

      <Text style={styles.challengeDescription}>{description}</Text>

      <View style={styles.challengeDivider} />

      <View style={styles.challengeFooter}>
        <View style={styles.footerInfo}>
          <View style={styles.participantInfo}>
            <Ionicons name="people-outline" size={16} color={Colors.textMuted} />
            <Text style={styles.footerText}>{participants}</Text>
          </View>
          <TouchableOpacity style={styles.chatAction}>
            <Ionicons name="chatbubble-outline" size={16} color={Colors.textMuted} />
            <Text style={styles.footerText}>Chat</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.cardInviteBtn}>
          <Text style={styles.cardInviteBtnText}>Invite</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const challenges = [
  {
    title: '3-Day Screen-Free Dinner',
    points: '75',
    description: 'Enjoy eating as a family without any digital screens at the table to foster connection.',
    participants: 4,
  },
  {
    title: 'Morning Ritual',
    points: '50',
    description: 'Set a peaceful tone for your day by completing a 10-minute meditation before 8 AM.',
    participants: 12,
  },
];

export default function ChallengesSection() {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>YOUR CHALLENGES</Text>
        <TouchableOpacity style={styles.headerInviteBtn}>
          <Text style={styles.headerInviteBtnText}>Invite Friends</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.challengesScroll}
        snapToInterval={width - 48}
        decelerationRate="fast"
        snapToAlignment="start"
      >
        {challenges.map((c, i) => (
          <ChallengeCard key={i} {...c} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginBottom: 24 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary,
    letterSpacing: 1.5,
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: 'Inter_700Bold',
    textTransform: 'uppercase',
  },
  challengesScroll: { paddingRight: 20, marginBottom: 8 },
  challengeCard: {
    backgroundColor: '#1E1E2E',
    borderRadius: 24,
    padding: 24,
    width: width - 64,
    marginRight: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  challengeCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  challengeCardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
    flex: 1,
  },
  pointsBadge: {
    backgroundColor: '#F59E0B',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginLeft: 8,
  },
  pointsText: { color: '#000', fontSize: 12, fontWeight: '700', fontFamily: 'Inter_700Bold' },
  activeStatusRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginRight: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 8,
  },
  activeText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.2,
    textShadowColor: 'rgba(0, 240, 208, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  challengeDescription: {
    color: Colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
    fontFamily: 'Inter_400Regular',
  },
  challengeDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginBottom: 16,
  },
  challengeFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  footerInfo: { flexDirection: 'row', alignItems: 'center' },
  participantInfo: { flexDirection: 'row', alignItems: 'center', marginRight: 16 },
  chatAction: { flexDirection: 'row', alignItems: 'center' },
  footerText: { color: Colors.textMuted, fontSize: 13, marginLeft: 4 },
  cardInviteBtn: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  cardInviteBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  headerInviteBtn: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  headerInviteBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
});
