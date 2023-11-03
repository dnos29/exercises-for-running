const ONE_MINUTE = 60;
const ONE_HOUR = 60 * ONE_MINUTE;
const ONE_DAY = 24 * ONE_HOUR;
export const formatTimer = (timer: number) => {
	const hour = Math.floor(timer / ONE_HOUR);
	const minute = Math.floor((timer - hour * ONE_HOUR) / ONE_MINUTE);
	const second = timer - hour * ONE_DAY - minute * ONE_MINUTE;
	return `${padTimer(hour)}:${padTimer(minute)}:${padTimer(second)}`
}

export const padTimer = (time: number) => {
	return time.toString().padStart(2, '0');
}

export const convertStringToSecond = (stringTime: string | undefined): number => {
	if(!stringTime){
		return 0;
	}
	const [minute, second] = stringTime.split(":");
	return Number(minute) * ONE_MINUTE + Number(second);
}