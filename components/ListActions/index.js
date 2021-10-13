import {StyleSheet, Text, View, Button} from 'react-native';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Card} from 'react-native-paper';
import TimeElapsed from 'root/components/TimeElapsed';
import Style from './style'

const ListActions = ({items}) => {
  const [expired, setExpired] = useState(false)

return (
  <>
  <View style={Style.activityContainer}>
  {items.length === 0 && (
    <View>
      <Text style={{fontSize: 20}}> Probably No One Downstairs</Text>
    </View>
  )}
  {items.map((item, i) => {
    return (
      <View key={i} style={Style.listItem}>
          <TimeElapsed id={`${item.id}`} owner={`${item['number_of_machines']} ${item['machine_type']}`} elapsed={`${item['minutes']}`} style={Style.remaining}/>
     </View>
    )
  })}
</View>
</>
)
}

ListActions.propTypes = {
  items: PropTypes.array.isRequired,
};



export default ListActions;
