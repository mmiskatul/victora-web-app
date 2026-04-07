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
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';

const { width } = Dimensions.get('window');

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


// ── Mood / Journal Section ─────────────────────────────────────
function MoodSection() {
  const router = useRouter();
  const emojis = ['😡', '😟', '😐', '😊', '🤩'];

  return (
    <View style={styles.moodCard}>
      <Text style={styles.moodTitle}>Your Mindful Moment</Text>
      <Text style={styles.moodSubtitle}>
        What is one thing you will do for your well-being tomorrow?
      </Text>

      <TouchableOpacity
        style={styles.journalActionBtn}
        onPress={() => router.push('/journal')}
      >
        <Text style={styles.journalActionText}>Write in Journal</Text>
      </TouchableOpacity>

      <View style={styles.moodDivider} />

      <Text style={styles.moodPromptText}>How are you feeling right now?</Text>
      <View style={styles.moodEmojiRow}>
        {emojis.map((e, i) => (
          <TouchableOpacity key={i} style={styles.moodEmojiBtn}>
            <Text style={styles.moodEmojiText}>{e}</Text>
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
function ChallengeCard({ title, points, description, participants }: { title: string, points: string, description: string, participants: number }) {
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

      <Text style={styles.challengeDescription}>
        {description}
      </Text>

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

function ChallengesSection() {
  const challenges = [
    {
      title: "3-Day Screen-Free Dinner",
      points: "75",
      description: "Enjoy eating as a family without any digital screens at the table to foster connection.",
      participants: 4,
    },
    {
      title: "Morning Ritual",
      points: "50",
      description: "Set a peaceful tone for your day by completing a 10-minute meditation before 8 AM.",
      participants: 12,
    }
  ];

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

// ── Accountability / Streak Section ────────────────────────────
function AccountabilitySection() {
  const days = [
    { name: 'MON', active: true },
    { name: 'TUE', active: true },
    { name: 'WED', active: true },
    { name: 'THU', active: true },
    { name: 'FRI', active: true },
    { name: 'SAT', active: false },
    { name: 'SUN', active: false },
  ];

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

// ── Invite Friends Card ────────────────────────────────────────
function InviteFriendsCard() {
  return (
    <LinearGradient
      colors={['#6C3DE8', '#3730A3']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.premiumInviteCard}
    >
      <View style={styles.inviteTopRow}>
        <View style={styles.inviteFriendsIcon}>
          <Ionicons name="people-outline" size={28} color="rgba(255,255,255,0.85)" />
        </View>
        <View style={styles.goldBadge}>
          <Text style={styles.goldBadgeText}>+100 Pts</Text>
        </View>
      </View>

      <Text style={styles.premiumInviteTitle}>Don't train alone!</Text>
      <Text style={styles.premiumInviteDesc}>
        Bring your friends to Victory Fitness. Motivate each other and earn points for the next rank.
      </Text>

      <TouchableOpacity style={styles.premiumInviteBtn} activeOpacity={0.85}>
        <Text style={styles.premiumInviteBtnText}>Invite Friends</Text>
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

  /* Mood Card */
  moodCard: {
    backgroundColor: '#151528',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  moodTitle: {
    color: Colors.primary,
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
    marginBottom: 12,
  },
  moodSubtitle: {
    color: Colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
    fontFamily: 'Inter_400Regular',
    marginBottom: 24,
  },
  journalActionBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  journalActionText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
  },
  moodDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginBottom: 20,
  },
  moodPromptText: {
    color: Colors.textMuted,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Inter_400Regular',
  },
  moodEmojiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  moodEmojiBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moodEmojiText: {
    fontSize: 28,
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
    paddingTop: 10,
    paddingBottom: 10,
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

  /* Challenges Redesign */
  challengesScroll: {
    paddingRight: 20,
    marginBottom: 8,
  },
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
  pointsText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
  },
  activeStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
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
  challengeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  participantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  chatAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    color: Colors.textMuted,
    fontSize: 13,
    marginLeft: 4,
  },
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
  cardInviteBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },
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
  headerInviteBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },

  /* Accountability Redesign */
  accountabilityTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.primary,
    fontFamily: 'Inter_700Bold',
  },
  accountabilityIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
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
  accountabilityTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  streakWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
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
  streakSub: {
    color: Colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  streakVal: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'Inter_700Bold',
  },
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
  atRiskText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
    fontFamily: 'Inter_700Bold',
  },
  milestoneContainer: {
    marginBottom: 24,
  },
  milestoneTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  dividerSubtle: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    marginVertical: 16,
  },
  milestoneLabel: {
    color: Colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  milestonePercent: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  modernProgressBg: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  modernProgressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  modernDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  modernDayItem: {
    alignItems: 'center',
  },
  modernDayLabel: {
    color: Colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 8,
  },
  modernDayDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
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
  avatarStack: {
    flexDirection: 'row',
    marginRight: 12,
  },
  avatarMini: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#151528',
  },
  championsBannerText: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: '500',
  },

  /* Premium Invite Card */
  premiumInviteCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    overflow: 'hidden',
  },
  inviteTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  inviteFriendsIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  goldBadge: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  goldBadgeText: {
    color: '#000',
    fontSize: 13,
    fontWeight: '800',
  },
  premiumInviteTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 10,
    fontFamily: 'Inter_700Bold',
  },
  premiumInviteDesc: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 21,
    marginBottom: 20,
    fontFamily: 'Inter_400Regular',
  },
  premiumInviteBtn: {
    backgroundColor: '#4F8EF7',
    borderRadius: 14,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#4F8EF7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  premiumInviteBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
    fontFamily: 'Inter_700Bold',
  },
});
