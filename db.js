const mysql = require("mysql2");
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

// const connection = mysql.createConnection(config);
// connection.connect((err)=>{
//     if (err) {
//         return console.error("Ошибка: " + err.message);
//     }
//     else {
//         console.log("Подключение к серверу MySQL успешно установлено");
//     }
// })

const pool = mysql.createConnection(config);

module.exports = pool
