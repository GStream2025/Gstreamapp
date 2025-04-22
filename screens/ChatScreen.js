import React, { useEffect, useState, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../hooks/useAuth'; // si tenés hook de auth

const ChatScreen = ({ route }) => {
  const { userId, username } = route.params;
  const { user } = useAuth(); // obtenemos usuario actual desde auth

  const currentUser = {
    _id: user?.uid || 'anon', // ID real del usuario logueado
    name: user?.displayName || 'Yo',
  };

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const chatId = [currentUser._id, userId].sort().join('_');
    const q = query(collection(db, 'chats', chatId, 'messages'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesFirestore = snapshot.docs.map(doc => ({
        _id: doc.id,
        text: doc.data().text,
        createdAt: doc.data().createdAt.toDate(),
        user: doc.data().user
      }));
      setMessages(messagesFirestore);
    });

    return () => unsubscribe();
  }, [userId]);

  const onSend = useCallback(async (messages = []) => {
    const msg = messages[0];
    const chatId = [currentUser._id, userId].sort().join('_');

    await addDoc(collection(db, 'chats', chatId, 'messages'), {
      _id: msg._id,
      text: msg.text,
      createdAt: new Date(),
      user: currentUser,
    });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={currentUser}
    />
  );
};

export default ChatScreen;
