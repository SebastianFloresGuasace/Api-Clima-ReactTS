
export default function formatTemperature (temperature: number) {

    const kelvin = 273.15

    return parseInt((temperature - kelvin).toString())
}