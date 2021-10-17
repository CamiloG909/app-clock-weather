eventListeners();

function eventListeners() {
	showClock();
	showDate();
	getLocation();
}

function showClock() {
	const clock = document.querySelector("#clock");

	let hours = new Date().getHours();
	let minutes = new Date().getMinutes();

	// Change to format 12 hours
	hours = hours > 12 ? hours - 12 : hours;

	// Add 0
	hours = String(hours).padStart(2, "0");
	minutes = String(minutes).padStart(2, "0");

	clock.textContent = `${hours}:${minutes}`;

	setTimeout(showClock, 1000);
}

function showDate() {
	const date = document.querySelector("#date");

	const _date = new Date();

	const numWeekday = _date.getDay();
	const weekday = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	const numMonth = _date.getMonth();
	const month = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const day = _date.getDate();

	date.textContent = `${weekday[numWeekday]}, ${month[numMonth]} ${day}`;

	setTimeout(showDate, 1000);
}

function getLocation() {
	const temperature = document.querySelector("#temperature");
	const city = document.querySelector("#city");
	const flag = document.querySelector("#flag");
	const wind = document.querySelector("#wind");
	const iconWeather = document.querySelector("#weather-icon");

	let lat;
	let lon;
	const key = "0a61b17a293600e08e672f60a1893abf";

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((p) => {
			lat = p.coords.latitude;
			lon = p.coords.longitude;

			//const URL_API = `https://api.openweathermap.org/data/2.5/weather?q=Bogota,co&units=metric&lang=en&appid=${key}`;
			const URL_API = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=en&units=metric&appid=${key}`;

			fetch(URL_API)
				.then((response) => response.json())
				.then((data) => {
					// Temperature
					const temp = Math.round(data.main.temp);
					let desc = data.weather[0].description;

					desc = desc.charAt(0).toUpperCase() + desc.slice(1);

					temperature.textContent = `${temp} °C ${desc}`;

					// Icon - Temperature
					let iconTemp = data.weather[0].icon;
					iconTemp = `http://openweathermap.org/img/wn/${iconTemp}@2x.png`;
					iconWeather.src = iconTemp;

					// City
					city.textContent = `${data.name},`;

					// Flag
					let flagImg = data.sys.country.toLowerCase();
					flagImg = `https://flagcdn.com/20x15/${flagImg}.png`;

					flag.src = flagImg;

					// Wind
					wind.textContent = `Wind speed ${data.wind.speed}m/s`;
				})
				.catch((e) => {
					console.log(e);
				});
		});
	} else {
	}
}
