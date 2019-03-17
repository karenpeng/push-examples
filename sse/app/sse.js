export const registerSSE = () => {
    const evtSource = new EventSource('/sse');
    evtSource.onmessage = event => {
      try {
        const jsonData = JSON.parse(event.data);
        console.log(jsonData);
      } catch (e) {
        console.log(e);
      }
    }

    evtSource.onerror = event => {
      if (event.readyState === EventSource.CLOSED) {
        console.log('connection is closed')
      }
    }

    evtSource.onopen = event => {
      console.log('connection is opened')
    }

    setTimeout(() => {
      console.log('client closes the connection');
      evtSource.close();
    }, 30000);
}
