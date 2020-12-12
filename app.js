const express = require('express');
const path = require('path');
const app = express();
const { Sequlize, Model, Datatype } = require('sequelize');


app.listen(3000, () => {
	console.log('http://127.0.0.1:3000');
});

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));