import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'


const Settings = () => {
  const router = useRouter()

  const handleLogout = async () => {
  
    router.replace("/login")
  }

  return (
    <View className="flex-1 bg-white pt-12 px-4">
      {/* Header with Logout button in top-right */}
      <View className="flex-row justify-between items-center mb-6">
       
        
        <TouchableOpacity 
          className="bg-red-500 px-4 py-2 rounded-lg"
          onPress={handleLogout}
        >
          <Text className="text-white font-semibold">Logout</Text>
        </TouchableOpacity>
      </View>

      
    </View>
  )
}

export default Settings

