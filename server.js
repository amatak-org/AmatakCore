const express = require('express');
const webpack = require('webpack');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);


db.serialize(() => {
  db.run('CREATE TABLE lorem (info TEXT)')
  const stmt = db.prepare('INSERT INTO lorem VALUES (?)')

  for (let i = 0; i < 10; i++) {
    stmt.run(`Ipsum ${i}`)
  }

  stmt.finalize()

  db.each('SELECT rowid AS id, info FROM lorem', (err, row) => {
    console.log(`${row.id}: ${row.info}`)
  })
})

db.close()
// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use('/static', express.static(path.join(__dirname, 'dist')))