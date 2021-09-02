import React from 'react'
import {Card, CardContent, Typography} from "@material-ui/core"

function InfoBox({title, cases, total}) {
    return (
        <Card className="infoBox">
        <CardContent>
            {/* The title of card*/}
            <Typography color="textSecondary" className="infoBox__title">
            {title}
            </Typography>

            {/* Cases*/}
            <Typography color="textPrimary" className="infoBox__cases" variant="h4" >
            {cases}
            </Typography>

            Total: 
            <Typography color="textSecondary" className="infoBox__total">
            {total}
            </Typography> 

        </CardContent>
        </Card>
    )
}

export default InfoBox
