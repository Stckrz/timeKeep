export const msToTime = (timeInMs: number) => {
	let seconds: number | string = Math.floor((timeInMs / 1000) % 60);
	let minutes: number | string = Math.floor((timeInMs / (1000 * 60)) % 60);
	let hours: number | string = Math.floor((timeInMs / (1000 * 60 * 60)) % 24);

	hours = hours.toString().padStart(2, '0');
	minutes = minutes.toString().padStart(2, '0');
	seconds = seconds.toString().padStart(2, '0');
	return hours + ":" + minutes + ":" + seconds
}
