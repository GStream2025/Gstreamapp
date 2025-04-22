import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, ScrollView, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const filters = [
  { name: 'Normal', style: {} },
  { name: 'Grayscale', style: { tintColor: '#aaa' } },
  { name: 'Sepia', style: { tintColor: '#704214' } },
  { name: 'Invert', style: { transform: [{ rotate: '180deg' }] } }, // ejemplo simple
];

const PhotoViewScreen = ({ route, navigation }) => {
  const { photoUri } = route.params;
  const [selectedFilter, setSelectedFilter] = useState('Normal');

  const getFilterStyle = () => {
    const filter = filters.find(f => f.name === selectedFilter);
    return filter ? filter.style : {};
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: photoUri }}
        style={[styles.image, getFilterStyle()]}
        resizeMode="contain"
      />

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#fff" />
      </TouchableOpacity>

      <View style={styles.filterBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.name}
              style={[
                styles.filterButton,
                selectedFilter === filter.name && styles.activeFilter,
              ]}
              onPress={() => setSelectedFilter(filter.name)}
            >
              <Text style={styles.filterText}>{filter.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default PhotoViewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#00000088',
    padding: 10,
