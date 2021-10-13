import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#212121'
  },
  card: {
    margin: 10,
    borderRadius: 10,
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#2A2A2A'
  },
  cardContainer: {
    flexDirection: 'row',
    marginTop: 20
  },
  text: {
    fontSize: 22,
    fontWeight: "500",
    marginBottom: 10,
    color: '#7CF277'
  },
  title:{
    color: '#FFFFFF',
    fontSize: 32,
  },
  availableText: {
    color: '#FFFFFF'
  },

});
