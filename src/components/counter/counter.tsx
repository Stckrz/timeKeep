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
	const [lastTimeEntry, setLastTimeEntry] = useState<TimeModel | null>(null);
	const counting = Boolean(lastTimeEntry && lastTimeEntry.endTime === null);

	const cancel_handler = () => {
		if (counting && timesArray) {
			// drop the running entry
			const newArray = timesArray.filter(time => time.id !== lastTimeEntry!.id);
			setTimesArray(newArray);
		}
	};

	const updateTimeHandler = () => {
		const now = new Date();
		//if the entry array is empty
		if(!lastTimeEntry || lastTimeEntry.endTime){
			const timeObject = {
				startTime: now,
				endTime: null,
				timeInMs: null,
				id: (timesArray?.length ?? 0) + 1,
			};
			setTimesArray([...(timesArray || []), timeObject]);
			return;
		}
		const updated = timesArray!.map(entry =>
			entry.id === lastTimeEntry.id
				? {
					...entry,
					endTime: now,
					timeInMs: now.getTime() - new Date(entry.startTime).getTime(),
					}
				: entry
			);
			setTimesArray(updated);
	};

	useEffect(() => {
		const timeInterval = setInterval(() => {
			setCurrentTime(new Date())
		}, 1000)
		return () => clearInterval(timeInterval)
	}, [])

	useEffect(() => {
		const lastTime = timesArray && timesArray.length > 0
			? timesArray[timesArray.length - 1]
			: null;
		setLastTimeEntry(lastTime)

	}, [timesArray])

	const elapsed = lastTimeEntry && !lastTimeEntry.endTime
    ? Date.now() - new Date(lastTimeEntry.startTime).getTime()
    : 0;

	return (
		<div className={styles.counterContainer}>
			<div className={styles.timeDisplayContainer}>
				{currentTime.toLocaleTimeString()}
			</div>
			<div className={styles.timeCounter}>
				{counting ? msToTime(elapsed) : '--:--:--'}
			</div>
			<div className={styles.buttonBox}>
				<button onClick={cancel_handler} className={counting ? styles.clearButtonActive : styles.clearButtonInactive}>Cancel</button>
				<button onClick={updateTimeHandler}>{ counting ? "Stop" : "Start"}</button>
			</div>
		</div>
	)
}
export default Counter;
