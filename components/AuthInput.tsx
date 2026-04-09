import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Colors } from '../constants/Colors';

interface AuthInputProps extends TextInputProps {
  icon?: string;
}

export const AuthInput: React.FC<AuthInputProps> = ({
  secureTextEntry,
  ...props
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholderTextColor={Colors.placeholder}
        secureTextEntry={isSecure}
        autoCapitalize="none"
        {...props}
      />
      {secureTextEntry && (
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setIsSecure(!isSecure)}
        >
          <Text style={styles.eyeIcon}>{isSecure ? '👁' : '👁‍🗨'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 14,
  },
  input: {
    width: '100%',
    height: 56,
    backgroundColor: Colors.inputBackground,
    borderRadius: 14,
    paddingHorizontal: 20,
    fontSize: 15,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    fontFamily: 'Inter_400Regular',
    outlineStyle: 'none' as any,
  },
  eyeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  eyeIcon: {
    fontSize: 20,
  },
});
