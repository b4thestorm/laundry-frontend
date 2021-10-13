import React, { useContext } from 'react';
import { Text } from 'react-native';
import { IconButton, Colors } from 'react-native-paper';
import {logout} from 'root/redux/actions/loginAction'
import {useDispatch } from 'react-redux'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const logOut = () => {
    dispatch(logout({token: null}))
  }

  return (
    <IconButton icon="door" color={Colors.red500} size={40} onPress={logOut} />
  );
};

export default LogoutButton;
