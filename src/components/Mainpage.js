import React from 'react';
import { useState, useEffect } from'react';
import axios from 'axios';
import Dropdown from './Dropdown';
import Credentials from './Credentials';  
import Songlist from './Songlist';
import Player from './Player';
import UserAuth from './UserAuth'; 

function Mainpage({ code }) {
  const accessToken = UserAuth(code)
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
        // console.log(genreResponse);
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
      // console.log(value);
      // console.log(playlistResponse);
      setPlaylist({selectedPlaylist: playlistResponse.selectedPlaylist, listOfPlaylist: playlistResponse.data.playlists.items
      })
    });
  }

  const changePlaylist = (value) => {
    // console.log(value);
    setPlaylist({selectedPlaylist: value, listOfPlaylist: playlist.listOfPlaylist});
  }

  const clickButton = (event) => {
    event.preventDefault();

    axios(`https://api.spotify.com/v1/playlists/${playlist.selectedPlaylist}/tracks?limit=10`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer '+ token
      }
    })
    .then(trackResponse => {
      console.log(trackResponse);
      setTrack({selectedTrack: trackResponse.selectedTrack, listOfTrack: trackResponse.data.items})
    });
  }

  return (
    <div className="App">
      <header>
        <h1>What do you feel like listening today?</h1>
      </header>
      <Dropdown label="Genre:" options={genre.listOfGenre} selectedValue={genre.selectedGenre} change={changeGenre}/>
      <Dropdown label="Playlist:" options={playlist.listOfPlaylist} selectedValue={playlist.selectedPlaylist} change={changePlaylist}/>
      <button onClick={clickButton}>Search</button>
      <Songlist items={track.listOfTrack}/>
      <Player token={token}/>
    </div>
  );
}

export default Mainpage;