import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../../constants/Colors';
import VictoryHeader from '../../components/VictoryHeader';
import GreetingCard from '../../components/home/GreetingCard';
import FeatureCards from '../../components/home/FeatureCards';
import MoodSection from '../../components/home/MoodSection';
import WorkoutSection from '../../components/home/WorkoutSection';
import ChallengesSection from '../../components/home/ChallengesSection';
import AccountabilitySection from '../../components/home/AccountabilitySection';
import InviteFriendsCard from '../../components/home/InviteFriendsCard';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <VictoryHeader />
        <GreetingCard />
        <FeatureCards />
        <MoodSection />
        <WorkoutSection />
        <ChallengesSection />
        {/* <AccountabilitySection /> */}
        <InviteFriendsCard />
        <View style={{ height: 20 }} />
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
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
  },
});
