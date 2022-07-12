import React from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
} from 'react-native';

const screen = props => {
  return (
    <Modal visible={props.visible} transparent={true} style={{height: 3}}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#00000080',
        }}>
        <View
          style={{
            width: '80%',
            backgroundColor: 'white',
            marginBottom: '10%',
            borderRadius: 10,
          }}>
          <View style={{flexDirection: 'row', padding: 10}}>
            <ActivityIndicator size="large" color="#1692ff" />
            <Text style={{marginLeft: 20, fontSize: 25}}>Please wait</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
  textContainer: {fontSize: 20, padding: 10},
});

export default screen;
