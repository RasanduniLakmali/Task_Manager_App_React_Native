import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Register } from '../../service/authService'

const RegisterScreen = () => {
  const router = useRouter()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const handleRegister = async () => {
    setIsLoading(true)
    if (!email || !password || !confirmPassword) {
      alert('Please fill in all fields')
      setIsLoading(false)
      return
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match')
      setIsLoading(false)
      return
    }

    try {
      await Register(email, password)
      router.push('/')  // Navigate to login after successful registration
    } catch (error) {
      console.error('Registration error:', error)
      alert('Registration failed. Please try again.')
    } finally {
      console.log('Registration attempted with:', { email, password })
      setTimeout(() => setIsLoading(false), 1500)
    }
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      <View className="flex-1 items-center justify-center px-6">
        <View className="w-full max-w-md">
          <Text className="text-3xl font-bold mb-2 text-blue-600">Create Account</Text>
          <Text className="text-gray-500 mb-8">Join us to manage your tasks</Text>

          <TextInput
            placeholder="Email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            className="bg-gray-100 p-4 rounded-lg w-full mb-4"
            placeholderTextColor="#9CA3AF"
          />

          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            className="bg-gray-100 p-4 rounded-lg w-full mb-4"
            placeholderTextColor="#9CA3AF"
          />

          <TextInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            className="bg-gray-100 p-4 rounded-lg w-full mb-6"
            placeholderTextColor="#9CA3AF"
          />

          <TouchableOpacity
            onPress={handleRegister}
            disabled={isLoading}
            className={`bg-blue-600 p-4 rounded-lg w-full items-center ${isLoading ? 'opacity-70' : ''}`}
          >
            <Text className="text-white text-lg font-semibold">
              {isLoading ? 'Creating account...' : 'Register'}
            </Text>
          </TouchableOpacity>

          <View className="flex-row justify-center mt-6">
            <Text className="text-gray-500">Already have an account? </Text>
            <Pressable onPress={() => router.back()}>
              <Text className="text-blue-600 font-semibold">Sign in</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen
