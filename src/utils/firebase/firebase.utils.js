import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFileStore, doc, getDoc, setDoc, getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYasn-HpHDx55kKMdgloSlPMEgPOPnIIU",
  authDomain: "crwn-clothing-db-55729.firebaseapp.com",
  projectId: "crwn-clothing-db-55729",
  storageBucket: "crwn-clothing-db-55729.appspot.com",
  messagingSenderId: "234186896636",
  appId: "1:234186896636:web:1655161a28fc37eef01379"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore(); 

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid); 

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef); 
    console.log(userDocRef); 
    console.log(userSnapshot.exists());
    
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date(); 

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });            
        } catch (error) {
            console.log("error creating the user", error.message); 
        }
    }

    return userDocRef;
}