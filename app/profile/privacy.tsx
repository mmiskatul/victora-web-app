import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

export default function PrivacyScreen() {
  const router = useRouter();

  const [toggles, setToggles] = React.useState({
    privateProfile: false,
    showActivity: true,
    dataSharing: true,
    biometrics: false,
  });

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ 
        headerShown: true, 
        title: 'PRIVACY & SECURITY',
        headerTransparent: true,
        headerTintColor: '#fff',
        headerTitleStyle: { fontFamily: 'Inter_700Bold', fontSize: 16, letterSpacing: 2 } as any,
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 8 }}>
            <Ionicons name="chevron-back" size={28} color="#fff" />
          </TouchableOpacity>
        ),
      }} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>VISIBILITY</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <View style={styles.rowLeft}>
                <Ionicons name="eye-off-outline" size={20} color="#fff" />
                <View style={styles.rowText}>
                  <Text style={styles.rowLabel}>Private Profile</Text>
                  <Text style={styles.rowSub}>Only approved followers see your activity</Text>
                </View>
              </View>
              <Switch 
                value={toggles.privateProfile}
                onValueChange={(v) => setToggles({...toggles, privateProfile: v})}
                trackColor={{ false: '#333', true: Colors.accentBlue }}
              />
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <View style={styles.rowLeft}>
                <Ionicons name="stats-chart-outline" size={20} color="#fff" />
                <View style={styles.rowText}>
                  <Text style={styles.rowLabel}>Show Daily Activity</Text>
                  <Text style={styles.rowSub}>Share your workout streaks with champions</Text>
                </View>
              </View>
              <Switch 
                value={toggles.showActivity}
                onValueChange={(v) => setToggles({...toggles, showActivity: v})}
                trackColor={{ false: '#333', true: Colors.accentBlue }}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SECURITY</Text>
          <View style={styles.card}>
            <TouchableOpacity style={styles.row}>
              <View style={styles.rowLeft}>
                <Ionicons name="finger-print-outline" size={20} color="#fff" />
                <Text style={styles.rowLabel}>Biometric Unlock</Text>
              </View>
              <Switch 
                value={toggles.biometrics}
                onValueChange={(v) => setToggles({...toggles, biometrics: v})}
                trackColor={{ false: '#333', true: Colors.accentBlue }}
              />
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.row}>
              <View style={styles.rowLeft}>
                <Ionicons name="shield-outline" size={20} color="#A855F7" />
                <Text style={styles.rowLabel}>Two-Factor Authentication</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="rgba(255,255,255,0.2)" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>LEGAL</Text>
          <View style={styles.card}>
            <TouchableOpacity style={styles.row}>
              <Text style={styles.rowLabel}>Terms of Service</Text>
              <Ionicons name="open-outline" size={16} color="rgba(255,255,255,0.2)" />
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.row}>
              <Text style={styles.rowLabel}>Privacy Policy</Text>
              <Ionicons name="open-outline" size={16} color="rgba(255,255,255,0.2)" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.deleteBtn}>
          <Text style={styles.deleteText}>Delete Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131313',
  },
  scrollContent: {
    paddingTop: 100,
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
    letterSpacing: 1.5,
    marginBottom: 12,
    marginLeft: 8,
  },
  card: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  rowText: {
    flex: 1,
  },
  rowLabel: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  },
  rowSub: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginHorizontal: 16,
  },
  deleteBtn: {
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 8,
  },
  deleteText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
    opacity: 0.8,
  },
});
