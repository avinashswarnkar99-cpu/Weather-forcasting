const searchbutton = document.getElementById("searchbutton");
const searchinput = document.getElementById("search-input");
const hourlytemp = document.getElementsByClassName("h_temp");
const hourlytime = document.getElementsByClassName("h_time");
const locationValue = document.getElementById("location-value1");

const getWeather = async () => {
  const cityName = searchinput.value.trim() || "Hazaribagh";
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cityName)}&format=json&limit=1`;

  const response = await fetch(url);
  const data = await response.json();


  const url2 = `https://api.open-meteo.com/v1/forecast?latitude=${data[0].lat}&longitude=${data[0].lon}&hourly=temperature_2m&timezone=auto`;
  const response2 = await fetch(url2);
  const data2 = await response2.json();
  locationValue.innerText = cityName + ", India";
  let n = 0;

  for (let i = 0; i < hourlytemp.length; i++) {
    const time = data2.hourly.time[i];
    const temp = data2.hourly.temperature_2m[i];

   if (n<12) {
   
    hourlytime[i].innerText = time.slice(11, 16)+"  AM";
    n++;
   }else{
    hourlytime[i].innerText = time.slice(11, 16)+"  PM";
}
    hourlytemp[i].innerText = temp + "  °C";
  }
};

searchbutton.addEventListener("click", (evt) => {

  evt.preventDefault();
  getWeather();
});

window.addEventListener("load", () => {
  document.getElementById("search-input").value =    localStorage.getItem("city");
  getWeather();
});