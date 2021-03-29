import React, {useCallback} from 'react';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import PageManager from './PageManager';
import Button from 'react-bootstrap/Button';
//CSS
import './style/FullScreenApp.css';

function FullScreenApp() {
  const handle = useFullScreenHandle();
  
  return (
    <div>
      <Button variant="secondary" className="button1" onClick={handle.enter} disabled={false}>
        Tam Ekranı Aç
        </Button>

      <FullScreen handle={handle}>
      <div className="full-screenable-node" style={{background: "white"}}>
        <PageManager bt={handle} className="PageManager"></PageManager>
        </div>
      </FullScreen>
    </div>
  );
}

export default FullScreenApp;