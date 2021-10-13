import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  activityContainer: {
    position: 'absolute',
    paddingTop: 50,
    height: '80%',
    width: '100%',
  },
  listItem: {
    position: 'relative',
    backgroundColor: 'white',
    flexDirection: 'row',
    height: 100,
    borderRadius: 6,
    margin: 2,
    marginBottom: 10,
    paddingHorizontal: 0,
    paddingVertical: 0,
    shadowColor: "#000",
    shadowOffset: {
	     width: 0,
	      height: 4,
      },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
  },
  listText:{
    fontWeight: '500',
    fontSize: 28,
    lineHeight: 32,
  },
  remaining: {
    left: '100%'
  }

});
