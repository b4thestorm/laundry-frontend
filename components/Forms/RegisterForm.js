import React, { useState, useContext, useRef } from 'react';
import { Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TextInput, Button } from 'react-native-paper';
import { Formik, useField, useFormik } from 'formik';
import {login} from 'root/redux/actions/loginAction'
import {useDispatch} from 'react-redux'
import {URLS} from 'root/utils/constants'
import styles from './style'


const RegisterForm = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const handleSubmit = (data) => {
    const payload = {
      email: data?.email,
      phone_number: data?.phone_number,
      password: data?.password,
      password2: data?.password2,
    };

    fetch(URLS.register, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).then((response) => {
        return response.json();
      }).then((data) => {
        dispatch(login({token: data?.token}))
      }).catch((error) => {
        console.error('Error:', error);
      });
  };

  const initialValues = {
    email: '',
    phone_number: '',
    password: '',
    password2: '',
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {(formikProps) => (
          <View style={{ paddingLeft: 16, paddingRight: 16, top: 150 , backgroundColor: '#212121'}}>
            <Text style={styles.labels}>EMAIL</Text>
            <TextInput
              onChangeText={formikProps.handleChange('email')}
              value={formikProps.values.name}
              name={'email'}
              style={{backgroundColor: '#3B3B3B'}}
            >
              <Text style={{ color: 'red', backgroundColor: '#3B3B3B' }}>{formikProps.errors.email}</Text>
            </TextInput>
            <Text style={styles.labels}>PHONE NUMBER</Text>
            <TextInput
              onChangeText={formikProps.handleChange('phone_number')}
              value={formikProps.values.name}
              name={'phone_number'}
              style={{backgroundColor: '#3B3B3B'}}
            >
              <Text style={{ color: 'red', marginBottom: 10}}>
                {formikProps.errors.phone_number}
              </Text>
            </TextInput>
            <Text style={styles.labels}>PASSWORD</Text>
            <TextInput
              onChangeText={formikProps.handleChange('password')}
              value={formikProps.values.name}
              name={'password'}
              style={{backgroundColor: '#3B3B3B'}}
            >
              <Text style={{ color: 'red', marginBottom: 10 }}>
                {formikProps.errors.password}
              </Text>
            </TextInput>
            <Text style={styles.labels}>PASSWORD CONFIRMATION</Text>
            <TextInput
              onChangeText={formikProps.handleChange('password2')}
              value={formikProps.values.name}
              name={'password2'}
              style={{backgroundColor: '#3B3B3B', marginBottom: 20}}
            >
              <Text style={{ color: 'red' }}>
                {formikProps.errors.password2}
              </Text>
            </TextInput>
            <Button mode="contained" onPress={formikProps.handleSubmit}>
              Submit
            </Button>
          </View>
        )}
      </Formik>
    </>
  );
};

export default RegisterForm;
