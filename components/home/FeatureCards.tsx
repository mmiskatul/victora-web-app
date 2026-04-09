import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function FeatureCards() {
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
        <View style={{ flex: 1 }}>
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
        <View style={{ flex: 1 }}>
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

const styles = StyleSheet.create({
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
});
