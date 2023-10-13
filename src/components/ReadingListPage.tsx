import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Novel } from './interfaces/Novel'
import { Link, useParams } from 'react-router-dom';
import './styles/Universal-Style.css';
import './styles/HomePage-Style.css';
import './styles/ReadingList-Style.css';
import { ReadingList } from './interfaces/ReadingList';
import { NovelToReadingList } from './interfaces/NovelToReadingList';
import Cookies from 'js-cookie';
import { read } from 'fs';
import { Chapter } from './interfaces/Chapter';

function ReadingListPage(){
    const [readingList, setReadingList] = useState<ReadingList[]>([]);
    // const [latestProgress, setLP] = useState<NovelToReadingList[]>([]);
    const [currentRList, setCurrentRL] = useState<ReadingList>();
    const [readingListNovel, setRLContent] = useState<NovelToReadingList[]>([]);
    const [novelList, setNovel] = useState<Novel[]>([]);
    const [latestChap, setLC] = useState<Chapter[]>([]);
    const [userProgess, setProgress] = useState<Chapter[]>([]);

    axios.defaults.baseURL = 'http://localhost:5000';

    const readingList_num = Number(useParams().id) || 0;
    const user_id = Cookies.get("userId");

    useEffect(() => {
        if (readingList.length > 0) {
          setCurrentRL(readingList[readingList_num]);
        }
      }, [readingList]);
      

    useEffect(() => {
        const temp_id = Cookies.get("userId");
        if(user_id == temp_id){
            axios.get('readingList/find/' + user_id)
            .then((response) => {
                setReadingList(response.data);
                
            })
            .catch((error) => {
                console.error('Error fetching reading list data:', error);
            });
        }

      }, []);

      useEffect (() => {
        if(currentRList != null){
            axios.get('novelToList/find/' + currentRList?._id)
            .then(response => {
                if (response.data) {
                  setRLContent(response.data);
                  getNovelList(response);
                }
              })
            .catch(error => {
                console.error('Error fetching reading list data:', error);
            });
        }
      })

      const getNovelList = ( response: any ) => {
        const promises = response.data.map((novel: NovelToReadingList) => {
          return axios.get('novels/find/' + novel.novel_id)
            .then(latest => {
              latest = latest.data;
              return latest;
            })
            .catch(error => {
              console.error('Error fetching latest chapter:', error);
              return null;
            });
        });

        Promise.all(promises)
          .then(getNovel => {
            setNovel(getNovel);
          })
          .catch(error => {
            console.error('Error fetching reading list data:', error);
          });
        
          getLatestChapter(novelList);
          getUserProgress(novelList);
      }

      const getLatestChapter = ( novelList : Novel[] ) => {
        const promises = novelList.map((novel: Novel) => {
          return axios.get('chapters/latest/' + novel._id)
            .then(response => {
              const latest = response.data;
              return latest;
            })
            .catch(error => {
              console.error('Error fetching latest chapter:', error);
              return null;
            });
        });
      
        Promise.all(promises)
          .then(chapters => {
            setLC(chapters);
          })
          .catch(error => {
            console.error('Error fetching latest chapters:', error);
          });
      }

      const getUserProgress = (novelList : Novel[]) => {
        const promises : Promise<Chapter>[] = [];;

        novelList.forEach((novel: Novel) => {
          axios.get('novelToList/findOne/' + currentRList?._id + '/' + novel._id)
            .then(response => {
              const novelToChapterArray = response.data;

              if (Array.isArray(novelToChapterArray)) {
                novelToChapterArray.forEach(novelToChapter => {
                  if (novelToChapter.progress) {
                    
                    promises.push(
                      axios.get('chapters/findChapter/' + novelToChapter.progress)
                        .then(chapterResponse => {
                          return chapterResponse.data;
                        })
                        .catch(error => {
                          console.error('Error fetching chapter:', error);
                          return null;
                        })
                    );
                  }
                });
              }
            })
            .catch(error => {
              console.error('Error fetching latest chapter:', error);
            });
        });

        Promise.all(promises)
          .then(chapters => {
            
            setProgress(chapters);
          })
          .catch(error => {
            console.error('Error fetching latest chapters:', error);
          });
      }

      const handleChangeRList = ( index : number) => {
        window.location.href = '/readingList/' + index;
      }

    return(
        <div className='mainPage'>
            <div className='readingListSelect'>
                {readingList.map((rList, index) => (
                    <button className={readingList_num == index ? 'active-button' : ''} onClick={() => handleChangeRList(index)} key={index}>{rList.reading_list_name}</button>
                ))}
            </div><br />

            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>My Status</th>
                        <th>Latest Release</th>
                    </tr>
                </thead>
                <tbody>
                    {novelList.map((novel, index) => (
                        <tr key={novel._id} className={index % 2 == 0 ? 'even-row': 'odd-row'}>
                            <th><Link to={'/novel/detail/' + novel._id}>{novel.title}</Link></th>
                            <th><Link to={userProgess && userProgess[index] ? "http://" + userProgess[index].link : 'N/A'}>c{userProgess && userProgess[index] ? userProgess[index].number : 'N/A'}</Link></th>
                            <th><Link to={latestChap && latestChap[index] ? "http://" + latestChap[index].link : 'N/A'}>c{latestChap && latestChap[index] ? latestChap[index].number : 'N/A'}</Link></th>
                        </tr>
                    ))}
                </tbody>
            </table><br /><br />            
        </div>
    );
}

export default ReadingListPage;