import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { Ionicons } from '@expo/vector-icons';

const CameraScreen = ({ navigation }) => {
  const cameraRef = useRef(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus === 'granted');

      const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();
      setHasMediaLibraryPermission(mediaStatus === 'granted');
    })();
  }, []);

  const flipCamera = () => {
    setCameraType((prevType) =>
      prevType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const takePicture = async () => {
    if (cameraRef.current && isCameraReady) {
      try {
        const photo = await cameraRef.current.takePictureAsync();

        if (hasMediaLibraryPermission) {
          await MediaLibrary.saveToLibraryAsync(photo.uri);
          Alert.alert('📸 Foto guardada', 'La imagen fue guardada en tu galería.');
        } else {
          Alert.alert('Permiso denegado', 'No se pudo guardar la imagen en la galería.');
        }

        navigation.goBack(); // Vuelve a la pantalla anterior
      } catch (error) {
        console.error('Error al tomar foto:', error);
        Alert.alert('Error', 'No se pudo tomar la foto.');
      }
    }
  };

  if (hasCameraPermission === null) {
    return (
      <View style={styles.centered}>
        <Text style={styles.permissionText}>Solicitando permisos...</Text>
      </View>
    );
  }

  if (!hasCameraPermission) {
    return (
      <View style={styles.centered}>
        <Text style={styles.permissionText}>No tienes permiso para usar la cámara.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={cameraType}
        ref={cameraRef}
        onCameraReady={() => setIsCameraReady(true)}
      />
      <View style={styles.controls}>
        <TouchableOpacity onPress={flipCamera} style={styles.flipButton}>
          <Ionicons name="camera-reverse-outline" size={30} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
          <Ionicons name="camera" size={36} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  controls: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  captureButton: {
    backgroundColor: '#1db954',
    padding: 20,
    borderRadius: 50,
    elevation: 4,
  },
  flipButton: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 40,
    elevation: 2,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0d0d0d',
  },
  permissionText: {
    color: '#fff',
    fontSize: 16,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
});
