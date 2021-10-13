import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import axios from 'axios'
import ListActions from 'root/components/ListActions'
import {URLS} from 'root/utils/constants'
import styles from './style'


const HomeScreen = () => {
  const [dummyItems, setDummyItems] = useState([])
  const path = URLS.index

  const fetcher = (url) => {
    axios.get(url).then(data => {
        setDummyItems(machines => [...data.data])
    })
  }

 useEffect(()=>{
    fetcher(path)
  }, [])

   return (
     <ScrollView bounces={false}>
       <View style={styles.container}>
         <ListActions items={dummyItems}/>
       </View>
   </ScrollView>
   )
}


export default HomeScreen
