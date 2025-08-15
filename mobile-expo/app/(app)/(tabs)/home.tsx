import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuthActions, useAuthStore } from '@/store/useAuthStore';
import { FontAwesome } from '@expo/vector-icons';

export default function HomeScreen() {
  const { user } = useAuthStore();
  const { logout } = useAuthActions();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome name="home" size={32} color="#007AFF" />
        <Text style={styles.title}>Welcome Home!</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.greeting}>
          Hello, {user?.name || 'User'}! 👋
        </Text>
        <Text style={styles.description}>
          Your role: {user?.role || 'unknown'}
        </Text>
        
        <Text style={styles.description}>
          This is your main dashboard. Here you can see all your important information.
        </Text>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <FontAwesome name="star" size={24} color="#FFD700" />
            <Text style={styles.statNumber}>42</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
          
          <View style={styles.statCard}>
            <FontAwesome name="trophy" size={24} color="#FF6B35" />
            <Text style={styles.statNumber}>7</Text>
            <Text style={styles.statLabel}>Achievements</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <FontAwesome name="sign-out" size={20} color="white" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  content: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 30,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  logoutText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
});
