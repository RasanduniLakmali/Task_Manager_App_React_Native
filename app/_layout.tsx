// app/_layout.tsx
import { Slot, Stack } from 'expo-router';
import "../global.css"
import { AuthProvider } from '@/context/authContext';
import { LoaderProvider } from '@/context/LoaderContext';

export default function RootLayout() {
  return (
    <LoaderProvider>
      <AuthProvider>
       <Slot/>
   </AuthProvider>
    </LoaderProvider>
   
    );
}
