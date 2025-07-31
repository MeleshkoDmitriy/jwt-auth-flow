import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { router } from 'expo-router';

export default function ModeratorScreen() {
  const { user } = useAuth();

  const hasModeratorAccess = user?.role === 'moderator' || user?.role === 'admin';

  if (!hasModeratorAccess) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorTitle}>Доступ запрещен</Text>
        <Text style={styles.errorText}>
          У вас нет прав для доступа к этой странице.
        </Text>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Назад</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleModerateContent = () => {
    Alert.alert('Модерация', 'Функция модерации контента');
  };

  const handleReviewReports = () => {
    Alert.alert('Отчеты', 'Просмотр отчетов пользователей');
  };

  const handleManageUsers = () => {
    Alert.alert('Пользователи', 'Управление пользователями');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Панель модератора</Text>
      
      <View style={styles.userInfo}>
        <Text style={styles.userName}>Модератор: {user?.name}</Text>
        <Text style={styles.userRole}>Роль: {user?.role}</Text>
      </View>
      
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleModerateContent}>
          <Text style={styles.actionButtonText}>Модерировать контент</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={handleReviewReports}>
          <Text style={styles.actionButtonText}>Просмотр отчетов</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={handleManageUsers}>
          <Text style={styles.actionButtonText}>Управление пользователями</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.stats}>
        <Text style={styles.statsTitle}>Статистика</Text>
        <Text style={styles.statsText}>Ожидающих модерации: 5</Text>
        <Text style={styles.statsText}>Новых отчетов: 12</Text>
        <Text style={styles.statsText}>Активных пользователей: 150</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 30,
    color: '#333',
  },
  userInfo: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  userRole: {
    fontSize: 16,
    fontWeight: '500',
    color: '#007AFF',
  },
  actions: {
    marginBottom: 30,
  },
  actionButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  actionButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  stats: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  statsText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#666',
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 100,
    marginBottom: 20,
    color: '#FF3B30',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  backButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignSelf: 'center',
  },
  backButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 