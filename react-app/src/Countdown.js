import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './Countdown.css';
import {getRemainingTimeUntilMsTimestamp} from './CountdownUtils';

const defaultRemainingTime = {
    seconds: '00',
    minutes: '00',
    hours: '00',
    days: '00'
}

const CountdownTimer = ({countdownTimestampMs}) => {
    const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);
    const navigate = useNavigate();

    useEffect(() => {
        const intervalId = setInterval(() => {
            updateRemainingTime(countdownTimestampMs);
        }, 1000);
        setTimeout(() => {
            if(remainingTime.days === '00' && remainingTime.hours === '00' && remainingTime.minutes === '00' && remainingTime.seconds === '00'){
        //     clearInterval(intervalId);
                setRemainingTime(defaultRemainingTime);
                // navigate('/', {replace: true});
        }}, 60000);
        return () => clearInterval(intervalId);
    },[countdownTimestampMs]);

    function updateRemainingTime(countdown) {
        setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));
    }

    return(
        <div className="countdown-timer">
            <span>{remainingTime.days}</span>
            <span>days</span>
            <span className="two-numbers">{remainingTime.hours}</span>
            <span>hours</span>
            <span className="two-numbers">{remainingTime.minutes}</span>
            <span>minutes</span>
            <span className="two-numbers">{remainingTime.seconds}</span>
            <span>seconds</span>
        </div>
    );
}

export default CountdownTimer;