import React from 'react'
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native'
import FeatherIcon from 'react-native-vector-icons/Feather'

import Resource from '../types/Resource'

interface CardProps {
  item: Resource
  onPress: () => void
}

const Card: React.FC<CardProps> = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onRead}>
      <View style={styles.card}>
        <TouchableOpacity style={{ ...styles.button, ...styles.buttonOpen }} onPress={onRead}>
          <FeatherIcon color='white' name='book-open' size={20} />
        </TouchableOpacity>

        <TouchableOpacity style={{ ...styles.button, ...styles.buttonEdit }} onPress={onUpdate}>
          <FeatherIcon color='white' name='edit' size={20} />
        </TouchableOpacity>

        <TouchableOpacity style={{ ...styles.button, ...styles.buttonDelete }} onPress={onPress}>
          <FeatherIcon color='white' name='trash' size={20} />
        </TouchableOpacity>
        <View style={styles.cardTop}>
          <Image alt='' resizeMode='cover' style={styles.cardImg} source={{ uri: item.content }} />
        </View>

        <View style={styles.cardBody}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{item.author.pseudo}</Text>
            <Text style={styles.cardPrice}>{item.title}</Text>
          </View>
          <View style={styles.cardStats}>
            <View style={styles.cardStatsItem}>
              <FeatherIcon color='#48496c' name='message-circle' size={14} />
              <Text style={styles.cardStatsItemText}>{item.comments.length}</Text>
            </View>

            <View style={styles.cardStatsItem}>
              <FeatherIcon color='#48496c' name='share-2' size={14} />
              <Text style={styles.cardStatsItemText}>{item.shares.length}</Text>
            </View>

            <View style={styles.cardStatsItem}>
              <FeatherIcon color='#48496c' name='clock' size={14} />
              <Text style={styles.cardStatsItemText}></Text>
            </View>
          </View>
          <View style={styles.cardFooter}>
            <Text style={styles.cardFooterText}>{item.author.pseudo}</Text>
            <Text style={styles.cardFooterText}>{item.createdAt.date}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

function onUpdate(): void {}
function onDelete(): void {}
function onRead(): void {}
const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    zIndex: 1,
    width: 40,
    height: 40,
    right: 10,
    borderRadius: 8,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonEdit: {
    top: 55,
    backgroundColor: 'blue',
  },
  buttonOpen: {
    top: 100,
    backgroundColor: 'green',
  },
  buttonDelete: {
    top: 10,
    backgroundColor: 'red',
  },
  cardContainer: {
    flex: 1,
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  cardTop: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  cardImg: {
    width: '100%',
    height: 180,
  },
  cardBody: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  cardHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardTitle: {
    flex: 1,
    fontSize: 19,
    fontWeight: '600',
    color: '#2d2d2d',
  },
  cardPrice: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    color: '#444',
    textAlign: 'right',
  },
  cardStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardStatsItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardStatsItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#48496c',
    marginLeft: 4,
  },
  cardFooter: {
    borderTopWidth: 1,
    borderColor: '#e9e9e9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  cardFooterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#909090',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
    marginBottom: 12,
  },
  cardButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#48496c',
    marginLeft: 4,
  },
})

export default Card
