const express = require('express');
const path = require('path');
const app = express();
const myApp = express();
const assistantApp = express();
let port = 3000;

// Get port arg.
for (let i = 0; i < process.argv.length; i++) {
    if (process.argv[i] === '--port') {
        i++;
        if (process.argv.length != i) {
            port = process.argv[i];
        }
    }
}

assistantApp.use(express.static(path.join(__dirname, 'public/dungeon-master-assistant')));
myApp.use(express.static(path.join(__dirname, 'public/personal-site')));

app.use('/assistant', assistantApp);

app.get('/assistant/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/dungeon-master-assistant', 'index.html'));
});

app.use('/', myApp);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/personal-site', 'index.html'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))