import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import { Colors } from '../constants/Colors';

interface AuthButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  loading?: boolean;
}

export const AuthButton: React.FC<AuthButtonProps> = ({
  title,
  onPress,
  style,
  loading = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.85}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color={Colors.background} />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 56,
    backgroundColor: Colors.primary,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.background,
    fontFamily: 'Inter_700Bold',
    letterSpacing: 0.5,
  },
});
