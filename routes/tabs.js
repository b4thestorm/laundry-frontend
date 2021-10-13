import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import PropTypes from 'prop-types';
import HomeScreen from 'root/screens/HomeScreen';
import ProfileScreen from 'root/screens/ProfileScreen';
import RegisterScreen from 'root/screens/RegisterScreen';
import LoginScreen from 'root/screens/LoginScreen';
import LogoutButton from 'root/components/Button';
import React, { useEffect } from 'react';
import {useSelector} from 'react-redux';
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons';

const Stack = createStackNavigator();

const Credentialize = () => {
  return (
    <Stack.Navigator
      initialRouteName="Register"
      headerMode="screen"
      screenOptions={{
        headerStyle: { backgroundColor: '#E7D4C6' },
      }}
    >
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          title: 'Register',
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: 'Login',
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
       activeTintColor: '#fff',
       inactiveTintColor: '#fff',
       activeBackgroundColor: '#red',
       inactiveBackgroundColor: '#red',
           style: {
                 backgroundColor: '#1E1E1E',
           }
    }}
    >
      <Tab.Screen
        name="Activity"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Activity',
          tabBarIcon: () => <Feather name={'activity'} size={24} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: () => <AntDesign name={'profile'} size={24} />,
        }}
        activeColor="#00aea2"
        inactiveColor="#95a5a6"

      />
    </Tab.Navigator>
  );
};

const AppStack = () => {
  const authToken = useSelector((state) => state)

  return (
    <Stack.Navigator
      initialRouteName="Register"
      headerMode="screen"
      screenOptions={{
        headerStyle: { backgroundColor: '#E7D4C6' },
      }}
      >
      {authToken.auth.loggedIn ? (
        <Stack.Screen
          name="Activity"
          component={Tabs}
          options={{
            title: 'Activity',
            headerStyle: { backgroundColor: '#212121' },
            headerTitleStyle: {
              color: 'white',
            },
            headerRight: () => <LogoutButton />
          }}
          />
      ) : (
        <Stack.Screen
          name="Login"
          component={Credentialize}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
)
}

export { AppStack };
