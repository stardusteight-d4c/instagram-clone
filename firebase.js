import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyD5orrDoWd4J5EVGbCAeQmc_1Lp4fu0w3o',
  authDomain: 'instagram-clone-204b4.firebaseapp.com',
  projectId: 'instagram-clone-204b4',
  storageBucket: 'instagram-clone-204b4.appspot.com',
  messagingSenderId: '1059994908955',
  appId: '1:1059994908955:web:97283a1b0d7cb3a3557bbe',
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const storage = getStorage()

export { app, db, storage }
