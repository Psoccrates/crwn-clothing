import { initializeApp} from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBezKK0cQ7hoAo3cn9__HJX0gkaGjW1Ygc",
    authDomain: "crwn-clothing-db-a23b0.firebaseapp.com",
    projectId: "crwn-clothing-db-a23b0",
    storageBucket: "crwn-clothing-db-a23b0.appspot.com",
    messagingSenderId: "898774222544",
    appId: "1:898774222544:web:51253a698074b0d0c680d5"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  //Initiialize google authentification
  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
  export const db = getFirestore();
  
  export const createUserDocumentsFromAuth = async(userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {displayName, email, createdAt});
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

  }
