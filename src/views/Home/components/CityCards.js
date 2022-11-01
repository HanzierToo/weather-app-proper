import {Card, CardActionArea, CardContent, CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";

const CityCards = ({
                       cityName = "",
                       countryCode= "",
                   })=>{
    return (
        <div className="mt-1 mb-1">
            <Card sx={{ maxWidth: 345, minWidth: 200 }}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {cityName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {countryCode}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>);
}

export default CityCards;