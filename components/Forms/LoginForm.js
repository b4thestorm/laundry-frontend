import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Formik, useField, useFormik } from 'formik';
import {login} from 'root/redux/actions/loginAction'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import {URLS} from 'root/utils/constants'
import styles from './style'

const LoginForm = () => {
  const dispatch = useDispatch()
  const authToken= useSelector((state) => state)

  const handleSubmit = (data) => {
    const payload = {
      email: data?.email,
      password: data?.password,
      password2: data?.password,
      username: data?.email
    };
    axios.post(URLS.login, payload).then((response) => {
        dispatch(login({
          token: response.token,
        }))
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const initialValues = {
    email: '',
    password: '',
    password2: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {(formikProps) => (
        <View style={styles.formContainer}>
          <Text style={styles.labels}>EMAIL</Text>
          <TextInput
            onChangeText={formikProps.handleChange('email')}
            value={formikProps.values.name}
            name={'email'}
            style={styles.input}
           >
            <Text style={{ color: 'red' }}>{formikProps.errors.email}</Text>
          </TextInput>
          <Text style={styles.labels}>PASSWORD</Text>
          <TextInput
            onChangeText={formikProps.handleChange('password')}
            value={formikProps.values.name}
            name={'password'}
            style={styles.input}
          >
            <Text style={{ color: 'red' }}>{formikProps.errors.password}</Text>
          </TextInput>
          <Button mode="contained" onPress={formikProps.handleSubmit} style={styles.button}>
            LOGIN
          </Button>
        </View>
      )}
    </Formik>
  );
};

export default LoginForm;
