import React, { useState } from 'react'
import { StyleSheet, SafeAreaView, FlatList, Platform } from 'react-native'

import Card from './Card'
import Resource from '../types/Resource'
import ModalFormCard from './ModalFormCard'

type CardListType = {
  resources: Resource[]
  setResources: (resources: Resource[]) => void
  isModalVisible: boolean
  setIsModalVisible: (isModalVisible: boolean) => void
}

const CardList: React.FC<CardListType> = ({
  resources,
  setResources,
  isModalVisible,
  setIsModalVisible,
}) => {
  const [selectedItem, setSelectedItem] = useState<Resource | null>(null)

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={resources}
        renderItem={({ item }) => (
          <Card
            resources={resources}
            setResources={setResources}
            item={item}
            setIsModalVisible={setIsModalVisible}
            setSelectedItem={setSelectedItem}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={Platform.OS === 'web' ? 4 : 1}
        contentContainerStyle={styles.flatListContent}
      />
      {selectedItem && (
        <ModalFormCard
          isVisible={isModalVisible}
          setIsVisible={setIsModalVisible}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  flatListContent: {
    flex: 1,
    paddingTop: 16,
  },
})

export default CardList
