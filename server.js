// Require Express to run server and routes
const express = require('express');
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

/* Initializing the main project folder */
app.use(express.static('website'));

projectData={};
app.post('/weatherInfo', weatherInfo);

function weatherInfo(req, res) {
    console.log('post weatherInfo route');
    projectData=req.body
    res.send(projectData);
}

app.get('/weatherInfo', (req, res) => {
    console.log('get weatherInfo route');
    res.send(projectData);
});

const port = 3000;
const server = app.listen(port, () => { console.log(`listening at http://localhost:${port}`) });