import React from 'react';
import { useState, useEffect } from'react';
import axios from 'axios';
import './App.css';
import Dropdown from './components/Dropdown';
import Credentials from './components/Credentials';  
// import { Routes, Route } from'react-router-dom';
// import Mainpage from './Mainpage';
// import Songboard from './Songboard';

function App() {
  const spotify = Credentials();
  const data = [
    {value:1, name:'A'},
    {value:2, name:'B'},
    {value:3, name:'C'},
  ];

  const [token, setToken] = useState('');
  const [genre, setGenre] = useState({selectedGenre: '', listOfGenre: []});
  const [playlist, setPlaylist] = useState({selectedPlaylist: '', listOfPlaylist: []});
  const [track, setTrack] = useState({selectedTrack: '', listOfTrack: []});
  const [trackDetail, setTrackDetail] = useState(null);

  useEffect(() => {
    axios('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic '+ btoa(spotify.clientId + ':' + spotify.clientSecret)
      },
      data: 'grant_type=client_credentials'
    })
    .then(tokenResponse => {
      setToken(tokenResponse.data.access_token);
      
      axios('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer '+ tokenResponse.data.access_token}
      })
      .then(genreResponse => {
        console.log(genreResponse);
        setGenre({selectedGenre: genreResponse.selectedGenre, listOfGenre: genreResponse.data.categories.items
        })
      });
    });
  }, [genre.selectedGenre, spotify.clientId, spotify.clientSecret]);

  const changeGenre = (value) => {
    setGenre({selectedGenre: value, listOfGenre: genre.listOfGenre}); 
    
    axios(`https://api.spotify.com/v1/browse/categories/${value}/playlists?limit=10`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer '+ token}
    })
    .then(playlistResponse => {
      console.log(value);
      console.log(playlistResponse);
      setPlaylist({selectedPlaylist: playlistResponse.selectedPlaylist, listOfPlaylist: playlistResponse.data.playlists.items
      })
    });
  }

  const changePlaylist = (value) => {
    console.log(value);
    setPlaylist({selectedPlaylist: value, listOfPlaylist: playlist.listOfPlaylist});
  }

  return (
    <div className="App">
      <header>
        <h1>What do you feel like listening today?</h1>
      </header>
      <Dropdown label="Genre:" options={genre.listOfGenre} selectedValue={genre.selectedGenre} change={changeGenre}/>
      <Dropdown label="Playlist:" options={playlist.listOfPlaylist} selectedValue={playlist.selectedPlaylist} change={changePlaylist}/>
    </div>
  );
}

export default App;
