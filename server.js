const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors())
app.use(bodyParser.json())

app.post('/login', (req, res) => {
    const code = req.body.code;
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: '12e740c4bd6f472ea5c65c75fbe58a28',
        clientSecret: 'c41b557aa51b4f0cb43a2e7ae3658652'
    })

    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            access_token: data.body.access_token,
            refresh_token: data.body.refresh_token,
            expires_in: data.body.expires_in  
        })
    }).catch((err) => {
        console.log(err)
        res.sendStatus(400)
    })
})

app.listen(3001)