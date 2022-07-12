import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';
import * as COLORS from '../constants/colors';

//Screens
import Home from '../screens/home';
import TicketResult from '../screens/ticketResult';
import ScanTicket from '../screens/scanTicket';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{}}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TicketResult"
          component={TicketResult}
          options={{title: 'Result', headerShown: false}}
        />
        <Stack.Screen
          name="ScanTicket"
          component={ScanTicket}
          options={{title: 'Result', headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
