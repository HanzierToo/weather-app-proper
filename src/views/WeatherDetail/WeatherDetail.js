import * as React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import {useCookies} from "react-cookie";

import {Tooltip} from "@mui/material";
import {useState} from "react";
import {toast, ToastContainer} from "react-toastify";

export default function WeatherDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const [bookmarkState, setBookmarkState] = useState(true)

    const notifyBookmarkedTrue = () => toast("Bookmarked!");
    const notifyBookmarkedFalse = () => toast("Removed Bookmark.");

    const handleBackButton = () => {
        navigate('/');
    }

    const handleBookmark = () => {
        setBookmarkState(!bookmarkState);
        if(bookmarkState){
            console.log("True!")
            notifyBookmarkedTrue()
        } else {
            console.log("False!")
            notifyBookmarkedFalse()
        }
    }

    // Please, before you look down there, note that this was done at 11 PM with 5 hours of sleep the night before.
    // If I had the mental capacity to do the proper CSS, I would have done so.

    return (
        <>
            <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", pt: "2.5%", pb: "2.5%"}}>
                <Grid container spacing={0} alignItems="center" justifyContent="center" sx={{textAlign:'center', maxWidth:'60%'}}>
                    <Grid item xs={4}>
                        <Tooltip title="Back">
                            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleBackButton}>
                                <ArrowBackIosNewIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={4}>
                        <h2>Detailed View / Info</h2>
                    </Grid>
                    <Grid item xs={4}>
                        <Tooltip title="Bookmark / Save">
                            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleBookmark}>
                                {bookmarkState ? <BookmarkBorderIcon /> : <BookmarkIcon />}
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                <Grid container spacing={0} alignItems="center" justifyContent="center" sx={{textAlign:'center', maxWidth:'40%'}}>
                    <Grid item xs={12}>
                        <h1>{location.state.cityName}</h1>
                        <h3>{location.state.country}</h3>
                    </Grid>
                    <Grid item xs={12}>
                        <h1>{location.state.temp_avg}°C</h1>
                    </Grid>
                    <Grid item xs={6} sx={{
                        backgroundColor: 'lightgray',
                        borderRadius: '22px',
                        borderStyle: 'solid',
                        borderWidth: '8px',
                        borderColor: 'white'
                    }}>
                        <Grid container spacing={0} alignItems="center" justifyContent="center" sx={{textAlign:'left', padding: '22px', pt: "0px", pb: "0px"}}>
                            <Grid item xs={4}>
                                <h3>High</h3>
                            </Grid>
                            <Grid item xs={8}></Grid>
                            <Grid item xs={2}></Grid>
                            <Grid item xs={10} sx={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'right'}}>
                                <h1>{location.state.temp_max}°C</h1>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6} sx={{
                        backgroundColor: 'lightgray',
                        borderRadius: '22px',
                        borderStyle: 'solid',
                        borderWidth: '8px',
                        borderColor: 'white'
                    }}>
                        <Grid container spacing={0} alignItems="center" justifyContent="center" sx={{textAlign:'left', padding: '22px', pt: "0px", pb: "0px"}}>
                            <Grid item xs={4}>
                                <h3>Low</h3>
                            </Grid>
                            <Grid item xs={8}></Grid>
                            <Grid item xs={2}></Grid>
                            <Grid item xs={10} sx={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'right'}}>
                                <h1>{location.state.temp_min}°C</h1>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6} sx={{
                        backgroundColor: 'lightgray',
                        borderRadius: '22px',
                        borderStyle: 'solid',
                        borderWidth: '8px',
                        borderColor: 'white'
                    }}>
                        <Grid container spacing={0} alignItems="center" justifyContent="center" sx={{textAlign:'left', padding: '22px', pt: "0px", pb: "0px"}}>
                            <Grid item xs={4}>
                                <h3>Humidity</h3>
                            </Grid>
                            <Grid item xs={8}></Grid>
                            <Grid item xs={2}></Grid>
                            <Grid item xs={10} sx={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'right'}}>
                                <h1>{location.state.humidity}%</h1>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6} sx={{
                        backgroundColor: 'lightgray',
                        borderRadius: '22px',
                        borderStyle: 'solid',
                        borderWidth: '8px',
                        borderColor: 'white'
                    }}>
                        <Grid container spacing={0} alignItems="center" justifyContent="center" sx={{textAlign:'left', padding: '22px', pt: "0px", pb: "0px"}}>
                            <Grid item xs={10}>
                                <h3>Atmospheric Pressure</h3>
                            </Grid>
                            <Grid item xs={2}></Grid>
                            <Grid item xs={2}></Grid>
                            <Grid item xs={10} sx={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'right'}}>
                                <h1>{location.state.pressure}</h1>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <ToastContainer />
        </>
    )
}