const express = require('express');
const app = express();

app.get('/', (req, res) => {

    res.send('Hello World');

} );

app.get('/courses', (req, res) => {

    res.send([1, 2, 3, 4]);
});

//PORT to assign port dynamically
const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Listening on port ${port}....` ));
