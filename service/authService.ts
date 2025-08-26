import { auth } from "@/firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"


export const Register = (email : string , password : string) => {
    return createUserWithEmailAndPassword(auth, email, password)
}

export const login = (email : string , password : string) => {
    return signInWithEmailAndPassword(auth, email, password)
}

export const Logout = () => {
    return signOut(auth)
}