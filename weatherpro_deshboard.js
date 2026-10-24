const temperatureValue = document.getElementById("temperature-value");
const temperatureValue1 = document.getElementById("temperature-value1");
const searchbutton = document.getElementById("searchbutton");
const searchinput = document.getElementById("search-input");
const humidityValue = document.getElementById("humidity-value");
const humidityValue1 = document.getElementById("humidity-value1");
  const windSpeedValue = document.getElementById("wind-speed-value");
  const windSpeedValue1 = document.getElementById("wind-speed-value1");
  const pressureValue = document.getElementById("pressure-value");
  const pressureValue1 = document.getElementById("pressure-value1");
  const surfacePressureValue = document.getElementById("surface_pressure");
  const cloudCoverValue = document.getElementById("cloud-cover");
  const cloudCoverValue1 = document.getElementById("cloud-cover1");
  const hourlytemp = document.getElementsByClassName("hourly-temp");
  const dailyTemp = document.getElementsByClassName("daily-temp");
  const locationValue = document.getElementById("location-value");
  const locationValue1 = document.getElementById("location-value1");
  const todayValue = document.getElementById("today");
 






  



const getWeather = async (evt) => {
  
 const url=`https://nominatim.openstreetmap.org/search?q=${searchinput.value}&format=json&limit=1`
  
  const response = await fetch(url);
    const data = await response.json();
    
      let url2=`https://api.open-meteo.com/v1/forecast?latitude=${data[0].lat}&longitude=${data[0].lon}&daily=precipitation_probability_max,temperature_2m_max,wind_speed_10m_max,weather_code,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,uv_index_clear_sky_max,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_sum,wind_gusts_10m_max,shortwave_radiation_sum,wind_direction_10m_dominant,et0_fao_evapotranspiration&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weather_code,pressure_msl,surface_pressure,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,evapotranspiration,visibility,et0_fao_evapotranspiration,vapour_pressure_deficit,wind_speed_10m,wind_speed_80m,wind_speed_120m,wind_speed_180m,wind_direction_10m,wind_direction_80m,wind_direction_120m,wind_gusts_10m,wind_direction_180m,temperature_80m,temperature_120m,temperature_180m,soil_temperature_0cm,soil_temperature_6cm,soil_temperature_18cm,soil_moisture_0_to_1cm,soil_temperature_54cm,soil_moisture_1_to_3cm,soil_moisture_3_to_9cm,soil_moisture_9_to_27cm,soil_moisture_27_to_81cm&current=temperature_2m,wind_speed_10m,relative_humidity_2m,is_day,apparent_temperature,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_gusts_10m,wind_direction_10m&timezone=auto`
       let response2 = await fetch(url2);  
    let data2 = await response2.json();  
  
    const url3  ='https://air-quality-api.open-meteo.com/v1/air-quality?latitude=52.52&longitude=13.41&hourly=pm10,pm2_5&current=us_aqi&timezone=auto'
    let response3 = await fetch(url3);
    let data3 = await response3.json();
    
    temperatureValue.innerText = data2.current.temperature_2m ;
    temperatureValue1.innerText = data2.current.temperature_2m ;
    humidityValue.innerText = data2.current.relative_humidity_2m + "%";
    humidityValue1.innerText = data2.current.relative_humidity_2m + "%";
    windSpeedValue.innerText = data2.current.wind_speed_10m + " km/h";
    windSpeedValue1.innerText = data2.current.wind_speed_10m + " km/h";
    pressureValue.innerText = data2.current.surface_pressure + " hPa";
    pressureValue1.innerText = data2.current.surface_pressure + " hPa";
    surfacePressureValue.innerText = data2.current.surface_pressure + " hPa";
     cloudCoverValue.innerText = data2.current.cloud_cover + "%";
     cloudCoverValue1.innerText = data2.current.cloud_cover + "%";
     locationValue.firstChild.textContent = data[0].name + ", India ";
     locationValue1.firstChild.textContent = data[0].name + ", India ";
  
     


todayValue.innerText = data2.current.time.slice(0, 10)+ "  •  " + data2.current.time.slice(11, 16) + " • " + (data2.current.is_day ? "Day" : "Night") ;








const dt = data2.current.time;
const dtvalue = Number(dt.slice(11, 13));


console.log("Current Hour:", dtvalue);

for (let i = 0; i < hourlytemp.length; i++) {

    let hourIndex = dtvalue + i;

    hourlytemp[i].innerText =
        data2.hourly.temperature_2m[hourIndex] + "°C";

}
for (let j = 0; j < dailyTemp.length; j++) {
    console.log(data2.daily.temperature_2m_min[j]);

dailyTemp[j].innerHTML =
    data2.daily.temperature_2m_max[j] + "° / " +
    '<span style="color: #9CA3AF; font-size: 0.875em;">' +
    data2.daily.temperature_2m_min[j] + "°" +
    '</span>';
  
}
};


searchbutton.addEventListener("click",(evt)=>{
  
  evt.preventDefault();
  localStorage.setItem("city", searchinput.value);
  getWeather();
})
window.addEventListener("load", () => {




if (localStorage.getItem("city") === null) {
    localStorage.setItem("city", "Hazaribagh");
}


searchinput.value = localStorage.getItem("city");

getWeather();


});
