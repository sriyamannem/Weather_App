import React, {useState} from 'react'; 
import './App.css';
import "https://kit.fontawesome.com/ff8e055133.js"

const api={
  key:"13e48f3009542e06937fa68c9b5da135",
  base:"https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const searchenter = evt =>{
    if (evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&appid=${api.key}`)
      .then(res => res.json())
      .then(result => {
          setWeather(result); setQuery('');
          console.log(weather);
      });
    }
  }

  function searchbutton(){
    fetch(`${api.base}weather?q=${query}&appid=${api.key}`)
    .then(res => res.json())
    .then(result => {
        setWeather(result); setQuery('');
        console.log(weather);
    });
  }


  return (
    <div className="App">
      <div className="searchbox">
        <input className="searchtxt" type="search"  
        placeholder="Search a city..." 
        onChange ={e => setQuery(e.target.value)}
        value={query} onKeyPress={searchenter}/>
         <button className="searchButton" href="#" onClick={searchbutton} >     
                <i className="fas fa-search"></i>
        </button> 
      </div>


      <div className="card">

        {(typeof weather.main !== "undefined") ? (
          <div className="weather display info">
            <h2 className="city">Weather in {weather.name}, {weather.sys.country} </h2> 
            <span class="degrees"> {Math.round(weather.main.temp - 273.15)}°c</span>
            <p className="condition">{weather.weather[0].main}</p> 
            <p className="high">H:{Math.round(weather.main.temp_max-273.15)}°c</p>  
            <p className="low"> L:{Math.round(weather.main.temp_min-273.15)}°c</p>
          </div>
        ):[<h2 className="welcomemessage"> Welcome! {"\n\n"}Please enter a city in search bar to check the weather. </h2>] }

        {weather.cod === '404' ? (
        <p className="errormessage">City not found. Please try again.</p>
        ):['']}
      </div> 
    </div>
  );
}

export default App;
