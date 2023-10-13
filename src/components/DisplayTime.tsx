import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Novel } from './interfaces/Novel'
import { Link } from 'react-router-dom';
import './styles/Universal-Style.css';
import './styles/HomePage-Style.css';
import { ReadingList } from './interfaces/ReadingList';
import { NovelToReadingList } from './interfaces/NovelToReadingList';

function DisplayTime(){
    const [timeNow, setTime] = useState('');

    axios.defaults.baseURL = 'http://localhost:5000';

    useEffect(() => {
          const updateTime = () => {
            const time = new Date();

            const options = {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: true, // Use 24-hour format
            } as Intl.DateTimeFormatOptions;

            const now = time.toLocaleString(undefined, options);
            setTime(now);
          }
          
          updateTime();

          const intervalId = setInterval(updateTime, 1000);

          return () => {
            clearInterval(intervalId); 
          };

        });


    return(
        <div className='mainPage'>
            <h3>{timeNow}</h3>
        </div>
    );
}

export default DisplayTime;