import { useState } from 'react'
import './styles/app.scss'

const Foo = (props) => {
	return (
		<strong>{props.words}</strong>
	)
}

export default App = () => {
	const [count, setCount] = useState(0)
	
	return (
		<div>
			<Foo words="This was built through CICD." />
		</div>
	)
}
