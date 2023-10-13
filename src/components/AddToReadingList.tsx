import PropTypes from 'prop-types';
import { User } from './interfaces/User';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { NovelToReadingList } from './interfaces/NovelToReadingList';
import { useAsyncError } from 'react-router-dom';
import { ReadingList } from './interfaces/ReadingList';
import { read } from 'fs';
import { response } from 'express';
import { Chapter } from './interfaces/Chapter';
import { error } from 'console';
import './styles/AddToReadingList-Style.css';

function AddToReadingList(props: { current_id: any; }){
    const {current_id} = props;
    const [userDetail, setUser] = useState('');
    const [novelStatus, setStatus] = useState<NovelToReadingList | undefined>();
    const [readingList, setRList] = useState<ReadingList | undefined>();
    const [allReadingList, setFullRList] = useState<ReadingList[]>([]);
    const [currentReadingList, setCurrentList] = useState<ReadingList>();

    const [NotInRList, setExist] = useState(true);

    const[firstChap, setFirstChap] = useState<Chapter>();

    useEffect(() => {
        const user_id = Cookies.get('userId');
        if(user_id){
            setUser(user_id);
            getStatus(user_id);
        }
    })

    useEffect(() => {
        if (novelStatus?.novel_id) {
            getRListInfo();
        }
    }, [novelStatus]);

    const getStatus = ( user : String) => {
        axios.get('novelToList/novelStatus/' + user + '/' + current_id)
        .then(response => {
            setStatus(response.data);
            getRListInfo();
            getFullRList();
        })
        .catch(error => {
            console.error('Error fetching novel status data:', error);
        })
    }

    const getRListInfo = () => {
        if(novelStatus?.novel_id){
            setExist(true);
            axios.get('readingList/findByID/' + novelStatus?.reading_list_id)
            .then(response => {
                if(response.data){
                    setRList(response.data);
                    setCurrentList(response.data);
                }
            })
            .catch(error => { 
                console.error('Error fetching novel status data:', error);
            })
        }
        else{
            
            setExist(false);
        }
    }

    const getFullRList = () => {
        const user_id = Cookies.get('userId');
        axios.get('readinglist/find/' + user_id)
        .then(response => {
            setFullRList(response.data);
        })
        .catch(error => {
            console.error('Error fetching reading list data:', error);
        })
    }

    const handleMoveNovel = (event: any) => {
        const selectedOptionValue = event.target.value;

        if(NotInRList === false){
            axios.get('chapters/first/' + current_id)
            .then(response => {
                let firstChapterId = "0";
                // console.log(response)
                if(response.data === null){
                    firstChapterId = "0";
                }
                else{
                    const firstChapter = response.data;
                    firstChapterId = firstChapter._id;
                }

                return axios.post('novelToList/add', {
                    reading_list_id: selectedOptionValue,
                    novel_id: current_id,
                    progress: firstChapterId
                });
            })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error updating data:', error);
            })
        }
        else{
            axios.put('novelToList/moveNovel/' + novelStatus?._id, { reading_list_id: selectedOptionValue })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error updating data:', error);
            });
        }

        window.location.reload();
    }
    
    const handleRemoveNovel = () => {
        axios.delete('novelToList/findAndDelete/' + novelStatus?._id)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.error('Error :', error);
        })
        window.location.reload();
    }

    return(
        <div>
            {NotInRList ? (
                <p>Currently in {readingList?.reading_list_name} list. Move to 
                    <select value={currentReadingList?._id} name="" id="" onChange={handleMoveNovel}>
                        {allReadingList.map((rList, index) => (
                            <option key={rList._id} value={rList._id}>{rList.reading_list_name}</option>
                        ))}
                    </select>
                    <button className='removeNovelBtn' onClick={handleRemoveNovel}>Remove</button>
                </p>
            ) : (
                <p>Add series to
                    <select value={currentReadingList?._id} name="" id="" onChange={handleMoveNovel}>
                        <option value="null">Select..</option>
                        {allReadingList.map((rList, index) => (
                            <option key={rList._id} value={rList._id}>{rList.reading_list_name}</option>
                        ))}
                    </select>
                </p>
            )}
            
        </div>
    )
}

export default AddToReadingList;