import firebase from "firebase/app";
import "firebase/firebase-auth"
import "firebase/firebase-firestore"
import firebaseConfig from "./components/firebaseConfig";

/**
 * Conexão com o banco.
 */
const fireBaseApp = firebase.initializeApp(firebaseConfig)
const db = fireBaseApp.firestore()

/**
 * Login com facebook
 */
export default {
    facebookPopUp: async () => {
        const provider = new firebase.auth.FacebookAuthProvider()
        const result = await fireBaseApp.auth().signInWithPopup(provider)
        return result
    }
}