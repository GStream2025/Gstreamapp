// screens/UploadScreen.js
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../services/firebaseConfig';
import { v4 as uuidv4 } from 'uuid';

const UploadScreen = () => {
  const [imageUri, setImageUri] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState(null);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Se requiere permiso para acceder a la galería');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setDownloadURL(null);
    }
  };

  const uploadImage = async () => {
    if (!imageUri) return;

    try {
      setUploading(true);
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const filename = `images/${uuidv4()}.jpg`;
      const storageRef = ref(storage, filename);

      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);
      setDownloadURL(url);
      Alert.alert('Éxito', 'Imagen subida correctamente');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo subir la imagen');
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subir Imagen</Text>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Elegir Imagen</Text>
      </TouchableOpacity>

      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.image} />
      )}

      {imageUri && !uploading && (
        <TouchableOpacity style={styles.button} onPress={uploadImage}>
          <Text style={styles.buttonText}>Subir a Firebase</Text>
        </TouchableOpacity>
      )}

      {uploading && <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 20 }} />}

      {downloadURL && (
        <Text style={styles.link}>URL: {downloadURL}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00c2ff',
    padding: 15,
    borderRadius: 12,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  image: {
    marginTop: 20,
    width: 250,
    height: 250,
    borderRadius: 12,
  },
  link: {
    marginTop: 20,
    color: '#0af',
    textAlign: 'center',
  },
});

export default UploadScreen;
