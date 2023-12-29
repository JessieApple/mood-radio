import React from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

export default function Player({ token, trackUri }) {
    return (
        <div>
            <SpotifyPlayer token={token} uris={trackUri ? [trackUri] : []}/>
        </div>
    ); 
}