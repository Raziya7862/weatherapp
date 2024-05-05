import "./App.css";
import { useState } from "react";
import ReactDOM from 'react-dom';

const api = {
  key: "38a65d721b7ca2fa05cc3baf249efb49",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(null);

  // Function to fetch weather data when search button is clicked
  const searchPressed = () => {
    // Check if search input is empty
    if (!search) {
      setError("Please enter a city or town");
      return;
    }

    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => {
        // Check if response is successful
        if (!res.ok) {
          throw new Error("Failed to fetch weather data");
        }
        return res.json();
      })
      .then((result) => {
        setWeather(result);
        setError(null); // Clear any previous error
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setError("Failed to fetch weather data. Please try again later.");
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* Title */}
        <h1>Weather App</h1>

        {/* Search Input and Button */}
        <div>
          <input
            type="text"
            placeholder="Enter city/town..."
            value={search} // Controlled input value
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchPressed}>Search</button>
        </div>

        {/* Display any errors */}
        {error && <p className="error">{error}</p>}

        {/* Display weather information */}
        {weather.name && (
          <div>
            {/* Location */}
            <p>Location: {weather.name}</p>

            {/* Weather Condition */}
            <p>Condition: {weather.weather[0].main}</p>

            {/* Temperature */}
            <p>Temperature: {weather.main.temp}°C</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
