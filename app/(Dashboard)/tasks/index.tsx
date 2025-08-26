import { View, Text, Pressable,ScrollView, TouchableOpacity, Alert } from "react-native"
import React, { useEffect, useState } from "react"
import { deleteTask, getAllTask, getTasks, tasksRef } from "@/service/taskService"
import {MaterialIcons} from "@expo/vector-icons"
import { useRouter, useSegments } from 'expo-router';
import {Task} from "@/types/task"
import { useLoader } from "@/context/LoaderContext";
import { onSnapshot } from "firebase/firestore";


const TaskScreen = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const { showLoader, hideLoader } = useLoader()

  const handleFetchData = async () => {
    try{
      showLoader()
      const data = await getAllTask() //firebase getAll
      console.log(data)
      setTasks(data)

    }catch(err){
      console.log(err)
    }finally{
      hideLoader()
    }
  }

  const segment = useSegments()

  // useEffect(() => {
  //   handleFetchData()
  // }, [segment])

  useEffect (() => {
       const unsubscribe = onSnapshot(tasksRef, 
        (snapshot) => {
        const taskList = snapshot.docs.map((d) => ({
          id:d.id,
          ...d.data()
        })) as Task[]
        setTasks(taskList)
        hideLoader()
       },(err)=>{
         console.error("Failed to fetch")
       })

       return () => unsubscribe()

  },[])

  const handleDelete = async(id:string) => {
      Alert.alert("Delete","Are you sure to delete ?",[
        {text:"Cancel"},
        {
          text:"Delete",
          onPress: async () => {
            try{
              showLoader()
              await deleteTask(id)
              handleFetchData()
            }catch(err){
              console.log("Error deleting task",err)
            }finally{
              hideLoader()
            }
          }
        }
      ])
  }

  const router = useRouter()
  
  return (
    <View className="flex-1 w-full">
      <Text className="text-4xl">Task Screen</Text>
      

      <ScrollView className="mt-4">
         {tasks.map((task) => {
           return <View key={task.id} className="bg-gray-200 p-4 mb-3 rounded-lg mx-4 border border-gray-400">
            <Text className="text-sm text-gray-700 mb-2">{task.title}</Text>
            <Text>{task.description}</Text>

            <View className="flex-row">
              <TouchableOpacity
               className="bg-yellow-300 px-3 py-1 rounded"
               onPress={() => router.push(`/(Dashboard)/tasks/${task.id}`)}
               >
                <Text>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity 
              className="bg-red-500 px-3 py-1 rounded ml-3"
              onPress={() => {
                if(task.id) handleDelete(task.id)}}
              >
                <Text>Delete</Text>
              </TouchableOpacity>
            </View>
        </View>

        
         })}
      </ScrollView>


      <View className="absolute  bottom-5 right-5">                      
        <Pressable 
        className="bg-blue-500 rounded-full p-5 shadow-lg"
        onPress={() => {
          router.push("/(Dashboard)/tasks/new")
        }}
        >
          <MaterialIcons name="add" size={28} color="#fff"></MaterialIcons>
        </Pressable>
      </View>


    </View>
    
  )
}

export default TaskScreen