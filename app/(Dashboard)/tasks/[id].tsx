import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-paper'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { createTask, getTaskById, updatetask } from '@/service/taskService'
import { useLoader } from "@/context/LoaderContext";
import { useAuth } from "@/context/authContext"

const TaskFormScreen = () => {
  const { id } = useLocalSearchParams<{ id?: string }>()
  const isNew = !id || id === 'new'

  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const { showLoader, hideLoader } = useLoader()


  const router = useRouter()

  useEffect(() => {
    const load = async () => {
      if (!isNew && id) {
        const task = await getTaskById(id)
        console.log(task)
        if (task) {
          setTitle(task.title)
          setDescription(task.description)
        }
      }
    }

    load()

  }, [id])

  const { user, loading } = useAuth()

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert("Validation", "Title is required!")
      return
    }

    if (!description.trim()) {
      Alert.alert("Validation", "Description is required!")
      return
    }

    try {
      showLoader()
      if (isNew) {
        await createTask({ title, description,userId: user?.uid})
      } else {
        await updatetask(id!, { title, description }) // ✅ non-null assertion since id exists when updating
      }
      router.back()
    } catch (err) {
      console.log(`Error ${isNew ? "saving" : "updating"} task`, err)
      Alert.alert("Error", `Fail to ${isNew ? "save" : "update"} task`)
    }finally{
      hideLoader()
    }
  }

  return (
    <View className="flex-1 w-full p-5">
      <Text className="text-2xl font-bold">
        {isNew ? "Add task" : "Edit Task"}
      </Text>

      <TextInput
        placeholder="Title"
        className="border border-gray-400 p-2 my-2 rounded-md"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        placeholder="Description"
        className="border border-gray-400 p-2 my-2 rounded-md"
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity
        className="bg-blue-400 rounded-md px-6 py-3 my-2"
        onPress={handleSubmit}
      >
        <Text className="text-xl text-white">
          {isNew ? "Add task" : "Update Task"}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default TaskFormScreen
