/* =========================================================
NEXUSCITY AI — INTERACTION ENGINE
PART 2
========================================================= */

/* =========================================================
GLOBAL ELEMENTS
========================================================= */

const nexusLauncher = document.getElementById("nexusLauncher");
const nexusCore = document.getElementById("nexusCore");

const intelligenceNodes =
document.querySelectorAll(".intel-node");

const cityNowView =
document.getElementById("city-now-view");

const cityNextView =
document.getElementById("city-next-view");

const cityRisksView =
document.getElementById("city-risks-view");

const cityRisksBack =
document.getElementById("cityRisksBack");

const cityNowBack =
document.getElementById("cityNowBack");

const cityNextBack =
document.getElementById("cityNextBack");

const cityNowTime =
document.getElementById("cityNowTime");

const citySelect =
document.getElementById("citySelect");

const simulationButton =
document.getElementById("simulateCity");

const insightPanel =
document.getElementById("aiInsightPanel");

const insightContent =
document.getElementById("insightContent");

const closeInsight =
document.getElementById("closeInsight");

/* =========================================================
NEXUS CORE
========================================================= */

if (nexusCore) {

nexusCore.addEventListener("click", () => {

    nexusLauncher.classList.toggle("active");

    const isOpen =
        nexusLauncher.classList.contains("active");

    nexusCore.setAttribute(
        "aria-expanded",
        isOpen
    );

});

}

/* =========================================================
CITY DATABASE
========================================================= */

const CITIES = {

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
CURRENT CITY
========================================================= */

let CITY_CONFIG = CITIES.bengaluru;

/* =========================================================
INTELLIGENCE NODE NAVIGATION
========================================================= */

intelligenceNodes.forEach((node) => {

node.addEventListener("click", () => {

    const selectedView =
        node.dataset.view;


    /* -----------------------------------------
       CLOSE RADIAL MENU
    ----------------------------------------- */

    if (nexusLauncher) {

        nexusLauncher.classList.remove("active");

    }

    if (nexusCore) {

        nexusCore.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    /* -----------------------------------------
       CITY NOW
    ----------------------------------------- */

    if (selectedView === "city-now") {

        openCityNow();

        return;

    }


    /* -----------------------------------------
       CITY NEXT
    ----------------------------------------- */

    if (selectedView === "city-next") {

        openCityNext();

        return;

    }

    /* -----------------------------------------
   CITY RISKS
----------------------------------------- */

if (selectedView === "city-risks") {

    openCityRisks();

    return;

}

/* -----------------------------------------
   NEXUS DECISION
----------------------------------------- */

if (selectedView === "nexus-decision") {

    openNexusDecision();

    return;

}


/* -----------------------------------------
   SCENARIO LAB
----------------------------------------- */

if (selectedView === "scenario-lab") {

    openScenarioLab();

    return;

}


/* -----------------------------------------
   UNKNOWN MODULE
----------------------------------------- */

console.log(
    "Nexus intelligence selected:",
    selectedView
);
});

});

/* =========================================================
OPEN CITY NOW
========================================================= */

function openCityNow() {

if (!cityNowView) {
    return;
}


if (cityNextView) {

    cityNextView.classList.remove("active");

}


cityNowView.classList.add("active");


updateCityNowTime();


loadCityWeather();

}

/* =========================================================
CLOSE CITY NOW
========================================================= */

if (cityNowBack) {

cityNowBack.addEventListener("click", () => {

    cityNowView.classList.remove("active");

});

}

/* =========================================================
OPEN CITY NEXT
========================================================= */

function openCityNext() {

if (!cityNextView) {
    return;
}


if (cityNowView) {

    cityNowView.classList.remove("active");

}


cityNextView.classList.add("active");


loadCityForecast();

}

/* =========================================================
OPEN CITY RISKS
========================================================= */

function openCityRisks() {

    if (!cityRisksView) {
        console.warn(
            "City Risks view not found."
        );
        return;
    }


    if (cityNowView) {

        cityNowView.classList.remove(
            "active"
        );

    }


    if (cityNextView) {

        cityNextView.classList.remove(
            "active"
        );

    }


    cityRisksView.classList.add(
        "active"
    );


    console.log(
        "NexusCity: City Risks opened."
    );

}

/* =========================================================
CLOSE CITY NEXT
========================================================= */

if (cityNextBack) {

cityNextBack.addEventListener("click", () => {

    cityNextView.classList.remove("active");

});

}

/* =========================================================
CLOSE CITY RISKS
========================================================= */

if (cityRisksBack) {

    cityRisksBack.addEventListener(
        "click",
        () => {

            cityRisksView.classList.remove(
                "active"
            );

        }
    );

}

/* =========================================================
CITY NOW CLOCK
========================================================= */

function updateCityNowTime() {

if (!cityNowTime) {
    return;
}


const now = new Date();


const hours =
    String(now.getHours()).padStart(2, "0");

const minutes =
    String(now.getMinutes()).padStart(2, "0");

const seconds =
    String(now.getSeconds()).padStart(2, "0");


cityNowTime.textContent =
    `${hours}:${minutes}:${seconds}`;

}

setInterval(
updateCityNowTime,
1000
);

updateCityNowTime();

/* =========================================================
MAIN SYSTEM CLOCK
========================================================= */

function updateSystemTime() {

const systemLive =
    document.querySelector(".system-live");


if (!systemLive) {
    return;
}


const now = new Date();


const hours =
    String(now.getHours()).padStart(2, "0");

const minutes =
    String(now.getMinutes()).padStart(2, "0");

const seconds =
    String(now.getSeconds()).padStart(2, "0");


systemLive.innerHTML = `
    <span class="status-dot"></span>
    SYSTEM ONLINE · ${hours}:${minutes}:${seconds}
`;

}

setInterval(
updateSystemTime,
1000
);

updateSystemTime();

/* =========================================================
ESCAPE KEY
========================================================= */

document.addEventListener(
"keydown",
(event) => {

    if (event.key !== "Escape") {
        return;
    }


    if (cityNowView) {

        cityNowView.classList.remove("active");

    }


    if (cityNextView) {

        cityNextView.classList.remove("active");

    }

    if (cityRisksView) {

    cityRisksView.classList.remove("active");

}


    if (nexusLauncher) {

        nexusLauncher.classList.remove("active");

    }


    if (nexusCore) {

        nexusCore.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    if (insightPanel) {

        insightPanel.classList.remove("open");

    }

}

);

/* =========================================================
LIVE WEATHER
========================================================= */

async function loadCityWeather() {

const temperatureElement =
    document.getElementById(
        "temperatureValue"
    );

const rainfallElement =
    document.getElementById(
        "rainfallValue"
    );


if (
    !temperatureElement ||
    !rainfallElement
) {

    return;

}


try {

    const url =
        `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${CITY_CONFIG.latitude}` +
        `&longitude=${CITY_CONFIG.longitude}` +
        `&current=temperature_2m,relative_humidity_2m,precipitation,weather_code` +
        `&hourly=temperature_2m,precipitation_probability,precipitation,weather_code` +
        `&forecast_days=2` +
        `&timezone=auto`;


    const response =
        await fetch(url);


    if (!response.ok) {

        throw new Error(
            "Weather service unavailable"
        );

    }


    const data =
        await response.json();


    const current =
        data.current;


    /* -----------------------------------------
       TEMPERATURE
    ----------------------------------------- */

    temperatureElement.textContent =
        `${Number(current.temperature_2m).toFixed(1)}°C`;


    /* -----------------------------------------
       RAINFALL
    ----------------------------------------- */

    rainfallElement.textContent =
        `${Number(current.precipitation).toFixed(1)} mm`;


    /* -----------------------------------------
       UPDATE LABELS
    ----------------------------------------- */

    const temperatureCard =
        temperatureElement.closest(
            ".metric-card"
        );


    const rainfallCard =
        rainfallElement.closest(
            ".metric-card"
        );


    if (temperatureCard) {

        temperatureCard
            .querySelector("span")
            .textContent =
            "LIVE WEATHER";

    }


    if (rainfallCard) {

        rainfallCard
            .querySelector("span")
            .textContent =
            "LIVE DATA";

    }


    console.log(
        "NexusCity weather:",
        current
    );


    /*
     * Also store forecast data
     * for CITY NEXT.
     */

    window.nexusForecast =
        data;


    updateCityNextTimeline(
        data
    );


}
catch (error) {

    console.error(
        "Weather loading failed:",
        error
    );


    temperatureElement.textContent =
        "--";


    rainfallElement.textContent =
        "--";


    const temperatureCard =
        temperatureElement.closest(
            ".metric-card"
        );


    const rainfallCard =
        rainfallElement.closest(
            ".metric-card"
        );


    if (temperatureCard) {

        temperatureCard
            .querySelector("span")
            .textContent =
            "DATA UNAVAILABLE";

    }


    if (rainfallCard) {

        rainfallCard
            .querySelector("span")
            .textContent =
            "DATA UNAVAILABLE";

    }

}

}

/* =========================================================
CITY SELECTOR
========================================================= */

if (citySelect) {

citySelect.addEventListener(
    "change",
    (event) => {

        const selectedCity =
            event.target.value;


        if (!CITIES[selectedCity]) {
            return;
        }


        CITY_CONFIG =
            CITIES[selectedCity];


        console.log(
            "NexusCity switched to:",
            CITY_CONFIG.name
        );


        loadCityWeather();

        loadCityForecast();

    }
);

}

/* =========================================================
WEATHER CODE → HUMAN DESCRIPTION
========================================================= */

function weatherDescription(code) {

if (code === 0) {
    return "Clear";
}

if (
    code === 1 ||
    code === 2
) {
    return "Partly Cloudy";
}

if (code === 3) {
    return "Cloudy";
}

if (
    code === 45 ||
    code === 48
) {
    return "Fog";
}

if (
    code >= 51 &&
    code <= 57
) {
    return "Drizzle";
}

if (
    code >= 61 &&
    code <= 67
) {
    return "Rain";
}

if (
    code >= 71 &&
    code <= 77
) {
    return "Snow";
}

if (
    code >= 80 &&
    code <= 82
) {
    return "Rain Showers";
}

if (
    code >= 95 &&
    code <= 99
) {
    return "Thunderstorm";
}

return "Variable";

}

/* =========================================================
LOAD CITY NEXT FORECAST
========================================================= */

async function loadCityForecast() {

try {

    const url =
        `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${CITY_CONFIG.latitude}` +
        `&longitude=${CITY_CONFIG.longitude}` +
        `&hourly=temperature_2m,precipitation_probability,precipitation,weather_code` +
        `&forecast_days=2` +
        `&timezone=auto`;


    const response =
        await fetch(url);


    if (!response.ok) {

        throw new Error(
            "Forecast service unavailable"
        );

    }


    const data =
        await response.json();


    window.nexusForecast =
        data;


    updateCityNextTimeline(
        data
    );


}
catch (error) {

    console.error(
        "Forecast loading failed:",
        error
    );

}

}

/* =========================================================
UPDATE CITY NEXT TIMELINE
========================================================= */

function updateCityNextTimeline(data) {

if (
    !data ||
    !data.hourly
) {

    return;

}


const timeline =
    document.querySelectorAll(
        ".forecast-timeline div"
    );


if (!timeline.length) {
    return;
}


const hourly =
    data.hourly;


const currentHour =
    new Date().getHours();


const startIndex =
    hourly.time.findIndex(
        (time) => {

            const date =
                new Date(time);

            return (
                date.getHours() ===
                currentHour
            );

        }
    );


const baseIndex =
    startIndex >= 0
        ? startIndex
        : 0;


const offsets =
    [0, 1, 2, 3, 4, 6];


timeline.forEach(
    (item, index) => {

        const offset =
            offsets[index];


        const forecastIndex =
            baseIndex + offset;


        if (
            forecastIndex >=
            hourly.time.length
        ) {

            return;

        }


        const temperature =
            hourly.temperature_2m[
                forecastIndex
            ];


        const rainProbability =
            hourly.precipitation_probability[
                forecastIndex
            ] ?? 0;


        const weatherCode =
            hourly.weather_code[
                forecastIndex
            ];


        const strong =
            item.querySelector(
                "strong"
            );


        const span =
            item.querySelector(
                "span"
            );


        if (strong) {

            strong.textContent =
                `${Math.round(
                    temperature
                )}°C`;

        }


        if (span) {

            span.textContent =
                weatherDescription(
                    weatherCode
                );

        }


        /*
         * If rain probability is high,
         * visually identify the forecast.
         */

        if (
            rainProbability >= 60
        ) {

            item.dataset.rain =
                "high";

        }
        else {

            item.dataset.rain =
                "normal";

        }

    }
);

}

/* =========================================================
CITY NEXT SIMULATION
========================================================= */

if (simulationButton) {

simulationButton.addEventListener(
    "click",
    () => {

        simulationButton.classList.add(
            "simulating"
        );


        simulationButton.textContent =
            "◌ AI SIMULATION RUNNING";


        const timeline =
            document.querySelectorAll(
                ".forecast-timeline div"
            );


        timeline.forEach(
            (item, index) => {

                item.classList.remove(
                    "active"
                );


                setTimeout(
                    () => {

                        item.classList.add(
                            "active"
                        );

                    },
                    index * 500
                );

            }
        );


        setTimeout(
            () => {

                simulationButton.classList.remove(
                    "simulating"
                );


                simulationButton.textContent =
                    "✓ SIMULATION COMPLETE";

            },
            3500
        );

    }
);

}

/* =========================================================
AI INSIGHT PANEL
========================================================= */

function openInsight(
title,
description,
recommendations,
confidence
) {

if (!insightPanel) {
    return;
}


insightPanel.classList.add(
    "open"
);


if (insightContent) {

    insightContent.innerHTML = `

        <h2>${title}</h2>

        <p class="analysis-text">
            ${description}
        </p>

        <h3>
            NEXUS AI RECOMMENDATIONS
        </h3>

        <ul>
            ${recommendations}
        </ul>

    `;

}


const confidenceValue =
    document.getElementById(
        "confidenceValue"
    );


if (confidenceValue) {

    confidenceValue.textContent =
        `${confidence}%`;

}

}

/* =========================================================
CITY NEXT CARD INTERACTIONS
========================================================= */

const predictionCards =
document.querySelectorAll(
"#city-next-view .metric-card"
);

predictionCards.forEach(
(card, index) => {

    card.addEventListener(
        "click",
        () => {

            switch (index) {

                /* ---------------------------------
                   RAIN
                --------------------------------- */

                case 0:

                    openInsight(

                        "🌧 RAIN FORECAST",

                        "Rain probability is being evaluated using the live meteorological forecast for the selected city. If rainfall intensity increases, NexusCity can flag vulnerable zones and recommend drainage monitoring.",

                        `
                            <li>Activate drainage monitoring</li>
                            <li>Monitor low-lying zones</li>
                            <li>Prepare citizen weather alerts</li>
                            <li>Increase flood-risk observation</li>
                        `,

                        96

                    );

                    break;


                /* ---------------------------------
                   TRAFFIC
                --------------------------------- */

                case 1:

                    openInsight(

                        "🚦 TRAFFIC LOAD",

                        "NexusCity predicts increased traffic pressure during upcoming peak periods. The current demonstration uses an AI forecast layer rather than claiming access to live traffic sensors.",

                        `
                            <li>Synchronize intelligent traffic signals</li>
                            <li>Identify alternative routes</li>
                            <li>Increase junction monitoring</li>
                            <li>Prepare congestion response</li>
                        `,

                        91

                    );

                    break;


                /* ---------------------------------
                   ENERGY
                --------------------------------- */

                case 2:

                    openInsight(

                        "⚡ ENERGY DEMAND",

                        "Energy demand is expected to increase during peak hours. NexusCity recommends proactive grid balancing before the predicted demand window.",

                        `
                            <li>Enable backup generation</li>
                            <li>Redistribute grid load</li>
                            <li>Monitor substations</li>
                            <li>Prepare peak-demand response</li>
                        `,

                        94

                    );

                    break;


                /* ---------------------------------
                   URBAN RISK
                --------------------------------- */

                case 3:

                    openInsight(

                        "⚠ URBAN RISK",

                        "NexusCity combines weather forecasts and simulated urban-system indicators to estimate the current level of city risk.",

                        `
                            <li>Increase AI monitoring</li>
                            <li>Keep response teams ready</li>
                            <li>Monitor weather conditions</li>
                            <li>Continue predictive analysis</li>
                        `,

                        93

                    );

                    break;

            }

        }
    );

}

);

/* =========================================================
CLOSE AI INSIGHT PANEL
========================================================= */

if (closeInsight) {

closeInsight.addEventListener(
    "click",
    () => {

        insightPanel.classList.remove(
            "open"
        );

    }
);

}

/* =========================================================
INITIAL WEATHER LOAD
========================================================= */

loadCityWeather();

/* =========================================================
REFRESH LIVE WEATHER
EVERY 5 MINUTES
========================================================= */

setInterval(
() => {

    if (
        cityNowView &&
        cityNowView.classList.contains(
            "active"
        )
    ) {

        loadCityWeather();

    }

},
5 * 60 * 1000

);

/* =========================================================
DEBUG
========================================================= */

console.log(
"NexusCity AI interaction engine initialized."
);
console.log(
"Current city:",
CITY_CONFIG.name
);
console.log(
"City Now:",
!!cityNowView
);
console.log(
"City Next:",
!!cityNextView
);
console.log(
"Nexus Core:",
!!nexusCore
);
 
 
