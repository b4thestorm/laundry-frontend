import React, {useEffect, useState, useRef} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {Button} from 'react-native-paper';
import RegisterForm from 'root/components/Forms/RegisterForm'
import styles from './style'



const RegisterScreen = () => {
  const navigation = useNavigation();

   return (
     <View style={styles.container}>
      <Text style={styles.title}>Get your laundry</Text>
      <RegisterForm/>
        <View style={styles.formContainer}>
          <Text style={styles.copy}>Already signed up?</Text>
          <Button mode='text' onPress={()=> navigation.navigate("Login")}> Log In </Button>
        </View>
     </View>
   )
}

export default RegisterScreen
