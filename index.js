const Joi = require('joi');
const logger = require('./middleware/logger');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const courses = require('./routes/courses');
const home = require('./routes/home');

const app = express();

//view engine 
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
app.use(helmet());
app.use('/courses', courses);
app.use('/', home);

console.log('Application Name: ' + config.get('name'));
console.log('Mail Server:' + config.get('mail.host'));

if(app.get('env') == 'development'){
    app.use(morgan('tiny'));
    startupDebugger('Morgan is enabled.....');
}

//db work
dbDebugger('Connected to database.....');

app.use(logger.log);
app.use(logger.auth);

//PORT to assign port dynamically
const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Listening on port ${port}....` ));

