import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { AuthInput } from '../../components/AuthInput';
import { AuthButton } from '../../components/AuthButton';
import { GoogleSignInButton } from '../../components/GoogleSignInButton';

const { height } = Dimensions.get('window');

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // TODO: Implement login logic
    console.log('Login:', { email, password });
  };

  const handleGoogleSignIn = () => {
    // TODO: Implement Google sign-in
    console.log('Google Sign In');
  };

  const handleForgotPassword = () => {
    // TODO: Implement forgot password
    console.log('Forgot Password');
  };

  return (
    <ImageBackground
      source={require('../../assets/images/gym-bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <LinearGradient
        colors={[
          'rgba(0,0,0,0.3)',
          'rgba(0,0,0,0.6)',
          'rgba(0,0,0,0.85)',
          'rgba(0,0,0,0.95)',
        ]}
        locations={[0, 0.3, 0.6, 1]}
        style={styles.gradient}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Branding */}
            <View style={styles.brandingContainer}>
              <Text style={styles.brandTitle}>V I C T O R Y</Text>
              <Text style={styles.brandSubtitle}>F I T N E S S</Text>
            </View>

            {/* Heading */}
            <Text style={styles.heading}>WELCOME BACK</Text>
            <Text style={styles.subheading}>Log in to continue</Text>

            {/* Form */}
            <View style={styles.formContainer}>
              <AuthInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoComplete="email"
              />
              <AuthInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoComplete="password"
              />

              <TouchableOpacity
                style={styles.forgotPassword}
                onPress={handleForgotPassword}
              >
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>

              <AuthButton title="Log In" onPress={handleLogin} />
            </View>

            {/* Register Link */}
            <View style={styles.linkContainer}>
              <Text style={styles.linkText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/register')}>
                <Text style={styles.linkHighlight}>Register</Text>
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Google Sign In */}
            <GoogleSignInButton onPress={handleGoogleSignIn} />

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Information for Developers</Text>
              <Text style={styles.footerContact}>
                Problems? Contact support: office@victorakko.com
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gradient: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingTop: height * 0.1,
    paddingBottom: 30,
    alignItems: 'center',
  },
  brandingContainer: {
    alignItems: 'center',
    marginBottom: 28,
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.primary,
    letterSpacing: 8,
    fontFamily: 'Inter_700Bold',
  },
  brandSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    letterSpacing: 6,
    marginTop: 4,
    fontFamily: 'Inter_600SemiBold',
  },
  heading: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.primary,
    letterSpacing: 2,
    marginBottom: 8,
    fontFamily: 'Inter_700Bold',
  },
  subheading: {
    fontSize: 15,
    color: Colors.textSecondary,
    marginBottom: 32,
    fontFamily: 'Inter_400Regular',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 8,
    marginTop: -4,
  },
  forgotPasswordText: {
    fontSize: 13,
    color: Colors.textMuted,
    fontFamily: 'Inter_400Regular',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 24,
  },
  linkText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontFamily: 'Inter_400Regular',
  },
  linkHighlight: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.divider,
  },
  dividerText: {
    paddingHorizontal: 16,
    fontSize: 14,
    color: Colors.textMuted,
    fontFamily: 'Inter_400Regular',
  },
  footer: {
    alignItems: 'center',
    marginTop: 32,
  },
  footerText: {
    fontSize: 12,
    color: Colors.primary,
    marginBottom: 6,
    fontFamily: 'Inter_400Regular',
  },
  footerContact: {
    fontSize: 12,
    color: Colors.textMuted,
    fontFamily: 'Inter_400Regular',
  },
});
