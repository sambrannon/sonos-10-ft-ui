import React from 'react';

const VolumeIndicator = (props) => {
  const { previousVolume, newVolume } = props;

  return (
    <div className="volume-indicator">
      <span className="volume-indicator__number">
        {newVolume !== 0 && newVolume}
      </span>
    </div>
  );
}

export default VolumeIndicator;
