import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Novel } from './interfaces/Novel'
import { Link } from 'react-router-dom';
import { Chapter } from './interfaces/Chapter';
import './styles/Universal-Style.css';
import './styles/HomePage-Style.css';
import UserRoleManagement from './UserRoleValidation';
import UserRoleValidation from './UserRoleValidation';
import LatestNovelTable from './LatestNovelTable';
import DisplayTime from './DisplayTime';

function HomePage(){

    axios.defaults.baseURL = 'http://localhost:5000';

    return(
        <div className='mainPage'>
          <DisplayTime />
          <LatestNovelTable />
        </div>
    );
}

export default HomePage;