/* =========================================================
   NEXUSCITY AI — INTERACTION ENGINE
   ========================================================= */

const nexusLauncher = document.getElementById("nexusLauncher");
const nexusCore = document.getElementById("nexusCore");
const intelligenceNodes = document.querySelectorAll(".intel-node");
const cityNowBtn = document.querySelector(".city-now");
const cityNextBtn = document.querySelector(".city-next");
const cityNowView = document.getElementById("city-now-view");
const cityNowBack = document.getElementById("cityNowBack");
const cityNowTime = document.getElementById("cityNowTime");
const cityNextView = document.getElementById("city-next-view");
console.log(cityNextView);
const cityNextBack = document.getElementById("cityNextBack");


/* =========================================================
   NEXUS CORE
   ========================================================= */

nexusCore.addEventListener("click", () => {

    nexusLauncher.classList.toggle("active");

    const isOpen = nexusLauncher.classList.contains("active");

    nexusCore.setAttribute("aria-expanded", isOpen);

});


/* =========================================================
   INTELLIGENCE NODE SELECTION
   ========================================================= */

intelligenceNodes.forEach((node) => {

    node.addEventListener("click", () => {

        const selectedView = node.dataset.view;
if (selectedView === "city-next") {

    nexusLauncher.classList.remove("active");

    nexusCore.setAttribute("aria-expanded", "false");

    cityNextView.classList.add("active");

    return;

}
        if (selectedView === "city-next") {

    nexusLauncher.classList.remove("active");

    nexusCore.setAttribute("aria-expanded", "false");

    cityNextView.classList.add("active");

    return;

}

        console.log("Nexus intelligence selected:", selectedView);

    });

});


/* =========================================================
   OPEN CITY NOW
   ========================================================= */

function openCityNow() {

    /*
     * Close the radial menu first.
     */

    nexusLauncher.classList.remove("active");

    nexusCore.setAttribute("aria-expanded", "false");


    /*
     * Open CITY NOW inside the same website.
     */

    cityNowView.classList.add("active");


    /*
     * Update the clock immediately.
     */

    updateCityNowTime();

}


/* =========================================================
   CLOSE CITY NOW
   ========================================================= */

cityNowBack.addEventListener("click", () => {

    cityNowView.classList.remove("active");

});


/* =========================================================
   CITY NOW CLOCK
   ========================================================= */

function updateCityNowTime() {

    const now = new Date();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const currentTime =
        `${hours}:${minutes}:${seconds}`;

    if (cityNowTime) {

        cityNowTime.textContent = currentTime;

    }

}


/*
 * Update every second.
 */

setInterval(updateCityNowTime, 1000);


/* =========================================================
   MAIN SYSTEM CLOCK
   ========================================================= */

function updateSystemTime() {

    const now = new Date();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const time =
        `${hours}:${minutes}:${seconds}`;

    const systemLive =
        document.querySelector(".system-live");

    if (systemLive) {

        systemLive.innerHTML =
            `<span class="status-dot"></span>
             SYSTEM ONLINE · ${time}`;

    }

}

setInterval(updateSystemTime, 1000);

updateSystemTime();

cityNextBack.addEventListener("click", () => {

    cityNextView.classList.remove("active");

});

/* =========================================================
   ESCAPE KEY
   ========================================================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        cityNowView.classList.remove("active");
        cityNextView.classList.remove("active");

        nexusLauncher.classList.remove("active");

        nexusCore.setAttribute(
            "aria-expanded",
            "false"
        );

    }

});

/* =========================================================
   NEXUSCITY — REAL-TIME WEATHER DATA
   ========================================================= */

/*
 * Change these coordinates later for the city we want
 * NexusCity to demonstrate.
 */
const CITIES = {

    bengaluru:{
        name:"Bengaluru",
        latitude:12.9716,
        longitude:77.5946
    },

    hyderabad:{
        name:"Hyderabad",
        latitude:17.3850,
        longitude:78.4867
    },

    chennai:{
        name:"Chennai",
        latitude:13.0827,
        longitude:80.2707
    },

    mumbai:{
        name:"Mumbai",
        latitude:19.0760,
        longitude:72.8777
    },

    delhi:{
        name:"Delhi",
        latitude:28.6139,
        longitude:77.2090
    },

    kalaburagi:{
        name:"Kalaburagi",
        latitude:17.3297,
        longitude:76.8343
    }

};

let CITY_CONFIG = CITIES.bengaluru;


/* ---------------------------------------------------------
   FETCH REAL WEATHER
   --------------------------------------------------------- */

async function loadCityWeather() {

    const temperatureElement =
        document.getElementById("temperatureValue");

    const rainfallElement =
        document.getElementById("rainfallValue");

    if (!temperatureElement || !rainfallElement) {
        return;
    }

    try {

        const url =
            `https://api.open-meteo.com/v1/forecast` +
            `?latitude=${CITY_CONFIG.latitude}` +
            `&longitude=${CITY_CONFIG.longitude}` +
            `&current=temperature_2m,relative_humidity_2m,precipitation` +
            `&timezone=auto`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Weather service unavailable");
        }

        const data = await response.json();

        const current = data.current;

        /*
         * REAL temperature
         */
        temperatureElement.textContent =
            `${current.temperature_2m}°C`;

        /*
         * REAL current precipitation
         */
        rainfallElement.textContent =
            `${current.precipitation} mm`;

        /*
         * Mark the weather cards as real data.
         */
        temperatureElement
            .closest(".metric-card")
            .querySelector("span")
            .textContent = "LIVE DATA";

        rainfallElement
            .closest(".metric-card")
            .querySelector("span")
            .textContent = "LIVE DATA";

        console.log(
            "NexusCity live weather:",
            current
        );

    } catch (error) {

        console.error(
            "Unable to load live weather:",
            error
        );

        temperatureElement.textContent = "--";

        rainfallElement.textContent = "--";

        temperatureElement
            .closest(".metric-card")
            .querySelector("span")
            .textContent = "DATA UNAVAILABLE";

        rainfallElement
            .closest(".metric-card")
            .querySelector("span")
            .textContent = "DATA UNAVAILABLE";
    }
}


/* ---------------------------------------------------------
   LOAD WEATHER WHEN CITY NOW OPENS
   --------------------------------------------------------- */

const originalOpenCityNow = openCityNow;

openCityNow = function () {

    originalOpenCityNow();

    loadCityWeather();

};


/* ---------------------------------------------------------
   REFRESH WEATHER EVERY 5 MINUTES
   --------------------------------------------------------- */

setInterval(() => {

    if (
        cityNowView &&
        cityNowView.classList.contains("active")
    ) {

        loadCityWeather();

    }

}, 5 * 60 * 1000);

/* ==========================================
   CITY SELECTOR
========================================== */

const citySelect = document.getElementById("citySelect");

if(citySelect){

    citySelect.addEventListener("change",(event)=>{

        CITY_CONFIG = CITIES[event.target.value];

        console.log("City changed:",CITY_CONFIG.name);

        loadCityWeather();

    });

}

/* =====================================
   CITY NEXT AI SIMULATION
===================================== */


const simulationButton =
document.getElementById("simulateCity");


if(simulationButton){


simulationButton.addEventListener("click",()=>{


    simulationButton.classList.add("simulating");


    simulationButton.textContent =
    "◌ AI SIMULATION RUNNING";


    const timeline =
    document.querySelectorAll(".forecast-timeline div");


    timeline.forEach((item,index)=>{


        setTimeout(()=>{


            item.classList.add("active");


        }, index * 500);


    });



    setTimeout(()=>{


        simulationButton.classList.remove("simulating");


        simulationButton.textContent =
        "✓ SIMULATION COMPLETE";


    },3500);



});

}

const insightPanel =
document.getElementById("aiInsightPanel");

const insightContent =
document.getElementById("insightContent");

const closeInsight =
document.getElementById("closeInsight");

closeInsight.addEventListener("click",()=>{

insightPanel.classList.remove("open");

});


const cards = document.querySelectorAll("#city-next-view .metric-card");

cards.forEach((card,index)=>{

card.addEventListener("click",()=>{

insightPanel.classList.add("open");

let title="";
let description="";
let recommendations="";

switch(index){

case 0:

title="🌧 RAIN FORECAST";

description=
`
Heavy rainfall probability is increasing over the next 2 hours.
AI predicts localized flooding in low-lying zones.
`;

recommendations=
`
<li>Activate drainage pumps</li>
<li>Deploy emergency response teams</li>
<li>Send citizen weather alerts</li>
`;

break;

case 1:

title="🚦 TRAFFIC LOAD";

description=
`
Traffic congestion expected to increase by 32%.
Major intersections may experience delays.
`;

recommendations=
`
<li>Synchronize smart traffic signals</li>
<li>Suggest alternate routes</li>
<li>Increase traffic monitoring</li>
`;

break;

case 2:

title="⚡ ENERGY DEMAND";

description=
`
Electricity demand is expected to rise sharply during peak hours.
Grid balancing is recommended.
`;

recommendations=
`
<li>Enable backup generation</li>
<li>Redistribute grid load</li>
<li>Monitor substations</li>
`;

break;

case 3:

title="⚠ URBAN RISK";

description=
`
Combined weather, traffic and energy analysis indicates moderate city risk.
`;

recommendations=
`
<li>Increase AI monitoring</li>
<li>Keep emergency teams on standby</li>
<li>Continue live forecasting</li>
`;

break;

}

insightContent.innerHTML=`

<h2>${title}</h2>

<p>${description}</p>

<h3>NEXUS AI RECOMMENDATIONS</h3>

<ul>
${recommendations}
</ul>

`;

});

});