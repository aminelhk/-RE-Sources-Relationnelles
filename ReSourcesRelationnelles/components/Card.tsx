import React from 'react'
import { TouchableOpacity, View, Image, Text, StyleSheet, Platform } from 'react-native'
import FeatherIcon from 'react-native-vector-icons/Feather'

import Resource from '../types/Resource'
import ModalComponent from './ModalComponent'
import Pdf from 'react-native-pdf'
import PdfViewer from './PdfViewer'

interface CardProps {
  item: Resource
  isModalVisible: boolean
  setIsModalVisible: (modalVisible: boolean) => void
}

const Card: React.FC<CardProps> = ({ item, isModalVisible, setIsModalVisible }) => {
  const onPress = () => {
    console.log('item.content ', item.content)
    Platform.OS !== 'web' ? (
      <PdfViewer
        pdfUri={
          "http://192.168.1.29:3000/images/1717936829629Capture_d'Ã©cran_2023-05-10_201513.png.png"
        }
      />
    ) : (
      window.open(item.content)
    )
  }
  return (
    <View style={{ flex: 1 }}>
      <ModalComponent isVisible={isModalVisible} setIsVisible={setIsModalVisible} />
      <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
        <View style={styles.card}>
          <View style={styles.cardTop}>
            <Image
              alt=''
              resizeMode='cover'
              style={styles.cardImg}
              source={{
                uri: item.content.includes('.pdf')
                  ? 'http://192.168.1.29:3000/images/tutoriel-pdf-ok.png'
                  : item.content,
              }}
            />
            {/* )} */}
          </View>

          <View style={styles.cardBody}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.author.pseudo}</Text>
              <Text style={styles.cardPrice}>{item.title}</Text>
            </View>

            <View style={styles.cardStats}>
              <View style={styles.cardStatsItem}>
                <FeatherIcon color='#48496c' name='zap' size={14} />
                <Text style={styles.cardStatsItemText}>hp</Text>
              </View>

              <View style={styles.cardStatsItem}>
                <FeatherIcon color='#48496c' name='navigation' size={14} />
                <Text style={styles.cardStatsItemText}>miles</Text>
              </View>

              <View style={styles.cardStatsItem}>
                <FeatherIcon color='#48496c' name='clock' size={14} />
                <Text style={styles.cardStatsItemText}>sec</Text>
              </View>
            </View>

            <View style={styles.cardFooter}>
              <Text style={styles.cardFooterText}>{item.author.pseudo}</Text>
              <Text style={styles.cardFooterText}>
                {/* {item.date.toLocaleDateString("en-US", {
                day: "numeric",
                year: "numeric",
                month: "short",
              })} */}
                date
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    padding: 16,
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
})

export default Card
