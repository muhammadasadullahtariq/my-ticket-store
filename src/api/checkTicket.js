async function checkTicket(ticketId) {
  try {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
    console.log('global.eventId: ', global.eventId);
    console.log('global.eventTicket: ', global.eventTicket);
    const result = await fetch(
      `https://my-ticket.store/api/${global.eventId}/${global.eventTicket}/${ticketId}`,
      requestOptions,
    );
    console.log('result: ', result);
    const response = await result.json();
    console.log(response);
    return response;
  } catch (error) {
    console.log('error is', error);
    return {status: 'error', message: error};
  }
}

export default checkTicket;
