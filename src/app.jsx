import { useState } from 'react'
import './styles/app.scss'

const Foo = (props) => {
	return (
		<strong>Bar</strong>
	)
}

export default function App() {
	const [count, setCount] = useState(0)
	
	return (
		<div>
			<Foo />
		</div>
	)
}
