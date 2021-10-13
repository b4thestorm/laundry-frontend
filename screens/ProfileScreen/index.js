import React, {useState, useEffect } from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import { TextInput, Card } from 'react-native-paper';
import { useFormik } from 'formik';
import {URLS} from 'root/utils/constants'
import MachinesInUse from 'root/components/Forms'
import styles from './style'


const ProfileScreen = () => {
  const [dryersAvailable, setDryersAvailable] = useState(null)
  const [washersAvailable, setWashersAvailable] = useState(null)

  useEffect(() => {
    fetch(`${URLS.machines_remaining}`, {
      method: 'GET',
      headers: {
      'Content-Type': 'application/json',
    }}).then((response) => {
      let content = JSON.parse(response._bodyInit)
      setDryersAvailable(content.available_dryers)
      setWashersAvailable(content.available_washer_machines)
    }).catch(e => console.log(e))
  })

  return(
     <View style={styles.container}>
       <View style={styles.cardContainer}>
       <View style={styles.card}>
          <Text style={styles.text}>{dryersAvailable}</Text>
          <Text style={styles.availableText}>{"Available" + "\n" + "Washing Machines"}</Text>
       </View>
       <View style={styles.card}>
          <Text style={styles.text}>{washersAvailable}</Text>
          <Text style={styles.availableText}>{"Available" + "\n" + "Drying Machines"}</Text>
        </View>
     </View>
      <View style={styles.machineForm}>
        <Text style={styles.title}>Book Machines</Text>
        <MachinesInUse/>
      </View>
     </View>
  )
}

export default ProfileScreen;
