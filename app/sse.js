export const registerSSE = () => {
    const evtSource = new EventSource('/sse');

    evtSource.onopen = event => {
      console.log('sse connection is opened')
    };

    evtSource.onmessage = event => {
      try {
        const jsonData = JSON.parse(event.data);
        console.log('sse incoming data ', jsonData);
      } catch (e) {
        console.log(e);
      }
    };

    evtSource.onerror = event => {
      if (event.readyState === EventSource.CLOSED) {
        console.log('sse connection is closed')
      }
    };

    setTimeout(() => {
      console.log('client closes the sse connection');
      evtSource.close();
    }, 30000);
}
