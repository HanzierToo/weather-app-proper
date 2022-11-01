import axios from "axios";

export const validateIfCityExist = (city)=>{
    return new Promise((resolve, reject)=>{
        const apiKey  = "c0e86372cfe2bee8e9ffca2b0aa5910a"
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