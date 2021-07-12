const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express()
const mysql = require('mysql');
const multer = require('multer');
const sizeOf = require('buffer-image-size');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "reg"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Database Connected!");

    var sql = "CREATE TABLE IF NOT EXISTS UserImages ( id INT NOT NULL AUTO_INCREMENT, img_name VARCHAR(255) NOT NULL, img_type VARCHAR(100) NOT NULL, img_size INT NOT NULL, img_data LONGBLOB NOT NULL, PRIMARY KEY (id))";

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("UserImages Table created");
    });
});


app.use(express.json());
app.use(express.static(__dirname + '/public'));

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
};

app.get('', (req, res) => {

    var filePath = '.' + req.url;
    if (filePath == './') {
        filePath = './index.html';
    }

    var extname = String(path.extname(filePath)).toLowerCase();

    var contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function (error, content) {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
    });
})

app.get('/tourism', (req, res) => {

    var filePath = '.' + req.url;
    if (filePath == './tourism') {
        filePath = './tourism.html';
    }

    var extname = String(path.extname(filePath)).toLowerCase();

    var contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function (error, content) {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
    });
})

app.get('/culture', (req, res) => {

    var filePath = '.' + req.url;
    if (filePath == './culture') {
        filePath = './culture.html';
    }

    var extname = String(path.extname(filePath)).toLowerCase();

    var contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function (error, content) {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
    });
})

app.get('/places', (req, res) => {

    var filePath = '.' + req.url;
    if (filePath == './places') {
        filePath = './places.html';
    }

    var extname = String(path.extname(filePath)).toLowerCase();

    var contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function (error, content) {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
    });
})
