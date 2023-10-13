import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AddUser(){
    axios.defaults.baseURL = 'http://localhost:5000';

    const [titleBox, setTitle] = useState('');
    const [authorBox, setAuthor] = useState('');
    const [descBox, setDesc] = useState('');
    const [alterBox, setAlter] = useState('');
    const [genreBox, setGenre] = useState<string[]>([]);

    const genreList = [
        { id: 'Action', name: 'Action' },
        { id: 'Adventure', name: 'Adventure' },
        { id: 'Comedy', name: 'Comedy' },
        { id: 'Drama', name: 'Drama' },
        { id: 'Fantasy', name: 'Fantasy' },
        { id: 'Harem', name: 'Harem' },
        { id: 'Horror', name: 'Horror' },
        { id: 'Mystery', name: 'Mystery' },
        { id: 'Psychological', name: 'Psychological' },
        { id: 'School Life', name: 'School Life' }, 
      ];

    const handleGenreChange = (genreId: string) => {
        setGenre((prevSelectedGenres) => {
          // Toggle the selected state of the genre
          if (prevSelectedGenres.includes(genreId)) {
            return prevSelectedGenres.filter((id) => id !== genreId);
          } else {
            return [...prevSelectedGenres, genreId];
          }
        });
      };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newNovel = {
            title: titleBox,
            author: authorBox,
            desc: descBox,
            alternative_title: alterBox,
            genre: genreBox,
        };

        axios.post('http://localhost:5000/novels/add', newNovel);

        setTitle('');
        setAuthor('');
        setDesc('');
        setAlter('');
        setGenre([]);

        window.location.href = '/';
    }
    

    return(
        <div>
            <h1>Add New Novel</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input type="text" value={titleBox} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label>Author</label>
                    <input type="text" value={authorBox} onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <div>
                    <label>Description</label>
                    <input type="text" value={descBox} onChange={(e) => setDesc(e.target.value)} />
                </div>
                <div>
                    <label>Alternative Title</label>
                    <input type="text" value={alterBox} onChange={(e) => setAlter(e.target.value)} />
                </div>
                <div>
                    <label>Genre</label>
                    {genreList.map((genre) => (
                        <div key={genre.id}>
                            <input
                            type="checkbox"
                            value={genre.name}
                            checked={genreBox.includes(genre.id)}
                            onChange={() => handleGenreChange(genre.id.toString())}
                            />
                            {genre.name}
                        </div>
                    ))}
                </div>
                <button type='submit'>Add Novel</button>
            </form>
            
            
        </div>
    );
}

export default AddUser;