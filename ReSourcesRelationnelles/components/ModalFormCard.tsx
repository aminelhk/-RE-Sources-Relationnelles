// CustomModal.tsx
import React from 'react'
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
  item: Resource
}

const ModalFormCard: React.FC<CustomModalProps> = ({ isVisible, setIsVisible, item }) => {
  const [resource, setResource] = React.useState(item)
  const onClose = () => {
    setIsVisible(false)
  }

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    })

    if (!result.canceled) {
      setResource({ ...resource, image: result.image })
    } else {
      alert('You did not select any image.')
    }
  }

  const modif = async () => {
    try {
      const response = await axios.put('http://10.114.128.158:3000/api/resources/updateResource', {
        resource: resource,
        image: resource.image,
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
        <View>
          <Text style={styles.label}>Titre</Text>
          <TextInput
            style={styles.input}
            value={resource.title}
            onChangeText={value => setResource({ ...resource, title: value })}
            placeholder='Donner un titre à la ressource'
          />
          <View style={styles.imageContainer}>
            <Image
              alt=''
              resizeMode='cover'
              source={{
                uri: resource.content.includes('.pdf')
                  ? 'http://10.114.128.158:3000/images/tutoriel-pdf-ok.png'
                  : resource.content,
              }}
              style={styles.image}
            />
          </View>
          <View style={styles.buttonContainerC}>
            <Pressable style={styles.buttonC} onPress={pickImageAsync}>
              <Text style={styles.buttonLabel}>Choisir</Text>
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
    marginBottom: 16,
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
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  image: {
    width: 240,
    height: 120,
    borderRadius: 18,
  },
  buttonContainerC: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  buttonC: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: 'black',
    fontSize: 16,
  },
})

export default ModalFormCard
