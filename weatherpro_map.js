const searchbutton = document.getElementById("searchbutton");
const searchinput = document.getElementById("search-input");

const locationValue = document.getElementById("location-value1");

const getWeather = async () => {
  const cityName = searchinput.value.trim() || "Hazaribagh";
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cityName)}&format=json&limit=1`;

  const response = await fetch(url);
  const data = await response.json();


  const url2 = `  https://api.open-meteo.com/v1/forecast?latitude=${data[0].lat}&longitude=${data[0].lon}&daily=temperature_2m_max,temperature_2m_min&hourly=temperature_2m&current=temperature_2m&forecast_days=16`;
  const response2 = await fetch(url2);
  
  const data2 = await response2.json();
  locationValue.innerText = cityName + ", India";
  

};

searchbutton.addEventListener("click", (evt) => {
  evt.preventDefault();
  getWeather();
});

window.addEventListener("load", () => {
  document.getElementById("search-input").value =    localStorage.getItem("city");
  getWeather();
});