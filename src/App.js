import React from 'react';
import './App.css';
import Header from './Header';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMoneyBillWave } from '@fortawesome/free-solid-svg-icons'

library.add(faMoneyBillWave);

function App() {
  return (
    <div className="App">
		<Header />
    </div>
  );
}

export default App;
