import React, { Component } from 'react';
import VolumeIndicator from './VolumeIndicator';
import ModeIndicator from './ModeIndicator';

const wsURL = `${process.env.REACT_APP_WSS_URL}:${process.env.REACT_APP_WSS_PORT}`;

class App extends Component {
  state = {
    previousVolume: 0,
    newVolume: 0,
    nightModeEnabled: false,
    speechEnhancementEnabled: false,
  };

  ws = new WebSocket(wsURL);

  componentDidMount() {
    // we should be grabbing the state of our app on initial load...
    fetch(process.env.REACT_APP_SONOS_STATE_URL)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          newVolume: data.volume,
          speechEnhancementEnabled: data.equalizer.speechEnhancement,
          nightModeEnabled: data.equalizer.nightMode,
        });
      });

    this.ws.onopen = () => {
      console.log('ws connected');
    }

    this.ws.onmessage = (evt) => {
      const { data } = JSON.parse(evt.data);

      if (data.newVolume && data.previousVolume) {
        this.setState({
          previousVolume: data.previousVolume,
          newVolume: data.newVolume,
        });
      } else {
        console.log(data);
      }
    }

    this.ws.onclose = () => {
      console.log('ws disconnected');
    }
  }

  render() {
    const {
      previousVolume,
      newVolume,
      nightModeEnabled,
      speechEnhancementEnabled,
    } = this.state;

    return (
      <div className="app">
        <div className="app__inner">
          <VolumeIndicator
            previousVolume={previousVolume}
            newVolume={newVolume}
          />
          <ModeIndicator
            nightModeEnabled={nightModeEnabled}
            speechEnhancementEnabled={speechEnhancementEnabled}
          />
        </div>
      </div>
    );
  }
}

export default App;
