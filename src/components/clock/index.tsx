import React, { useEffect, useState } from "react";
import { InitialClocksTypes, Props } from "../../types/clock.types";
import { getFormatTime } from './modules/scripts';
import "./style.css";


export const Clock = ({ region }: Props): JSX.Element => {
    const [initialClock, setInitialClock] = useState<InitialClocksTypes[] | null>(null)

    useEffect(() => {
        if (region) {
            const { hours, minutes, seconds } = getFormatTime(region)

            setInitialClock([
                {
                    hand: 'hours',
                    angle: (hours * 30) + (minutes / 2),
                    time: hours
                },
                {
                    hand: 'minutes',
                    angle: (minutes * 6),
                    time: minutes
                },
                {
                    hand: 'seconds',
                    angle: (seconds * 6),
                    time: seconds
                }
            ])
        }
    }, [region])

    useEffect(() => {
        const interval = setInterval(() => {
            if (region && initialClock?.length) {

                let newSeconds = initialClock?.[2].time + 1
                let newMinutes = initialClock?.[1].time
                let newHours = initialClock?.[0].time

                if (newSeconds === 60) {
                    newMinutes += 1
                    newSeconds = 0
                }
                if (newMinutes === 60) {
                    newHours += 1
                    newMinutes = 0
                }

                if (newHours === 24) {
                    newHours = 0
                    newMinutes = 0
                    newSeconds = 0
                }

                setInitialClock([
                    {
                        hand: 'hours',
                        angle: (newHours * 30) + (newMinutes / 2),
                        time: newHours
                    },
                    {
                        hand: 'minutes',
                        angle: (newMinutes * 6),
                        time: newMinutes
                    },
                    {
                        hand: 'seconds',
                        angle: (newSeconds * 6),
                        time: newSeconds
                    }
                ])

            }
        }, 1000)

        return () => clearInterval(interval)
    }, [initialClock])

    return (
        <>
            <div className="clock">
                <div className="hours-container">
                    <div className="hours" style={{
                        transform: 'rotateZ(' + initialClock?.[0].angle + 'deg)',
                        transition: initialClock?.[0].time !== 0 ? '.3s' : 'none'
                    }}></div>
                </div>
                <div className="minutes-container">
                    <div className="minutes" style={{
                        transform: 'rotateZ(' + initialClock?.[1].angle + 'deg)',
                        transition: initialClock?.[1].time !== 0 ? '.3s' : 'none'
                    }}></div>
                </div>
                <div className="seconds-container">
                    <div className="seconds" style={{
                        transform: 'rotateZ(' + initialClock?.[2].angle + 'deg)',
                        transition: initialClock?.[2].time !== 0 ? '.3s' : 'none'
                    }}></div>
                </div>
            </div>
            <h2>
                {
                    initialClock?.length ?
                        `${initialClock?.[0].time}:${initialClock?.[1].time}:${initialClock?.[2].time}`
                        :
                        null
                }
            </h2>
        </>
    )
}


