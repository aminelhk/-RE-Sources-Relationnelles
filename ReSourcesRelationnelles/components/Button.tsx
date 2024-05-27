import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

export default function ButtonFr(props: { onPress: () => void; title?: string }) {
  const { onPress, title = "undefined" } = props;
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 4,
    backgroundColor: '#000091',
    maxWidth: 250,
  },
  text: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    color: 'white',
  },
});
