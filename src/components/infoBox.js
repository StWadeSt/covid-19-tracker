import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import "../components/InfoBox.css";

const infoBox = ({ title, cases, active, isRed, total, ...props }) => {
    return (
        <Card onClick={props.onClick} className={`infoBox ${active && "infoBox--Selected"} ${isRed && "infoBox--Red"}`}>
            <CardContent>
                {/* Title*/}
                <Typography className="infoBox__title">
                    {title}
                </Typography>
                {/* Cases*/}
                <h2 className="infoBox__cases">{cases}</h2>
                {/* Total*/}
                <Typography className="infoBox__total" color="textSecondary">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default infoBox
