import { db } from '../firebaseConfig';
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot
} from 'firebase/firestore';

// Genera un ID único y ordenado entre dos usuarios
const getChatId = (uid1, uid2) => {
  return [uid1, uid2].sort().join('_');
};

// Enviar mensaje
export const sendMessage = async (senderId, receiverId, text) => {
  const chatId = getChatId(senderId, receiverId);
  const messagesRef = collection(db, 'chats', chatId, 'messages');

  await addDoc(messagesRef, {
    senderId,
    receiverId,
    text,
    timestamp: serverTimestamp()
  });
};

// Escuchar mensajes en tiempo real
export const listenForMessages = (senderId, receiverId, callback) => {
  const chatId = getChatId(senderId, receiverId);
  const messagesRef = collection(db, 'chats', chatId, 'messages');

  const q = query(messagesRef, orderBy('timestamp', 'asc'));

  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(messages);
  });
};
