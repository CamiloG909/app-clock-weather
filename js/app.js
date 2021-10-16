const clock = document.querySelector("#clock");
const date = document.querySelector("#date");

eventListeners();

function eventListeners() {
	showClock();
	showDate();
}

function showClock() {
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
