import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Novel } from './interfaces/Novel'
import { Link } from 'react-router-dom';
import { Chapter } from './interfaces/Chapter';
import './styles/Universal-Style.css';
import './styles/HomePage-Style.css';

function LatestNovelTable(){
    const [novelList, setNovel] = useState<Novel[]>([]);
    const [latestChap, setLC] = useState<Chapter[]>([]);

    axios.defaults.baseURL = 'http://localhost:5000';

    useEffect(() => {
        const getNovelList = async () => {
          try {
            const response = await axios.get('novels/order/latest');
            setNovel(response.data);

            const latestChapters = await Promise.all(
                response.data.map(async (novel : Novel) => {
                  try {
                    const latest = await axios.get('chapters/latest/' + novel._id);
                    return latest.data;
                  } catch (error) {
                    console.error('Error fetching latest chapter:', error);
                    return null;
                  }
                })
              );
        
              setLC(latestChapters);
          } catch (error) {
            console.error('Error fetching novel data:', error);
          }

        };
        getNovelList();
      }, []);


    return(
        <div className='mainPage'>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Release</th>
                        <th>Group</th>
                    </tr>
                </thead>
                <tbody>
                    {novelList.map((novel, index) => (
                        <tr key={novel._id} className={index % 2 == 0 ? 'even-row': 'odd-row'}>
                            <th><Link to={'/novel/detail/' + novel._id}>{novel.title}</Link></th>
                            <th><Link to={latestChap && latestChap[index] ? "http://" + latestChap[index].link : 'N/A'}>c{latestChap && latestChap[index] ? latestChap[index].number : 'N/A'}</Link></th>
                            
                            <th><Link to="">{latestChap && latestChap[index] ? latestChap[index].group_name : 'N/A'}</Link></th>
                        </tr>
                    ))}
                </tbody>
            </table><br /><br />
        </div>
    );
}

export default LatestNovelTable;