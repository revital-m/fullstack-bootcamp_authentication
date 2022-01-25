require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
require('./src/db/mongoose');
const router = require('./src/routers/clientRoute');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(router);
const publicPath = path.join(__dirname, 'client/build');

app.use(express.static(publicPath));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(publicPath, "index.html"));
  });

  app.get('/posts', (req, res) => {
    
})

app.post('/login', (req, res) => {
    const username = req.body.username;
    const user = { name: username };

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);


})

app.listen(port, () => {
    console.log(`Server is up on port - ${port}`);
});