import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { router } from 'expo-router';

export default function AdminScreen() {
  const { user } = useAuth();

  const hasAdminAccess = user?.role === 'admin';

  if (!hasAdminAccess) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorTitle}>Доступ запрещен</Text>
        <Text style={styles.errorText}>
          У вас нет прав администратора для доступа к этой странице.
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

  const handleManageUsers = () => {
    Alert.alert('Пользователи', 'Управление всеми пользователями');
  };

  const handleSystemSettings = () => {
    Alert.alert('Настройки', 'Системные настройки');
  };

  const handleAnalytics = () => {
    Alert.alert('Аналитика', 'Просмотр аналитики');
  };

  const handleBackup = () => {
    Alert.alert('Резервное копирование', 'Создание резервной копии');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Панель администратора</Text>
      
      <View style={styles.userInfo}>
        <Text style={styles.userName}>Администратор: {user?.name}</Text>
        <Text style={styles.userRole}>Роль: {user?.role}</Text>
      </View>
      
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleManageUsers}>
          <Text style={styles.actionButtonText}>Управление пользователями</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={handleSystemSettings}>
          <Text style={styles.actionButtonText}>Системные настройки</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={handleAnalytics}>
          <Text style={styles.actionButtonText}>Аналитика</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={handleBackup}>
          <Text style={styles.actionButtonText}>Резервное копирование</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.stats}>
        <Text style={styles.statsTitle}>Системная статистика</Text>
        <Text style={styles.statsText}>Всего пользователей: 1,250</Text>
        <Text style={styles.statsText}>Активных сессий: 89</Text>
        <Text style={styles.statsText}>Использование сервера: 45%</Text>
        <Text style={styles.statsText}>Последнее обновление: 2 мин назад</Text>
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