import axios from "axios";
import fetchApiKey from "../../../hooks/useApiKey";

export const validateIfCityExist = (city)=>{
    return new Promise((resolve, reject)=>{
        const apiKey = fetchApiKey;
        const url = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=metric`
        axios.get(url).then(r=>{
            if (r?.status === 200){
                resolve(true)
            }else if (r?.status === 404){
                resolve(false)
            }else{
                reject("SOMETHING WENT WRONG")
            }
        }).catch(e=>{
            reject(e)
        })
    })
}