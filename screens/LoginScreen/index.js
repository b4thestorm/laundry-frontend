import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {Button} from 'react-native-paper';
import LoginForm from 'root/components/Forms/LoginForm'
import styles from './style'


const LoginScreen = () => {
  const navigation = useNavigation();
   return (
     <View style={styles.container}>
       <View style={styles.loginContainer}>
         <Text style={styles.logo}>Welcome Back!</Text>
         <Text style={styles.subheadLine}>It's great to see you again</Text>
         <LoginForm/>
       </View>
       <View style={styles.formContainer}>
         <Text style={styles.copy}>not signed up?</Text>
         <Button mode='text' onPress={()=> navigation.navigate('Register')}> Register </Button>
       </View>
     </View>
   )
}

export default LoginScreen
