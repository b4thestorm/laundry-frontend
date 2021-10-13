import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  remaining: {
    fontSize: 32,
    color: "black",
    left: '35%'
  },
  timerContainer: {
    height: 100,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
  },
  timerProgress: {
    height: 100,
    backgroundColor: "red",
    position: "absolute",
    left: 0,
    top: 0
  },
  listText:{
    color: 'white',
    fontWeight: '500',
    fontSize: 28,
    lineHeight: 32,
  },
})
