import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Ionicons } from '@expo/vector-icons';

const GalleryScreen = ({ navigation }) => {
  const [photos, setPhotos] = useState([]);
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      if (status === 'granted') loadPhotos();
    })();
  }, []);

  const loadPhotos = async () => {
    const assets = await MediaLibrary.getAssetsAsync({
      mediaType: 'photo',
      sortBy: 'creationTime',
      first: 100,
    });
    setPhotos(assets.assets);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('PhotoView', { photoUri: item.uri })}
      onLongPress={() => confirmDelete(item)}
    >
      <Image source={{ uri: item.uri }} style={styles.image} />
      <Ionicons name="heart-outline" size={20} color="#fff" style={styles.favoriteIcon} />
    </TouchableOpacity>
  );

  const confirmDelete = (photo) => {
    Alert.alert(
      'Eliminar foto',
      '¿Seguro que deseas eliminar esta foto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => deletePhoto(photo),
        },
      ]
    );
  };

  const deletePhoto = async (photo) => {
    try {
      await MediaLibrary.deleteAssetsAsync([photo.id]);
      loadPhotos();
      Alert.alert('✅ Foto eliminada');
    } catch (error) {
      Alert.alert('❌ Error al eliminar');
    }
  };

  if (hasPermission === false) {
    return (
      <View style={styles.centered}>
        <Text style={styles.permissionText}>Permiso denegado para acceder a la galería.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={3}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default GalleryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  list: {
    padding: 4,
  },
  image: {
    width: 120,
    height: 120,
    margin: 4,
    borderRadius: 8,
  },
  centered: {
    flex:
