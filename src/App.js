import './App.css';
import { TodoWrapper } from './components/TodoWrapper';
import Timer from "./components/timer/Timer";
import Settings from "./components/timer/Settings";
import {useState} from "react";
import SettingsContext from "./components/timer/SettingsContext";



function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(15);

  return (
    
     <main>
      <div className="App">
      <TodoWrapper  />
    </div>
     <SettingsContext.Provider value={{
       showSettings,
       setShowSettings,
       workMinutes,
       breakMinutes,
       setWorkMinutes,
       setBreakMinutes,
     }}>
       {showSettings ? <Settings /> : <Timer />}
     </SettingsContext.Provider>
   </main>
  );
}

export default App;