<script setup lang="ts">
import { computed, ref } from "vue";
import { ListedWeatherData, WeatherData } from "./interfaces/WeatherData";
import GoogleAddressAutocomplete from "vue3-google-address-autocomplete";

const isToggled = ref(true);
const handleToggleChange = () => {
    isToggled.value = !isToggled.value;
};

const apiKey = "";
const googleApiKey = "";
const location = ref<string>();
const weatherData = ref<WeatherData>();
const listedWeatherData = computed<ListedWeatherData | undefined>(() => {
    if (!weatherData.value) {
        return undefined;
    }
    const lwd: ListedWeatherData = {
        date: getTime(weatherData.value.timezone),
        location: `${weatherData.value.name}, ${weatherData.value.sys.country}`,
        icon: `http://openweathermap.org/img/wn/${weatherData.value.weather[0].icon}.png`,
        temp: isToggled.value
            ? `${Math.round(weatherData.value.main.temp)}°C`
            : `${Math.round((weatherData.value.main.temp * 9) / 5 + 32)}°F`,
        feels: isToggled.value
            ? `Feels like ${Math.round(weatherData.value.main.feels_like)}°C`
            : `Feels like ${Math.round((weatherData.value.main.feels_like * 9) / 5 + 32)}°F`,
        mainDescription: `${weatherData.value.weather[0].main}`,
        subDescription: `${weatherData.value.weather[0].description}`,
        wind: `${weatherData.value.wind.speed}m/s ${getWindDirection(weatherData.value.wind.deg)}`,
        humidity: `${weatherData.value.main.humidity}%`,
        visibility: `${weatherData.value.visibility / 1000}km`,
        sunrise: getTime(weatherData.value.timezone, weatherData.value.sys.sunrise),
        sunset: getTime(weatherData.value.timezone, weatherData.value.sys.sunset),
    };

    return lwd;
});

async function getDailyWeather(lat: number, lon: number) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json: WeatherData = await response.json();
        weatherData.value = json;
    } catch (error: any) {
        console.error(error.message);
    }
}


function getWindDirection(degrees: number): string {
    // Define the compass directions
    const directions = [
        "N",
        "NNE",
        "NE",
        "ENE",
        "E",
        "ESE",
        "SE",
        "SSE",
        "S",
        "SSW",
        "SW",
        "WSW",
        "W",
        "WNW",
        "NW",
        "NNW",
    ];

    // Calculate the index for the direction array
    const index = Math.round(degrees / 22.5) % 16;

    // Return the corresponding direction
    return directions[index];
}

function getTime(tz: number, t?: number) {
    const d = t ? new Date(t * 1000) : new Date();
    const utc = d.getTime() + d.getTimezoneOffset() * 60000;
    const nd = new Date(utc + 1000 * tz);
    return nd.toLocaleTimeString();
}

function callback(place: any) {
    getDailyWeather(place.geometry.location.lat(), place.geometry.location.lng());
}
</script>

<template>
    <div class="container overflow-hidden text-ellipsis w-full">
        <div class="flex items-center space-x-3 mb-5">
           <a href="/"><img class=" mx-auto w-[10vw]" src="./components/images/weather_logo.png" alt="Logo"></img></a>
            <GoogleAddressAutocomplete
                @callback="callback"
                v-model="location"
                :apiKey="googleApiKey"
                placeholder="Search and select location..."
                class="p-3 h-12 w-[50vw] rounded-lg"
            />

            <button
                v-on:click="callback"
                class="btn p-3 h-12 rounded-lg bg-blue-500 items-center justify-center"
                aria-label="Search"
            >
                <span class="material-symbols-outlined"> search </span>
            </button>
        </div>

        <div
            v-if="listedWeatherData"
            class="flex flex-col p-5 min-h-[65vh] min-w-[50vw] bg-[#2a323c] rounded-lg"
        >
            <div class="flex justify-end">
                <label class="inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        name=""
                        value=""
                        class="sr-only peer"
                        @change="handleToggleChange"
                        checked
                    />
                    <span class="me-3 text-sm font-medium text-gray-900 dark:text-gray-300">°F</span>
                    <div
                        class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"
                    ></div>
                    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">°C</span>
                </label>
            </div>
            <span class="text-sm">{{ listedWeatherData.date }}</span>
            <span class="text-lg">{{ listedWeatherData.location }}</span>
            <img :src="listedWeatherData.icon" class="mx-auto my-4" />
            <span class="text-5xl mb-5">{{ listedWeatherData.temp }} </span>

            <div class="flex mx-auto mt-5 mb-10 space-x-10">
                <div class="flex flex-col space-y-1">
                    <span>{{ listedWeatherData.feels }}</span>
                    <span>{{ listedWeatherData.mainDescription }}</span>
                    <span>{{ listedWeatherData.subDescription }}</span>
                </div>

                <div class="flex flex-col space-y-2">
                    <div class="flex items-center space-x-1">
                        <span class="material-symbols-outlined"> air </span>
                        <span>{{ listedWeatherData.wind }}</span>
                    </div>

                    <div class="flex items-center space-x-1">
                        <span class="material-symbols-outlined"> humidity_low </span>
                        <span> {{ listedWeatherData.humidity }}</span>
                    </div>
                    <div class="flex items-center space-x-1">
                        <span class="material-symbols-outlined"> visibility </span>
                        <span>{{ listedWeatherData.visibility }}</span>
                    </div>
                </div>
            </div>
            <div class="flex items-center mx-auto space-x-5">
                <div class="flex items-center space-x-1">
                    <span class="material-symbols-outlined"> sunny </span>
                    <span> {{ listedWeatherData.sunrise }}</span>
                </div>
                <div class="flex items-center space-x-1">
                    <span class="material-symbols-outlined"> bedtime </span>
                    <span>{{ listedWeatherData.sunset }}</span>
                </div>
            </div>
        </div>
</div>
</template>
