import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RegisterForm } from '@/components/forms/RegisterForm';

export default function RegisterScreen() {
  return (
    <View style={styles.container}>
      <RegisterForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
