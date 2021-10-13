import React, {useRef, useEffect, useState} from 'react'
import PropTypes from 'prop-types';
import {Animated, View, Text} from 'react-native'
import Style from './style'


const ProgressBar = ({ step, steps, elapsedTime, owner }) =>  {
  const [width, setWidth] = useState(0)
  const animatedValue = useRef(new Animated.Value(-100)).current
  const reactive = useRef(new Animated.Value(-100)).current

  useEffect(()=> {
    Animated.timing(animatedValue, {
      toValue: reactive,
      duration: 300,
      useNativeDriver: true
    }).start()
  }, [])

  useEffect(() => {
      reactive.setValue(-width + (width * step/steps))
  }, [step, width])

  return (
      <View
      onLayout={e => {
        const newWidth = e.nativeEvent.layout.width
        setWidth(newWidth)
      }}
      style={{
        height: 100,
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'space-between'
       }}
        >
        <Text style={Style.ownerInfo}>{owner}</Text>
        <Text style={Style.remaining}>{elapsedTime.toString()} mins</Text>
        <Animated.View
        style={{
          bottom: 55,
          opacity: .50,
          height: 100,
          borderRadius: 10,
          backgroundColor: 'red',
          transform: [{
            translateX: reactive
           }]
        }}
          />
      </View>
  )
}
ProgressBar.propTypes = {
  step: PropTypes.number.isRequired,
  steps: PropTypes.number.isRequired,
  elapsedTime: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
};

export default ProgressBar
