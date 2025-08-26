import { View, Text, TextInput, TouchableOpacity, Pressable, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { login } from '../../service/authService'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { ActivityIndicator } from 'react-native-paper'

const LoginScreen = () => {
  const router = useRouter()
  
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState('')

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }
    
    setIsLoading(true)
    setError('')
    
    try {
      await login(email, password)
      router.push('/home')
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || 'Login failed. Please try again.')
      } else {
        setError('Login failed. Please try again.')
      }
      console.error('Login error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      <View className="flex-1 items-center justify-center px-6">
        <Animated.View 
          entering={FadeIn.duration(500)}
          exiting={FadeOut.duration(300)}
          className="w-full max-w-md"
        >
          <Text className="text-3xl font-bold mb-2 text-blue-600 dark:text-blue-400">Welcome Back</Text>
          <Text className="text-gray-500 dark:text-gray-400 mb-8">Login to manage your tasks</Text>
          
          {error ? (
            <Animated.View 
              entering={FadeIn}
              exiting={FadeOut}
              className="bg-red-100 p-3 rounded-lg mb-4"
            >
              <Text className="text-red-700 text-center">{error}</Text>
            </Animated.View>
          ) : null}
          
          <TextInput
            placeholder="Email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg w-full mb-4 text-gray-900 dark:text-white"
            placeholderTextColor="#9CA3AF"
          />
          
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg w-full mb-6 text-gray-900 dark:text-white"
            placeholderTextColor="#9CA3AF"
          />
          
          <TouchableOpacity
            onPress={handleLogin}
            disabled={isLoading}
            className={`bg-blue-600 dark:bg-blue-700 p-4 rounded-lg w-full items-center justify-center ${isLoading ? 'opacity-90' : ''}`}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text className="text-white text-lg font-semibold">Login</Text>
            )}
          </TouchableOpacity>
          
          <View className="flex-row justify-center mt-6">
            <Text className="text-gray-500 dark:text-gray-400">Don't have an account? </Text>
            <Pressable 
              onPress={() => router.push('/register')}
              hitSlop={10}
            >
              <Text className="text-blue-600 dark:text-blue-400 font-semibold">Sign up</Text>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen
