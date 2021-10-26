import React from 'react';
import { ThreeForReact } from './connection/Three';
import { FullScreen } from './layouts/fullscreen';

function App() {

  return (
    <div className="App">
      <FullScreen>
        <ThreeForReact />
      </FullScreen>
    </div>
  );
}

export default App;
