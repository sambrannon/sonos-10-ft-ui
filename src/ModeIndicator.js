import React from 'react';

const ModeIndicator = (props) => {
  const { nightModeEnabled, speechEnhancementEnabled } = props;

  return (
    <div className="mode-indicator">
      {nightModeEnabled &&
        <p>Night mode enabled</p>
      }
      {speechEnhancementEnabled &&
        <p>Speech enhancement enabled</p>
      }
    </div>
  );
}

export default ModeIndicator;
