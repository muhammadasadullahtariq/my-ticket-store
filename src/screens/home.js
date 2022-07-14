import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import checkEvent from '../api/checkEvent';
import {useNavigation} from '@react-navigation/native';
import * as COLORS from '../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WaitingAlert from '../components/waitingAlert';
import showToast from '../components/toast';

const Screen = () => {
  const navigation = useNavigation(); // eslint-disable-line
  const [flash, setFlash] = useState(false);
  const [waitingAlertFlag, setWaitingAlertFlag] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [bannerText, setBannerText] = useState('');
  const [bannerColor, setBannerColor] = useState('');

  useEffect(() => {
    (async function checkEvent() {
      try {
        console.log('i called');
        const eventId = await AsyncStorage.getItem('eventId');
        const eventTicket = await AsyncStorage.getItem('eventTicket');
        console.log('eventId: ', eventId);
        console.log('eventTicket: ', eventTicket);
        if (eventId && eventTicket) {
          global.eventId = eventId;
          global.eventTicket = eventTicket;
          navigation.reset({routes: [{name: 'ScanTicket'}]});
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const onSuccess = async result => {
    setWaitingAlertFlag(true);
    console.log(result);
    const data = await checkEvent(result.data);
    setWaitingAlertFlag(false);
    if (data.status === 1) {
      navigation.reset({routes: [{name: 'ScanTicket'}]});
    } else if (data.status === 2) {
      setShowBanner(true);
      setBannerText(data.text);
      setBannerColor(data.color);
    } else if (data.status === 3) {
      showToast('Not valid QR code');
      setShowBanner(false);
    } else if (data.status === 'erro') {
      showToast('Some error occure please try again');
      setShowBanner(false);
    }
  };

  return (
    <View style={{flex: 1}}>
      <WaitingAlert visible={waitingAlertFlag} />
      <QRCodeScanner
        onRead={onSuccess}
        reactivate={true}
        reactivateTimeout={2000}
        flashMode={
          flash
            ? RNCamera.Constants.FlashMode.torch
            : RNCamera.Constants.FlashMode.off
        }
        topContent={
          <View style={{width: '100%'}}>
            <Text style={styles.centerText}>Scan Event Ticket</Text>
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
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: 'center',
              width: '100%',
            }}
            style={{
              width: '100%',
              paddingHorizontal: 10,
              marginTop: Platform.OS != 'ios' ? 50 : 0,
            }}>
            {showBanner ? (
              <View
                style={[
                  styles.bannerContainer,
                  {backgroundColor: bannerColor},
                ]}>
                <Text style={styles.bannerText}>{bannerText}</Text>
              </View>
            ) : null}
          </ScrollView>
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
  bannerContainer: {
    marginTop: 20,
    width: '100%',
    minHeight: 100,
    backgroundColor: 'red',
  },
  bannerText: {
    paddingHorizontal: 20,
    paddingTop: 20,
    fontSize: 18,
    fontWeight: '500',
  },
});

export default Screen;
