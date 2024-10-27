import React, { SetStateAction, useEffect, useState } from 'react';
import styles from './counter.module.css'
import { TimeModel } from '../../models/timesModels';
import { msToTime } from '../../lib/functions/timeFunctions';
interface CounterProps {
	timesArray: TimeModel[] | null,
	setTimesArray: React.Dispatch<SetStateAction<TimeModel[] | null>>

}
const Counter: React.FC<CounterProps> = ({ timesArray, setTimesArray }) => {
	const [currentTime, setCurrentTime] = useState<Date>(new Date);
	const [startTime, setStartTime] = useState<Date | null>(null);
	const [counting, setCounting] = useState(false);

	const cancel_handler = () => {
		if (counting) {
			setStartTime(null);
			setCounting(false);
		}
	}

	const updateTimeHandler = () => {
		if (!startTime) {
			setStartTime(currentTime);
			setCounting(true);
		} else {
			const timeObject = {
				startTime: startTime,
				endTime: currentTime,
				timeInMs: (currentTime.getTime() - startTime.getTime())
			};
			setTimesArray([...(timesArray || []), timeObject]);
			setStartTime(null);
			setCounting(false);
		}
	}

	useEffect(() => {
		const timeInterval = setInterval(() => {
			setCurrentTime(new Date())

		}, 1000)
		return () => clearInterval(timeInterval)
	}, [])

	return (
		<div className={styles.counterContainer}>
			<div className={styles.timeDisplayContainer}>
				{currentTime.toLocaleTimeString()}
			</div>
			<div className={styles.timeCounter}>
				{startTime && msToTime(currentTime.getTime() - startTime.getTime())}
			</div>
			<div className={styles.buttonBox}>
				<button onClick={cancel_handler} className={counting ? styles.clearButtonActive : styles.clearButtonInactive}>Cancel</button>
				<button onClick={updateTimeHandler}>{counting ? "Stop" : "Start"}</button>
			</div>
		</div>

	)
}
export default Counter;
