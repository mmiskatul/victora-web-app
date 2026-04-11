import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  TextInput,
  Image,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";

const ADMIN_TABS = [
  { id: "dashboard", label: "Dashboard" },
  { id: "workouts", label: "Workouts" },
  { id: "challenges", label: "Challenges" },
  { id: "users", label: "Users" },
  { id: "applications", label: "Applications" },
  { id: "masterclass", label: "Masterclass" },
  { id: "notifications", label: "Notifications" },
  { id: "community", label: "Community" },
];

const WORKOUTS_DATA = [
  {
    id: "740268228",
    title: "10 Reps Workout #01",
    tag: "Ohne Gewichten",
    duration: "22 min",
    image: require("../../assets/w1.jpg"),
    level: "Beginner",
  },
  {
    id: "1166036905",
    title: "Legends Never Die",
    tag: "General",
    duration: "20 min",
    image: require("../../assets/w2.jpg"),
    level: "Advanced",
  },
  {
    id: "1163955086",
    title: "Unstoppable Force",
    tag: "Explosiveness",
    duration: "24 min",
    image: require("../../assets/w3.jpg"),
    level: "Expert",
  },
  {
    id: "1166035222",
    title: "The Foundation",
    tag: "General",
    duration: "20 min",
    image: require("../../assets/w4.jpg"),
    level: "Beginner",
  },
  {
    id: "1166035223",
    title: "Mountain Climber Elite",
    tag: "Endurance",
    duration: "18 min",
    image: require("../../assets/w5.jpg"),
    level: "Intermediate",
  },
  {
    id: "1166035224",
    title: "Victory Sprint",
    tag: "HIIT",
    duration: "15 min",
    image: require("../../assets/w6.jpg"),
    level: "Advanced",
  },
];

const RECENT_ACTIVITIES = [
  {
    id: "1",
    user: "Zane Tanner",
    action: "completed '10 Reps Workout'",
    time: "5 mins ago",
    icon: "fitness",
    color: Colors.accentBlue,
  },
  {
    id: "2",
    user: "Thomas Buck",
    action: "joined the community",
    time: "2 hours ago",
    icon: "person-add",
    color: "#10B981",
  },
  {
    id: "3",
    user: "Admin",
    action: "published new Challenge 'Gratitude Ritual'",
    time: "5 hours ago",
    icon: "trophy",
    color: Colors.accentGold,
  },
  {
    id: "4",
    user: "System",
    action: "sent Broadcast 'Weekly Motivation' to All Tiers",
    time: "1 day ago",
    icon: "megaphone",
    color: "#F472B6",
  },
];

export default function AdminPanel() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");

  const renderDashboard = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.statsGrid}>
        {[
          { label: "Total Users", value: "6", icon: "people-outline" },
          {
            label: "Workouts This Week",
            value: "0",
            icon: "swap-horizontal-outline",
          },
          {
            label: "Challenge Completions",
            value: "0",
            icon: "trophy-outline",
          },
          {
            label: "Vimeo API Status",
            value: "OK",
            icon: "checkmark-circle-outline",
          },
        ].map((stat) => (
          <View key={stat.label} style={styles.statCard}>
            <View style={styles.statIconWrap}>
              <Ionicons
                name={stat.icon as any}
                size={24}
                color="rgba(255,255,255,0.6)"
              />
            </View>
            <View style={styles.statInfo}>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
            </View>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Recent Activity</Text>
      <View style={styles.activityList}>
        {RECENT_ACTIVITIES.map((activity) => (
          <View key={activity.id} style={styles.activityCard}>
            <View
              style={[
                styles.activityIconWrap,
                { backgroundColor: `${activity.color}15` },
              ]}
            >
              <Ionicons
                name={activity.icon as any}
                size={20}
                color={activity.color}
              />
            </View>
            <View style={styles.activityInfo}>
              <Text style={styles.activityText}>
                <Text style={styles.activityUser}>{activity.user}</Text>{" "}
                {activity.action}
              </Text>
              <Text style={styles.activityTime}>{activity.time}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  const renderWorkouts = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.subHeader}>
        <View>
          <Text style={styles.subTitle}>Workout Library ({WORKOUTS_DATA.length})</Text>
          <Text style={styles.subCaption}>Manage your vimeo-synced sessions</Text>
        </View>
        <TouchableOpacity style={styles.syncBtn}>
          <Ionicons name="sync-outline" size={18} color="#000" />
          <Text style={styles.syncBtnText}>Sync Library</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardList}>
        {WORKOUTS_DATA.map((workout) => (
          <View key={workout.id} style={styles.workoutCard}>
            <Image source={workout.image} style={styles.thumbnailImage} />
            <View style={styles.cardMain}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardTitle}>{workout.title}</Text>
                <View style={[styles.levelBadge, { backgroundColor: workout.level === 'Beginner' ? '#10B98120' : workout.level === 'Advanced' ? '#F59E0B20' : '#EF444420' }]}>
                  <Text style={[styles.levelText, { color: workout.level === 'Beginner' ? '#10B981' : workout.level === 'Advanced' ? '#F59E0B' : '#EF4444' }]}>{workout.level}</Text>
                </View>
              </View>
              
              <View style={styles.tagRow}>
                <View style={styles.tagBadge}>
                  <Text style={styles.tagText}>{workout.tag}</Text>
                </View>
                <Text style={styles.durationText}>{workout.duration}</Text>
              </View>
              
              <View style={styles.cardActionRow}>
                <Text style={styles.idLabel}>ID: {workout.id}</Text>
                <View style={styles.miniButtons}>
                  <TouchableOpacity style={styles.miniBtn}>
                    <Ionicons name="stats-chart-outline" size={14} color="rgba(255,255,255,0.4)" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.miniBtn}>
                    <Ionicons name="pencil-outline" size={14} color="rgba(255,255,255,0.4)" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.deleteBtnSmall}>
                    <Ionicons name="trash-outline" size={14} color="#EF444490" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  const renderChallenges = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.subHeader}>
        <Text style={styles.subTitle}>Challenges (51)</Text>
        <TouchableOpacity style={styles.addBtn}>
          <Ionicons name="add" size={20} color="#000" />
          <Text style={styles.addBtnText}>Add Challenge</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardList}>
        {[
          {
            id: "en-challenge-f-01",
            title: "3-Day Screen-Free Dinner",
            pts: "75 Pts",
            days: "3 Days",
            desc: "Eating as a family without screens at the table",
          },
          {
            id: "en-challenge-c-01",
            title: "Gratitude Ritual",
            pts: "75 Pts",
            days: "3 Days",
            desc: "For 3 days, write down 3 things that made your day special each evening.",
          },
        ].map((challenge) => (
          <View key={challenge.id} style={styles.challengeCard}>
            <View style={styles.challengeHeader}>
              <Text style={styles.cardTitle}>{challenge.title}</Text>
              <View style={styles.ptsBadge}>
                <Text style={styles.ptsText}>{challenge.pts}</Text>
              </View>
            </View>
            <View style={styles.challengeSub}>
              <Ionicons
                name="trophy-outline"
                size={14}
                color="rgba(255,255,255,0.4)"
              />
              <Text style={styles.daysText}>{challenge.days}</Text>
            </View>
            <Text style={styles.challengeDesc}>{challenge.desc}</Text>
            <View style={styles.divider} />
            <View style={styles.challengeFooter}>
              <Text style={styles.idText}>ID: {challenge.id}</Text>
              <View style={styles.actionRow}>
                <TouchableOpacity style={styles.miniAction}>
                  <Ionicons
                    name="pencil-outline"
                    size={16}
                    color="rgba(255,255,255,0.4)"
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.miniAction}>
                  <Ionicons
                    name="add"
                    size={16}
                    color="rgba(255,255,255,0.4)"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  const renderUsers = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.subTitle}>User Database (6 / 6)</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search name or email..."
          placeholderTextColor="rgba(255,255,255,0.2)"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.filterRow}>
        <View style={styles.filterBox}>
          <Text style={styles.filterText}>All Tiers</Text>
          <Ionicons name="chevron-down" size={16} color="#fff" />
        </View>
      </View>

      <View style={styles.userTable}>
        <View style={styles.tableHeader}>
          <Ionicons name="square-outline" size={18} color="#fff" />
          <Text style={[styles.headerText, { flex: 1, marginLeft: 20 }]}>
            NAME
          </Text>
          <Text style={styles.headerText}>EMAIL</Text>
        </View>

        {[
          {
            name: "Zane Tanner",
            initial: "Z",
            id: "0XKe1ieBZjevgwprtpAg... ",
            email: "bizu@ma...",
            pts: "0 Pts",
          },
          {
            name: "Thomas Buck",
            initial: "T",
            id: "H0eeZZGudV0YrPt3ble...",
            email: "kaxijed19...",
            pts: "0 Pts",
          },
          {
            name: "Admin",
            initial: "A",
            id: "RqKkVDoSToDAFp2rdNHEG...",
            email: "office@v...",
            pts: "115 Pts",
          },
        ].map((user) => (
          <View key={user.name} style={styles.userRow}>
            <Ionicons name="square-outline" size={18} color="#fff" />
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{user.initial}</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userId}>{user.id}</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.userEmail}>{user.email}</Text>
              <View
                style={[
                  styles.ptsBadgeMini,
                  {
                    backgroundColor:
                      user.pts === "0 Pts"
                        ? "rgba(245,158,11,0.2)"
                        : Colors.accentGold,
                  },
                ]}
              >
                <Ionicons name="pulse-outline" size={12} color="#000" />
                <Text style={styles.ptsTextMini}>{user.pts}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard();
      case "workouts":
        return renderWorkouts();
      case "challenges":
        return renderChallenges();
      case "users":
        return renderUsers();
      default:
        return (
          <ScrollView
            style={styles.tabContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Send Tier Broadcast Card */}
            <View style={styles.broadcastCard}>
              <View style={styles.broadcastHeader}>
                <Ionicons
                  name="radio-outline"
                  size={24}
                  color={Colors.accentBlue}
                />
                <Text style={styles.broadcastTitle}>Send Tier Broadcast</Text>
              </View>

              <Text style={styles.inputLabel}>TARGET TIER</Text>
              <View style={styles.dropdownBox}>
                <Text style={styles.dropdownText}>All Users (Global)</Text>
                <Ionicons name="chevron-down" size={16} color="#fff" />
              </View>

              <View style={styles.mediaRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.inputLabel}>PHOTO</Text>
                  <TouchableOpacity style={styles.mediaBtn}>
                    <Ionicons name="image-outline" size={20} color="#fff" />
                    <Text style={styles.mediaBtnText}>Add</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.inputLabel}>VIDEO</Text>
                  <TouchableOpacity style={styles.mediaBtn}>
                    <Ionicons name="add" size={20} color="#fff" />
                    <Text style={styles.mediaBtnText}>Add</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <Text style={styles.inputLabel}>MESSAGE CONTENT</Text>
              <View style={styles.textAreaContainer}>
                <TextInput
                  style={styles.textArea}
                  placeholder="Share tips, notes, or announcements with this tier..."
                  placeholderTextColor="rgba(255,255,255,0.3)"
                  multiline
                />
              </View>

              <TouchableOpacity style={styles.sendBtn} disabled>
                <Text style={styles.sendBtnText}>Send Broadcast to Tier</Text>
              </TouchableOpacity>
            </View>

            {/* Recent Community Activity */}
            <View style={styles.activityHeader}>
              <Text style={styles.sectionTitle}>Recent Community Activity</Text>
              <TouchableOpacity style={styles.manageBtn}>
                <Text style={styles.manageBtnText}>Manage Posts</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.communityActivityList}>
              {[
                {
                  name: "Admin",
                  time: "26/03/2026, 13:37:27",
                  tier: "ALL",
                  msg: "🏆 Challenge 'Kindness Sprint' gemeistert! Ein super Gefühl, das Ziel zu erreichen. Wer ist als nächstes dran? #ChallengeAccepted",
                },
                {
                  name: "Admin",
                  time: "26/03/2026, 01:16:05",
                  tier: "ALL",
                  msg: "how are you",
                },
              ].map((post, idx) => (
                <View key={idx} style={styles.activityPostCard}>
                  <View style={styles.postHeader}>
                    <View style={styles.postAvatar}>
                      <Text style={styles.postAvatarText}>
                        {post.name.charAt(0)}
                      </Text>
                    </View>
                    <View style={{ flex: 1, marginLeft: 12 }}>
                      <View style={styles.postTitleRow}>
                        <Text style={styles.postName}>{post.name}</Text>
                        <Text style={styles.postTime}>{post.time}</Text>
                        <View style={styles.postTierBadge}>
                          <Text style={styles.postTierText}>{post.tier}</Text>
                        </View>
                      </View>
                      <Text style={styles.postMessage}>{post.msg}</Text>
                    </View>
                    <Ionicons
                      name="add"
                      size={18}
                      color="rgba(255,255,255,0.3)"
                    />
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        );
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Admin Panel</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backLink}>Back to App →</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsScroll}
        >
          {ADMIN_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                style={[styles.tabItem, isActive && styles.activeTabItem]}
                onPress={() => setActiveTab(tab.id)}
              >
                <Text
                  style={[styles.tabLabel, isActive && styles.activeTabLabel]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <View style={styles.tabUnderlineTrack}>
          <View
            style={[
              styles.tabUnderline,
              {
                width: 100,
                transform: [
                  {
                    translateX:
                      ADMIN_TABS.findIndex((t) => t.id === activeTab) * 50,
                  },
                ],
              },
            ]}
          />
        </View>
      </View>

      <View style={styles.mainContainer}>{renderTabContent()}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#0D0D0D",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 28,
    fontFamily: "Inter_900Black",
    fontWeight: "900",
  },
  backLink: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
  },
  tabsContainer: {
    marginBottom: 10,
  },
  tabsScroll: {
    paddingHorizontal: 16,
    gap: 12,
  },
  tabItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  activeTabItem: {
    backgroundColor: Colors.accentBlue,
  },
  tabLabel: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 14,
    fontFamily: "Inter_700Bold",
  },
  activeTabLabel: {
    color: "#000",
  },
  tabUnderlineTrack: {
    height: 3,
    backgroundColor: "rgba(255,255,255,0.05)",
    marginTop: 10,
  },
  tabUnderline: {
    height: 3,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  mainContainer: {
    flex: 1,
  },
  tabContent: {
    padding: 20,
  },
  statsGrid: {
    gap: 12,
    marginBottom: 40,
  },
  statCard: {
    backgroundColor: "#1A1A2E",
    borderRadius: 16,
    padding: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  statIconWrap: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.03)",
    justifyContent: "center",
    alignItems: "center",
  },
  statInfo: {
    flex: 1,
  },
  statLabel: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 4,
  },
  statValue: {
    color: "#fff",
    fontSize: 32,
    fontFamily: "Inter_800ExtraBold",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 24,
    fontFamily: "Inter_800ExtraBold",
    marginBottom: 20,
  },
  activityList: {
    gap: 12,
    marginBottom: 40,
  },
  activityCard: {
    backgroundColor: "#1A1A2E",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.02)",
  },
  activityIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  activityInfo: {
    flex: 1,
  },
  activityText: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 14,
    fontFamily: "Inter_500Medium",
    lineHeight: 20,
  },
  activityUser: {
    color: "#fff",
    fontFamily: "Inter_700Bold",
  },
  activityTime: {
    color: "rgba(255,255,255,0.2)",
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    marginTop: 2,
  },
  subHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  subTitle: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Inter_800ExtraBold",
  },
  syncBtn: {
    backgroundColor: Colors.accentBlue,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  syncBtnText: {
    color: "#000",
    fontSize: 13,
    fontFamily: "Inter_800ExtraBold",
  },
  subCaption: {
    color: "rgba(255,255,255,0.3)",
    fontSize: 12,
    fontFamily: "Inter_500Medium",
    marginTop: 2,
  },
  cardList: {
    gap: 16,
    marginBottom: 40,
  },
  workoutCard: {
    backgroundColor: "#1A1A2E",
    borderRadius: 16,
    padding: 12,
    flexDirection: "row",
    gap: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.02)",
  },
  thumbnailImage: {
    width: 110,
    height: 110,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.03)",
  },
  cardMain: {
    flex: 1,
    justifyContent: "space-between",
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardTitle: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "Inter_700Bold",
    flex: 1,
    marginRight: 8,
  },
  levelBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  levelText: {
    fontSize: 9,
    fontFamily: "Inter_800ExtraBold",
    textTransform: "uppercase",
  },
  cardActionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  idLabel: {
    color: "rgba(255,255,255,0.2)",
    fontSize: 10,
    fontFamily: "Inter_400Regular",
  },
  miniButtons: {
    flexDirection: "row",
    gap: 8,
  },
  miniBtn: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.03)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  deleteBtnSmall: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: "rgba(239,68,68,0.05)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(239,68,68,0.1)",
  },
  addBtn: {
    backgroundColor: Colors.accentBlue,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  addBtnText: {
    color: "#000",
    fontSize: 13,
    fontFamily: "Inter_800ExtraBold",
  },
  challengeCard: {
    backgroundColor: "#1A1A2E",
    borderRadius: 16,
    padding: 24,
  },
  challengeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  ptsBadge: {
    backgroundColor: Colors.accentGold,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ptsText: {
    color: "#000",
    fontSize: 10,
    fontFamily: "Inter_900Black",
  },
  challengeSub: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  daysText: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 13,
    fontFamily: "Inter_500Medium",
  },
  challengeDesc: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
    marginBottom: 16,
  },
  challengeFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionRow: {
    flexDirection: "row",
    gap: 16,
  },
  miniAction: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: "rgba(255,255,255,0.03)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  searchContainer: {
    marginTop: 20,
    marginBottom: 12,
  },
  searchInput: {
    backgroundColor: "#161622",
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 16,
    color: "#fff",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  filterRow: {
    marginBottom: 24,
  },
  filterBox: {
    backgroundColor: "#161622",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  filterText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
  },
  userTable: {
    backgroundColor: "#161622",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 40,
  },
  broadcastCard: {
    backgroundColor: "#1A1A2E",
    borderRadius: 16,
    padding: 24,
    marginBottom: 40,
  },
  broadcastHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 24,
  },
  broadcastTitle: {
    color: Colors.accentBlue,
    fontSize: 22,
    fontFamily: "Inter_800ExtraBold",
  },
  inputLabel: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 12,
    fontFamily: "Inter_800ExtraBold",
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  dropdownBox: {
    backgroundColor: "#161622",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 52,
    borderRadius: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    marginBottom: 20,
  },
  dropdownText: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "Inter_500Medium",
  },
  mediaRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 20,
  },
  mediaBtn: {
    backgroundColor: "#161622",
    height: 44,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  mediaBtnText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
  },
  textAreaContainer: {
    backgroundColor: "#161622",
    borderRadius: 10,
    padding: 16,
    height: 140,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    marginBottom: 24,
  },
  textArea: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "Inter_500Medium",
    textAlignVertical: "top",
  },
  sendBtn: {
    backgroundColor: "rgba(255,255,255,0.08)",
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  sendBtnText: {
    color: "rgba(255,255,255,0.2)",
    fontSize: 15,
    fontFamily: "Inter_700Bold",
  },
  activityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  manageBtn: {
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  manageBtnText: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 12,
    fontFamily: "Inter_700Bold",
  },
  communityActivityList: {
    gap: 12,
    marginBottom: 40,
  },
  activityPostCard: {
    backgroundColor: "#1A1A2E",
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.02)",
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  postAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.accentBlue,
    justifyContent: "center",
    alignItems: "center",
  },
  postAvatarText: {
    color: "#000",
    fontSize: 18,
    fontFamily: "Inter_900Black",
  },
  postTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
    marginBottom: 4,
  },
  postName: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Inter_800ExtraBold",
  },
  postTime: {
    color: "rgba(255,255,255,0.3)",
    fontSize: 11,
    fontFamily: "Inter_400Regular",
  },
  postTierBadge: {
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  postTierText: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 10,
    fontFamily: "Inter_800ExtraBold",
  },
  postMessage: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "Inter_600SemiBold",
  },
  tableHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(255,255,255,0.03)",
  },
  headerText: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 12,
    fontFamily: "Inter_800ExtraBold",
    letterSpacing: 1,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.02)",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.accentBlue,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 16,
  },
  avatarText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "Inter_900Black",
  },
  userName: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "Inter_700Bold",
    marginBottom: 2,
  },
  userId: {
    color: "rgba(255,255,255,0.2)",
    fontSize: 10,
    fontFamily: "Inter_400Regular",
  },
  userEmail: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 12,
    marginBottom: 6,
  },
  ptsBadgeMini: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  ptsTextMini: {
    color: "#000",
    fontSize: 10,
    fontFamily: "Inter_900Black",
  },
});
