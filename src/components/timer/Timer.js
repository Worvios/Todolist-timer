import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from "./PlayButton.js";
import PauseButton from "./PauseButton";
import SettingsButton from "./SettingsButton";
import {useContext, useState, useEffect, useRef} from "react";
import SettingsContext from "./SettingsContext";
import notificationSound from './notificationSound.mp3'; // adjust the path as necessary

const red = '#FF6961';
const green = '#77DD77';

function Timer() {
  const settingsInfo = useContext(SettingsContext);

  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState('work'); // work/break/null
  const [secondsLeft, setSecondsLeft] = useState(0);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  const audio = new Audio(notificationSound); // add this line to create an audio object

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {

    function switchMode() {
      const nextMode = modeRef.current === 'work' ? 'break' : 'work';
      const nextSeconds = (nextMode === 'work' ? settingsInfo.workMinutes : settingsInfo.breakMinutes) * 60;

      setMode(nextMode);
      modeRef.current = nextMode;

      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;

    
      audio.play(); // play the sound when the mode switches
    }

    secondsLeftRef.current = settingsInfo.workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        return switchMode();
      }

      tick();
    },1000);

    return () => clearInterval(interval);
     // eslint-disable-next-line
  }, [settingsInfo] );

  const totalSeconds = mode === 'work'
    ? settingsInfo.workMinutes * 60
    : settingsInfo.breakMinutes * 60;
  const percentage = Math.round(secondsLeft / totalSeconds * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if(seconds < 10) seconds = '0'+seconds;

  return (
    <div style={{marginTop:'20px'}}>
      <CircularProgressbar
        className="timer"
        value={percentage}
        text={minutes + ':' + seconds}
        styles={buildStyles({
        textColor:'#fff',
        pathColor:mode === 'work' ? red : green,
        tailColor:'rgba(255,255,255,.2)',
      })} />
      <div style={{marginTop:'10px'}}>
        {isPaused
          ? <PlayButton onClick={() => { setIsPaused(false); isPausedRef.current = false; }} />
          : <PauseButton onClick={() => { setIsPaused(true); isPausedRef.current = true; }} />}
      </div>
      <div style={{marginTop:'5px'}}>
        <SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />
      </div>
    </div>
  );
}

export default Timer;
