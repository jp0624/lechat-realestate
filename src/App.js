import Carousel from './components/Carousel/Carousel'
import About from './components/About/About'
import { Provider } from './context/Context'

function App() {
	return (
		<Provider>
			<div className="App">
				<Carousel />
				<About />
			</div>
		</Provider>
	)
}

export default App
