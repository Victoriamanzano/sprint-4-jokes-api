"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Definición del tipo de los chistes
const urlServer = 'https://cors-anywhere.herokuapp.com/';
const urlMeteo = 'https://api.weatherapi.com/v1/current.json?key=3b97a7601c5c4b5a9ce111700232812&q=barcelona&aqi=no';
;
const url = urlServer + urlMeteo;
// DOM //
let infoAcudits = [];
let infoJokes = [];
let contador1 = 0;
let contador2 = 0;
let response = document.getElementById("response");
let divContent = document.getElementById("score_btn");
// Llama a la API del timeMeteo al iniciar
meteoApi();
// Función asincrónica que se encarga de hacer una petición a la API de chistes proporcionada por It Academy.
function apiJokesDad() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const jokeApi = yield fetch('https://icanhazdadjoke.com/', {
                headers: {
                    'accept': 'application/json'
                }
            });
            let info = yield jokeApi.json();
            saveInfo(info.joke);
            contador1++;
            return info.joke;
        }
        catch (error) {
            console.log('The error is: ' + error);
            return "";
        }
    });
}
// Función encargada de mostrar el chiste obtenido desde la API en el elemento HTML de response. También verifica si los botones de puntuación ya están pintados en la pantalla para no repetirlos.
function showJoke(jokeShow) {
    if (response) {
        response.innerHTML = jokeShow;
    }
    if (divContent) {
        if (divContent.innerHTML.trim() === "") {
            showScoreButtons();
        }
    }
}
// Función que se encarga de generar el contenido HTML para los botones de puntuación de los chistes y asignarles el respectivo evento onclick.
function showScoreButtons() {
    if (divContent) {
        divContent.innerHTML =
            `<button class="col-3" id="btn-score1" onclick="fixScore(3)">
           <i class="fas fa-smile fa-2x"></i>
           </button>

           <button class="col-3" id="btn-score2" onclick="fixScore(2)">
           <i class="fas fa-meh fa-2x"></i>
           </button>

           <button class="col-3" id="btn-score3" onclick="fixScore(1)">
           <i class="fas fa-frown fa-2x"></i>
           </button>
          `;
    }
}
// Función encargada de guardar el chiste obtenido de la API en un array, además de invocar la función para mostrar este chiste en pantalla.
function saveInfo(reports) {
    infoAcudits.push({ joke: reports });
    showJoke(reports);
}
// Función que se encarga de asignar una puntuación a un chiste específico. Si el chiste ya tiene una puntuación, esta se sobrescribe con el nuevo valor.
function fixScore(pressed) {
    let ultimo_chiste = infoAcudits[infoAcudits.length - 1];
    let intention = { joke: ultimo_chiste.joke, score: pressed };
    infoJokes = infoJokes.filter(i => i.joke != intention.joke);
    infoJokes.push(intention);
    valuationDate();
}
// Función que se encarga de asignar la fecha actual a la puntuación de un chiste en particular. Luego imprime en consola el array de chistes puntuados.
function valuationDate() {
    let fixDate = infoJokes[infoJokes.length - 1];
    let newDate = new Date().toISOString();
    fixDate.date = newDate;
    console.log(infoJokes);
    return infoJokes;
}
// Función asincrónica que se encarga de hacer una petición a una API para obtener información sobre el clima actual.
function meteoApi() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = 'http://api.weatherapi.com/v1/current.json?key=3b97a7601c5c4b5a9ce111700232812&q=barcelona&aqi=no';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '3b97a7601c5c4b5a9ce111700232812',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        };
        try {
            const response = yield fetch(url, options);
            const result = yield response.json();
            timeMeteo(result);
        }
        catch (error) {
            console.error(error);
        }
    });
}
function timeMeteo(infoTimeMeteo) {
    if (document.getElementById("timeMeteo")) {
        document.getElementById("timeMeteo").innerHTML = `
      Ciutat: ${infoTimeMeteo.location.name},
      ${infoTimeMeteo.current.temp_c}°C,
      
    `;
    }
}
function chuckApi() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = 'https://api.chucknorris.io/jokes/random';
        const options = {
            method: 'GET',
            headers: {
                'accept': 'application/json'
            }
        };
        try {
            const response = yield fetch(url, options);
            const result = yield response.json();
            saveInfo(result.value);
            contador2++;
        }
        catch (error) {
            console.error(error);
        }
    });
}
function nextJokes() {
    contador1 <= contador2 ? apiJokesDad() : chuckApi();
}
// La respuesta de la API en formato JSON
const response_info = `
{
  "location": {
      "name": "Barcelona",
      "region": "Catalonia",
      "country": "Spain",
      "lat": 41.38,
      "lon": 2.18,
      "tz_id": "Europe/Madrid",
      "localtime_epoch": 1703762475,
      "localtime": "2023-12-28 12:21"
  },
  "current": {
      "last_updated_epoch": 1703762100,
      "last_updated": "2023-12-28 12:15",
      "temp_c": 9.0,
      "temp_f": 48.2,
      "is_day": 1,
      "condition": {
          "text": "Partly cloudy",
          "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png",
          "code": 1003
      },
      "wind_mph": 6.9,
      "wind_kph": 11.2,
      "wind_degree": 320,
      "wind_dir": "NW",
      "pressure_mb": 1026.0,
      "pressure_in": 30.3,
      "precip_mm": 0.0,
      "precip_in": 0.0,
      "humidity": 57,
      "cloud": 25,
      "feelslike_c": 7.4,
      "feelslike_f": 45.2,
      "vis_km": 10.0,
      "vis_miles": 6.0,
      "uv": 3.0,
      "gust_mph": 8.4,
      "gust_kph": 13.5
  }
}
`;
// Convertir la cadena JSON a un intentioneto TypeScript
const info = JSON.parse(response_info);
// Imprimir algunos reports relevantes
console.log("Ciudad:", info.location.name);
console.log("País:", info.location.country);
console.log("Temperatura actual:", info.current.temp_c, "°C");
console.log("Condición:", info.current.condition.text);
console.log("Velocidad del viento:", info.current.wind_kph, "km/h");
console.log("Humedad:", info.current.humidity, "%");
