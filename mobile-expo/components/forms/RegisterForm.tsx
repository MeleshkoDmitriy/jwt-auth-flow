import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthActions } from '@/store/useAuthStore';
import { TRegisterData, TRole } from '@/types';

export const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedRole, setSelectedRole] = useState<TRole>('member');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuthActions();
  const router = useRouter();

  const roles: { value: TRole; label: string }[] = [
    { value: 'member', label: 'User' },
    { value: 'moderator', label: 'Moderator' },
    { value: 'admin', label: 'Administrator' },
  ];

  const handleSubmit = async () => {
    if (!email || !password || !name) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    try {
      await register({ name, email, password, role: selectedRole });
      
      // Redirect to main app after successful registration
      router.replace('/(app)/(tabs)/home');
    } catch (error) {
      Alert.alert(
        'Error',
        error instanceof Error ? error.message : 'Registration failed'
      );
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    router.replace('/(auth)/login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
        autoCorrect={false}
        autoCapitalize="words"
        editable={!isLoading}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCorrect={false}
        autoCapitalize="none"
        editable={!isLoading}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCorrect={false}
        autoCapitalize="none"
        editable={!isLoading}
      />

      <View style={styles.roleContainer}>
        <Text style={styles.roleLabel}>Select Role:</Text>
        <View style={styles.roleButtons}>
          {roles.map((role) => (
            <TouchableOpacity
              key={role.value}
              style={[
                styles.roleButton,
                selectedRole === role.value && styles.roleButtonActive,
              ]}
              onPress={() => setSelectedRole(role.value)}
              disabled={isLoading}
            >
              <Text
                style={[
                  styles.roleButtonText,
                  selectedRole === role.value && styles.roleButtonTextActive,
                ]}
              >
                {role.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.button, isLoading && styles.buttonDisabled]} 
        onPress={handleSubmit}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.switchButton}
        onPress={handleLogin}
        disabled={isLoading}
      >
        <Text style={styles.switchText}>
          Already have an account? Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  roleContainer: {
    marginBottom: 15,
  },
  roleLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  roleButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  roleButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
    marginHorizontal: 4,
  },
  roleButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  roleButtonText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#666',
  },
  roleButtonTextActive: {
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  switchButton: {
    marginTop: 20,
    padding: 10,
  },
  switchText: {
    color: '#007AFF',
    textAlign: 'center',
    fontSize: 14,
  },
});
