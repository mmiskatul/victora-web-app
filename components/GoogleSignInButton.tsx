import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Colors } from '../constants/Colors';

interface GoogleSignInButtonProps {
  onPress: () => void;
}

export const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.googleG}>G</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: Colors.googleButton,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: Colors.inputBorder,
  },
  iconContainer: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleG: {
    fontSize: 22,
    fontWeight: '700',
    color: '#4285F4',
  },
});
