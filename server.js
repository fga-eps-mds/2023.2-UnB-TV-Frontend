let express = require('express');

let app = express();

app.use(express.static(__dirname + '/dist/un-b-tv-frontend'));

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/dist/un-b-tv-frontend/index.html');
});

app.listen(process.env.PORT || 3000);
