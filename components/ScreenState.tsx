import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

type ScreenStateMode = 'loading' | 'error' | 'empty';

type ScreenStateProps = {
  mode: ScreenStateMode;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function ScreenState({ mode, message, actionLabel, onAction }: ScreenStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.iconWrap}>
          {mode === 'loading' ? (
            <ActivityIndicator color={Colors.accentBlue} size="large" />
          ) : (
            <Ionicons
              name={mode === 'error' ? 'alert-circle-outline' : 'document-text-outline'}
              size={30}
              color={mode === 'error' ? Colors.accentDanger : Colors.accentBlue}
            />
          )}
        </View>
        <Text style={styles.message}>{message}</Text>
        {actionLabel && onAction ? (
          <TouchableOpacity style={styles.actionButton} onPress={onAction} activeOpacity={0.85}>
            <Text style={styles.actionButtonText}>{actionLabel}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 28,
    backgroundColor: '#101827',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.04)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  message: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    fontFamily: 'Inter_400Regular',
  },
  actionButton: {
    marginTop: 18,
    minWidth: 132,
    paddingHorizontal: 18,
    paddingVertical: 13,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    color: '#001311',
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
  },
});
