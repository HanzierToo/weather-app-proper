import {useEffect, useState} from "react";
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import {Container, TextField, Tooltip} from "@mui/material";
import useFetchWeather from "../../hooks/useFetchWeather";
import { useNavigate } from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {validateIfCityExist} from "./helper/ValidateIfCityExists";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Grid from "@mui/material/Grid";

export default function Home() {
    const [ fetchWeatherDataCallback, weatherData ] = useFetchWeather();

    const [textInput, setTextInput] = useState('');

    let recentCities = [];
    let increment = 0; // This is what a for loop outside a for loop looks like. :')

    const handleTextInputChange = event => {
        setTextInput(event.target.value);
    }

    const navigate = useNavigate();

    const handleKeyDown = event => {
        if (event.key === 'Enter') {
            console.log('Enter key pressed ✅');
            event.preventDefault();
            handleTextInputChange(event);
        }
    };

    const notifyInvalidCity = () => toast("Invalid City, Try Again.");
    // Handles snackbars & toast. [God Bless the React community.]

    const handleRecent = () => {
        for(let i = 0; i < localStorage.getItem('recent' + increment).length; i++){
            const arr = localStorage.getItem('recent' + increment).split(',')
            for (let j = 0; j < arr.length; j++) {
                arr[j] = arr[j].trim();
            }
            return(
                <Grid container spacing={0} sx={{
                    backgroundColor: 'lightgray',
                    borderRadius: '22px',
                    borderStyle: 'solid',
                    borderWidth: '8px',
                    borderColor: 'white',
                    pt: '1%',
                    pb: '1%'
                }}>
                    <Grid item xs={9} sx={{pl: '5%'}}>
                        <Grid container spacing={0} alignItems="center" justifyContent="center" sx={{textAlign:'left', padding: '22px', pt: "0px", pb: "0px"}}>
                            <Grid item xs={12}>
                                <h1>{arr[0]}</h1>
                            </Grid>
                            <Grid item xs={12} sx={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'left'}}>
                                <h2>{arr[1]}</h2>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3} sx={{
                        display: 'flex',
                        justifyContent:'right',
                        alignItems:'center',
                        pr:'5%'
                    }}>
                        <Tooltip title="See Info">
                            <IconButton sx={{ p: '10px' }} aria-label="menu">
                                <ArrowForwardIosIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            )
        }
    }

    useEffect( () => {
        async function fetchData() {
            if (Object.keys(textInput).length !== 0) {
                recentCities[increment] = textInput;
                localStorage.setItem('recent' + increment, recentCities[increment])
                increment++; // This is hella jank, but it'll do :)
                const arr = textInput.split(",");
                for(let i = 0; i<arr.length; i++){
                    arr[i] = arr[i].trim();
                    console.log(arr[i])
                }
                try {
                    const validationResult = await validateIfCityExist(arr[0]);
                    console.log(validationResult);
                    const url = `https://api.openweathermap.org/data/2.5/weather?q=${arr[0]},${arr[1]}`
                    if(validationResult === true) {
                        await fetchWeatherDataCallback(url);
                    }
                } catch(e) {
                    console.error(e);
                    notifyInvalidCity();
                }
            }
        }
        fetchData();
    },[textInput])

    useEffect(() => {
        if(weatherData.city !== "") {
            navigate('/weather-detail',{
                state:{
                    cityName: weatherData.city,
                    country: weatherData.country,
                    temp_avg: weatherData.temp_avg,
                    temp_min: weatherData.temp_min,
                    temp_max: weatherData.temp_max,
                    humidity: weatherData.humidity,
                    pressure: weatherData.pressure
                }
            });
        }
    },[weatherData])

    return (
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', pt: '2%', flexDirection: 'column',width:'100%'}}>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', justifyContent: 'center', width:'25%', flexWrap: 'wrap'}}
            >
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search" disabled>
                    <SearchIcon />
                </IconButton>
                <TextField
                    variant="standard"
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="City, country (i.e., Jakarta, ID)"
                    InputProps={{ disableUnderline: true}}
                    onKeyDown={handleKeyDown}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <Tooltip title="Saved Cities">
                    <IconButton sx={{ p: '10px' }} aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                </Tooltip>
            </Paper>

            <div sx={{width: '100%'}} />

            <Box sx={{pt:'2%', textAlign: 'center', width: '40%'}}>
                <h3>Recent Searches</h3>
                {handleRecent()}
            </Box>
            <ToastContainer />
        </Box>
    );
}