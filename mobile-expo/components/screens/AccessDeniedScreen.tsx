import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface AccessDeniedScreenProps {
  requiredRole?: 'admin' | 'moderator';
  message?: string;
}

const { width, height } = Dimensions.get('window');

export const AccessDeniedScreen: React.FC<AccessDeniedScreenProps> = ({ 
  requiredRole = 'admin',
  message 
}) => {
  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'admin':
        return 'administrator';
      case 'moderator':
        return 'moderator';
      default:
        return 'this page';
    }
  };

  const getDefaultMessage = () => {
    if (message) return message;
    
    return `You don't have ${getRoleDisplayName(requiredRole)} rights to access this page.`;
  };

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(app)/(tabs)/home');
    }
  };

  const handleGoHome = () => {
    router.replace('/(app)/(tabs)/home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="close" size={80} color="#FF3B30" />
        </View>

        <Text style={styles.title}>Access Denied</Text>

        <Text style={styles.description}>
          {getDefaultMessage()}
        </Text>

        <View style={styles.infoContainer}>
          <Ionicons name="information-circle" size={20} color="#007AFF" />
          <Text style={styles.infoText}>
            Contact the system administrator to obtain the necessary access rights.
          </Text>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <Ionicons name="arrow-back" size={20} color="white" />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.homeButton} onPress={handleGoHome}>
            <Ionicons name="home" size={20} color="#007AFF" />
            <Text style={styles.homeButtonText}>Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    maxWidth: width * 0.9,
  },
  iconContainer: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#FFF5F5',
    borderRadius: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F0F8FF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 30,
    maxWidth: width * 0.8,
  },
  infoText: {
    fontSize: 14,
    color: '#007AFF',
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
  },
  backButton: {
    flex: 1,
    backgroundColor: '#FF3B30',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF3B30',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  homeButton: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default AccessDeniedScreen;
