import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Novel } from './interfaces/Novel';
import './styles/NovelDetail-Style.css';
import { Chapter } from './interfaces/Chapter';
import AddToReadingList from './AddToReadingList';
import Cookies from 'js-cookie';

function NovelDetail(){
    const current_id_unpro = useParams();
    const current_id = current_id_unpro.id;
    const [novelData, setNovel] = useState<Novel>();
    const [ChapterList, setChapter] = useState<Chapter[]>([]);

    const [isGuest, setGuest] = useState(false);

    axios.defaults.baseURL = 'http://localhost:5000';

    useEffect(() => {
        const getUser = async () => {
          try {
            const response = await axios.get('novels/find/' + current_id);
            setNovel(response.data);
          } catch (error) {
            console.error('Error fetching novel data:', error);
          }
        };
    
        getUser();
      }, []);

    useEffect(() => {
      if(Cookies.get('userId')){
        
      }
      else{
        setGuest(true);
      }
    })

    useEffect(() => {
      const getChapterList = async () => {
        try{
          const response = await axios.get('chapters/find/'+ current_id);
          setChapter(response.data);
        } catch (error){
          console.error('Error fetching novel data:', error);
        }
      };
      console.log("Chapter List Loaded.");
      getChapterList();
    }, []);

    return(
        <div>
            <h1>{novelData?.title}</h1>
            {isGuest ? '' : (
              <AddToReadingList current_id={current_id} />
            )}
            <div className='detailContent'>
              <div className='leftContent'>
                <img src={novelData?.picture_link} alt={novelData?.picture_link} />
                <h3>Genre : </h3>
                {/* <p>{novelData?.genre.join(' ')}</p> */}
                {novelData?.genre.map((genre, index) => (
                  <React.Fragment key={genre}>
                    {index > 0 && ' '}
                    <Link to={`/genre/${genre}`}>{genre}</Link>
                  </React.Fragment>
                ))}
                {/* <p>Rating : {novelData?.rating}</p> */}
                <h3>Author : </h3>
                <p>{novelData?.author}</p>
              </div>

              <div className='rightContent'>
                <h3>Description </h3>
                <p>{novelData?.desc}</p>
                <h3>Associated Names </h3>
                <p>{novelData?.alternative_title}</p>

                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Group</th>
                      <th>Release</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ChapterList.map((chapter, index) => (
                      <tr key={chapter._id} className={index % 2 == 0 ? 'even-row': 'odd-row'}>
                        <th>{new Date(chapter.createdAt).toLocaleDateString()}</th>
                        <th><Link to={chapter.group_name}>{chapter.group_name}</Link></th>
                        <th><Link to={"http://" + chapter.link}>c{chapter.number}</Link></th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
        </div>
    );
}

export default NovelDetail;