import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

const { width } = Dimensions.get('window');
const cardWidth = (width - 28 * 2 - 12) / 2;

// ── Greeting Card ──────────────────────────────────────────────
function GreetingCard() {
  return (
    <View style={styles.greetingSection}>
      <Text style={styles.greetingText}>
        Good morning, <Text style={styles.greetingName}>Admin</Text>
      </Text>
      <View style={styles.quoteBox}>
        <Text style={styles.quoteText}>
          WISDOM LISTENS <Text style={{ color: Colors.textSecondary }}>BEFORE IT LEADS.</Text>
        </Text>
        <Text style={styles.quoteAuthor}>- Victor Akko</Text>
      </View>
    </View>
  );
}

// ── Feature Cards ──────────────────────────────────────────────
function FeatureCards() {
  return (
    <View style={styles.featureContainer}>
      {/* Coach Victor */}
      <LinearGradient
        colors={['#00F0D0', '#00BAFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.featureCardFull}
      >
        <View style={styles.featureIconCircle}>
          <Ionicons name="add" size={24} color="#fff" />
        </View>
        <View>
          <Text style={styles.featureTitle}>COACH VICTOR</Text>
          <Text style={styles.featureDesc}>
            Your AI companion for motivation, advice, and feedback.
          </Text>
          <TouchableOpacity style={styles.featureAction}>
            <Text style={styles.featureLink}>Start Chat +</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Nutrition */}
      <LinearGradient
        colors={['#BF19FF', '#197BFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.featureCardFull, { marginTop: 16 }]}
      >
        <View style={styles.featureIconCircle}>
          <MaterialCommunityIcons name="silverware-fork-knife" size={20} color="#fff" />
        </View>
        <View>
          <Text style={styles.featureTitle}>NUTRITION</Text>
          <Text style={styles.featureDesc}>
            Personalized nutrition plans and recipes for your goals.
          </Text>
          <TouchableOpacity style={styles.featureAction}>
            <Text style={styles.featureLink}>View Plan +</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

// ── Quick Action Icons ─────────────────────────────────────────
function QuickActions() {
  const actions = [
    { icon: 'home-outline' as const, label: 'Home' },
    { icon: 'barbell-outline' as const, label: 'Workout' },
    { icon: 'chatbubble-outline' as const, label: 'Chat' },
    { icon: 'book-outline' as const, label: 'Journal' },
    { icon: 'person-outline' as const, label: 'Profile' },
  ];

  return (
    <View style={styles.quickActionsRow}>
      {actions.map((a, i) => (
        <TouchableOpacity key={i} style={styles.quickActionItem}>
          <Ionicons name={a.icon} size={22} color={Colors.textMuted} />
        </TouchableOpacity>
      ))}
    </View>
  );
}

// ── Mood / Journal Section ─────────────────────────────────────
function MoodSection() {
  const emojis = ['😡', '😟', '😐', '😊', '🤩'];

  return (
    <View style={styles.moodSection}>
      <View style={styles.moodHeader}>
        <View style={styles.moodBubble}>
          <Text style={styles.moodBubbleText}>tomorrow?</Text>
        </View>
        <TouchableOpacity style={styles.journalButton}>
          <Text style={styles.journalButtonText}>Write in Journal</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.moodQuestion}>How are you feeling right now?</Text>
      <View style={styles.emojiRow}>
        {emojis.map((e, i) => (
          <TouchableOpacity key={i} style={styles.emojiItem}>
            <Text style={styles.emojiText}>{e}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// ── Workout Section ────────────────────────────────────────────
function WorkoutSection() {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>NEXT UP: YOUR WORKOUT</Text>
      <View style={styles.workoutCard}>
        <Text style={styles.workoutHeading}>NO PLAN? NO PROBLEM.</Text>
        <Text style={styles.workoutDesc}>
          Choose your path to victory. Which plan will you start?
        </Text>
        <TouchableOpacity style={styles.workoutBtnPrimary}>
          <Text style={styles.workoutBtnPrimaryText}>7-DAY VIDEO PLAN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.workoutBtnOutline}>
          <Text style={styles.workoutBtnOutlineText}>CUSTOM STRENGTH PLAN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ── Challenges Section ─────────────────────────────────────────
function ChallengesSection() {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>YOUR CHALLENGES</Text>
        <TouchableOpacity style={styles.inviteFriendsBtnSmall}>
          <Text style={styles.inviteFriendsBtnTextSmall}>Invite Friends</Text>
        </TouchableOpacity>
      </View>

      {/* Challenge Table */}
      <View style={styles.challengeTable}>
        <View style={styles.challengeRow}>
           <Text style={[styles.challengeCell, { flex: 0.2, color: Colors.textMuted }]}>#</Text>
          <Text style={[styles.challengeCell, { color: Colors.textMuted }]}>table</Text>
          <Text style={[styles.challengeCell, { flex: 0.3 }]}></Text>
        </View>
        
        <View style={styles.challengeRow}>
          <View style={{ flex: 0.2 }}>
             <Ionicons name="home" size={16} color={Colors.primary} />
          </View>
          <Text style={styles.challengeCell}>Op Club</Text>
          <TouchableOpacity style={styles.challengeInviteBtn}>
            <Text style={styles.challengeInviteBtnText}>invite</Text>
          </TouchableOpacity>
        </View>

         <View style={[styles.challengeRow, { borderBottomWidth: 0 }]}>
          <View style={{ flex: 0.2 }}>
             <Ionicons name="barbell" size={16} color={Colors.textMuted} />
          </View>
          <Text style={styles.challengeCell}>Champions League</Text>
          <TouchableOpacity style={[styles.challengeInviteBtn, { backgroundColor: '#333' }]}>
            <Text style={[styles.challengeInviteBtnText, { color: '#fff' }]}>join</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// ── Accountability / Streak Section ────────────────────────────
function AccountabilitySection() {
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const completedDays = [true, true, false, true, true, false, false];

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.accountabilityTitle}>Accountability</Text>
        <View style={styles.accountabilityIcons}>
          <Ionicons name="chatbox" size={20} color={Colors.primary} />
          <Ionicons name="add" size={20} color={Colors.textSecondary} style={{ marginLeft: 10 }} />
        </View>
      </View>
      
      <View style={styles.streakCard}>
        <View style={styles.streakTopRow}>
          <View style={styles.streakInfo}>
            <View style={styles.streakIconCircle}>
              <Ionicons name="add" size={16} color="#fff" />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.streakLabel}>STREAK</Text>
              <Text style={styles.streakDays}>3 Days</Text>
            </View>
          </View>
          <View style={styles.streakRiskBadge}>
            <Text style={styles.streakRiskText}>STREAK AT RISK!</Text>
          </View>
        </View>

        <View style={styles.milestoneRow}>
          <Text style={styles.milestoneLabel}>NEXT MILESTONE: 7 DAYS</Text>
          <Text style={styles.milestonePercent}>43%</Text>
        </View>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: '43%' }]} />
        </View>

        <View style={styles.daysRow}>
          {days.map((d, i) => (
            <View key={i} style={styles.dayItem}>
              <Text style={[styles.dayLabel, completedDays[i] && styles.dayLabelActive]}>
                {d}
              </Text>
              <View
                style={[
                  styles.dayDot,
                  completedDays[i] && styles.dayDotActive,
                ]}
              />
            </View>
          ))}
        </View>

        <View style={styles.championsRow}>
           <Text style={styles.championsText}>
            🏆🏆🏆 <Text style={{ color: Colors.primary }}>1,246</Text> CHAMPIONS TRAINING TODAY
          </Text>
        </View>
      </View>
    </View>
  );
}

// ── Invite Friends Card ────────────────────────────────────────
function InviteFriendsCard() {
  return (
    <LinearGradient
      colors={['#2D1B4E', '#1A1A3E']}
      style={styles.inviteCard}
    >
      <View style={styles.invitePointsBadge}>
        <Text style={styles.invitePointsText}>+100 Pts</Text>
      </View>
      <View style={styles.inviteIconCircle}>
        <FontAwesome5 name="users" size={20} color="#8B5CF6" />
      </View>
      <Text style={styles.inviteHeading}>Don't train alone!</Text>
      <Text style={styles.inviteDesc}>
        Bring your friends to Victory Fitness. Motivate each other and earn points for the next rank.
      </Text>
      <TouchableOpacity style={styles.inviteBtn}>
        <Text style={styles.inviteBtnText}>Invite Friends</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

// ── Main Home Screen ───────────────────────────────────────────
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.brandTitle}>V I C T O R Y</Text>
          <Text style={styles.brandSubtitle}>F I T N E S S</Text>
        </View>

        <GreetingCard />
        <FeatureCards />
        <QuickActions />
        <MoodSection />
        <WorkoutSection />
        <ChallengesSection />
        <AccountabilitySection />
        <InviteFriendsCard />

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

// ── Styles ─────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 20,
  },

  /* Header */
  header: {
    alignItems: 'center',
    marginBottom: 24,
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

  /* Greeting Section */
  greetingSection: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
  },
  greetingText: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Inter_400Regular',
    marginBottom: 12,
  },
  greetingName: {
    color: Colors.primary,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
  },
  quoteBox: {
    marginTop: 8,
  },
  quoteText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    lineHeight: 32,
    fontFamily: 'Inter_700Bold',
    textTransform: 'uppercase',
  },
  quoteAuthor: {
    fontSize: 14,
    color: Colors.textMuted,
    marginTop: 12,
    textAlign: 'right',
    fontFamily: 'Inter_400Regular',
  },

  /* Feature Cards */
  featureContainer: {
    marginBottom: 20,
  },
  featureCardFull: {
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 140,
  },
  featureIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 1,
    marginBottom: 4,
    fontFamily: 'Inter_700Bold',
  },
  featureDesc: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 18,
    marginBottom: 12,
    maxWidth: width * 0.6,
    fontFamily: 'Inter_400Regular',
  },
  featureAction: {
    alignSelf: 'flex-start',
  },
  featureLink: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
  },

  /* Quick Actions */
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#151528',
    borderRadius: 20,
    paddingVertical: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  quickActionItem: {
    padding: 8,
  },

  /* Mood */
  moodSection: {
    marginBottom: 24,
  },
  moodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  moodBubble: {
    backgroundColor: '#1E1E1E',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  moodBubbleText: {
    color: Colors.textSecondary,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  journalButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
    flex: 1,
    marginLeft: 12,
    alignItems: 'center',
  },
  journalButtonText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
  },
  moodQuestion: {
    color: Colors.textSecondary,
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'Inter_400Regular',
  },
  emojiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emojiItem: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  emojiText: {
    fontSize: 24,
  },

  /* Workout */
  section: {
    marginBottom: 24,
  },
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
    fontFamily: 'Inter_700Bold',
    textTransform: 'uppercase',
  },
  workoutCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  workoutHeading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'Inter_700Bold',
    textTransform: 'uppercase',
  },
  workoutDesc: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
    fontFamily: 'Inter_400Regular',
  },
  workoutBtnPrimary: {
    width: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  workoutBtnPrimaryText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 1,
    fontFamily: 'Inter_700Bold',
  },
  workoutBtnOutline: {
    width: '100%',
    backgroundColor: '#333',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  workoutBtnOutlineText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 1,
    fontFamily: 'Inter_700Bold',
  },

  /* Challenges */
  inviteFriendsBtnSmall: {
    backgroundColor: '#4C86FF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  inviteFriendsBtnTextSmall: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
  },
  challengeTable: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  challengeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  challengeCell: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  challengeInviteBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  challengeInviteBtnText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
  },

  /* Accountability */
  accountabilityTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    fontFamily: 'Inter_700Bold',
  },
  accountabilityIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  streakTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  streakInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  streakLabel: {
    color: Colors.textMuted,
    fontSize: 11,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  },
  streakNumber: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  streakDays: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
  },
  streakRiskBadge: {
    backgroundColor: '#FF3B5C',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  streakRiskText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
  },
  milestoneRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  milestoneLabel: {
    color: Colors.textMuted,
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
  },
  milestonePercent: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
  },
  progressBarBg: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    marginBottom: 20,
  },
  progressBarFill: {
    height: 6,
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  dayItem: {
    alignItems: 'center',
  },
  dayLabel: {
    color: Colors.textMuted,
    fontSize: 10,
    fontFamily: 'Inter_400Regular',
    marginBottom: 8,
  },
  dayLabelActive: {
    color: Colors.primary,
  },
  dayDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  dayDotActive: {
    backgroundColor: Colors.primary,
  },
  championsRow: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
  },
  championsText: {
    color: Colors.textMuted,
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Inter_400Regular',
  },

  /* Invite Friends Card */
  inviteCard: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
  },
  invitePointsBadge: {
    backgroundColor: '#FFD700',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: 'flex-end',
    position: 'absolute',
    top: 20,
    right: 20,
  },
  invitePointsText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 11,
    fontFamily: 'Inter_700Bold',
  },
  inviteIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  inviteHeading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 10,
    fontFamily: 'Inter_700Bold',
  },
  inviteDesc: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
    fontFamily: 'Inter_400Regular',
  },
  inviteBtn: {
    backgroundColor: '#4C86FF',
    borderRadius: 12,
    paddingHorizontal: 40,
    paddingVertical: 16,
    width: '100%',
    alignItems: 'center',
  },
  inviteBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
    fontFamily: 'Inter_700Bold',
  },
});
