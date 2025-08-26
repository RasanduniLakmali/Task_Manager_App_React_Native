import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useAuth } from '../context/authContext';

const Index = () => {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace('/home');
      } else {
        router.replace('/login');
      }
    }
  }, [user, loading]);

  if (loading) {
    return (
      <View className="flex-1 w-full justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Optional: fallback UI if neither loading nor redirect happens
  return (
    <View className="flex-1 w-full items-center justify-center">
      <Text className="text-4xl">Hello</Text>
      <TouchableOpacity
        onPress={() => router.push('/login')}
        className="bg-blue-500 p-4 rounded-lg mt-4"
      >
        <Text className="text-white text-lg">Go to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Index;