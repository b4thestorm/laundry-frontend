import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {Text, View, Button } from 'react-native';
import {URLS} from 'root/utils/constants'
import ProgressBar from 'root/components/Progress'
import {useSelector} from 'react-redux';
import Style from './style'

const TimeElapsed = ({id, owner, elapsed}) => {
   const authToken = useSelector((state) => state)
   const token = authToken.auth?.token?.token
   const [elapsedTime, setElapsedTime] =  useState(parseInt(elapsed))
   const [isRunning, setIsRunning] = useState(true)
   const [step, setStep] = useState(0)

   async function sendPushNotification(expoPushToken) {
     const message = {
       to: expoPushToken,
       sound: 'default',
       title: 'Your Laundry is Ready',
       body: 'Hey! your laundry is ready, Please go down to pick it up :)',
     };

     await fetch('https://exp.host/--/api/v2/push/send', {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Accept-encoding': 'gzip, deflate',
         'Content-Type': 'application/json',
       },
      body: JSON.stringify(message),
    });
  }

   const formattedTime = (str) => {
      return (<>
             <Text style={Style.ownerInfo}>{str}</Text>
             <Text style={Style.remaining}>{elapsedTime.toString()}</Text>
             </>
            )
   }

   useEffect(()=> {
      if (isRunning) {
        const checkTime = setInterval(() => {
           setElapsedTime((prevValue) => prevValue - 1)
           setStep((prevStep) => (prevStep + 1))
        }, 1000)
        return () => clearInterval(checkTime)
      }
   }, [isRunning])

   useEffect(() => {
     if (elapsedTime === 0) {
       fetch(`${URLS.set_expired}?id=${id}`, {
         method: 'GET',
         headers: {
         'Content-Type': 'application/json',
         'Authorization': `Token ${token}`}
       })
       setIsRunning(() => false)
     }
   }, [elapsedTime])

   return (
     <View style={Style.timerContainer}>
       {isRunning ? (
         <>
          <ProgressBar step={step} steps={parseInt(elapsed)} elapsedTime={elapsedTime.toString()} owner={owner}/>
         </>
       ): (<Text>Alert</Text>)
     }
     </View>
   )
}

TimeElapsed.propTypes = {
  id: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  elapsed: PropTypes.string.isRequired,
};

export default TimeElapsed;
