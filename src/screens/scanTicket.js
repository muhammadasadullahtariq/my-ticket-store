import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import checkTicket from '../api/checkTicket';
import {useNavigation} from '@react-navigation/native';
import * as COLORS from '../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import showToast from '../components/toast';
import WaitingAlert from '../components/waitingAlert';
import {useIsFocused} from '@react-navigation/native';

const Screen = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation(); // eslint-disable-line
  const [flash, setFlash] = useState(false);
  const [waitingAlertFlag, setWaitingAlertFlag] = useState(false);
  const scanner = useRef();
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const onSuccess = async result => {
    setWaitingAlertFlag(true);
    console.log(result);
    const data = await checkTicket(result.data);
    setWaitingAlertFlag(false);
    if (data.status === 1) {
      navigation.navigate('TicketResult', {color: data.color, text: data.text});
    } else if (data.status === 2 && data.text === 'Ticket nicht vorhanden') {
      showToast('Ticket is not valid');
    } else if (data.status === 2) {
      showToast('Ticket is already used');
    } else if (data.status === 'error') {
      showToast('Some error occure please try again');
    }
  };

  const backButtonPrss = async () => {
    AsyncStorage.removeItem('eventId');
    AsyncStorage.removeItem('eventTicket');
    global.eventId = null;
    global.eventTicket = null;
    navigation.reset({routes: [{name: 'Home'}]});
  };

  useEffect(() => {
    (async function checkEvent() {
      try {
        console.log('i called');
        const eventId = await AsyncStorage.getItem('eventId');
        const eventTicket = await AsyncStorage.getItem('eventTicket');
        console.log('eventId: ', eventId);
        console.log('eventTicket: ', eventTicket);
        if (eventId && eventTicket) {
          setShowDeleteButton(true);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <View style={{flex: 1}}>
      <WaitingAlert visible={waitingAlertFlag} />
      <QRCodeScanner
        onRead={onSuccess}
        ref={scanner}
        reactivate={true}
        reactivateTimeout={2000}
        flashMode={
          flash
            ? RNCamera.Constants.FlashMode.torch
            : RNCamera.Constants.FlashMode.off
        }
        topContent={
          <View style={{width: '100%'}}>
            <Text style={styles.centerText}>Scan Ticket</Text>
            <View style={styles.flashContainer}>
              <Text style={{fontSize: 18}}>Flash</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setFlash(!flash)}>
                <View
                  style={{
                    borderWidth: 1,
                    backgroundColor: flash ? COLORS.primary : '#fff',
                    borderRadius: 20,
                    width: 20,
                    height: 20,
                    borderColor: COLORS.primary,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        }
        bottomContent={
          showDeleteButton ? (
            <TouchableOpacity
              onPress={backButtonPrss}
              style={styles.buttonContainer}>
              <Text style={styles.textContainer}>Delete Event</Text>
            </TouchableOpacity>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  centerText: {
    fontSize: 18,
    justifyContent: 'center',
    color: COLORS.primary,
    textAlign: 'center',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  flashContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 50,
    width: 100,
    height: 48,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  textContainer: {
    color: '#fff',
  },
});

export default Screen;
