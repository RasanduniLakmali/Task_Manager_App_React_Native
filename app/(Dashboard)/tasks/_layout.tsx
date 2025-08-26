import { View, Text } from "react-native"
import React from "react"
import { Stack } from "expo-router"


//app ek athule navigation walata use wenwa
const TaskLayout = () => {
  return (
  <Stack screenOptions={{animation: "slide_from_right"}}>
     <Stack.Screen name="index" options={{ headerShown: false}} />
     <Stack.Screen name="[id]" options={{title: "Task Form"}}/>
  </Stack>
  )
}

export default TaskLayout