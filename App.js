import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useReducer } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppStack } from 'root/routes/tabs';
import {Provider, useSelector} from 'react-redux'
import store from 'root/redux/store';
import LoginScreen from 'root/screens/LoginScreen';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {

  return (
   <Provider store={store}>
    <NavigationContainer>
       <AppStack/>
    </NavigationContainer>
   </Provider>

  );
}
