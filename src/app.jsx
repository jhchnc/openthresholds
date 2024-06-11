import './styles/app.scss'
import YAML from 'yaml'

async function GetToc() {
	const res = await fetch('./thresholds.yml')
	const thresholds = await res
	console.log(thresholds.text())	
}

const Foo = (props) => {
	GetToc()
	return (
		<strong>{props.words}</strong>
	)
}

export default function App() {
	return (
		<div>
			<Foo words="This was built through CICD." />
		</div>
	)
}
