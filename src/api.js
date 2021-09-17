import firebase from "firebase/app";
import "firebase/firebase-auth"
import "firebase/firebase-firestore"
import firebaseConfig from "./firebaseConfig";

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
    },

    addUser: async (userInformation) => {
        await db.collection("users").doc(userInformation.id).set({
            name: userInformation.name,
            avatar: userInformation.avatar
        }, { merge: true })
    },

    getContatList: async (userId) => {
        let lists = []
        db.collection("users").get().then((querySnapshot) => {
            querySnapshot.forEach((result) => {
            const data = result.data()
                if (result.id !== userId) {
                    lists.push({
                        id: result.id,
                        name: data.name,
                        avatar: data.avatar
                    })
                }
            });
        });
        
        return lists
    }
}