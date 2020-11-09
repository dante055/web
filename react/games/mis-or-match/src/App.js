import React from 'react';
import './App.css';
import GameEndScreen from './components/GameEndScreen/GameEndScreen';
import GameMainScreen from './components/GameMainScreen/GameMainScreen';
import GameStartScreen from './components/GameStartScreen/GameStartScreen';

function App() {
  return (
    <div className='App'>
      <h1 className='page-title'>Mis-Or-Match</h1>
      <GameStartScreen />
      <GameMainScreen />
      <GameEndScreen />
    </div>
  );
}

export default App;
