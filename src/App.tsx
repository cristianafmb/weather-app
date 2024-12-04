import React, { useState } from 'react';
import './App.css';
import 'bootstrap';
import { CityWeather } from './hooks/CityWeather';

import { NavbarLayout } from './components/NavbarLayout';
import { DisplayResults } from './components/DisplayResults';

function App() {

  const { loading, city, setCity, getWeather, results } = CityWeather();

  return (
    <div className="App">
        <NavbarLayout getWeather={getWeather} setCity={setCity} city={city}  />

        {loading ? <h2>Wait</h2> :
          <DisplayResults results={results} />
        }
    </div>
  );
}

export default App;
