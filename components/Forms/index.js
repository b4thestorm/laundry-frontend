import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, Text, View} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Formik, useField, useFormik } from 'formik';
import RNPickerSelect from "react-native-picker-select";
import Constants from 'expo-constants';
import  * as Notifications from 'expo-notifications';
import  * as Permissions from 'expo-permissions';
import {useSelector} from 'react-redux';
import {BASE} from 'root/utils/constants'
import * as yup from 'yup';

const MachinesInUse = () => {
  const [expoPushToken, setExpoPushToken] = useState('');

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      } else {
        alert('Must use physical device for Push Notifications');
      }

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
  return token;
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    console.log('im here', expoPushToken)
  }, [])

  useEffect(() => {
    fetch(`${BASE}/api/v1/save-push-token/?token=${token}`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify({push_token: expoPushToken})}
      ).then(response =>
          console.log(response.data)
      ).catch((error) => {
          console.error('Error:', error);
      });
  }, [expoPushToken])

  const authToken = useSelector((state) => state)
  const token = authToken.auth?.token?.token
  const [phoneNumber, setPhoneNumber] = useState('')
  const [timeRemaining, setTimeRemaining] = useState('')

  const validationSchema = yup.object().shape({
    phone_number: yup.string().required(),
    minutes_remaining: yup.string().required(),
    number_of_machines: yup.string().required(),
    machine_type: yup.string().required()
 })

 const handleSubmit = (data) => {
    const payload = {
      'minutes_remaining': data?.minutes_remaining,
      'number_of_machines': data?.number_of_machines,
      'machine_type': data?.machine_type,
      'token': token
    }

    // const answer  = check_availability()
    fetch(`${BASE}/api/v1/available_machines/`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(payload)}
      ).then(response =>
          console.log(response.data)
      ).catch((error) => {
          console.error('Error:', error);
      });
 }

 const initialValues = {
   minutes_remaining: '',
   number_of_machines: '',
   machine_type: ''
 }

  return (
    <View style={styles.formArea}>
      <SafeAreaView>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
             handleSubmit(values)
           }}
        >
        {(formikProps) => (
        <View>
          <Text style={{ color: '#6F6F6F', marginBottom: 11, marginTop: 10}}>Select machine</Text>
            <RNPickerSelect
                   onValueChange={(value, i) => {
                    formikProps.setFieldValue('machine_type', value)
                  }}
                   items={[
                       { label: 'Washing Machine', value: 'washers' },
                       { label: 'Dryer', value: 'dryers' },
                   ]}
                   style={{
                     inputIOS: {
                       paddingVertical: 12,
                       paddingHorizontal: 0,
                       color: "#FFF",
                    },
                    viewContainer: {
                      width: '100%',
                      backgroundColor: '#3B3B3B',
                      borderRadius: 5,
                      marginTop: 10
                    },
                    placeHolder: {
                      color: '#E7D4C6',
                    }
                   }}
                   placeholder={{}}
            />
      <Text style={{ color: '#6F6F6F', marginBottom: 11, marginTop: 10}}>Number of machines in use</Text>
        <RNPickerSelect
               onValueChange={(value, i) => {
                formikProps.setFieldValue('number_of_machines', value)
              }}
               items={[
                   { label: '1', value: '1' },
                   { label: '2', value: '2' },
                   { label: '3', value: '3' },
                   { label: '4', value: '4' },
                   { label: '5', value: '5' },
                   { label: '6', value: '6' },
               ]}
               style={{
                 inputIOS: {
                   paddingVertical: 12,
                   paddingHorizontal: 0,
                   color: "#FFF",
                },
                viewContainer: {
                  width: 350,
                  backgroundColor: '#3B3B3B',
                  borderRadius: 5,
                  marginTop: 10
                },
                placeHolder: {
                  color: '#E7D4C6',
                }
               }}
               placeholder={{}}
        />
      <Text style={{ color: '#6F6F6F', marginBottom: 11, marginTop: 10}}>Remaining time (in mins)</Text>
      <TextInput
        onChangeText={formikProps.handleChange('minutes_remaining')}
        value={formikProps.values.name}
        name={"minutes_remaining"}
        style={{ marginBottom: 20, backgroundColor: '#3B3B3B', height: 43, borderRadius: 10, borderBottom: 0, color: "#FFF"}}
      />

      <Button style={styles.submit} mode="contained" onPress={formikProps.handleSubmit} >
        BOOK
      </Button>
    </View>
      )}
     </Formik>
  </SafeAreaView>
</View>
  )
}

const styles = StyleSheet.create({
 formArea: {
   display: 'flex',
 },
 titleText: {
   left: 80,
 },
 submit: {
   marginTop: 10,
   backgroundColor: "#0179FF"
 }
})

export default MachinesInUse;
