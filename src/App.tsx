import styles from './App.module.css'
import { Alert } from './components/Alert'
import { Form } from './components/Form'
import Spinner from './components/Spinner'
import { WeatherDetails } from './components/WeatherDetails'
import useWeather from './hooks/useWeather'

function App() {

  const { weather, loading, notFound, fetchWeather } = useWeather()

  return (
    <>
      <h1 className={styles.title}>BUSCADOR DE CLIMA</h1>
      
      <div className={styles.container}>
        <Form fetchWeather = { fetchWeather } />
        {loading && <Spinner />}
        {weather.name && <WeatherDetails weather = {weather} /> }
        {notFound && <Alert>Ciudad no encontrada</Alert>}
      </div>
    </>
  )
}

export default App
