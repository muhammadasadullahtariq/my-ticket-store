import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from 'react-native';
import * as COLORS from '../constants/colors';
import {StackActions} from '@react-navigation/native';

const Screen = ({route, navigation}) => {
  const {text} = route.params;
  const {color} = route.params;
  const popAction = StackActions.pop(1);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: color}}>
      <View style={[styles.mainContainer, {backgroundColor: color}]}>
        <Text style={styles.ticketTextContainer}>{text}</Text>
        <View style={{flex: 1}} />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            console.log('back button pressed');
            navigation.dispatch(popAction);
          }}
          style={styles.buttonContainer}>
          <Text style={styles.textContainer}>Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  buttonContainer: {
    marginBottom: 50,
    width: 100,
    height: 48,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    color: '#fff',
  },
  ticketTextContainer: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 50,
  },
});

export default Screen;
