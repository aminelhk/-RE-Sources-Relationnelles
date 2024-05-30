import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function TextFr(props: { text?: string; number?: number }) {
  const { text = "undefined", number } = props;
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'Marianne-Bold': require('../assets/fonts/Marianne/Marianne-Bold.otf'),
      'Marianne': require('../assets/fonts/Marianne/Marianne-Regular.otf'), // assuming you have a bold variant
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  let textStyle;
  switch (number) {
    case 1:
      textStyle = styles.text1;
      break;
    case 2:
      textStyle = styles.text2;
      break;
    case 3:
      textStyle = styles.text3;
      break;
    default:
      textStyle = styles.textDefault;
      break;
  }

  return (
    <Text style={textStyle}>{text}</Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text1: {
    fontFamily: 'Marianne-Bold',  // Use the bold variant if available
    fontWeight: '700',
    fontSize: 32,  // 2rem
    lineHeight: 40,  // 2.5rem
    marginBottom: 24,  // 0 0 1.5rem
  },
  text2: {
    fontFamily: 'Marianne-Bold',
    fontWeight: '700',
    fontSize: 28,  // 1.75rem
    lineHeight: 36,  // 2.25rem
    marginBottom: 24,  // 0 0 1.5rem
  },
  text3: {
    fontFamily: 'Marianne-Bold',
    fontWeight: '700',
    fontSize: 24,  // 1.5rem
    lineHeight: 32,  // 2rem
    marginBottom: 24,  // 0 0 1.5rem
  },
  textDefault: {
    fontFamily: 'Marianne',
    fontSize: 16,  // 1rem
    lineHeight: 24,  // 1.5rem
    marginBottom: 24,  // 0 0 1.5rem
  },
});
