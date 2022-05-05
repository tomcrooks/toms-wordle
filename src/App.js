import { useEffect, useState } from "react";
import Wordle from "./components/Wordle";

function App() {
	const [solution, setSolution] = useState(null)

	useEffect(() => {
		fetch('http://localhost:3010/solutions')
			.then(res => res.json())
			.then(json => {
				// random int between 0 and length - 1
				const randomSolution = json[Math.floor(Math.random() * json.length - 1)]
				setSolution(randomSolution?.word)
			})
	}, [setSolution])

	return (
		<div className="App">
			<h1>Wordle (Lingo)</h1>
			{solution && <Wordle solution={solution} />}
		</div>
	);
}

export default App;
