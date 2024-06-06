import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

interface CalloutProps {
  title: string
  description: string
  buttonText: string
  onPress: () => void
}

const Callout: React.FC<CalloutProps> = ({ title, description, buttonText, onPress }) => {
  return (
    <View style={styles.calloutContainer}>
      <View style={styles.iconContainer}>
        <MaterialIcons name='info-outline' size={24} color='blue' />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  calloutContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 5,
    margin: 10,
  },
  iconContainer: {
    marginRight: 10,
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    marginBottom: 15,
  },
  button: {
    backgroundColor: 'navy',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
})

export default Callout
