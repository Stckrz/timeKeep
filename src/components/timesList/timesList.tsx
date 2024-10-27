import styles from "./timesList.module.css";
import { msToTime } from '../../lib/functions/timeFunctions';
import { TimeModel } from '../../models/timesModels';
import { SetStateAction, useEffect, useState } from "react";
interface TimesListProps {
	timesArray: TimeModel[] | null
	setTimesArray: React.Dispatch<SetStateAction<TimeModel[] | null>>
}
const TimesList: React.FC<TimesListProps> = ({ timesArray, setTimesArray }) => {

	const colorsArray = [
		"#f2d5cf",
		"#eebebe",
		"#f4b8e4",
		"#ca9ee6",
		"#e78284",
		"#ea999c",
		"#ef9f76",
		"#e5c890",
		"#a6d189",
		"#81c8be",
		"#99d1db",
		"#85c1dc",
		"#8caaee",
		"#babbf1",
	]
	const [timeTotal, setTimeTotal] = useState<number>(0);

	const clear_local_storage = () => {
		setTimesArray([])
	}

	const getTotalTime = () => {
		let total = 0;
		if (timesArray) {
			for (let i = 0; i < timesArray.length; i++) {
				total += timesArray[i].timeInMs
			}
			setTimeTotal(total);
		}
	}
	useEffect(() => {
		getTotalTime()
	}, [timesArray])
	return (
		<div className={styles.timesListContainer}>
			<div className={styles.listWrapper}>
				<div className={styles.listItemsContainer}>
					{timesArray &&
						timesArray.map((time, index) => {
							return (
								<div
									key={index}
									style={{
										backgroundColor: colorsArray[index % colorsArray.length],
										color: '#232634',
									}}
									className={styles.entryWrapper}
								>
									<div>
										{`${new Date(time.startTime).toLocaleTimeString()}
								-
							${new Date(time.endTime).toLocaleTimeString()}`}
									</div>
									<div className={styles.entryTime}>
										{msToTime(time.timeInMs)}
									</div>
								</div>
							)
						})
					}
				</div>
			<button className={styles.clearButton} onClick={clear_local_storage}>Clear</button>
				<div className={styles.totalTime}>Total Time: {msToTime(timeTotal)}</div>
				<div className={styles.adjustedTimeWrapper}>Adjusted Time: </div>
				<div className={styles.adjustedTimeWrapper}>
					<div>{timesArray && timesArray.length > 0 &&timesArray[0].startTime && new Date(timesArray[0].startTime).toLocaleTimeString()}</div>
					<div>-</div>
					<div>{
						timesArray && timesArray.length > 0 && timesArray[0].startTime && new Date(new Date(timesArray[0].startTime).getTime() + timeTotal).toLocaleTimeString()
					}</div>
				</div>
			</div>
		</div>
	)
}
export default TimesList


