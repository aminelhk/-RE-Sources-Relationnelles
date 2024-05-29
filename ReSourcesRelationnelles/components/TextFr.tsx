import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function TextFr(props: { text: string; number?: number }) {
  const { text = "undefined", number } = props;

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
  text1: {
    fontWeight: '700',
    fontSize: 32,  // 2rem
    lineHeight: 40,  // 2.5rem
    marginBottom: 24,  // 0 0 1.5rem
  },
  text2: {
    fontWeight: '700',
    fontSize: 28,  // 1.75rem
    lineHeight: 36,  // 2.25rem
    marginBottom: 24,  // 0 0 1.5rem
  },
  text3: {
    fontWeight: '700',
    fontSize: 24,  // 1.5rem
    lineHeight: 32,  // 2rem
    marginBottom: 24,  // 0 0 1.5rem
  },
  textDefault: {
    fontSize: 16,  // 1rem
    lineHeight: 24,  // 1.5rem
    marginBottom: 24,  // 0 0 1.5rem
  },
});
