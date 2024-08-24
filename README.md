# Weather Update 🌤️

The website is hosted on [Netlify](https://checkweatherupdateapp.netlify.app/)

A responsive and dynamic weather application built with **Vue3**, **TypeScript**, and **Tailwind**. This app allows users to search for any location, view current weather conditions, and choose between metric and imperial units for temperature display. The app leverages the **OpenWeather API** for real-time weather data and the **Google Places API** for seamless location search.

## Features
- 🌍 Location Search: Easily search for any location worldwide using Google Address Autocomplete.
- 🌡️ Real-Time Weather: Fetch current weather data including temperature, humidity, and wind speed.
- ⚖️ Unit Options: Toggle between metric and imperial units for temperature and other measurements.
- 📱 Responsive Design: Optimized for all screen sizes, providing a seamless experience on mobile, tablet, and desktop devices.
- 🎨 Modern UI: Designed with Tailwind CSS for a clean and engaging user interface.

### Usage 

- **Search for a Location:** Use the search bar to find your desired location. The app will automatically fetch and display the weather details for the selected location.
- **Toggle Units:** Switch between Celsius and Fahrenheit to view the temperature in your preferred unit.

### Technologies Used
**Frontend:** 
- Vue3
- TypeScript
- Tailwind
  
**APIs:**
- OpenWeather API
- Google Places API

### API Integration
- **OpenWeather API:** Retrieves current weather data based on the geographic coordinates (latitude and longitude) of the selected location.
- **Google Places API:** Provides location suggestions and returns geographic coordinates to be used with the weather API.
