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
        const results = await db.collection("users").get()

        const data = results.data()

        const listOfUsers = results.array.forEach(element => {

        });
        const infoOfAllUsers = listOfUsers.map(user => {
            const userInfo = {
                id: user.id,
                name: data.name,
                avatar: data.avatar
            }

            return userInfo
        })

        return infoOfAllUsers
    }
}