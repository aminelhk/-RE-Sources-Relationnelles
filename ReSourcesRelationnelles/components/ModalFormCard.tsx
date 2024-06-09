// CustomModal.tsx
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Switch } from 'react-native'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/MaterialIcons'

interface CustomModalProps {
  isVisible: boolean
  setIsVisible: (isVisible: boolean) => void
}

const ModalFormCard: React.FC<CustomModalProps> = ({ isVisible, setIsVisible }) => {
  const [resource, setResource] = React.useState({
    title: '',
    content: 'image',
    isFavorite: false,
    isArchived: false,
    isPrivate: false,
    authorId: undefined,
    categoryResourceId: undefined,
    typeResourceId: undefined,
  })
  const onClose = () => {
    setIsVisible(false)
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

          <Text style={styles.label}>Mettre en favori</Text>
          <Switch
            style={styles.input}
            value={resource.isFavorite}
            onChange={() => setResource({ ...resource, isFavorite: !resource.isFavorite })}
          />
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
})

export default ModalFormCard
