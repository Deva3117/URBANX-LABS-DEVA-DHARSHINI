/* =========================================================
   NEXUSCITY AI — LIVE DATA ENGINE
   MODULE 1
   ========================================================= */

/*
 * Central live-data engine for Indian cities.
 *
 * Data source:
 * Open-Meteo
 *
 * No API key required.
 * No paid service required.
 */


/* =========================================================
   INDIAN CITY DATABASE
   ========================================================= */

const NEXUS_CITIES = {

    bengaluru: {
        name: "Bengaluru",
        latitude: 12.9716,
        longitude: 77.5946
    },

    hyderabad: {
        name: "Hyderabad",
        latitude: 17.3850,
        longitude: 78.4867
    },

    chennai: {
        name: "Chennai",
        latitude: 13.0827,
        longitude: 80.2707
    },

    mumbai: {
        name: "Mumbai",
        latitude: 19.0760,
        longitude: 72.8777
    },

    delhi: {
        name: "Delhi",
        latitude: 28.6139,
        longitude: 77.2090
    },

    kalaburagi: {
        name: "Kalaburagi",
        latitude: 17.3297,
        longitude: 76.8343
    }

};


/* =========================================================
   WEATHER CODE DESCRIPTION
   ========================================================= */

function nexusWeatherDescription(code) {

    if (code === 0) {
        return "Clear Sky";
    }

    if (code === 1) {
        return "Mainly Clear";
    }

    if (code === 2) {
        return "Partly Cloudy";
    }

    if (code === 3) {
        return "Overcast";
    }

    if (code === 45 || code === 48) {
        return "Fog";
    }

    if (code >= 51 && code <= 57) {
        return "Drizzle";
    }

    if (code >= 61 && code <= 67) {
        return "Rain";
    }

    if (code >= 71 && code <= 77) {
        return "Snow";
    }

    if (code >= 80 && code <= 82) {
        return "Rain Showers";
    }

    if (code >= 95 && code <= 99) {
        return "Thunderstorm";
    }

    return "Variable";
}


/* =========================================================
   FETCH LIVE WEATHER
   ========================================================= */

async function getLiveWeather(cityKey) {

    const city = NEXUS_CITIES[cityKey];

    if (!city) {

        throw new Error(
            `Unknown city: ${cityKey}`
        );

    }


    const url =
        "https://api.open-meteo.com/v1/forecast" +

        `?latitude=${city.latitude}` +

        `&longitude=${city.longitude}` +

        "&current=" +
        "temperature_2m," +
        "relative_humidity_2m," +
        "precipitation," +
        "weather_code," +
        "wind_speed_10m" +

        "&hourly=" +
        "temperature_2m," +
        "precipitation_probability," +
        "precipitation," +
        "weather_code" +

        "&forecast_days=2" +

        "&timezone=auto";


    const response =
        await fetch(url);


    if (!response.ok) {

        throw new Error(
            "Open-Meteo service unavailable"
        );

    }


    const data =
        await response.json();


    const current =
        data.current;


    return {

        city: city.name,

        latitude: city.latitude,

        longitude: city.longitude,

        temperature:
            current.temperature_2m,

        humidity:
            current.relative_humidity_2m,

        precipitation:
            current.precipitation,

        windSpeed:
            current.wind_speed_10m,

        weatherCode:
            current.weather_code,

        weather:
            nexusWeatherDescription(
                current.weather_code
            ),

        timezone:
            data.timezone,

        timestamp:
            current.time,

        hourly:
            data.hourly

    };

}


/* =========================================================
   AIR QUALITY
   ========================================================= */

async function getLiveAirQuality(cityKey) {

    const city = NEXUS_CITIES[cityKey];

    if (!city) {

        throw new Error(
            `Unknown city: ${cityKey}`
        );

    }


    const url =
        "https://air-quality-api.open-meteo.com/v1/air-quality" +

        `?latitude=${city.latitude}` +

        `&longitude=${city.longitude}` +

        "&current=" +
        "pm10," +
        "pm2_5," +
        "carbon_monoxide," +
        "nitrogen_dioxide," +
        "sulphur_dioxide," +
        "ozone," +
        "us_aqi" +

        "&timezone=auto";


    const response =
        await fetch(url);


    if (!response.ok) {

        throw new Error(
            "Air quality service unavailable"
        );

    }


    const data =
        await response.json();


    return {

        city: city.name,

        pm10:
            data.current?.pm10 ?? null,

        pm25:
            data.current?.pm2_5 ?? null,

        carbonMonoxide:
            data.current?.carbon_monoxide ?? null,

        nitrogenDioxide:
            data.current?.nitrogen_dioxide ?? null,

        sulphurDioxide:
            data.current?.sulphur_dioxide ?? null,

        ozone:
            data.current?.ozone ?? null,

        aqi:
            data.current?.us_aqi ?? null,

        timestamp:
            data.current?.time ?? null

    };

}


/* =========================================================
   COMPLETE CITY DATA
   ========================================================= */

async function getLiveCityData(cityKey) {

    const [
        weather,
        airQuality
    ] = await Promise.all([

        getLiveWeather(cityKey),

        getLiveAirQuality(cityKey)

    ]);


    return {

    city: cityKey,

    weather,

    airQuality,

    traffic: calculateTraffic(weather),

    energy: calculateEnergy(weather),

    network: 1200 + Math.floor(Math.random() * 150),

    updatedAt:
        new Date().toISOString()

};

}


/* =========================================================
   GLOBAL NEXUS DATA OBJECT
   ========================================================= */

window.NEXUS_LIVE_DATA = {

    cities:
        NEXUS_CITIES,

    currentCity:
        "bengaluru",

    data:
        null

};


/* =========================================================
   LOAD CURRENT CITY
   ========================================================= */

async function loadNexusLiveData(
    cityKey = "bengaluru"
) {

    try {

        console.log(
            "NexusCity: Loading live data for",
            cityKey
        );


        const liveData =
            await getLiveCityData(
                cityKey
            );


        window.NEXUS_LIVE_DATA.currentCity =
            cityKey;


        window.NEXUS_LIVE_DATA.data =
            liveData;


        console.log(
            "NexusCity LIVE DATA:",
            liveData
        );


        return liveData;

    }
    catch (error) {

        console.error(
            "NexusCity live data error:",
            error
        );


        return null;

    }

}


/* =========================================================
   AUTO LOAD
   ========================================================= */

loadNexusLiveData(
    "bengaluru"
);


/* =========================================================
   MODULE STATUS
   ========================================================= */

console.log(
    "NexusCity Live Data Engine loaded."
);

console.log(
    "Supported cities:",
    Object.keys(NEXUS_CITIES)
);

/* =========================================================
   CITY NOW — LIVE DATA UI BRIDGE
   ========================================================= */

function updateCityNowLiveCards(liveData) {

    if (!liveData) {
        return;
    }

    const weather =
        liveData.weather;

    const airQuality =
        liveData.airQuality;


    /* -----------------------------------------
       TEMPERATURE
    ----------------------------------------- */

    const temperatureElement =
        document.getElementById(
            "temperatureValue"
        );

    if (temperatureElement &&
        weather.temperature !== null) {

        temperatureElement.textContent =
            `${Number(weather.temperature).toFixed(1)}°C`;

    }


    /* -----------------------------------------
       AIR QUALITY / AQI
    ----------------------------------------- */

    /*
     * IMPORTANT:
     * Change this ID only if your AQI element
     * uses a different ID in index.html.
     */

    /* -----------------------------------------
   AIR QUALITY / AQI
----------------------------------------- */

const aqiElement =
    document.getElementById(
        "airValue"
    );

const aqiStatusElement =
    aqiElement
        ?.parentElement
        ?.querySelector("span");


if (
    aqiElement &&
    airQuality.aqi !== null
) {

    const aqi =
        Math.round(
            airQuality.aqi
        );


    aqiElement.textContent =
        `AQI ${aqi}`;


    let status =
        "GOOD";


    if (aqi <= 50) {

        status = "GOOD";

    }
    else if (aqi <= 100) {

        status = "MODERATE";

    }
    else if (aqi <= 150) {

        status = "UNHEALTHY";

    }
    else if (aqi <= 200) {

        status = "VERY UNHEALTHY";

    }
    else {

        status = "HAZARDOUS";

    }


    if (aqiStatusElement) {

        aqiStatusElement.textContent =
            status;

    }

}

    /* -----------------------------------------
       CITY NAME
    ----------------------------------------- */

    const cityNameElements =
        document.querySelectorAll(
            ".live-city-name"
        );

    cityNameElements.forEach(
        (element) => {

            element.textContent =
                liveData.city;

        }
    );


    console.log(
        "NexusCity UI updated:",
        liveData.city,
        "AQI:",
        airQuality.aqi,
        "Temperature:",
        weather.temperature
    );

}


/* =========================================================
   CITY SELECTOR CONNECTION
   ========================================================= */

const nexusCitySelector =
    document.getElementById(
        "citySelect"
    );


if (nexusCitySelector) {

    nexusCitySelector.addEventListener(
        "change",
        async (event) => {

            const selectedCity =
                event.target.value;

            console.log(
                "NexusCity: Loading new live data for",
                selectedCity
            );


            const liveData =
                await loadNexusLiveData(
                    selectedCity
                );


            updateCityNowLiveCards(
                liveData
            );

        }
    );

}


/* =========================================================
   INITIAL UI UPDATE
   ========================================================= */

loadNexusLiveData(
    "bengaluru"
).then(
    (liveData) => {

        updateCityNowLiveCards(
            liveData
        );

    }
);

/* =========================================================
   NEXUS AI TRAFFIC ESTIMATION
   ========================================================= */

function calculateTraffic(weather) {

    const hour = new Date().getHours();

    let traffic = 55;

    // Morning rush
    if (hour >= 8 && hour <= 10) traffic += 20;

    // Evening rush
    if (hour >= 17 && hour <= 20) traffic += 25;

    // Rain increases traffic
    if (
        weather.precipitation > 0 ||
        weather.weather.toLowerCase().includes("rain")
    ) {
        traffic += 15;
    }

    return Math.min(100, Math.round(traffic));
}


/* =========================================================
   NEXUS AI ENERGY ESTIMATION
   ========================================================= */

function calculateEnergy(weather) {

    let energy = 55;

    if (weather.temperature >= 30) energy += 20;

    if (weather.temperature >= 35) energy += 10;

    const hour = new Date().getHours();

    if (hour >= 18 && hour <= 22) energy += 10;

    return Math.min(100, Math.round(energy));
}