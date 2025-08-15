import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { RoleGuard } from "@/components";

export default function AdminScreen() {
  const adminActions = [
    {
      icon: "users" as const,
      title: "Manage Users",
      count: 156,
      color: "#007AFF",
    },
    {
      icon: "cog" as const,
      title: "System Settings",
      count: 12,
      color: "#28a745",
    },
    {
      icon: "database" as const,
      title: "Database",
      count: 8,
      color: "#ffc107",
    },
    { icon: "shield" as const, title: "Security", count: 3, color: "#dc3545" },
  ];

  return (
    <RoleGuard requiredRole="admin">
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <FontAwesome name="shield" size={32} color="#dc3545" />
          <Text style={styles.title}>Admin Panel</Text>
          <Text style={styles.subtitle}>System Administration & Control</Text>
        </View>

        <View style={styles.statsGrid}>
          {adminActions.map((action, index) => (
            <TouchableOpacity key={index} style={styles.actionCard}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: action.color },
                ]}
              >
                <FontAwesome name={action.icon} size={24} color="white" />
              </View>
              <Text style={styles.actionTitle}>{action.title}</Text>
              <Text style={styles.actionCount}>{action.count}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activities</Text>
          <View style={styles.activityItem}>
            <FontAwesome name="user-plus" size={16} color="#28a745" />
            <Text style={styles.activityText}>New user registered</Text>
            <Text style={styles.activityTime}>2 min ago</Text>
          </View>
          <View style={styles.activityItem}>
            <FontAwesome
              name="exclamation-triangle"
              size={16}
              color="#ffc107"
            />
            <Text style={styles.activityText}>System warning detected</Text>
            <Text style={styles.activityTime}>15 min ago</Text>
          </View>
          <View style={styles.activityItem}>
            <FontAwesome name="check-circle" size={16} color="#28a745" />
            <Text style={styles.activityText}>Backup completed</Text>
            <Text style={styles.activityTime}>1 hour ago</Text>
          </View>
        </View>
      </ScrollView>
    </RoleGuard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    alignItems: "center",
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 20,
    justifyContent: "space-between",
  },
  actionCard: {
    width: "48%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 5,
  },
  actionCount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF",
  },
  section: {
    padding: 20,
    backgroundColor: "white",
    margin: 20,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  activityText: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    marginLeft: 10,
  },
  activityTime: {
    fontSize: 12,
    color: "#666",
  },
});
