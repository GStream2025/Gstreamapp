import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { auth, db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
  const [profile, setProfile] = useState({ username: '', bio: '', image: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const ref = doc(db, 'users', auth.currentUser.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setProfile(snap.data());
        }
      } catch (err) {
        console.error('Error al obtener datos del perfil:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1db954" />
      </View>
    );
  }

  return (
    <LinearGradient colors={['#0f0c29', '#302b63', '#24243e']} style={styles.container}>
      <Image
        source={
          profile.image
            ? { uri: profile.image }
            : require('../assets/default-avatar.png')
        }
        style={styles.avatar}
      />

      <Text style={styles.name}>{profile.username || 'Usuario sin nombre'}</Text>
      <Text style={styles.bio}>{profile.bio || 'Sin biografía'}</Text>

      <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditProfile')}>
        <Ionicons name="create-outline" size={18} color="#fff" />
        <Text style={styles.editText}>Editar Perfil</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#1db954',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  bio: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  editButton: {
    flexDirection: 'row',
    backgroundColor: '#1db954',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: 'center',
  },
  editText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0d0d0d',
  },
});
