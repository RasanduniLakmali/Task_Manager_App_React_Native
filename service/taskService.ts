import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc,getDocs,query,where} from "firebase/firestore"
import api from "./config/api"
import {Task} from "@/types/task"
import {db} from "@/firebase"

export const getTasks = async () => {
  const res = await api.get("/tasks")
  return res.data
}


export const addTask = async (task: {
  title: string
  description?: string
}) => {
  const res = await api.post("/tasks", task)
  return res.data
}

//tasks
export const tasksRef = collection(db,"tasks")  //create tasks collection, collection-> use to create reference for collection

export const createTask = async (task:Task)=>{
       const docRef = await addDoc(tasksRef,task)
       return docRef.id
}

export const getAllTask = async() => {
 const snapshot =  await getDocs(tasksRef)
 return snapshot.docs.map((task) => ({
     id: task.id,
     ...task.data()
     })) as Task[]
}

export const getAllTaskByUserId = async (userId: string) => {
  const q = query(tasksRef, where("userId", "==", userId))

  const querySnapshot = await getDocs(q)
  const taskList = querySnapshot.docs.map((taskRef) => ({
    id: taskRef.id,
    ...taskRef.data()
  })) as Task[]
  return taskList
}


export const getTaskById = async(id:string) => {
  const taskDocRef = doc(db,"tasks",id)
  const snapshot = await getDoc(taskDocRef)

  return snapshot.exists() 
  ? ({
     id:snapshot.id,
     ...(await snapshot).data()
    } as Task)
    :null
  //getDoc(taskDocRef)

}

export const deleteTask = async(id:string) => {
  const taskDocRef = doc(db,"tasks",id) 
  return deleteDoc(taskDocRef)
}

export const updatetask = async(id:string,task:Task) => {
    const updateRef = doc(db, "tasks", id) // doc -> use to create reference for data

    //id ek already set wel tynne ehnda remove krl data pass krnwa
    //title,description

    const {id: _id,...taskData} = task// remove id

     return updateDoc(updateRef,taskData)
}