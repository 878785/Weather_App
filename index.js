
let cityname = document.querySelector(".Weather_place");
let datetime = document.querySelector(".Weather_time");
let cursor = document.querySelector(".Weather_cursor");
let w_temperature = document.querySelector(".weather_temp");
let icon = document.querySelector(".weather_icon");
let mintemp = document.querySelector(".mintemp");
let maxtemp = document.querySelector(".maxtemp");
let feel = document.querySelector(".wth_feel");
let humidity = document.querySelector(".wth_humidity");
let winds = document.querySelector(".wth_wind");
let pressure = document.querySelector(".wth_pressure");
let citysearch = document.querySelector(".search");

let city = "Faridabad";

// === search function ===
citysearch.addEventListener("submit" , (e)=>{
  e.preventDefault();

  let citysearched = document.querySelector(".search_box");
  city = citysearched.value; 
  getweatherdata();
  citysearched.value = "";
})

//====to get the country names =====
const getcountryname = (code) =>{
	return new Intl.DisplayNames([code], { type: "region" }).of(code);
}


// ==== to get the date and time ====
const getdatetime = () =>{
	let dt = 1770489972;
	const curdate = new Date(dt*1000);
	console.log(curdate);

	const options = {
		weekday : "long",
		year : "numeric",
		month : "long",
		day : "numeric",
		hour : "numeric",
		minute : "numeric",
	};
	const formater = new Intl.DateTimeFormat("en-US" , options);
	const formaterdata = formater.format(curdate);
	return formaterdata;
}

const API_key = "2ac51ad64629c702e924a9212f9e6a87";

const getweatherdata = async () => {
	const weatherurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`;
	try {
		const res = await fetch(weatherurl);
		const data = await res.json();
		console.log(data);
		const {main , name , weather , wind , sys , dt} = data;
		cityname.innerText = `${name} , ${getcountryname(sys.country)}`;
		datetime.innerHTML = getdatetime(dt);
		cursor.innerHTML = weather[0].main;

        const iconCode = weather[0].icon;

         icon.innerHTML = `
           <img 
             src="https://openweathermap.org/img/wn/${iconCode}@2x.png"
             alt="weather icon"
           >
         `;


		w_temperature.innerHTML = `${main.temp}&deg`;
		mintemp.innerHTML = `${main.temp_min}&deg`;
		maxtemp.innerHTML = `${main.temp_max}&deg`;
		feel.innerHTML = `<i class="fa-solid fa-droplet"></i>${main.feels_like}&deg`;
		humidity.innerHTML = `<i class="fa-solid fa-droplet"></i>${main.humidity}%`;
		pressure.innerHTML = `<i class="fa-solid fa-fan"></i>${main.pressure}hpa`;
		winds.innerHTML = `<i class="fa-solid fa-wind"></i>${wind.speed}m/s`;
	} catch (error) {
		console.log(error);
	}
};

window.addEventListener("load", getweatherdata);
