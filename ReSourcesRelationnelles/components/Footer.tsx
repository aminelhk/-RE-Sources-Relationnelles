import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet, Image } from 'react-native';


const Footer : React.FC = () => {
  return (
    <View style={styles.footer}>
      <View style={styles.container}>
        <View style={styles.body}>
          <TouchableOpacity onPress={() => Linking.openURL('/')}>
          <Image
              source={require("../assets/Logo_de_la_République_française.png")}
              style={styles.logo}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.contentDesc}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus fuga dolorum inventore ut nihil corporis maiores accusantium maxime omnis fugiat aliquam doloremque, minima sint in debitis eius praesentium vitae eveniet voluptas, quis iure animi laboriosam dicta repellat. Libero ipsa vitae fugiat. Quia dicta laudantium sapiente facere dolor recusandae temporibus odit porro, repellendus deleniti magnam amet..</Text>
            <View style={styles.contentList}>
              <TouchableOpacity style={styles.contentLinkItem} onPress={() => Linking.openURL('https://legifrance.gouv.fr')}>
                <Text style={styles.contentLink}>legifrance.gouv.fr</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.contentLinkItem} onPress={() => Linking.openURL('https://gouvernement.fr')}>
                <Text style={styles.contentLink}>gouvernement.fr</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.contentLinkItem} onPress={() => Linking.openURL('https://service-public.fr')}>
                <Text style={styles.contentLink}>service-public.fr</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.contentLinkItem} onPress={() => Linking.openURL('https://data.gouv.fr')}>
                <Text style={styles.contentLink}>data.gouv.fr</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.bottomCopy}>
          <View style={styles.bottomList}>
            <TouchableOpacity style={styles.contentLinkItem} onPress={() => {/* Handle Plan du site */ }}>
              <Text style={styles.bottomLink}>Plan du site</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contentLinkItem} onPress={() => {/* Handle Accessibilité */ }}>
              <Text style={styles.bottomLink}>Accessibilité : non/partiellement/totalement conforme</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contentLinkItem} onPress={() => {/* Handle Mentions légales */ }}>
              <Text style={styles.bottomLink}>Mentions légales</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contentLinkItem} onPress={() => {/* Handle Données personnelles */ }}>
              <Text style={styles.bottomLink}>Données personnelles</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contentLinkItem} onPress={() => {/* Handle Gestion des cookies */ }}>
              <Text style={styles.bottomLink}>Gestion des cookies</Text>
            </TouchableOpacity>
          </View>
          <Text>
            Sauf mention explicite de propriété intellectuelle détenue par des tiers, les contenus de ce site sont proposés sous{' '}
            <TouchableOpacity onPress={() => Linking.openURL('https://github.com/etalab/licence-ouverte/blob/master/LO.md')}>
              <Text style={styles.bottomLink}>licence etalab-2.0</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    width: '100%', // This should make the footer occupy the full width of its parent container
    marginTop: 5,
    elevation: 5, // Assuming you want to add elevation for a shadow effect
    shadowColor: '#000091',
    shadowOffset: { width: 4, height: -2 },
    shadowOpacity: 0.5,
  },
  container: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  body: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  brand: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexBasis: '100%',
  },
  contentDesc: {
    width: 500,
    maxWidth: '100%',
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'justify',
    textShadowColor: 'currentColor',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 0,
    letterSpacing: 0,
  },
  contentList: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: -8,
    flexWrap: 'wrap',
  },
  contentLink: {
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 24,
    color: '#3a3a3a',
  },
  contentLinkItem: {
    marginRight: 20,
    marginBottom: 8,
  },
  bottom: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginTop: 40,
  },
  bottomList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 8,
    width: '100%',
    margin: 0,
  },
  bottomLink: {
    fontSize: 12,
    lineHeight: 20,
    color: '#666',
  },
  bottomCopy: {
    marginTop: 8,
    color: '#666',
    shadowColor: '#E1E1E1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
  },
  logo: {
    width: 220,
    height: 130,

    marginTop: 20,
    backgroundColor: 'RGB(0,0,0)',
  },
});

export default Footer;