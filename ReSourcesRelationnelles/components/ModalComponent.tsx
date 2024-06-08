// CustomModal.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface CustomModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const ModalComponent: React.FC<CustomModalProps> = ({ isVisible, onClose }) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Fermer</Text>
          <Icon name="close" size={16} color="#000" />
        </TouchableOpacity>
        <View style={styles.modalHeader}>
          <Icon name="check-circle" size={24} color="black" />
          <Text style={styles.modalTitle}>Acceptez-vous les conditions de service ?</Text>
        </View>
        <Text style={styles.modalText}>
          Ceci est une modal qui vous permet d'accepter les conditions de service (ou non).
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.learnMoreButton}>
            <Text style={styles.learnMoreText}>Learn more</Text>
            <Icon name="open-in-new" size={16} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.okButton} onPress={onClose}>
            <Text style={styles.okButtonText}>Ok</Text>
            <Icon name="check" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
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
});

export default ModalComponent;
