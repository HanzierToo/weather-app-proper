import axios from "axios";
import {useCallback, useState} from "react";

const fetchWeatherData = (urlRaw)=>{
    return new Promise((resolve, reject)=>{
        const apiKey  = "c0e86372cfe2bee8e9ffca2b0aa5910a"
        const url = urlRaw.concat(`&appid=${apiKey}&units=metric`)
        axios.get(url).then(r=>{
            console.log(r.status)
            if (r?.status === 200){
                resolve(r?.data)
            }else{
                reject("SOMETHING WENT WRONG")
            }
        }).catch(e=>{
            reject(e)
        })
    })
}

const useFetchWeather = ()=>{
    const [weatherData={
        city: "",
        temp: "",
        humidity: "",
    }, setWeatherData] = useState();

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchWeatherDataCallback = useCallback((city)=>{
        setIsLoading(true);
        return fetchWeatherData(city).then(response=>{
            console.log(typeof response?.name);

            // Check for error
            if (typeof response?.name !== "string" &&
                !isNaN(response?.main?.temp) &&
                !isNaN(response?.main?.humidity)){
                setError("WRONG DATA TYPES");
                setIsLoading(false);
                return;
            }

            const weatherData = {
                city: response?.name,
                country: response?.sys?.country,
                temp_avg: response?.main?.temp,
                temp_min: response?.main?.temp_min,
                temp_max: response?.main?.temp_max,
                humidity: response?.main?.humidity,
                pressure: response?.main?.pressure
            }

            setWeatherData(weatherData);
            setIsLoading(false);
        }).catch(error=>{
            // TODO: Set a warning message here
            setError(error)
            setIsLoading(false);
        })
    }, [setWeatherData])

    return [
        fetchWeatherDataCallback,
        weatherData,
        error,
        isLoading,
    ]
}

export default useFetchWeather;