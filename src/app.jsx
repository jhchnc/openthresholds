import './styles/app.scss'

const Foo = (props) => {
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
