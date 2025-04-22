// components/AnimatedSplash.js
import React, { useEffect, useRef } from 'react';
import { View, Text, Image, Animated, StyleSheet, Dimensions } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const AnimatedSplash = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const renderParticles = () => {
    const particles = [];
    for (let i = 0; i < 40; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const r = Math.random() * 2 + 1;
      particles.push(<Circle key={i} cx={x} cy={y} r={r} fill="#1db954" opacity={0.3} />);
    }
    return particles;
  };

  return (
    <View style={styles.container}>
      <Svg height={height} width={width} style={StyleSheet.absoluteFill}>
        {renderParticles()}
      </Svg>
      <Animated.Image
        source={require('../assets/logo.png')} // ← asegurate de tener este logo
        style={[styles.logo, { opacity: fadeAnim }]}
        resizeMode="contain"
      />
      <Text style={styles.text}>Cargando GStream...</Text>
    </View>
  );
};

export default AnimatedSplash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 20,
    tintColor: '#1db954',
  },
  text: {
    color: '#1db954',
    fontSize: 18,
    fontWeight: '600',
    opacity: 0.8,
  },
});
