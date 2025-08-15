import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function ModeratorScreen() {
  const pendingItems = [
    { id: 1, type: 'Comment', content: 'This comment needs review...', time: '5 min ago' },
    { id: 2, type: 'Post', content: 'New post awaiting approval', time: '12 min ago' },
    { id: 3, type: 'Report', content: 'User reported for spam', time: '25 min ago' },
  ];

  const stats = [
    { label: 'Pending Reviews', value: 8, color: '#ffc107' },
    { label: 'Approved Today', value: 23, color: '#28a745' },
    { label: 'Rejected Today', value: 3, color: '#dc3545' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <FontAwesome name="users" size={32} color="#007AFF" />
        <Text style={styles.title}>Moderator Panel</Text>
        <Text style={styles.subtitle}>Content Moderation & Community Management</Text>
      </View>

      <View style={styles.statsRow}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pending Reviews</Text>
        {pendingItems.map((item) => (
          <TouchableOpacity key={item.id} style={styles.pendingItem}>
            <View style={styles.itemHeader}>
              <View style={styles.itemType}>
                <FontAwesome 
                  name={item.type === 'Comment' ? 'comment' : item.type === 'Post' ? 'file-text' : 'flag'} 
                  size={16} 
                  color="#007AFF" 
                />
                <Text style={styles.typeText}>{item.type}</Text>
              </View>
              <Text style={styles.itemTime}>{item.time}</Text>
            </View>
            <Text style={styles.itemContent}>{item.content}</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={[styles.actionButton, styles.approveButton]}>
                <FontAwesome name="check" size={16} color="white" />
                <Text style={styles.buttonText}>Approve</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, styles.rejectButton]}>
                <FontAwesome name="times" size={16} color="white" />
                <Text style={styles.buttonText}>Reject</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  statsRow: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  pendingItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemType: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
    marginLeft: 8,
  },
  itemTime: {
    fontSize: 12,
    color: '#666',
  },
  itemContent: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 15,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 6,
    marginHorizontal: 5,
  },
  approveButton: {
    backgroundColor: '#28a745',
  },
  rejectButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 6,
  },
});
