document.querySelector('button').addEventListener('click', () =>  getWeather());

let result = document.querySelector('p');
  
const API_KEY = 'aa1a65dae8ea48730e01382945dfe0a5';
const API_ADDRESS = 'https://api.openweathermap.org/data/2.5/weather';

const getUrl = (location, unit) => `${API_ADDRESS}?q=${location}&APPID=${API_KEY}&units=${unit}`;

const cToF = temp => temp * 9 / 5 + 32;

const setTheBg = (temp, unit) => {
  if (unit === 'metric') temp = cToF(temp);
  let weatherWord = '';
  console.log(temp);

  if (temp > 100) weatherWord = 'blazing'
  else if (temp < 100 && temp > 80) weatherWord = 'hot';
  else if (temp < 80 && temp > 50) weatherWord = 'warm';
  else if (temp < 50 && temp > 30) weatherWord = 'cool';
  else if (temp < 30 && temp > 0) weatherWord = 'cold';
  else if (temp < 0) weatherWord = 'frigid';

  const imageUrl =  `url(https://source.unsplash.com/featured/?${weatherWord},weather,temperature)`;
  document.body.style.backgroundImage = imageUrl;
  console.log(weatherWord);
}

const getWeather = async () => {
  const location = document.getElementById('location').value || 'cambridge';
  const unit = document.querySelector('[name="unit"]:checked').value || 'metric';
  const url = getUrl(location, unit).replace(/ /g, '%20');

  try {
    result.textContent = 'Loading...';
    const response = await fetch(url, {mode: 'cors'});
    const data = await response.json();

    const unitSymbol = (unit === 'metric') ? 'C' : 'F';

    const weather =
      `The temperature in ${data.name}, ${data.sys.country} is ${data.main.temp} °${unitSymbol}, feels like ${data.main.feels_like} °${unitSymbol}`;

    result.textContent = weather;

    setTheBg(data.main.feels_like, unit);
  } catch (error) {
    result.textContent = error;
  }

}

document.querySelector('button').addEventListener('click', getWeather);