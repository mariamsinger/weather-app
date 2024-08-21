export interface WeatherData {
    coord: Coordinates;
    weather: WeatherCondition[];
    base: string;
    main: MainData;
    visibility: number;
    wind: WindData;
    clouds: CloudsData;
    rain: RainData;
    snow: SnowData;
    dt: number;
    sys: SysData;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

export interface ListedWeatherData {
    date: string;
    location: string;
    icon: string;
    temp: string;
    feels: string;
    mainDescription: string;
    subDescription: string;
    wind: string;
    humidity: string;
    visibility: string;
    sunrise: string;
    sunset: string;
}

interface Coordinates {
    lon: number;
    lat: number;
}

interface WeatherCondition {
    id: number,
    main: string;
    description: string;
    icon: string;
}

interface MainData {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
}

interface WindData {
    speed: number;
    deg: number;
    gust: number;
}

interface CloudsData {
    all: number;
}

interface RainData {
    "1h"?: number;
    "3h"?: number;
}

interface SnowData {
    "1h"?: number;
    "3h"?: number;
}

interface SysData {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
}