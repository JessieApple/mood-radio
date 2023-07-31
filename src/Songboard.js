import React from 'react';
import SpotifyWebApi from "spotify-web-api-node";
import { useState, useEffect } from "react";
import axios from 'axios';

var client_id = "12e740c4bd6f472ea5c65c75fbe58a28";
var client_secret = "c41b557aa51b4f0cb43a2e7ae3658652";

// const spotifyApi = new SpotifyWebApi({
//     clientId: client_id,
//     clientSecret: client_secret,
//     redirectUri: "http://localhost:3000/callback"
// });

export default function Songboard() {
    // const [search, setSearch] = useState('');
    const [accessToken, setAccessToken] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    useEffect(() => {
        var authOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&client_id=' + client_id + '&client_secret=' + client_secret 
        }

        axios('https://accounts.spotify.com/api/token', authOptions)
            .then(res => res.json())
            .then(data => console.log(data.access_token))

    //         axios('https://api.spotify.com/v1/browse/categories?locale=sv_US',{
    //             method: 'GET',
    //             headers: {
    //                 'Auorization': 'Bearer '+ accessToken
    //             }
    //         })
    //         .then(data => console.log(data)) 
    // }, [accessToken])

    // async function search() {
    //     console.log("Search for Taylor Swift")
    //     var artistParams = {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Bearer ' + accessToken
    //         } 
    //     }
    //     var artistId = await fetch('https://api.spotify.com/v1/search?q=taylor+swift&type=artist', artistParams)
    //     .then(response => response.json())
    //     .then(data => console.log(data))
    // }

    return (
        <div>
            songs 
        </div>
    )
}