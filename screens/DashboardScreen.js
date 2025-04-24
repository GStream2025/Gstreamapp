// screens/DashboardScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import LottieView from '../components/LottieWrapper'; // ✅ Asegurate de que exista

const { width, height } = Dimensions.get('window');

const options = [
  { icon: 'camera', label: 'Subir Contenido', route: 'Upload' },
  { icon: 'chatbubble-ellipses', label: 'Mensajes', route: 'ChatList' },
  { icon: 'planet', label: 'Explorar', route: 'Explore' },
  { icon: 'notifications', label: 'Notificaciones', route: 'Notifications' },
  { icon: 'settings', label: 'Ajustes', route: 'Settings' },
];

const DashboardScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Fondo animado */}
      <LottieView
        source={
          Platform.OS === 'web'
            ? { uri: '/particles.json' }
            : require('../assets/particles.json')
        }
        autoPlay
        loop
        style={styles.lottieBackground}
      />

      {/* Capa degradada */}
      <LinearGradient
        colors={['rgba(15,12,41,0.85)', 'rgba(48,43,99,0.85)', 'rgba(36,36,62,0.85)']}
        style={styles.gradientOverlay}
      />

      {/* Título */}
      <Text style={styles.title}>GStream Dashboard</Text>

      {/* Opciones */}
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: 'center' }}>
          {options.map((item, index) => (
            <Animated.View
              key={index}
              entering={FadeInUp.delay(index * 100)}
              style={styles.card}
            >
              <TouchableOpacity style={styles.option} onPress={() => navigation.navigate(item.route)}>
                <Ionicons name={item.icon} size={30} color="#1db954" />
                <Text style={styles.label}>{item.label}</Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    position: 'relative',
  },
  lottieBackground: {
    position: 'absolute',
    width: width,
    height: height,
    zIndex: -2,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  title: {
    fontSize: 28,
    color: '#1db954',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 60,
    marginBottom: 30,
    zIndex: 1,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 8,
  },
  scrollContainer: {
    paddingBottom: 40,
    zIndex: 1,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 18,
    marginBottom: 20,
    width: '90%',
    shadowColor: '#1db954',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
    overflow: 'hidden',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  label: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 15,
    fontWeight: '500',
  },
});
