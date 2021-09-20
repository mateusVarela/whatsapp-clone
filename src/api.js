import firebase from "firebase/app";
import "firebase/firebase-auth"
import "firebase/firebase-firestore"
import firebaseConfig from "./firebaseConfig";

/**
 * Conexão com o banco.
 */
const fireBaseApp = firebase.initializeApp(firebaseConfig)
const db = fireBaseApp.firestore()

export default {

    /**
     * Login com facebook
     */
    facebookPopUp: async () => {
        const provider = new firebase.auth.FacebookAuthProvider()
        const result = await fireBaseApp.auth().signInWithPopup(provider)
        return result
    },

    /**
     * Adiciona novo usuário logado.
     */
    addUser: async (userInformation) => {
        await db.collection("users").doc(userInformation.id).set({
            name: userInformation.name,
            avatar: userInformation.avatar
        }, { merge: true })
    },

    /**
     * Busca lista de contatos.
     */
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
    },

    /**
     * Função usada para criar um novo chat com contato. 
     */
    addNewChat: async (user, secondUser) => {

        /**
         * Cria um novo chat.
         */
        let newChat = await db.collection("chats").add({
            messages: [],
            users: [user.id, secondUser.id]
        })

        /**
         * Atualiza informações do chat sobre um usuário pertencente ao chat.
         */
        db.collection("users").doc(user.id).update({
            
            /**
             * Para adicionar um campo que já tem valor e não é necessário substituir todos os campos.
             */
            chats: firebase.firestore.FieldValue.arrayUnion({
                chatId: newChat.id,
                title: secondUser.name,
                image: secondUser.avatar,
                with: secondUser.id
            })
        })

        /**
         * Atualiza informações do chat sobre o outro usuário pertencente ao chat.
         */
        db.collection("users").doc(secondUser.id).update({
            chats: firebase.firestore.FieldValue.arrayUnion({
                chatId: newChat.id,
                title: user.name,
                image: user.avatar,
                with: user.id
            })
        })
    },

    /**
     * Monitora os chats usando em realTime.
     */
    onChatList: (userId, setChatList) => {
        return db.collection("users").doc(userId).onSnapshot((doc) => {
            if (!doc.exists) return
            
            const data = doc.data()
            if (data.chats) {
                setChatList(data.chats)
            }
        })
    },

    onChatContent: (chatId, setList, setUsers) => {
        return db.collection("chats").doc(chatId).onSnapshot((doc) => {
            if(!doc.exists) return
            const data = doc.data()
            setList(data.messages)
            setUsers(data.users)
        })
    },

    sendMessage: async (chatInfo, senderUserId, type, body, users) => {
        const date = new Date()

        db.collection("chats").doc(chatInfo.chatId).update({
            messages: firebase.firestore.FieldValue.arrayUnion({
                type,
                author: senderUserId,
                body,
                date
            })
        })

        /**
         * Atualiza informações sobre última mensagem enviada no chat.
         */
        users.map(async user => {
            const userInfo = await db.collection("users").doc(user).get()
            const userData = userInfo.data()

            if(!userData.chats) return

            const chats = [...userData.chats]

            chats.map(chat => {
                if(chat.chatId == chatInfo.chatId) {
                    chat.lastMessageDate = date
                    chat.lastMessage = body
                }
            })

            await db.collection("users").doc(user).update({
                chats
            })
        })
    }
}