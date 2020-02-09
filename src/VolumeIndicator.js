import React from 'react';

const VolumeIndicator = (props) => {
  const { newVolume } = props;
  const barPercentage = `${newVolume}%`;

  return (
    <div className="volume-indicator">
      <div className="volume-indicator__bar">
        <div
          className="volume-indicator__bar__progress"
          style={{ height: barPercentage }}
        />
      </div>
      <span className="volume-indicator__number">
        {newVolume !== 0 && newVolume}
      </span>
    </div>
  );
}

export default VolumeIndicator;
