import React, { useState } from 'react'
import { StyleSheet, SafeAreaView, FlatList, Platform } from 'react-native'
import Card from './Card'
import Resource from '../types/Resource'

type CardListType = {
  resources: Resource[]
}



const CardList: React.FC<CardListType> = ({ resources }) => {
  const [resources2, setResources] = useState<Resource[]>(resources)
  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={resources}
        renderItem={({ item }) => <Card resources={resources2} setResources={setResources} item={item} onPress={() => {}} />}
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
    backgroundColor: '#f2f2f2',
  },
  flatListContent: {
    flex: 1,
    paddingTop: 16,
  },
})

export default CardList
