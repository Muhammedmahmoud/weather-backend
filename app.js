const forecast = require('./utils/forecast')
const express = require('express');
const http = require("http");
const app = express()
const server = http.createServer(app);

const { PORT = 3000, SALT = '#ha43-1', LOG_LEVEL, NODE_ENV } = process.env;

const io = require('socket.io')(server, {
   cors: {
           /* origin: "http://localhost:8080",
            methods: ["GET", "POST"]*/
            origin: "http://34.121.91.100/",
            methods: ["GET", "POST"],
            allowedHeaders: ["my-custom-header"],
            credentials: true
        }
});

io.on('connection', (socket) => {
    console.log("User Connected")
    socket.on("Public", (data) => {
        forecast(data, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }
            io.emit("weather", forecastData)
        })
    });
})


server.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})

server.get('/', (req, res) => {
    res.send('Hello');
});
