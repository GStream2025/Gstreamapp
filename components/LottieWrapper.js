// components/LottieWrapper.js
import React from 'react';
import { Platform } from 'react-native';
import LottieView from 'lottie-react-native';

export default function LottieWrapper(props) {
  if (Platform.OS === 'web') {
    return (
      <lottie-player
        autoplay
        loop
        mode="normal"
        src={props.source.uri}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: -2,
        }}
      />
    );
  }

  return <LottieView {...props} />;
}
