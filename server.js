const express = require('express');
const path = require('path');
require('dotenv').config();
const exphbs = require('express-handlebars');

const routes = require('./routes/')

const app = express();
const PORT = process.env.PORT || 3401;

// const sequelize = require('./config/connection')
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.listen(PORT, () => {
    console.log(`App listening now on Port: ${PORT}`);
})