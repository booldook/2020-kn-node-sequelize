const express = require('express');
const path = require('path');
const app = express();
const { Sequelize, DataTypes } = require('sequelize');

app.listen(3000, () => {
	console.log('http://127.0.0.1:3000');
});

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

const sequelize = new Sequelize({
	host: 'localhost',
	port: 3306,
	database: 'booldook',
	username: 'booldook',
	password: '000000',
	dialect: 'mysql',
	pool: { max: 10 }
});

const Sample = sequelize.define('Sample', {
	title: {
		type: DataTypes.STRING(255),
		allowNull: true
	},
	writer: {
		type: DataTypes.STRING(20)
	},
	comment: {
		type: DataTypes.TEXT()
	}
}, {
	charset: 'utf8',
	tableName: 'seq-sample'
});

sequelize.sync();

app.get('/', (req, res, next) => {
	res.send('<h1>Hello Sequelize</h1>');
});

app.get('/create', async (req, res, next) => {
	try {
		 let result = await Sample.create({
			title: '구운몽전',
			writer: '운몽이',
			comment: '한여름 나비가...'
		});
		res.json(result);
	}
	catch(e) {
		console.log(e);
	}
});

app.get('/list', async (req, res, next) => {
	try {
		let result = await Sample.findAll({
			order: [['id', 'desc']],
			offset: 0,
			limit: 5
		});
		res.json(result);
	}
	catch(e) {
		console.log(e);
	}
})