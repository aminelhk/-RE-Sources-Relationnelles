import React from 'react'
import { StyleSheet, SafeAreaView, FlatList, Platform } from 'react-native'
import Card from './Card'
import Resource from '../types/Resource'

type CardListType = {
  resources: Resource[]
  isModalVisible: boolean
  setIsModalVisible: (isModalVisible: boolean) => void
}

const CardList: React.FC<CardListType> = ({ resources, isModalVisible, setIsModalVisible }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={resources}
        renderItem={({ item }) => (
          <Card item={item} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={Platform.OS === 'web' ? 4 : 1} // Number of columns
        contentContainerStyle={styles.flatListContent}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'red',
  },
  flatListContent: {
    flex: 1,
    paddingTop: 16,
  },
})

export default CardList
