import React, { Component } from 'react';
import VolumeIndicator from './VolumeIndicator';

const wsURL = `${process.env.REACT_APP_WSS_URL}:${process.env.REACT_APP_WSS_PORT}`;

class App extends Component {
  state = {
    webhookData: '',
    previousVolume: 0,
    newVolume: 0,
    roomName: '',
  };

  ws = new WebSocket(wsURL);

  componentDidMount() {
    console.log(wsURL);

    // we should be grabbing the state of our app on initial load...
    fetch(process.env.REACT_APP_SONOS_STATE_URL)
      .then(response => response.json())
      .then(data => {
        this.setState({ newVolume: data.volume });
      });

    this.ws.onopen = () => {
      console.log('ws connected');
    }

    this.ws.onmessage = (evt) => {
      const { type, data } = JSON.parse(evt.data);

      if (type === 'volume-change') {
        this.setState({
          webhookData: data,
          previousVolume: data.previousVolume,
          newVolume: data.newVolume,
          roomName: data.roomName,
        });
      } else {
        this.setState({
          newVolume: data.groupState.volume,
        })
      }
    }

    this.ws.onclose = () => {
      console.log('ws disconnected');
    }
  }

  render() {
    const { previousVolume, newVolume } = this.state;

    return (
      <div className="app">
        <VolumeIndicator previousVolume={previousVolume} newVolume={newVolume} />
      </div>
    );
  }
}

export default App;
