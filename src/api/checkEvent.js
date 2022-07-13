import AsyncStorage from '@react-native-async-storage/async-storage';

async function checkEvent(data) {
  try {
    if (data.indexOf(':') === -1) {
      return {status: 3};
    }
    var dataSeperator = data.split(':');
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    const result = await fetch(
      `https://my-ticket.store/api/${dataSeperator[0]}/${dataSeperator[1]}/0`,
      requestOptions,
    );
    const response = await result.json();
    if (response.status === 1) {
      console.log('save id is called');
      saveIdToFile(dataSeperator[0], dataSeperator[1]);
      global.eventId = dataSeperator[0];
      global.eventTicket = dataSeperator[1];
    } else {
      global.eventId = dataSeperator[0];
      global.eventTicket = dataSeperator[1];
    }
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return {status: 'error', message: error};
  }
}

async function saveIdToFile(eventId, eventToken) {
  try {
    await AsyncStorage.setItem('eventId', eventId);
    await AsyncStorage.setItem('eventTicket', eventToken);
  } catch (error) {

    console.log(error);
  }
}

export default checkEvent;
