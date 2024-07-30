// CustomModal.tsx
import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Pressable,
  Alert,
} from 'react-native'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/MaterialIcons'
import * as ImagePicker from 'expo-image-picker'

import { Resource } from '../types'

interface CustomModalProps {
  isVisible: boolean
  setIsVisible: (isVisible: boolean) => void
  selectedItem: Resource
  setSelectedItem?: (item: Resource | null) => void
}

const ModalFormCard: React.FC<CustomModalProps> = ({
  isVisible,
  setIsVisible,
  selectedItem,
  setSelectedItem,
}) => {
  const [resource, setResource] = useState(selectedItem)
  const [importedImage, setImportedImage] = useState('' as string | undefined)
  const [selectedImage, setSelectedImage] = useState(resource.content)

  const onClose = () => {
    setIsVisible(false)
    setSelectedItem(null)
  }

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    })

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
      console.log(JSON.stringify(result))
    } else {
      Alert.alert('You did not select any image.')
    }
  }

  const handleModif = async () => {
    const formData = new FormData()
    formData.append('image', selectedImage)
    formData.append('resource', JSON.stringify(resource))
    try {
      const response = await fetch('http://localhost:3000/api/resources/updateResource', {
        method: 'PUT',
        body: formData,
      })
      if (response.status === 200) {
        console.log('Resource updated successfully')
        setIsVisible(false)
        Alert.alert('Success', 'Ressource modifiée avec succès')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Fermer</Text>
          <Icon name='close' size={16} color='blue' />
        </TouchableOpacity>
        <View style={styles.container}>
          <Text style={styles.label}>Titre</Text>
          <TextInput
            style={styles.input}
            value={resource.title}
            onChangeText={value => setResource({ ...resource, title: value })}
            placeholder='Donner un titre à la ressource'
          />
          <View style={{ ...styles.container, flex: 4 }}>
            <Image
              alt=''
              resizeMode='cover'
              source={{
                uri: selectedImage.includes('.pdf')
                  ? 'http://localhost:3000/images/tutoriel-pdf-ok.png'
                  : selectedImage,
              }}
              style={styles.image}
            />
          </View>
          <View style={styles.container}>
            <Pressable style={styles.buttonChoisir} onPress={pickImageAsync}>
              <Text style={styles.buttonLabel}>Choisir</Text>
            </Pressable>
          </View>
          <View style={styles.container}>
            <Pressable style={styles.buttonConfirmer} onPress={handleModif}>
              <Text style={styles.buttonLabel}>Modifier</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  closeButton: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'blue',
    marginRight: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalTitle: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalText: {
    marginBottom: 20,
    color: 'gray',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  learnMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  learnMoreText: {
    color: 'blue',
    marginRight: 5,
  },
  okButton: {
    backgroundColor: 'navy',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  okButtonText: {
    color: 'white',
    marginRight: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: 'black',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 8,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#4f46e5',
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
  container: {
    flex: 1,
    paddingTop: 8,
  },
  image: {
    width: '20%',
    height: '100%',
    borderRadius: 8,
  },
  buttonChoisir: {
    borderRadius: 10,
    backgroundColor: 'blue',
    width: '20%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonConfirmer: {
    borderRadius: 10,
    backgroundColor: 'green',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonLabel: {
    color: 'white',
    fontSize: 16,
  },
})

export default ModalFormCard
