const forecast = require('./utils/forecast')
const express = require('express');
const http = require("http");
const app = express()
const server = http.createServer(app);

const { PORT = 4000, SALT = '#ha43-1', LOG_LEVEL, NODE_ENV } = process.env;

const io = require('socket.io')(server, {
    cors: {
         origin: "http://localhost:8888",
         methods: ["GET", "POST"]

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

app.get('/', (req, res) => {
    res.send('Hello');
});
