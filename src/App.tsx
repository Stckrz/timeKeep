import { useEffect, useState } from 'react'
import './App.css'
import Counter from './components/counter/counter'
import TimesList from './components/timesList/timesList'
import { TimeModel } from './models/timesModels'

function App() {
	const [timesArray, setTimesArray] = useState<TimeModel[] | null>(null)

	useEffect(() => {
		const storedItems = localStorage.getItem('timesArray')
		if (storedItems) {
			setTimesArray(JSON.parse(storedItems));
		}
	}, []);

	useEffect(() => {
		if (timesArray) {
			localStorage.setItem('timesArray', JSON.stringify(timesArray))
		}
	}, [timesArray]);

	return (
		<div className={"appContainer"}>
			<Counter timesArray={timesArray} setTimesArray={setTimesArray} />
			<TimesList timesArray={timesArray} setTimesArray={setTimesArray}/>
		</div>
	)
}

export default App
