// screens/EditProfileScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function EditProfileScreen({ navigation }) {
  const [profile, setProfile] = useState({ username: '', bio: '', image: '' });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const docRef = doc(db, 'users', auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }
      } catch (error) {
        Alert.alert('Error', 'No se pudo cargar tu información.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      return Alert.alert('Permiso denegado', 'No se puede acceder a la galería');
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      try {
        setUploading(true);
        const response = await fetch(result.assets[0].uri);
        const blob = await response.blob();
        const fileRef = ref(storage, `profilePics/${auth.currentUser.uid}.jpg`);
        await uploadBytes(fileRef, blob);
        const downloadURL = await getDownloadURL(fileRef);
        setProfile({ ...profile, image: downloadURL });
      } catch (error) {
        Alert.alert('Error', 'No se pudo subir la imagen.');
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSave = async () => {
    if (!profile.username.trim()) {
      return Alert.alert('Nombre requerido', 'El nombre no puede estar vacío');
    }
    try {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), profile);
      Alert.alert('✅ Cambios guardados', 'Tu perfil fue actualizado');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar la información');
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1db954" />
      </View>
    );
  }

  return (
    <Animated.View style={styles.container} entering={FadeInUp.duration(600)}>
      <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
        {uploading ? (
          <ActivityIndicator size="large" color="#1db954" />
        ) : (
          <Image
            source={
              profile.image
                ? { uri: profile.image }
                : require('../assets/default-avatar.png')
            }
            style={styles.avatar}
          />
        )}
        <Text style={styles.changePhoto}>Cambiar foto</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        placeholderTextColor="#888"
        value={profile.username}
        onChangeText={(text) => setProfile({ ...profile, username: text })}
      />

      <TextInput
        style={[styles.input, { height: 90 }]}
        placeholder="Biografía"
        placeholderTextColor="#888"
        multiline
        value={profile.bio}
        onChangeText={(text) => setProfile({ ...profile, bio: text })}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    padding: 24,
    alignItems: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#1db954',
  },
  changePhoto: {
    color: '#1db954',
    marginTop: 10,
    fontWeight: '600',
  },
  input: {
    width: '100%',
    backgroundColor: '#1a1a1a',
    color: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 18,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#1db954',
    paddingVertical: 14,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0d0d0d',
  },
});
